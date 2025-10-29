import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param, ParseFilePipe,
  ParseIntPipe,
  Put, UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {TeacherReq, TeacherReqWithAvatar} from "@/modules/teacher/dtos";
import {FileServiceToken, MultiFileType, Role, TeacherServiceToken} from "@/share";
import type {FileServiceI, TeacherServiceI} from "@/share";
import {Roles} from "@/guards/rolesDecorator";
import {AuthGuard} from "@/guards";
import {RolesGuard} from "@/guards/rolesGuard";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiBearerAuth()
@ApiTags('Teachers')
@Controller('/teachers')
@Roles(Role.TEACHER, Role.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class TeacherController {
  constructor(
    @Inject(TeacherServiceToken)
    private teacherService: TeacherServiceI,
    @Inject(FileServiceToken)
    private readonly fileService: FileServiceI,
  ) {
  }

  @Get()
  FindAll() {
    return this.teacherService.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update information and avatar',
    type: TeacherReqWithAvatar
  })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TeacherReq,
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
      // upload and create the file record
      const avatarFile = await this.fileService.uploadAndCreateFile(file);
      avatarId = avatarFile.id;
    }

    const updateData = {...data};
    if (avatarId) {
      updateData['avatar'] = avatarId;
    }

    return this.teacherService.updateOne(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.softDelete(id)
  }
}
