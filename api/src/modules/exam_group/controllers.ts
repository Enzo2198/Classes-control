import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards} from "@nestjs/common";
import {ExamGroupReq} from "@/modules/exam_group/dtos";
import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import { AuthGuard } from "@/guards";
import {type ExamGroupServiceI, ExamGroupServiceToken, OptionalParseIntPipe, Role} from "@/share";
import {Roles} from "@/guards/rolesDecorator";
import {RolesGuard} from "@/guards/rolesGuard";

@ApiTags('Exam Groups')
@Controller('exam_groups')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ExamGroupController {
  constructor(
    @Inject(ExamGroupServiceToken)
    private readonly examGroupService: ExamGroupServiceI
  ) {}

  @Get()
  @ApiQuery({
    name: 'class_id',
    required: false,
    type: Number,
  })
  findAll(@Query('class_id', OptionalParseIntPipe) classId?: number){
    if(classId){
      return this.examGroupService.find({class_id: classId})
    }
    return this.examGroupService.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.examGroupService.findOne(id);
  }

  @Post()
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() data: ExamGroupReq){
    return this.examGroupService.create(data);
  }

  @Put(':id')
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(RolesGuard)
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() data: ExamGroupReq){
    return this.examGroupService.updateOne(id, data);
  }

  @Delete(':id')
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(RolesGuard)
  softDelete(@Param('id', ParseIntPipe) id: number){
    return this.examGroupService.softDelete(id);
  }
}