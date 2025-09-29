import {Module} from "@nestjs/common";
import {DatabaseModule} from "@/database/module";
import {ClassController} from "@/modules/class/controllers";
import {DataSource} from "typeorm";
import {ClassEntity} from "@/modules/class/entities";
import {ClassEntityRepository, ClassServiceToken, DATA_SOURCE} from "@/share";
import {ClassService} from "@/modules/class/services";

@Module({
  imports: [DatabaseModule],
  controllers: [ClassController],
  providers: [
    {
      provide: ClassEntityRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ClassEntity),
      inject: [DATA_SOURCE],
    },
    {
      provide: ClassServiceToken,
      useClass: ClassService
    }
  ],
})
export class ClassModule {}