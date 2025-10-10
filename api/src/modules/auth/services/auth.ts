import {forwardRef, Inject, Injectable} from "@nestjs/common";
import type {AuthServiceI, LoginReqI, RegisterReqI,} from "@/share";
import {RegisterService} from "./register";
import {LoginService} from "./login";
import {RefreshTokenService} from "@/modules/auth/services/refreshToken";
import {RefreshTokenReq} from "../dtos/refreshToken";

@Injectable()
export class AuthService implements AuthServiceI {
  constructor(
    @Inject(forwardRef(() => RegisterService))
    private readonly registerService: RegisterService,
    @Inject(forwardRef(() => LoginService))
    private readonly loginService: LoginService,
    @Inject(forwardRef(() => RefreshTokenService))
    private readonly refreshTokenService: RefreshTokenService,
  ) {
  }

  register(data: RegisterReqI) {
    return this.registerService.register(data);
  }

  login(data: LoginReqI) {
    return this.loginService.login(data);
  }

  refreshToken(data: RefreshTokenReq) {
    return this.refreshTokenService.refreshToken(data)
  }

}