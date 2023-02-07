import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { VideoProducerService, WorkerModule } from '../worker';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    WorkerModule,
  ],
  controllers: [],
  providers: [],
})
export class EncoderModule {}
