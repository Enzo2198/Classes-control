import {Column, Entity} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {QuestionType} from "@/share/type/question";

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @Column({nullable: true})
  question: string;

  @Column()
  index: number;

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.MULTIPLE_CHOICE,
  })
  type: QuestionType;

  @Column()
  correct_answer: string;
}