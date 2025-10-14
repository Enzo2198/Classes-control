import {FileReqI} from "@/share/type/file";
import { ApiProperty } from "@nestjs/swagger";
import {ApiIntField, ApiStrField} from "@/share";

export class FileReq implements FileReqI {
  @ApiProperty({example: "file_123"})
  @ApiStrField()
  public_id: string;

  @ApiProperty({example: "https://res.cloudinary.com/..."})
  @ApiStrField()
  url: string;

  @ApiProperty({example: "file.jpg"})
  @ApiStrField()
  original_name: string;

  @ApiProperty({example: "image/jpeg"})
  @ApiStrField()
  file_type: string;

  @ApiProperty({example: 2113123})
  @ApiIntField()
  size: number;

}