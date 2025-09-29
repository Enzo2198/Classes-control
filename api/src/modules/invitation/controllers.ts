import {Body, Controller, Inject, Post} from "@nestjs/common";
import {InvitationReq} from "@/modules/invitation/dots";
import {InvitationService} from "@/modules/invitation/services";
import * as share from "@/share";
import {InvitationServiceToken} from "@/share";

@Controller('invitation')
export class InvitationController {
  constructor(
    @Inject(InvitationServiceToken)
    private invitationService: share.InvitationServiceI
  ) {}

  @Post()
  invite(@Body() invitation: InvitationReq) {
    return this.invitationService.invite(invitation);
  }
}