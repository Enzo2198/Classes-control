import {Body, Controller, Inject, Post} from "@nestjs/common";
import * as share from "@/share";
import {LoginReq} from "@/modules/auth/dtos";

@Controller()
export class AuthController {
  constructor(
    @Inject(share.UserServiceToken)
    private userService: share.UserServiceI,
  ) {}

  @Post('/login')
  login(@Body() loginReq: LoginReq) {
    return this.userService.login(loginReq);
  }
}