import {AnswerReqI, AnswerResI} from "@/share/type/answer";
import {ApiProperty} from "@nestjs/swagger";
import {ApiIntField, ApiStrFieldNullable} from "@/share";
import {IsArray, IsBoolean, IsNumber, IsOptional} from "class-validator";

export class CreateAnswer implements AnswerReqI {
  @ApiProperty({ example: 1 })
  @ApiIntField()
  question_exam_id: number;

  @ApiProperty({
    example: 'A,B',
    default: ''
  })
  @ApiStrFieldNullable()
  answer: string;

  @IsNumber()
  @IsOptional()
  exam_result_id?: number;
}

export class UpdateAnswer extends CreateAnswer implements AnswerReqI {
  @ApiProperty({ example: 1 })
  @ApiIntField()
  id: number;

  @ApiProperty({
    example: [true, false],
    nullable: true,
  })
  @IsArray()
  @IsBoolean({each: true})
  is_correct: boolean[] | null;
}