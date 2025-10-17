import {ExamReqI} from "@/share";
import {BaseExam} from "./BaseExam";
import {ApiProperty} from "@nestjs/swagger";
import {UpdateQuestion} from "@/modules/question/dtos";
import {ValidateNested} from "class-validator";
import {plainToInstance, Transform} from "class-transformer";

export class UpdateExam extends BaseExam implements ExamReqI {
  @ApiProperty({type: [UpdateQuestion]})
  @ValidateNested({each: true})
  @Transform(({value}) => {
    let parsedValue: any[];
    if (typeof value === "string") {
      try {
        parsedValue = JSON.parse(value);
      } catch {
        return 'Invalid json';
      }
    } else {
      parsedValue = value;
    }
    if (!Array.isArray(parsedValue)) return parsedValue;

    return parsedValue.map(obj => plainToInstance(UpdateQuestion, obj));
  })
  questions: UpdateQuestion[];
}

export class UpdateExamWithFile extends UpdateExam {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  examFile: any;
}