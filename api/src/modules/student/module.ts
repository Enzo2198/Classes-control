import {Module} from "@nestjs/common";
import {StudentController} from "@/modules/student/controllers";
import {StudentServiceToken} from "@/share";
import {StudentService} from "@/modules/student/services";
import {UserModule} from "@/modules/user/module";

@Module({
  imports: [UserModule],
  controllers: [StudentController],
  providers: [
    {
      provide: StudentServiceToken,
      useClass: StudentService
    }
  ],
})
export class StudentModule {}