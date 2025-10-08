import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import { UserEntity } from "./entities";
import {BaseService} from "@/modules/base/services";
import {LoginResI, UserEntityRepository, UserI, UserReqI, UserResI, UserServiceI} from "@/share";
import {LoginReq} from "@/modules/auth/dtos";
import {sign} from 'jsonwebtoken'
import * as process from "node:process";
import {ClsService} from "nestjs-cls";
import {ConfigService} from "@nestjs/config";


const privateKey = process.env.PRIVATE_KEY as string;

@Injectable()
export class UserService extends BaseService<UserEntity, UserReqI, UserResI>
  // implements UserServiceI
  {
  constructor(
    @Inject(UserEntityRepository)
    protected readonly repository: Repository<UserEntity>,
    protected readonly cls: ClsService,
    private readonly configService: ConfigService
  ) {
    super(repository, cls);
  }

  // findOneBy: (params?: any) => Promise<any>;

  protected getPublicColumns() {
    return super.getPublicColumns().filter(c => c != 'password');
  }



  async login(loginReq: LoginReq): Promise<LoginResI> {
    // Check email and password is correct?
    const users: UserI[] = await this.find({email: loginReq.email, password: loginReq.password});
    // if incorrect -> 404
    if (users.length === 0) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }

    const user: UserI = users[0];
    // Make new jwt token and return
    const token = sign(
      {
        ...user,
        exp: Math.floor(Date.now() / 1000) + 180
      }, privateKey);
    return {
      accessToken: token,
      refreshToken: sign(user, privateKey)
    }
  }
}