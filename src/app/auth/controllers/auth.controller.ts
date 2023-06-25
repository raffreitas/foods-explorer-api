import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dto/register-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any) {
        return await this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() body: RegisterUserDto) {
        return await this.authService.register(body);
    }
}
