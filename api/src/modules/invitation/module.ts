import {Module} from "@nestjs/common";
import {InvitationServiceToken} from "@/share";
import {InvitationController} from "@/modules/invitation/controllers";
import {InvitationService} from "@/modules/invitation/services";
import {UserClassModule} from "@/modules/user_class/module";

@Module({
  imports: [UserClassModule],
  controllers: [InvitationController],
  providers: [
    {
      provide: InvitationServiceToken,
      useClass: InvitationService
    }
  ],
})
export class InvitationModule {}