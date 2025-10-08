import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UserClassEntity} from "./entities";
import {BaseService} from "@/modules/base/services";
import {ClassUserServiceI, UserClassEntityRepository} from "@/share";
import {ClassUserReqI, ClassUserResI} from "@/share/type/user-class";
import {ClsService} from "nestjs-cls";

@Injectable()
export class UserClassService extends BaseService<UserClassEntity, ClassUserReqI, ClassUserResI> implements ClassUserServiceI {
  constructor(
    @Inject(UserClassEntityRepository)
    protected repository: Repository<UserClassEntity>,
    protected cls: ClsService,
  ) {
    super(repository, cls);
  }
}