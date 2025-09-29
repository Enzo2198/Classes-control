import { ApiTags } from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from "@nestjs/common";
import * as share from "@/share";
import {TeacherReq} from "@/modules/teacher/dtos";

@ApiTags('Teachers')
@Controller('/teachers')
export class TeacherController {
  constructor(
    @Inject(share.TeacherServiceToken)
    private teacherService: share.TeacherServiceI
  ) {}

  @Get()
  get() {
    return this.teacherService.find({name: 'name 2'});
  }

  @Post()
  create(@Body() data: TeacherReq) {
    return this.teacherService.create(data);
  }

  @Put('/:id')
  update(@Param('id')id: number, @Body() data: TeacherReq) {
    return this.teacherService.updateOne(Number(id), data);
  }

  @Delete('/:id')
  delete(@Param('id')id: number) {
    return this.teacherService.softDelete(id)
  }
}
