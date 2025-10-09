import {ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import * as share from "@/share";
import {TeacherReq} from "@/modules/teacher/dtos";
import {Role} from "@/share";
import {Roles} from "@/guards/rolesDecorator";
import {AuthGuard} from "@/guards";
import { RolesGuard } from "@/guards/rolesGuard";

@ApiBearerAuth()
@ApiTags('Teachers')
@Controller('/teachers')
@Roles(Role.TEACHER, Role.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class TeacherController {
  constructor(
    @Inject(share.TeacherServiceToken)
    private teacherService: share.TeacherServiceI
  ) {}

  @Get()
  FindAll() {
    return this.teacherService.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe)id: number, @Body() data: TeacherReq) {
    return this.teacherService.updateOne(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe)id: number) {
    return this.teacherService.softDelete(id)
  }
}
