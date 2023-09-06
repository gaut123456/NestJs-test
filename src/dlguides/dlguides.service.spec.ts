import { Test, TestingModule } from '@nestjs/testing';
import { DlguidesService } from './dlguides.service';

describe('DlguidesService', () => {
  let service: DlguidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DlguidesService],
    }).compile();

    service = module.get<DlguidesService>(DlguidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
