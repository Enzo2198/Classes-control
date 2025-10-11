import {ApiStrField, ClassReqI} from "@/share";
import {ApiProperty} from "@nestjs/swagger";
import {MinLength} from "class-validator";

export class ClassReq implements ClassReqI{
  @ApiProperty({example: 'name'})
  @ApiStrField()
  name: string;

  @ApiProperty({example: '123456'})
  @ApiStrField()
  @MinLength(6)
  code: string;
}