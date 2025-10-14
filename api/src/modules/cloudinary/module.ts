import {Module} from "@nestjs/common";
import {Cloudinary} from "@/modules/cloudinary/provider";
import {CloudinaryService} from "@/modules/cloudinary/services";

@Module({
  providers: [Cloudinary, CloudinaryService],
  exports: [Cloudinary, CloudinaryService],
})
export class CloudinaryModule {}
