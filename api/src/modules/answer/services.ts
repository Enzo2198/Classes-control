import {Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {Repository} from "typeorm";
import {ClsService} from "nestjs-cls";
import {Transactional} from "typeorm-transactional";
import {BaseService} from '../base/services';
import {AnswerEntity} from "@/modules/answer/entities";
import {AnswerEntityRepository, QuestionServiceToken} from '@/share';
import type {AnswerReqI, AnswerResI, AnswerServiceI, QuestionServiceI} from '@/share';
import {QuestionType} from "@/share/type/question";

@Injectable()
export class AnswerService extends BaseService<AnswerEntity, AnswerReqI, AnswerResI>
  implements AnswerServiceI {
  constructor(
    @Inject(AnswerEntityRepository)
    protected repository: Repository<AnswerEntity>,
    protected cls: ClsService,
    @Inject(QuestionServiceToken)
    private readonly questionService: QuestionServiceI,
  ) {
    super(repository, cls);
  }

  async create(answerReq: AnswerReqI): Promise<AnswerResI> {
    const {question_id, answer, exam_result_id} = answerReq;

    // 1. Find question_exam_id From question_id and exam_result_id
    const questionExam = await this.repository.manager
      .createQueryBuilder()
      .select('qe.id', 'id')
      .from('question_exam', 'qe')
      .innerJoin('exam_result', 'er', 'er.exam_id = qe.exam_id')
      .where('qe.question_id = :questionId', {questionId: question_id})
      .andWhere('er.id = :examResultId', {examResultId: exam_result_id})
      .getRawOne();

    if (!questionExam) {
      throw new InternalServerErrorException(`Question exam not found for question_id ${question_id} and exam_result_id ${exam_result_id}`);
    }

    const question_exam_id = questionExam.id;

    // 2. Get QUESTION DETAILS
    const question = await this.questionService.findOne(question_id);
    if (!question) throw new InternalServerErrorException(`Question ${question_id} not found`);

    const {type: questionType, correct_answer} = question;

    // 3. Math isCorrect
    let isCorrect: boolean[] | null;
    if (questionType === QuestionType.LONG_RESPONSE) {
      isCorrect = null;
    } else if (answer === '') {
      isCorrect = [false];
    } else {
      const arrayOfCorrectAnswers: string[] = correct_answer.split(',').map(a => a.trim());
      const arrayOfAnswers: string[] = answer.split(',').map(a => a.trim());

      const allMatch =
        arrayOfAnswers.length === arrayOfCorrectAnswers.length &&
        arrayOfAnswers.every(a => arrayOfCorrectAnswers.includes(a));
      isCorrect = [allMatch]
    }

    // 4. Create answer with question_exam_id
    const data = {
      ...answerReq,
      question_exam_id,
      is_correct: isCorrect
    };
    return await super.create(data)
  }

  @Transactional()
  async updateMany(answers: AnswerReqI[]): Promise<AnswerResI[]> {
    const userId: number | null = this.getUserId();
    if (!answers || answers.length === 0) return [];

    const escapeLiteral = (str: string) => str.replace(/'/g, "''");

    const answersData: string = answers.map((a: AnswerReqI) => {
      const {id, question_id, answer, is_correct} = a;

      const pgArray = is_correct
        ? `'{${
          is_correct.map(val => val ? 'true' : 'false').join(',')
        } }'::boolean[]`
        : `NULL`;

      return `(${id}, ${question_id}, '${escapeLiteral(answer)}', ${pgArray}, ${userId})`;
    }).join(',');


    const query =
      `
          WITH answers_to_update(id, question_exam_id, answer, is_correct, updated_by) AS (VALUES ${answersData})
          UPDATE "${this.getTableName()}" AS a
          SET "is_correct" = atu.is_correct,
              "updated_by" = atu.updated_by FROM answers_to_update AS atu
          WHERE a.id = atu.id
              RETURNING a.id
              , a.question_exam_id
              , a.answer
              , a.is_correct;
      `
    const result = await this.repository.query(query);
    if (!result || result.length === 0) throw new InternalServerErrorException('Failed to update results');
    return result[0] as AnswerResI[];
  }
}