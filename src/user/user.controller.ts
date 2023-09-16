import { Controller, Get, Param } from '@nestjs/common';
import { Guide } from './user.type';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) { }

    @Get('guide/:id')
    async guide(@Param('id') id: string): Promise<Guide> {
        const guide = this.UserService.getGuideById(id)
        return guide
    }

    @Get('guides')
    async guides(): Promise<Guide[]> {
        const guide = this.UserService.getAllGuides()
        return guide
    }
}
