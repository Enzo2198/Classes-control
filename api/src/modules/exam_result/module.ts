import {Module} from "@nestjs/common";
import {DataSource} from "typeorm";
import {DatabaseModule} from "@/database/module";
import {UserModule} from "@/modules/user/module";
import {ExamResultController} from "@/modules/exam_result/controllers";
import {ExamResultEntity} from "@/modules/exam_result/entities";
import {DATA_SOURCE, ExamResultEntityRepository, ExamResultServiceToken} from "@/share";
import {ExamResultService} from "@/modules/exam_result/services";
import {AnswerModule} from "@/modules/answer/module";

@Module({
  imports: [DatabaseModule, UserModule, AnswerModule],
  controllers: [ExamResultController],
  providers: [{
    provide: ExamResultEntityRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExamResultEntity),
    inject: [DATA_SOURCE]
  }, {
    provide: ExamResultServiceToken,
    useClass: ExamResultService
  }],
})
export class ExamResultModule {}