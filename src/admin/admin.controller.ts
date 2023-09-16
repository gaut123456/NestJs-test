import { Body, Controller, Post, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Guide } from 'src/user/user.type'


@Controller('admin')
export class AdminController {
    constructor(private AdminService: AdminService) { }

    @Post('add')
    @UseGuards(AuthGuard)
    async add(@Body() Body: Guide, @Req() request): Promise<any> {
        const user = request.user;
        console.log(user)
        return this.AdminService.add(Body, user);
    }
}
