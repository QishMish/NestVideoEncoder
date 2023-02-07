import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { QueueTopics } from '../enums';
import { ChildProcessService } from '../../child_process';
import { VideoJob } from '../interfaces';
import { Logger } from '@nestjs/common';

@Processor(QueueTopics.VIDEO)
export class VideoConsumerService {
  private readonly logger = new Logger(VideoConsumerService.name);
  constructor(private readonly childProcessService: ChildProcessService) {}

  @Process({
    concurrency: 2,
  })
  private transcode(job: Job<VideoJob>) {
    this.logger.log('Processing job:', job.data, 'jobId:', job.id);
    return this.childProcessService
      .spawn({
        input: job.data.input,
        outDir: job.data.outDir,
        script: job.data.script,
      })
      .then(async () => {
        await job.progress(100);
      });
  }
}
