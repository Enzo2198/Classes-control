import {ApiProperty} from "@nestjs/swagger";
import {ApiStrField, RegisterReqI, Role} from "@/share";
import {IsEnum, IsNotEmpty} from "class-validator";

export class LoginReq {
  @ApiProperty({example: 'email@gmail.com'})
  @ApiStrField()
  email: string;

  @ApiProperty({example: 'password'})
  @ApiStrField()
  password: string;
}