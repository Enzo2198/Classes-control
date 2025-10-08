import {ApiStrField, ClassReqI} from "@/share";
import {ApiProperty} from "@nestjs/swagger";

export class ClassReq implements ClassReqI{
  @ApiProperty({example: 'name'})
  @ApiStrField()
  name: string;

  @ApiProperty({example: 'code'})
  @ApiStrField()
  code: string;

  userId: number;
}