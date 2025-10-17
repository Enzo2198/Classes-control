import {ApiProperty} from "@nestjs/swagger";
import {ApiStrField} from "@/share";

export class ResetPasswordReq {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6'})
  @ApiStrField()
  code: string;

  @ApiProperty({ example: 'NewPassword!'})
  @ApiStrField()
  newPassword: string;
}