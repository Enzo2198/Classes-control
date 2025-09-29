import {Inject, Injectable } from "@nestjs/common";
import {InvitationI, InvitationServiceI, UserClassServiceToken} from "@/share";
import {UserClassService} from "@/modules/user_class/services";

@Injectable()
export class InvitationService implements InvitationServiceI {
  constructor(
    @Inject(UserClassServiceToken)
    private userClassService: UserClassService,
  ) {}

 public invite(invitation: InvitationI) {
   this.userClassService.create(invitation);
 }
}