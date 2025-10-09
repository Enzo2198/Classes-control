import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Inject, Post} from "@nestjs/common";
import * as share from "@/share";
import {ChangePasswordReq} from "@/modules/user/dtos";

@ApiTags("User")
@Controller("users")
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject(share.UserServiceToken)
    private readonly userService: share.UserServiceI,
  ) {}

  // @Post('change_password')
  // changePassword(@Body() data: ChangePasswordReq) {
  //   return this.userService.changePassword(data);
  // }
}