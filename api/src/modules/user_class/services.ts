import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UserClassEntity} from "./entities";
import {BaseService} from "@/modules/base/services";
import {UserClassEntityRepository} from "@/share";

@Injectable()
export class UserClassService extends BaseService<UserClassEntity> {
  constructor(
    @Inject(UserClassEntityRepository)
    protected repository: Repository<UserClassEntity>
  ) {
    super(repository);
  }
}