import { Module } from '@nestjs/common';
import { ChildProcessService } from './child_process.service';

@Module({
  providers: [ChildProcessService],
  exports: [ChildProcessService],
})
export class ChildProcesseModule {}
