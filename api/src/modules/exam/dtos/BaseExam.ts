import {ApiProperty} from "@nestjs/swagger";
import {ApiIntField, ApiStrField, ApiStrFieldNullable} from "@/share";
import { Type } from "class-transformer";

export class BaseExam {
  @ApiProperty({example: 1})
  @ApiIntField()
  @Type(() => Number)
  exam_group_id: number;

  @ApiProperty({example: 'name'})
  @ApiStrField()
  name: string;

  @ApiProperty({example: '123456'})
  @ApiStrField()
  code: string;

  @ApiProperty({example: 10})
  @ApiIntField()
  @Type(() => Number)
  number_of_question: number;

  @ApiProperty({example: 900})
  @ApiIntField()
  @Type(() => Number)
  total_time: number;

  @ApiProperty({example: 'description'})
  @ApiStrFieldNullable()
  description: string;
}