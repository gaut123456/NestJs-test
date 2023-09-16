import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './types';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @Post('login')
    async login(@Body() Body: LoginInput): Promise<any> {
        return this.AuthService.login(Body);
    }
}
