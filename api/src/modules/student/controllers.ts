import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from "@nestjs/common";
import * as share from "@/share";
import {StudentReq} from "@/modules/student/dtos";

@ApiBearerAuth()
@ApiTags('Students')
@Controller('/students')
export class StudentController {
  constructor(
    @Inject(share.StudentServiceToken)
    private studentService: share.StudentServiceI
  ) {}

  @Get()
  get() {
    return this.studentService.find();
  }

  @Post()
  create(@Body() data: StudentReq) {
    return this.studentService.create(data);
  }

  @Put('/:id')
  update(@Param('id')id: number, @Body() data: StudentReq) {
    return this.studentService.updateOne(Number(id), data);
  }

  @Delete('/:id')
  delete(@Param('id')id: number) {
    return this.studentService.softDelete(id)
  }
}
