import {EventSubscriber} from "typeorm";
import {BaseCascadeSubscriber} from "@/modules/base/subcriber";
import {UserEntity} from "@/modules/user/entities";
import {UserClassEntity} from "@/modules/user_class/entities";
import {ExamResultEntity} from "@/modules/exam_result/entities";

@EventSubscriber()
export class UserSubscriber extends BaseCascadeSubscriber<UserEntity>{
  constructor() {
    super([
      {childEntity: UserClassEntity, foreignKey: "user_id"},
      {childEntity: ExamResultEntity, foreignKey: "user_id"},
    ]);
  }

  listenTo(): Function | string { return UserEntity}
}