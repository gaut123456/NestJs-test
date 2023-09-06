import { Body, Controller, Post, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';


@Controller('admin')
export class AdminController {
    constructor(private AdminService: AdminService) { }

    @Post('add')
    @UseGuards(AuthGuard)
    async add(@Body() Body: any, @Req() request): Promise<any> {
        const user = request.user;
        console.log(user)
        return this.AdminService.add(Body, user);
    }
}
