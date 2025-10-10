import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from "@nestjs/common";
import * as share from "@/share";
import {ClassReq} from "@/modules/class/dtos";
import { Headers } from '@nestjs/common';
import { Transactional } from "typeorm-transactional";
import {AuthGuard} from "@/guards";


@ApiBearerAuth()
@ApiTags('Classes')
@Controller('/classes')
@UseGuards(AuthGuard)
export class ClassController {
  constructor(
    @Inject(share.ClassServiceToken)
    private classService: share.ClassServiceI
  ) {}

  @Get()
  get() {
    return this.classService.find();
  }

  @Transactional()
  @Post()
  create(@Body() data: ClassReq, @Headers() headers: Record < string, string >){
    data.userId = Number(headers.userId);
    return this.classService.create(data);
  }

  @Put('/:id')
  update(@Param('id')id: number, @Body() data: ClassReq) {
    return this.classService.updateOne(Number(id), data);
  }

  @Delete('/:id')
  delete(@Param('id')id: number) {
    return this.classService.softDelete(id)
  }
}
