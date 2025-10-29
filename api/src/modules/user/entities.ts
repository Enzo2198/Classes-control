import {Column, Entity, JoinColumn, OneToOne} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {Role} from "@/share";
import {FileEntity} from "@/modules/file/entities";

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT
  })
  role: Role;

  @Column()
  status: string;

  @Column({nullable: true})
  avatar: number | null;

  @OneToOne(() => FileEntity, file => file.user)
  @JoinColumn({ name: 'avatar'})
  file: FileEntity;

}