import {Inject, Injectable, InternalServerErrorException} from "@nestjs/common";
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
        'exam.id as id',
        'exam.name as name',
        'exam.code as code',
        'exam.description as description',
        `coalesce(
          json_agg(
            json_build_object(
              'id', q.id,
              'question', q.question,
              'type', q.type,
              'correct_answer', q.correct_answer,
            )
          ) filter (where q.active = true),
        '[]') as questions`,
      ])
      .leftJoin('question_exam', 'qe', 'qe.exam_id = exam.id')
      .leftJoin('question', 'q', 'q.id = qe.question_id')
      .groupBy('exam.id')
  }

  @Transactional()
  async create(examReq: ExamReqI): Promise<ExamResI> {
    const createId = this.getUserId();
    const {questions, ...rest} = examReq;

    // Create exam
    const examInsert = await this.repository
      .createQueryBuilder('exam')
      .insert()
      .values({...rest, created_by: createId})
      .returning(this.getPublicColumns())
      .execute();

    if (!examInsert.raw?.[0]) {
      throw new InternalServerErrorException(`Failed to create exam`);
    }

    const examId = examInsert.raw[0].id;

    // Create questions
    const newQuestions = await this.questionService.createMany(questions);

    // Save in question_exam
    const questionExamValues = newQuestions.map((q) => ({
      exam_id: examId,
      question_id: q.id
    }))

    await this.repository.manager
      .createQueryBuilder()
      .insert()
      .into('question_exam')
      .values(questionExamValues)
      .execute();

    return {...examInsert.raw[0], questions: newQuestions} as ExamResI;

  }
}
