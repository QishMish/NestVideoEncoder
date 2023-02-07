import { ChildProcesseModule } from '../child_process';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueTopics } from './enums';
import { VideoProducerService } from './video/video-producer.service';
import { VideoConsumerService } from './video/video-consumer.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueTopics.VIDEO,
    }),
    ChildProcesseModule,
  ],
  providers: [VideoProducerService, VideoConsumerService],
  exports: [VideoProducerService, VideoConsumerService],
})
export class WorkerModule {}
