import {Column, Entity, OneToOne} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {UserEntity} from "@/modules/user/entities";
import {ExamEntity} from "@/modules/exam/entities";

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column({
    name: 'public_id',
    unique: true,
  })
  public_id: string;

  @Column({
    unique: true
  })
  url: string;

  @Column({
    name: 'viewable_url',
    nullable: true,
  })
  viewable_url: string;

  @Column({
    name: 'original_name'
  })
  original_name: string;

  @Column({
    name: 'file_style',
    type: 'varchar',
    length: 50
  })
  file_style: string;

  @Column()
  size: number;

  @OneToOne(() => UserEntity, user =>user.file)
  user: UserEntity;

  @OneToOne(()=> ExamEntity, exam => exam.file)
  exam: ExamEntity;

}