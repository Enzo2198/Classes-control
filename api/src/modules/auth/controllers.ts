import {Body, Controller, Inject, Post} from "@nestjs/common";
import {RegisterReq} from "@/modules/auth/dtos/register";
import { ApiTags } from "@nestjs/swagger";
import {AuthServiceToken} from "@/share";
import type {AuthServiceI} from "@/share";
import {LoginReq} from "@/modules/auth/dtos/login";
import { RefreshTokenReq } from "./dtos/refreshToken";

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthServiceToken)
    private readonly authService: AuthServiceI,
  ) {}

  @Post('register')
  register(@Body() registerReq: RegisterReq) {
    return this.authService.register(registerReq);
  }

  @Post('login')
  login(@Body() loginReq: LoginReq) {
    return this.authService.login(loginReq);
  }

  @Post('refreshToken')
  refreshToken(@Body() refreshTokenReq: RefreshTokenReq) {
    return this.authService.refreshToken(refreshTokenReq);
  }
}