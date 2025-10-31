import {BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException} from "@nestjs/common";
import {Transactional} from "typeorm-transactional";
import {BaseService} from "@/modules/base/services";
import {ExamEntity} from "./entities";
import {ExamEntityRepository, QuestionServiceToken} from "@/share";
import type {ExamReqI, ExamResI, ExamServiceI, QuestionServiceI,} from "@/share";
import {ClsService} from "nestjs-cls";
import {Repository, SelectQueryBuilder} from "typeorm";

@Injectable()
export class ExamService extends BaseService<ExamEntity, ExamReqI, ExamResI>
  implements ExamServiceI {
  constructor(
    protected readonly cls: ClsService,

    @Inject(ExamEntityRepository)
    protected readonly repository: Repository<ExamEntity>,
    @Inject(QuestionServiceToken)
    private readonly questionService: QuestionServiceI,
  ) {
    super(repository, cls);
  }

  protected handleSelect(): SelectQueryBuilder<ExamEntity> {
    return this.repository
      .createQueryBuilder('exam')
      .select([
        'exam.id AS id',
        'exam.exam_group_id::int AS exam_group_id',
        'exam.name AS name',
        'exam.code AS code',
        'exam.total_time AS total_time',
        'exam.number_of_question AS number_of_question',
        'exam.description AS description',

        // Merge group list from table question_exam
        `coalesce(
        json_agg(
          json_build_object(
            'id', q.id,
            'index', q.index,
            'type', q.type,
            'correct_answer', q.correct_answer
          )
        ) filter (where q.active = true and q.deleted_at is null),
      '[]') AS questions`,

        // File PDF
        `json_build_object(
        'id', f.id,
        'url', f.viewable_url,
        'file_type', f.file_type
      ) AS file`
      ])
      .leftJoin('question_exam', 'qe', 'qe.exam_id = exam.id')
      .leftJoin('question', 'q', 'q.id = qe.question_id')
      .leftJoin('file', 'f', 'f.id = exam.file_id')
      .where('exam.active = true')
      .andWhere('exam.deleted_at IS NULL')
      .groupBy('exam.id, f.id');
  }

  @Transactional()
  async create(examReq: ExamReqI): Promise<ExamResI> {
    const userId = this.getUserId();
    const {questions, ...examData} = examReq;

    if(!questions?.length) throw new BadRequestException('Exam must include at least one question');

    const existing = await this.repository.findOne({where: {code: examData.code}});
    if (existing) throw new ConflictException(`Mã đề ${examData.code} đã có`);

    // Create exam
    const [exam] = await this.repository
      .createQueryBuilder()
      .insert()
      .values({...examData, created_by: userId})
      .returning('*')
      .execute()
      .then(res => res.raw);

    if (!exam) throw new InternalServerErrorException(`Failed to create exam`);

    // Create questions
    const newQuestions = await this.questionService.createMany(questions);

    // Save in question_exam
    const values = newQuestions.map((q) => ({
      exam_id: exam.id,
      question_id: q.id
    }))

    await this.repository.manager
      .createQueryBuilder()
      .insert()
      .into('question_exam')
      .values(values)
      .execute();

    return {...exam, questions: newQuestions} as ExamResI;

  }
}
