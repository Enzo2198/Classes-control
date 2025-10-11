import {Column, Entity} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";

@Entity('user_class')
export class UserClassEntity extends BaseEntity{
  @Column({
    name: 'user_id',
  })
  user_id: number;

  @Column({
    name: 'class_id'
  })
  class_id: number;

}