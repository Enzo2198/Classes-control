import {Module} from "@nestjs/common";
import {TeacherController} from "@/modules/teacher/controllers";
import {TeacherServiceToken} from "@/share";
import {TeacherService} from "@/modules/teacher/services";
import {UserModule} from "@/modules/user/module";
import {FileModule} from "@/modules/file/module";

@Module({
  imports: [UserModule, FileModule],
  controllers: [TeacherController],
  providers: [
    {
      provide: TeacherServiceToken,
      useClass: TeacherService
    }
  ],
})
export class TeacherModule {}