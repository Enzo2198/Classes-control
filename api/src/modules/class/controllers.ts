import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import * as share from "@/share";
import {ClassReq} from "@/modules/class/dtos";
import { Transactional } from "typeorm-transactional";
import {AuthGuard} from "@/guards";
import {Role} from "@/share";
import {Roles} from "@/guards/rolesDecorator";
import { RolesGuard } from "@/guards/rolesGuard";


@ApiBearerAuth()
@ApiTags('Classes')
@Controller('/classes')
@UseGuards(AuthGuard)
export class ClassController {
  constructor(
    @Inject(share.ClassServiceToken)
    private readonly classService: share.ClassServiceI
  ) {}

  @Get()
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  @UseGuards(RolesGuard)
  findAll() {
    return this.classService.find();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  @UseGuards(RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classService.findOne(id);
  }

  @Transactional()
  @Post()
  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(RolesGuard)
  create(@Body() data: ClassReq){
    return this.classService.createAndJoinClass(data);
  }

  @Put('/:id')
  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(RolesGuard)
  update(@Param('id', ParseIntPipe)id: number, @Body() data: ClassReq) {
    return this.classService.updateOne(Number(id), data);
  }

  @Delete('/:id')
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(RolesGuard)
  delete(@Param('id', ParseIntPipe)id: number) {
    return this.classService.softDelete(id)
  }
}
