import {Module} from "@nestjs/common";
import {MailServiceToken} from "@/share";
import {MailService} from "@/mail/services";

@Module({
  providers: [
    {
      provide: MailServiceToken,
      useClass: MailService
    }
  ],
  exports: [MailServiceToken],
})
export class MailModule {}