import {Inject, Injectable} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {type UserServiceI, UserServiceToken} from "@/share";
import {ForgotPasswordReq} from "@/modules/auth/dtos/forgotPassword";

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @Inject(UserServiceToken)
    private readonly userService: UserServiceI
  ) {}

  async execute(data: ForgotPasswordReq) {
    const {email} = data;
    const primaryResponse = {
      msg: 'We have sent code in your email.'
    }


  }
}