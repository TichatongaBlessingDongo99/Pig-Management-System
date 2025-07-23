import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthServiceSimple } from './auth-simple.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthSimpleController {
  constructor(private authService: AuthServiceSimple) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() req: any) {
    return {
      message: 'Authentication working!',
      user: req.user,
    };
  }
}
