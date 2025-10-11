import {EventSubscriber} from "typeorm";
import {BaseCascadeSubscriber} from "@/modules/base/subcriber";
import {ClassEntity} from "@/modules/class/entities";
import {UserClassEntity} from "@/modules/user_class/entities";

@EventSubscriber()
export class ClassSubscriber extends BaseCascadeSubscriber<ClassEntity>{
  constructor() {
    super([
      {childEntity: UserClassEntity, foreignKey: "class_id"},
    ]);
  }

  listenTo(): Function | string { return ClassEntity}
}