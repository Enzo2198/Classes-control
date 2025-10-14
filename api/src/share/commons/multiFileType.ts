import {FileValidator, Injectable} from "@nestjs/common";

@Injectable()
export class MultiFileType extends FileValidator<{ fileTypes: string[] }> {
  constructor(options: { fileTypes: string[] }) {
    super(options);
  }

  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (!file) return true;
    return this.validationOptions.fileTypes.includes(file.mimetype);
  }

  buildErrorMessage(): string {
    return `File types must be ${this.validationOptions.fileTypes.join(', ')}`;
  }
}