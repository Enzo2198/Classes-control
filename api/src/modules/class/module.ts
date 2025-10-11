import {Module} from "@nestjs/common";
import {DatabaseModule} from "@/database/module";
import {ClassController} from "@/modules/class/controllers";
import {DataSource} from "typeorm";
import {ClassEntity} from "@/modules/class/entities";
import {ClassEntityRepository, ClassServiceToken, DATA_SOURCE, UserClassServiceToken} from "@/share";
import {ClassService} from "@/modules/class/services";
import {UserClassModule} from "@/modules/user_class/module";
import {UserClassService} from "@/modules/user_class/services";
import {UserModule} from "@/modules/user/module";

@Module({
  imports: [DatabaseModule, UserClassModule, UserModule],
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
  exports: [ClassServiceToken],
})
export class ClassModule {}