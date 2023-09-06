import { Module } from '@nestjs/common';
import { FormationController } from './formation.controller';
import { FormationService } from './formation.service';

@Module({
    providers: [FormationService],
    controllers: [FormationController]
})
export class FormationModule {}
