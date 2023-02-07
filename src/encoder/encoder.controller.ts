import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EncoderService } from './encoder.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('encoder')
export class EncoderController {
  constructor(private readonly encoderService: EncoderService) {}

  @Get('/')
  public health() {
    return 'healthy';
  }

  @Post('video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename(_, __, callback) {
          callback(null, `${uuidv4()}.mp4`);
        },
      }),
    }),
  )
  public async uploadVideoFile(@UploadedFile() file) {
    return this.encoderService.convertVideoFile({
      path: file.path,
      fileName: file.filename,
    });
  }
}
