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
    type: 'enum',
    enum: Role,
    default: Role.STUDENT
  })
  role: Role;

  // @Column({nullable: true})
  // avatar: number | null;


}