import {Module} from "@nestjs/common";
import {AuthController} from "@/modules/auth/controllers";
import {UserModule} from "@/modules/user/module";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule {}