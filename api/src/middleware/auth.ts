import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserService} from "@/modules/user/services";
import {UserServiceToken} from "@/share";
import {ModuleRef} from '@nestjs/core'

@Injectable()
export class Auth {
  constructor(
    private moduleRef: ModuleRef
  ) {}

  async use(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    token = token?.split(' ')[1];
    token = token?.split('.')[1];

    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));

    const userService = await this.moduleRef.resolve<UserService> (
      UserServiceToken,
      undefined,
      {
        strict: false
      }
    )

    const users = await userService.find({id: payload.id})
    if (users.length === 0) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
    }

    const user = users[0];

    next()
  }
}