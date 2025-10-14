import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {FileEntity} from "@/modules/file/entities";

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

  @Column()
  file_id: number;

  @OneToOne(()=> FileEntity, file => file.exam)
  @JoinColumn({ name: 'file_id' })
  file: FileEntity;
}