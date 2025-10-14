import { DatabaseModule } from "@/database/module";
import { UserModule } from "../user/module";
import {Module} from "@nestjs/common";
import {ExamController} from "@/modules/exam/controllers";
import {DATA_SOURCE, ExamEntityRepository, ExamServiceToken, QuestionExamServiceToken} from "@/share";
import {DataSource} from "typeorm";
import {ExamEntity} from "@/modules/exam/entities";
import {ExamService} from "@/modules/exam/services";
import {QuestionExamModule} from "@/modules/question_exam/module";
import {QuestionExamService} from "@/modules/question_exam/services";
import { QuestionModule } from "../question/module";
import {FileModule} from "@/modules/file/module";

@Module({
  imports: [DatabaseModule, UserModule, QuestionExamModule, QuestionModule, FileModule],
  controllers: [ExamController],
  providers: [
    {
      provide: ExamEntityRepository,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(ExamEntity),
      inject: [DATA_SOURCE]
    },
    {
      provide: ExamServiceToken,
      useClass: ExamService
    },
    {
      provide: QuestionExamServiceToken,
      useClass: QuestionExamService
    },
  ],
  exports: [ExamServiceToken]
})

export class ExamModule {}