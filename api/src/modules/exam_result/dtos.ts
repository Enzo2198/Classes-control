import {ApiProperty} from "@nestjs/swagger";
import {ApiIntField, ApiStrField} from "@/share";
import {ExamResultReqI, ExamResultResI} from "@/share/type/exam_result";
import {CreateAnswer, UpdateAnswer} from "@/modules/answer/dtos";
import {ValidateNested} from "class-validator";

class ExamResultBase {
  @ApiProperty({ example: 1 })
  @ApiIntField()
  exam_id: number;

  @ApiProperty({ example: 1 })
  @ApiIntField()
  user_id: number;

  @ApiProperty({ example: 'completed' })
  @ApiStrField()
  status: string;

  @ApiProperty({ example: 'desktop' })
  @ApiStrField()
  device: string;
}

export class CreateExamResult extends ExamResultBase implements ExamResultReqI{
  @ApiProperty({ type: [CreateAnswer] })
  @ValidateNested({ each: true })
  questions: CreateAnswer[];
}

export class UpdateExamResult extends ExamResultBase implements ExamResultReqI {
  @ApiProperty({ type: [UpdateAnswer] })
  @ValidateNested({ each: true })
  questions: UpdateAnswer[];
}