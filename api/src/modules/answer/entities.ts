import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {ExamResultEntity} from "@/modules/exam_result/entities";
import {QuestionExamEntity} from "@/modules/question_exam/entities";

@Entity('answer')
export class AnswerEntity extends BaseEntity {
  @Column()
  exam_result_id: number;

  @Column()
  question_exam_id: number;

  @Column()
  answer: string;

  @ManyToOne(() => ExamResultEntity)
  @JoinColumn({name: 'exam_result_id'})
  exam_result: ExamResultEntity;

  @ManyToOne(() => QuestionExamEntity)
  @JoinColumn({name: 'question_exam_id'})
  question_exam: QuestionExamEntity;

  @Column({
    type: 'boolean',
    array: true,
    nullable: true,
    default: null
  })
  is_correct: boolean[] | null;
}