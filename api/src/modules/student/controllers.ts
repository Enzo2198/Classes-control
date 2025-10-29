import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject, MaxFileSizeValidator,
  Param, ParseFilePipe,
  ParseIntPipe,
  Put, UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {StudentReq, StudentReqWithAvatar} from "@/modules/student/dtos";
import type {FileServiceI, StudentServiceI} from "@/share";
import {FileServiceToken, StudentServiceToken, MultiFileType, Role} from "@/share";
import {AuthGuard} from "@/guards";
import {Roles} from "@/guards/rolesDecorator";
import {RolesGuard} from "@/guards/rolesGuard";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiBearerAuth()
@ApiTags('Students')
@Controller('/students')
@Roles(Role.STUDENT, Role.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class StudentController {
  constructor(
    @Inject(StudentServiceToken)
    private studentService: StudentServiceI,
    @Inject(FileServiceToken)
    private readonly fileService: FileServiceI
    ,
  ) {
  }

  @Get()
  findAll() {
    return this.studentService.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)
          id: number
  ) {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update information and avatar',
    type: StudentReqWithAvatar
  })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: StudentReq,
    @UploadedFile(
      // use Pipe to validate the file
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: 1024 * 1024 * 10}), // 10MB
          new MultiFileType({
            fileTypes: ['image/png', 'image/jpeg', 'image/gif'],
          }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    let avatarId: number | undefined = undefined;
    if (file) {
      // upload and create a file record
      const avatarFile = await this.fileService.uploadAndCreateFile(file);
      avatarId = avatarFile.id;
    }

    const updateData = {...data};
    if (avatarId) {
      updateData['avatar'] = avatarId;
    }
    return this.studentService.updateOne(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe)
         id: number
  ) {
    return this.studentService.softDelete(id)
  }
}
