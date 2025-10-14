import {QuestionReqI, QuestionType} from "@/share/type/question";
import {ApiProperty} from "@nestjs/swagger";
import {ApiIntField, ApiStrFieldNullable} from "@/share";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateQuestion implements QuestionReqI {
  @ApiProperty({example: 0})
  @ApiIntField()
  index: number;

  @ApiProperty({
    example: 'Multiple-choice',
    enum: QuestionType
  })
  @IsEnum(QuestionType, {message: 'type must be: single-choice, multiple-choice, long-response'})
  @IsNotEmpty()
  type: QuestionType;

  @ApiProperty({example: 'A,B'})
  @ApiStrFieldNullable()
  correct_answer: string;

  @ApiProperty({example: ''})
  @IsString()
  @IsOptional()
  question?: string;
}

export class UpdateQuestion extends CreateQuestion {
  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  id?: number;
}