import {Body, Controller, Inject, Post} from "@nestjs/common";
import * as share from "@/share";
import {LoginReq, RegisterReq} from "@/modules/auth/dtos";
import { ApiTags } from "@nestjs/swagger";
import {AuthService} from "@/modules/auth/services/services";
import {AuthServiceToken} from "@/share";

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthServiceToken)
    private readonly authService: AuthService
  ) {}

  @Post('register')
  register(@Body() registerReq: RegisterReq) {
    return this.authService.register(registerReq);
  }

  @Post('login')
  login(@Body() loginReq: LoginReq) {
    return this.authService.login(loginReq);
  }
}