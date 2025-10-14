import {EventSubscriber} from "typeorm";
import {BaseCascadeSubscriber} from "@/modules/base/subcriber";
import {QuestionEntity} from "./entities";
import {QuestionExamEntity} from "@/modules/question_exam/entities";

@EventSubscriber()
export class QuestionSubscriber extends BaseCascadeSubscriber<QuestionEntity> {
  constructor() {
    super([
      {childEntity: QuestionExamEntity, foreignKey: "question_id"}
    ])
  }

  listenTo() {
    return QuestionEntity;
  }
}