import {EventSubscriber} from "typeorm";
import {BaseCascadeSubscriber} from "@/modules/base/subcriber";
import {ExamResultEntity} from "@/modules/exam_result/entities";
import {AnswerEntity} from "@/modules/answer/entities";

@EventSubscriber()
export class ExamResultSubscriber extends BaseCascadeSubscriber<ExamResultEntity>{
  constructor() {
    super([
      { childEntity: AnswerEntity, foreignKey: "exam_result_id"}
    ])
  }
}