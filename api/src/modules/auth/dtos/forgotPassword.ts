import {ApiProperty} from "@nestjs/swagger";
import {ApiStrField} from "@/share";

export class ForgotPasswordReq {
  @ApiProperty({example: "email"})
  @ApiStrField()
  email: string;
}