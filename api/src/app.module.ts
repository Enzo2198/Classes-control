import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "@/modules/user/module";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
