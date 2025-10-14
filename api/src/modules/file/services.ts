import {Inject, Injectable} from "@nestjs/common";
import {BaseService} from "@/modules/base/services";
import {FileEntity} from "@/modules/file/entities";
import {FileReqI, FileResI} from "@/share/type/file";
import {FileEntityRepository, FileServiceI} from "@/share";
import { ClsService } from "nestjs-cls";
import {CloudinaryService} from "@/modules/cloudinary/services";
import {Repository} from "typeorm";
import {UploadApiResponse} from "cloudinary";

@Injectable()
export class FileService extends BaseService<FileEntity, FileReqI, FileResI>
  implements FileServiceI {
  constructor(
    protected readonly cls: ClsService,
    private readonly cloudinaryService: CloudinaryService,

    @Inject(FileEntityRepository)
    protected readonly repository: Repository<FileEntity>
  ) {
    super(repository, cls);
  }

  private getFileTypeFromMimeType(mimeType: string): string {
    const mimeToExtension: { [key: string]: string } = {
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'text/plain': 'txt'
    };

    return mimeToExtension[mimeType] || 'unknown';
  }


  async uploadAndCreateFile(file: Express.Multer.File): Promise<FileResI> {
    try{
      // upload the file to cloudinary
      const cloudinaryResponse: UploadApiResponse =
        await this.cloudinaryService.uploadFile(file);

      let fileType: string;
      if (cloudinaryResponse.format) {
        // If Cloudinary returns the format (usually for image/video)
        fileType = cloudinaryResponse.format;
      } else {
        // With raw files, need to get from mimeType
        fileType = this.getFileTypeFromMimeType(file.mimetype);
      }

      // from the result Cloudinary returns, create DTO to save into DB
      const createFileDto: FileReqI = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
        original_name: file.originalname,
        file_type: fileType,
        size: cloudinaryResponse.bytes,
      };

      // save into db (lack viewable_url)
      const savedFile: FileResI = await this.create(createFileDto);

      // Generate viewable URL after the id is generated
      const viewableUrl: string = this.generateViewableUrl(
        savedFile.id,
        savedFile.file_type,
        savedFile.url
      );

      // Update file with viewableUrl
      return await this.updateOne(savedFile.id, {viewable_url: viewableUrl});

    } catch (error) {
      console.error('Error in uploadAndCreateFile:', error);
      throw new Error(`Failed to upload and create file: ${error.message}`);
    }
  }

  // create url for viewing a file directly in the browser
  private generateViewableUrl(fileId: number, fileType: string, originalUrl: string): string {
    if (fileType === 'pdf') {
      // return to endpoint of PDF viewer
      return `${process.env.API_BASE_URL || 'http://localhost:3000'}/pdf-viewer/${fileId}`;
    }
    // image/video can be viewed directly by the original url
    return originalUrl;
  }
}