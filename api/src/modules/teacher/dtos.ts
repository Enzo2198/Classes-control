import {ApiStrField, ApiStrFieldNullable, TeacherReqI} from "@/share";
import { ApiProperty } from "@nestjs/swagger";

export class TeacherReq implements TeacherReqI {
  @ApiProperty({example: 'name'})
  @ApiStrField()
  name: string;

  @ApiProperty({example: 'teacher@gmail.com', required: false})
  @ApiStrFieldNullable()
  email: string;
}

export class TeacherReqWithAvatar extends TeacherReq {
  @ApiProperty({
    type: 'string',
    format: 'binary', // inform to Swagger that this is a file upload
    required: false, // avatar is not required to update
    description: 'Avatar of user',
  })
  avatar: any;
}