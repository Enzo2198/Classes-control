import {UserController} from "@/modules/user/controllers";
import {Module} from "@nestjs/common";
import { UserService } from "./services";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}