import {Module} from '@nestjs/common';
import {UserModule} from "@/modules/user/module";
import {DatabaseModule} from "@/database/module";
import {ClassModule} from './modules/class/module';
import {TeacherModule} from './modules/teacher/module';
import {StudentModule} from "@/modules/student/module";
import {InvitationModule} from './modules/invitation/module';
import {AuthModule} from "@/modules/auth/module";
import {ClsModule} from "nestjs-cls";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    DatabaseModule,
    UserModule,
    AuthModule,
    TeacherModule,
    StudentModule,
    ClassModule,
    InvitationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
