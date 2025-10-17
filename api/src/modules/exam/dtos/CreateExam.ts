import {ExamReqI} from "@/share";
import {CreateQuestion} from "@/modules/question/dtos";
import {ApiProperty} from "@nestjs/swagger";
import {ValidateNested} from "class-validator";
import {plainToInstance, Transform} from "class-transformer";
import {BaseExam} from "./BaseExam";
import {BadRequestException} from "@nestjs/common";

export class CreateExam extends BaseExam implements ExamReqI {
  @ApiProperty({type: [CreateQuestion]})
  @ValidateNested({each: true})
  @Transform(({value}) => {
    let parsedValue: any[]
    if (typeof value === "string") {
      try {
        parsedValue = JSON.parse(value);
      } catch {
        throw new BadRequestException('Invalid JSON for questions field');
      }
    } else {
      parsedValue = value;
    }

    if (!Array.isArray(parsedValue)) return parsedValue;

    return parsedValue.map(obj => plainToInstance(CreateQuestion, obj));
  })
  questions: CreateQuestion[];
}

export class CreateExamWithFile extends CreateExam {
  @ApiProperty({
    type: 'string',
    format: 'binary', // Inform to Swagger that this is a file upload
    required: true,
  })
  examFile: any
}