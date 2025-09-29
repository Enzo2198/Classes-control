import {Column, Entity} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {Role} from "@/share";

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'teacher'
  })
  role: Role;
}