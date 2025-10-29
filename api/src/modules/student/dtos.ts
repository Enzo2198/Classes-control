import {ApiStrField, StudentReqI} from "@/share";
import { ApiProperty } from "@nestjs/swagger";

export class StudentReq implements StudentReqI {
  @ApiProperty({example: 'name',})
  @ApiStrField()
  name: string;

  @ApiProperty({example: 'test@gmail.com',})
  @ApiStrField()
  email: string;
}

export class StudentReqWithAvatar extends StudentReq {
  @ApiProperty({
    type: 'string',
    format: 'binary', // inform to Swagger that this is a file upload
    required: false, // avatar is not required to update
    description: 'Avatar of user',
  })
  avatar: any;
}
