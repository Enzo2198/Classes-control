import {Module} from "@nestjs/common";
import {DatabaseModule} from "@/database/module";
import {DataSource} from "typeorm";
import {
  DATA_SOURCE,
  UserClassEntityRepository, UserClassServiceToken,
} from "@/share";
import {UserClassEntity} from "@/modules/user_class/entities";
import { UserClassService } from "./services";

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    {
      provide: UserClassEntityRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserClassEntity),
      inject: [DATA_SOURCE],
    },
    {
      provide: UserClassServiceToken,
      useClass: UserClassService,
    }
  ],
  exports: [UserClassEntityRepository, UserClassServiceToken]
})
export class UserClassModule {
}