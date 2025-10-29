import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Inject, Post, UseGuards} from "@nestjs/common";
import * as share from "@/share";
import {ChangePasswordReq} from "@/modules/user/dtos";
import {AuthGuard} from "@/guards";

@ApiTags("User")
@Controller("users")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    @Inject(share.UserServiceToken)
    private readonly userService: share.UserServiceI,
  ) {}

  @Post('change-password')
  changePassword(@Body() data: ChangePasswordReq) {
    return this.userService.changePassword(data);
  }
}