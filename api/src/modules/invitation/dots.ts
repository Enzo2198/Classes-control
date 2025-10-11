import {InvitationI} from "@/share";
import {ApiIntField, ApiStrField} from "@/share";
import {ApiProperty} from "@nestjs/swagger";

export class InvitationReq implements InvitationI {
  @ApiProperty({example: 1})
  @ApiIntField()
  user_id: number;

  @ApiProperty({example: 1})
  @ApiIntField()
  class_id: number;

  @ApiProperty({
    example: 'code',
    minLength: 6
  })
  @ApiStrField()
  code: string;
}