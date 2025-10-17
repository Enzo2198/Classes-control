import {ApiProperty} from "@nestjs/swagger";
import {ApiStrField} from "@/share";

export class ForgotPasswordReq {
  @ApiProperty({example: "email@gmail.com"})
  @ApiStrField()
  email: string;
}