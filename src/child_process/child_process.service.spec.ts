import { Test, TestingModule } from '@nestjs/testing';
import { ChildProcesseService } from './child_process.service';

describe('ChildProcesseService', () => {
  let service: ChildProcesseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildProcesseService],
    }).compile();

    service = module.get<ChildProcesseService>(ChildProcesseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
