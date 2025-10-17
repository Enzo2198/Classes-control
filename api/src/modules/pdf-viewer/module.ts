import {Module} from "@nestjs/common";
import {PdfViewerController} from "@/modules/pdf-viewer/controllers";
import {FileModule} from "@/modules/file/module";
import { UserModule } from "../user/module";
import { AuthModule } from "../auth/module";

@Module({
  imports: [FileModule, UserModule, AuthModule],
  controllers: [PdfViewerController]
})
export class PdfViewerModule {}
