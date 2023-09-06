import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @Post('login')
    async login(@Body() Body: any): Promise<any> {
        return this.AuthService.login(Body);
    }
}
