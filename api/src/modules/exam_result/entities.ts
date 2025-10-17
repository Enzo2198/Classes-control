import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {UserEntity} from "@/modules/user/entities";
import { ExamEntity } from "../exam/entities";
import {AnswerEntity} from "@/modules/answer/entities";

@Entity('exam_result')
export class ExamResultEntity extends BaseEntity {
  @Column()
  user_id: number;

  @Column()
  exam_id: number;

  @Column()
  status: string;

  @Column()
  device: string;

  @Column({default: 0})
  number_of_correct_answer: number;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  score: number | null;

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

  @ManyToOne(() => ExamEntity)
  @JoinColumn({name: 'exam_id'})
  exam: ExamEntity;

  @OneToMany(() => AnswerEntity, answer => answer.exam_result)
  answers: AnswerEntity[];
}
