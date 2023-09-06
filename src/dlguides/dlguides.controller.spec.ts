import { Test, TestingModule } from '@nestjs/testing';
import { DlguidesController } from './dlguides.controller';

describe('DlguidesController', () => {
  let controller: DlguidesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DlguidesController],
    }).compile();

    controller = module.get<DlguidesController>(DlguidesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
