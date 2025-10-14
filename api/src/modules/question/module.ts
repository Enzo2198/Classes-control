import { Module } from '@nestjs/common';
import {DATA_SOURCE, QuestionEntityRepository, QuestionServiceToken} from "@/share";
import {DatabaseModule} from "@/database/module";
import {DataSource} from "typeorm";
import {QuestionEntity} from "./entities";
import {QuestionService} from "@/modules/question/services";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: QuestionEntityRepository,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(QuestionEntity),
      inject: [DATA_SOURCE]
    },
    {
      provide: QuestionServiceToken,
      useClass: QuestionService,
    }],
  exports: [QuestionServiceToken]
})
export class QuestionModule {
}