import {Column, Entity} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";

@Entity('question_exam')
export class QuestionExamEntity extends BaseEntity {
  @Column()
  exam_id: number;

  @Column()
  question_id: number;
}