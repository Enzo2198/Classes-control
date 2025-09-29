import {Column, Entity} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";

@Entity('user_class')
export class UserClassEntity extends BaseEntity{
  @Column()
  userId: number;

  @Column()
  classId: number;
}