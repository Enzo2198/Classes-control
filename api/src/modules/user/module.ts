import {Module} from "@nestjs/common";
import {DatabaseModule} from "@/database/module";
import {DataSource} from "typeorm";
import {UserEntity} from "@/modules/user/entities";
import {DATA_SOURCE, UserEntityRepository, UserServiceToken} from "@/share";
import {UserService} from "@/modules/user/services";
import { UserController } from "./controllers";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserEntityRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(UserEntity),
      inject: [DATA_SOURCE],
    },
    {
      provide: UserServiceToken,
      useClass: UserService
    }
  ],
  exports: [UserEntityRepository, UserServiceToken]
})
export class UserModule {
}