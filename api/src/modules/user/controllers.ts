import {Controller, Get} from '@nestjs/common';
import {UserService} from "@/modules/user/services";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  get() {
    return this.userService.get();
  }
}
