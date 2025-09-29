import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import { UserEntity } from "./entities";
import {BaseService} from "@/modules/base/services";
import {UserEntityRepository, UserServiceI} from "@/share";

@Injectable()
export class UserService extends BaseService<UserEntity> implements UserServiceI{
  constructor(
    @Inject(UserEntityRepository)
    protected repository: Repository<UserEntity>
  ) {
    super(repository);
  }

  protected getPublicColumns() {
    return super.getPublicColumns().filter(c => c != 'password');
  }
}