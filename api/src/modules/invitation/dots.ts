import {InvitationI} from "@/share";
import {ApiIntField, ApiStrField} from "@/share";

export class InvitationReq implements InvitationI {
  @ApiIntField()
  userId: number;

  @ApiIntField()
  classId: number;

  @ApiStrField()
  code: string;
}