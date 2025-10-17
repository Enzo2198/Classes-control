import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {FileEntity} from "@/modules/file/entities";
import {ExamGroupEntity} from "@/modules/exam_group/entities";

@Entity('exam')
export class ExamEntity extends BaseEntity {
  @Column()
  exam_group_id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({nullable: true})
  description: string;

  @Column()
  number_of_question: number;

  @Column()
  total_time: number;

  @Column({ nullable: true })
  file_id: number | null;

  @OneToOne(()=> FileEntity, file => file.exam)
  @JoinColumn({ name: 'file_id' })
  file: FileEntity;

  @ManyToOne(() => ExamGroupEntity)
  @JoinColumn({ name: 'exam_group_id' })
  examGroup: ExamGroupEntity;
}