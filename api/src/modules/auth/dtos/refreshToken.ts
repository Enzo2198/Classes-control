import { ApiProperty } from "@nestjs/swagger";
import {ApiStrField} from "@/share";

export class RefreshTokenReq {
  @ApiProperty({example: 'refresh_token'})
  @ApiStrField()
  refreshToken: string;
}