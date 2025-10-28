import {Inject, Injectable, InternalServerErrorException} from "@nestjs/common";
import {BaseService} from "@/modules/base/services";
import {QuestionEntity} from "@/modules/question/entities";
import {QuestionReqI, QuestionResI} from "@/share/type/question";
import {QuestionEntityRepository, type QuestionServiceI} from "@/share";
import {ClsService} from "nestjs-cls";
import {Repository} from "typeorm";
import {Transactional} from "typeorm-transactional";

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, QuestionReqI, QuestionResI>
  implements QuestionServiceI {
  constructor(
    protected cls: ClsService,
    @Inject(QuestionEntityRepository)
    protected readonly repository: Repository<QuestionEntity>
  ) {
    super(repository, cls);
  }

  @Transactional()
  async createMany(questions: QuestionReqI[]) {
    const userId = this.getUserId();

    if (!questions?.length) return [];

    const questionsWithUser = questions.map((q) => ({
      ...q,
      created_by: userId,
      question: q.question ? q.question : undefined,
    }))

    const result = await this.repository
      .createQueryBuilder("question")
      .insert()
      .values(questionsWithUser)
      .returning(['id', 'index', 'type', 'correct_answer', 'question'])
      .execute();

    if (!result.raw?.length)
      throw new InternalServerErrorException('Failed to create questions');

    return result.raw as QuestionResI[];
  }

  @Transactional()
  async updateMany(questions: QuestionReqI[]) {
    const userId = this.getUserId();

    if (!questions?.length) return [];

    const questionsData: string = questions.map((q) =>
      `(${q.id},${q.index},'${q.type}'::question_type_enum,'${q.correct_answer}',${q.exam_id},${userId})`
    ).join(',')

    const query =
      `
          WITH questions_to_update(id, index, type, correct_answer, exam_id, updated_by) 
              AS (VALUES ${questionsData})
          UPDATE "${this.getTableName()}" AS q
          SET 
              "index" = qtu.index,
              "type" = qtu.type,
              "correct_answer" = qtu.correct_answer,
              "updated_by" = qtu.updated_by 
          FROM questions_to_update AS qtu
          WHERE q.id = qtu.id
          RETURNING q.id, q.index, q.type, q.correct_answer;
      `

    const result = await this.repository.query(query);
    if (!result || result.length === 0) throw new InternalServerErrorException('Failed to update questions');
    return result[0] as QuestionResI[]
  }
}