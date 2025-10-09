import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import * as share from "@/share";
import {StudentReq} from "@/modules/student/dtos";
import {Role} from "@/share";
import {AuthGuard} from "@/guards";
import {Roles} from "@/guards/rolesDecorator";
import {RolesGuard} from "@/guards/rolesGuard";

@ApiBearerAuth()
@ApiTags('Students')
@Controller('/students')
@Roles(Role.STUDENT, Role.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class StudentController {
  constructor(
    @Inject(share.StudentServiceToken)
    private studentService: share.StudentServiceI
  ) {}

  @Get()
  findAll() {
    return this.studentService.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe)id: number, @Body() data: StudentReq) {
    return this.studentService.updateOne(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe)id: number) {
    return this.studentService.softDelete(id)
  }
}
