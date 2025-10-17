import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {QuestionExamEntity} from "./entities";
import {BaseService} from "@/modules/base/services";
import {QuestionExamEntityRepository, QuestionExamServiceI} from "@/share";
import {ClsService} from "nestjs-cls";
import {QuestionExamReqI, QuestionExamResI} from "@/share/type/question_exam";

@Injectable()
export class QuestionExamService extends BaseService<QuestionExamEntity, QuestionExamReqI, QuestionExamResI> implements QuestionExamServiceI {
  constructor(
    @Inject(QuestionExamEntityRepository)
    protected repository: Repository<QuestionExamEntity>,
    protected cls: ClsService,
  ) {
    super(repository, cls);
  }
}