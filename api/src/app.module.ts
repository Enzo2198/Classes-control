import { Module } from '@nestjs/common';
import {UserModule} from "@/modules/user/module";
import {DatabaseModule} from "@/database/module";
import { ClassModule } from './modules/class/module';
import { TeacherModule } from './modules/teacher/module';
import {StudentModule} from "@/modules/student/module";
import { InvitationModule } from './modules/invitation/module';

@Module({
  imports: [DatabaseModule, UserModule, ClassModule, TeacherModule, StudentModule, InvitationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
