import {AuthGuard} from "@/guards";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject, MaxFileSizeValidator,
  Param, ParseFilePipe,
  ParseIntPipe,
  Post, Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags} from "@nestjs/swagger";
import type {ExamServiceI, FileServiceI} from "@/share";
import {ExamServiceToken, FileServiceToken, MultiFileType, OptionalParseIntPipe, Role} from "@/share";
import {ExamInterceptor} from "@/modules/exam/interceptor";
import {CreateExam, CreateExamWithFile, UpdateExam, UpdateExamWithFile} from "@/modules/exam/dtos";
import {Roles} from "@/guards/rolesDecorator";
import {Transactional} from "typeorm-transactional";
import {FileInterceptor} from "@nestjs/platform-express";
import {RolesGuard} from "@/guards/rolesGuard";

@ApiTags('Exams')
@Controller('exams')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class ExamController {
  constructor(
    @Inject(ExamServiceToken)
    private readonly examService: ExamServiceI,
    @Inject(FileServiceToken)
    private readonly fileService: FileServiceI
  ) {
  }

  @Get()
  @UseInterceptors(ExamInterceptor)
  @ApiQuery({
    name: 'exam_group_id',
    required: false,
    type: Number
  })
  findAll(@Query('exam_group_id', OptionalParseIntPipe) examGroupId?: number) {
    if (examGroupId && examGroupId > 0) {
      return this.examService.find({exam_group_id: examGroupId});
    }
    return this.examService.find()
  }

  @Get(':id')
  @UseInterceptors(ExamInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examService.findOne(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create exam with file and questions',
    type: CreateExamWithFile
  })
  @Roles(Role.TEACHER, Role.ADMIN)
  @Transactional()
  @UseInterceptors(FileInterceptor('examFile'))
  async create(
    @Body() data: CreateExam,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: 10 * 1024 * 1024}),
          new MultiFileType({
            fileTypes: ['image/png', 'image/jpeg', 'image/gif', 'application/pdf'],
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File
  ) {
    const examFile = await this.fileService.uploadAndCreateFile(file);
    const createData = {...data};
    if(examFile.id){
      createData['file_id'] = examFile.id ;
    }

    return this.examService.create(createData);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: UpdateExamWithFile})
  @Roles(Role.TEACHER, Role.ADMIN)
  @Transactional()
  @UseInterceptors(FileInterceptor('examFile'))
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateExam,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({maxSize: 10 * 1024 * 1024}),
        new MultiFileType({
          fileTypes: ['image/png', 'image/jpeg', 'image/gif', 'application/pdf'],
        }),
      ],
      fileIsRequired: false,
    }))
    file?: Express.Multer.File,
  ){
    let fileId: number| undefined = undefined;
    if (file) {
      // upload and create a file record
      const examFile = await this.fileService.uploadAndCreateFile(file);
      fileId = examFile.id;
    }

    const { questions, ...updateData } = data;
    if(fileId){
      updateData['file_id'] = fileId;
    }
    return this.examService.updateOne(id, updateData);
  }

  @Delete(':id')
  @Roles(Role.TEACHER, Role.ADMIN)
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.examService.softDelete(id);
  }
}