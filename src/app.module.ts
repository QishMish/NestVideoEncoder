import { EncoderController } from './encoder/encoder.controller';
import { EncoderService } from './encoder/encoder.service';
import { EncoderModule } from './encoder/encoder.module';
import { Module } from '@nestjs/common';
import { WorkerModule } from './worker';

@Module({
  imports: [EncoderModule, WorkerModule],
  controllers: [EncoderController],
  providers: [EncoderService],
})
export class AppModule {}
