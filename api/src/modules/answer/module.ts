import { Module } from '@nestjs/common';
import {DatabaseModule} from "@/database/module";
import {DataSource} from "typeorm";
import {QuestionModule} from "@/modules/question/module";
import {AnswerEntityRepository, AnswerServiceToken, DATA_SOURCE} from "@/share";
import {AnswerEntity} from "@/modules/answer/entities";
import {AnswerService} from "@/modules/answer/services";

@Module({
  imports: [DatabaseModule, QuestionModule],
  providers: [{
    provide: AnswerEntityRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AnswerEntity),
    inject: [DATA_SOURCE]
  }, {
    provide: AnswerServiceToken,
    useClass: AnswerService
  }],
  exports: [AnswerServiceToken],
})
export class AnswerModule {}