import {ApiProperty} from "@nestjs/swagger";
import {ApiStrField} from "@/share";

export class LoginReq {
  @ApiProperty({example: 'email@gmail.com'})
  @ApiStrField()
  email: string;

  @ApiProperty({example: 'password'})
  @ApiStrField()
  password: string;
}