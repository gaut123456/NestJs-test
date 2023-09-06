import { Controller, Get, Param, Post, Body, Req } from '@nestjs/common';
import { FormationService } from './formation.service';
import { format } from 'path';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('formation')
export class FormationController {
    constructor(private FormationService: FormationService) { }

    @Get('retrieve')
    async allFormations(): Promise<any> {
        const formation = this.FormationService.getAllFormation()
        return formation
    }

    @Get(':id')
    async formation(@Param('id') id: string): Promise<any> {
        const formation = this.FormationService.getFormationById(id)
        return formation
        
    }
    
    @Post('add')
    @UseGuards(AuthGuard)
    async add(@Body() Body: any, @Req() request): Promise<any> {
        const user = request.user;
        return this.FormationService.add(Body, user);
    }
}

