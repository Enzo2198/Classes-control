import {ApiStrField, ChangePasswordReqI} from "@/share";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordReq implements ChangePasswordReqI {
  @ApiStrField()
  @ApiProperty({ example: 'old_password' })
  old_password: string;

  @ApiStrField()
  @ApiProperty({ example: 'new_password' })
  new_password: string;
}