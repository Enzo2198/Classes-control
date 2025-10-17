import {ApiBearerAuth, ApiQuery, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@/guards";
import {type ExamResultServiceI, ExamResultServiceToken, Role} from "@/share";
import {CreateExamResult, UpdateExamResult} from "./dtos";
import {Roles} from "@/guards/rolesDecorator";
import {RolesGuard} from "@/guards/rolesGuard";


@ApiTags('Exam Results')
@Controller('exam_results')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ExamResultController {
  constructor(
    @Inject(ExamResultServiceToken)
    private readonly examResultService: ExamResultServiceI
  ) {
  }

  @Get()
  @Roles(Role.ADMIN, Role.TEACHER)
  @UseGuards(RolesGuard)
  @ApiQuery({name: 'student_id', required: true, type: Number, description: 'student ID'})
  @ApiQuery({name: 'exam_group_id', required: true, type: Number, description: 'exam group ID'})
  findAll(
    @Query('student_id', ParseIntPipe) userId: number,
    @Query('exam_group_id', ParseIntPipe) examGroupId: number
  ) {
    return this.examResultService.findAndFilter(userId, examGroupId);
  }

  @Post()
  @Roles(Role.STUDENT)
  @UseGuards(RolesGuard)
  create(@Body() data: CreateExamResult) {
    return this.examResultService.create(data);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examResultService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseGuards(RolesGuard)
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateExamResult) {
    return this.examResultService.updateOne(id, data);
  }
}