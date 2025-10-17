import {EventSubscriber} from "typeorm";
import {BaseCascadeSubscriber} from "@/modules/base/subcriber";
import {ExamGroupEntity} from "@/modules/exam_group/entities";
import {ExamEntity} from "@/modules/exam/entities";

@EventSubscriber()
export class ExamGroupSubscriber extends BaseCascadeSubscriber<ExamGroupEntity> {
  constructor() {
    super([
      {childEntity: ExamEntity, foreignKey: "exam_group_id"}
    ]);
  }

  listenTo() {
    return ExamGroupEntity;
  }
}