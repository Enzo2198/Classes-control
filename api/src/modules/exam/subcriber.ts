import {EventSubscriber} from "typeorm";
import {BaseCascadeSubscriber} from "@/modules/base/subcriber";
import { ExamEntity } from "./entities";
import {QuestionExamEntity} from "@/modules/question_exam/entities";

@EventSubscriber()
export class ExamSubscriber extends BaseCascadeSubscriber<ExamEntity> {
  constructor() {
    super([
      {childEntity: QuestionExamEntity, foreignKey: "exam_id"}
    ])
  }

  listenTo() {
    return ExamEntity;
  }
}