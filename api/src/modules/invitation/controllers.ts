import {Body, Controller, Inject, Post, UseGuards} from "@nestjs/common";
import {InvitationReq} from "@/modules/invitation/dots";
import * as share from "@/share";
import {InvitationServiceToken} from "@/share";
import {ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {AuthGuard} from "@/guards";

@ApiTags('Invitation')
@Controller('invitation')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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