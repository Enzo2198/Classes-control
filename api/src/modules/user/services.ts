import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import { UserEntity } from "./entities";
import {BaseService} from "@/modules/base/services";
import {LoginResI, UserEntityRepository, UserI, UserReqI, UserResI, UserServiceI, UserWithPassI} from "@/share";
import {LoginReq} from "@/modules/auth/dtos";
import {sign} from 'jsonwebtoken'
import * as process from "node:process";
import {ClsService} from "nestjs-cls";
import {ConfigService} from "@nestjs/config";


const privateKey = process.env.PRIVATE_KEY as string;

@Injectable()
export class UserService extends BaseService<UserEntity, UserReqI, UserResI> implements UserServiceI {
  constructor(
    @Inject(UserEntityRepository)
    protected readonly repository: Repository<UserEntity>,
    protected readonly cls: ClsService,
    private readonly configService: ConfigService
  ) {
    super(repository, cls);
  }

  protected getPublicColumns() {
    return super.getPublicColumns().filter(c => c != 'password');
  }

  async findUserByEmailWithPassword(email: string): Promise<UserWithPassI | null> {
    const query = this.handleSelect()
    const response: UserWithPassI | undefined = await query
      .addSelect('UserEntity.password', 'password')
      .where('UserEntity.email = :email AND UserEntity.active = :active', {email, active: true})
      .getRawOne<UserWithPassI>();

    return response ?? null;
  }
}