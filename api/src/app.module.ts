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
import { ExamModule } from './modules/exam/module';
import { QuestionModule } from './modules/question/module';
import { PdfViewerModule } from './modules/pdf-viewer/module';
import {ExamResultModule} from "@/modules/exam_result/module";
import { ExamGroupModule } from './modules/exam_group/module';

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
    AuthModule,
    UserModule,
    TeacherModule,
    StudentModule,
    ClassModule,
    InvitationModule,
    ExamGroupModule,
    ExamModule,
    QuestionModule,
    PdfViewerModule,
    ExamResultModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
