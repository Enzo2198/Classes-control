import {ApiProperty} from "@nestjs/swagger";
import {ApiStrField, LoginReqI, RegisterReqI, Role} from "@/share";
import {IsEnum, IsNotEmpty} from "class-validator";

export class LoginReq implements LoginReqI {
  @ApiProperty({example: 'email@gmail.com'})
  @ApiStrField()
  email: string;

  @ApiProperty({example: 'password'})
  @ApiStrField()
  password: string;
}