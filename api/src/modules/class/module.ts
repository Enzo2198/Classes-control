import {Module} from "@nestjs/common";
import {DatabaseModule} from "@/database/module";
import {ClassController} from "@/modules/class/controllers";
import {DataSource} from "typeorm";
import {ClassEntity} from "@/modules/class/entities";
import {ClassEntityRepository, ClassServiceToken, DATA_SOURCE, UserClassServiceToken} from "@/share";
import {ClassService} from "@/modules/class/services";
import {UserClassModule} from "@/modules/user_class/module";
import {UserClassService} from "@/modules/user_class/services";

@Module({
  imports: [DatabaseModule, UserClassModule],
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
    },
    {
      provide: UserClassServiceToken,
      useClass: UserClassService
    }
  ],
})
export class ClassModule {}