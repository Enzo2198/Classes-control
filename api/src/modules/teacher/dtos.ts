import {ApiStrField, ApiStrFieldNullable, Role, TeacherReqI} from "@/share";
import { ApiProperty } from "@nestjs/swagger";

export class TeacherReq implements TeacherReqI {
  @ApiProperty({example: 'name'})
  @ApiStrField()
  name: string;

  @ApiProperty({example: 'teacher@gmail.com', required: false})
  @ApiStrFieldNullable()
  email: string;
}