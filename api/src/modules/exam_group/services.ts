import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ClsService} from "nestjs-cls";
import {BaseService} from "@/modules/base/services";
import {ExamGroupEntity} from "@/modules/exam_group/entities";
import {ExamGroupEntityRepository, ExamGroupI, ExamGroupReqI, ExamGroupServiceI} from "@/share";

@Injectable()
export class ExamGroupService extends BaseService<ExamGroupEntity, ExamGroupReqI, ExamGroupI>
  implements ExamGroupServiceI
{
  constructor(
    protected cls: ClsService,

    @Inject(ExamGroupEntityRepository)
    protected repository: Repository<ExamGroupEntity>,
  ) {
    super(repository, cls);
  }

  protected getPublicColumns(): string[] {
    return super.getPublicColumns().concat(['created_at']);
  }
}