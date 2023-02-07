import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { VideoProducerService } from '../worker';

@Injectable()
export class EncoderService {
  constructor(private readonly videoProducerService: VideoProducerService) {}

  public convertVideoFile(video: { path: string; fileName: string }) {

    const videoFile = join(`${process.cwd()}/${video.path}`);
    const outputDirectory = join(
      `${process.cwd()}`,
      'converted',
      video.fileName,
    );

    return this.videoProducerService.add({
      input: videoFile,
      outDir: outputDirectory,
      script: 'convert_video.sh',
    });
  }
}
