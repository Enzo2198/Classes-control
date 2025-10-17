import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Inject, Param, Res, ParseIntPipe, UseGuards} from "@nestjs/common";
import {type FileServiceI, FileServiceToken} from "@/share";
import { AuthGuard } from "@/guards";
import type { Response } from 'express';


@ApiTags('Pdf Viewer')
@Controller('pdf-viewer')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class PdfViewerController {
  constructor(
    @Inject(FileServiceToken)
    private readonly fileService: FileServiceI,
  ) {}

  @Get(':fileId')
  async viewPdf(@Param('fileId', ParseIntPipe) fileId: number, @Res() res: Response) {
    const file = await this.fileService.findOne(fileId);

    if (!file || file.file_type !== 'pdf') {
      return res.status(404).send('Pdf not found');
    }

    const htmlContent = this.generatePDFViewerHTML(file.url);
    res.setHeader('Content-Type', 'text/plain');
    res.removeHeader('X-Frame-Options');
    res.send(htmlContent);
  }

  private generatePDFViewerHTML(pdfUrl: string): string  {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>PDF Viewer</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { height: 100vh; overflow: hidden; }
          #pdf-viewer { width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        <iframe id="pdf-viewer"
          src="https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}"
          allowfullscreen></iframe>
      </body>
      </html>
    `;
  }
}