import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { QueueTopics } from '../enums';
import { VideoJob, JobProducerInterface } from '../interfaces';

@Injectable()
export class VideoProducerService implements JobProducerInterface<unknown> {
  private readonly logger = new Logger(VideoProducerService.name);

  constructor(@InjectQueue(QueueTopics.VIDEO) private videoQueue: Queue) {}

  public add(videoJob: VideoJob): Promise<Job<unknown>> {
    this.logger.log('Adding video job:', videoJob);
    return this.videoQueue.add(videoJob, {
      attempts: 3,
      removeOnFail: true,
    });
  }
}
