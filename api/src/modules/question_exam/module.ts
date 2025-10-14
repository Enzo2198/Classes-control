import {Module} from "@nestjs/common";
import {DatabaseModule} from "@/database/module";
import {DataSource} from "typeorm";
import {DATA_SOURCE, QuestionExamEntityRepository, QuestionExamServiceToken} from "@/share";
import {QuestionExamEntity} from "@/modules/question_exam/entities";
import {QuestionExamService} from "@/modules/question_exam/services";

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: QuestionExamEntityRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(QuestionExamEntity),
      inject: [DATA_SOURCE],
    },
    {
      provide: QuestionExamServiceToken,
      useClass: QuestionExamService,
    }
  ],
  exports: [QuestionExamEntityRepository, QuestionExamServiceToken]
})
export class QuestionExamModule {
}