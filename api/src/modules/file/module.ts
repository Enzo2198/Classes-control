import {Module} from "@nestjs/common";
import {DatabaseModule} from "@/database/module";
import {CloudinaryModule} from "@/modules/cloudinary/module";
import {DATA_SOURCE, FileEntityRepository, FileServiceToken} from "@/share";
import {FileEntity} from "@/modules/file/entities";
import {DataSource} from "typeorm";
import { FileService } from "./services";

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  providers: [
    {
      provide: FileEntityRepository,
      useFactory: (dataSource: DataSource)=>
        dataSource.getRepository(FileEntity),
      inject: [DATA_SOURCE],
    },
    {
      provide: FileServiceToken,
      useClass: FileService,
    }
  ],
  exports: [FileEntityRepository, FileServiceToken],
})
export class FileModule {}