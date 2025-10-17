import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsBoolean, IsDate,} from 'class-validator';
import { Type } from 'class-transformer';
import {ApiIntField, ApiStrField, ExamGroupReqI} from "@/share";

//payload / body
export class ExamGroupReq implements ExamGroupReqI {
  @ApiProperty({ example: 'test name' })
  @ApiStrField()
  name: string;

  @ApiProperty({ example: 1 })
  @ApiIntField()
  class_id: number;

  @ApiProperty({ example: '2021-01-01' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty({ example: 300 })
  @IsNumber()
  await_time: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_once: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_save_local: boolean;

}
