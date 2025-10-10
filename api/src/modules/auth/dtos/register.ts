import {ApiProperty} from "@nestjs/swagger";
import {ApiStrField, RegisterReqI, Role} from "@/share";
import {IsEnum, IsNotEmpty} from "class-validator";

export class RegisterReq implements RegisterReqI{
  @ApiProperty({example: 'Full name'})
  @ApiStrField()
  name: string;

  @ApiProperty({example: 'email@gmail.com'})
  @ApiStrField()
  email: string;

  @ApiProperty({
    enum: Role,
    example: Role.STUDENT,
  })
  @IsEnum(Role, {message: 'Role must be one of: teacher, student, admin'})
  @IsNotEmpty()
  role: Role;

  @ApiProperty({example: 'password'})
  @ApiStrField()
  password: string;

  @ApiProperty({example: 'confirmed'})
  @ApiStrField()
  status: string;
}