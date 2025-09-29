import { ApiTags } from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from "@nestjs/common";
import * as share from "@/share";
import {ClassReq} from "@/modules/class/dtos";

@ApiTags('Classes')
@Controller('/classes')
export class ClassController {
  constructor(
    @Inject(share.ClassServiceToken)
    private classService: share.ClassServiceI
  ) {}

  @Get()
  get() {
    return this.classService.find();
  }

  @Post()
  create(@Body() data: ClassReq) {
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
