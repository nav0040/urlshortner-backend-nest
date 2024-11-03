import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body('name') name:string, @Body('email') email:string, @Body('password') password:string){
        return this.authService.register(name,email,password);
    }

    @Post('login')
    async login(@Body('email') email:string, @Body('password') password:string){
        return this.authService.login(email,password);
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logout(@Request() req){
        return { message:'Logged out successfully'}
    }
}
