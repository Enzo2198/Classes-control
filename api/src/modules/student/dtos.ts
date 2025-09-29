import {ApiStrField, ApiStrFieldNullable, StudentReqI} from "@/share";
import { ApiProperty } from "@nestjs/swagger";

export class StudentReq implements StudentReqI {
  @ApiProperty({example: 'name'})
  @ApiStrField()
  name: string;

  @ApiProperty({example: 'email@gmail.com', required: false})
  @ApiStrFieldNullable()
  email?: string;

  @ApiProperty({example: 'password'})
  @ApiStrField()
  password: string;
}