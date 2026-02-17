import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RegisterSuperAdminDto, RegisterAdminContentDto } from '../users/dto/register-admin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Routes standard pour candidats/recruteurs
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // Routes pour Superadmin
  @Post('superadmin/register')
  async registerSuperAdmin(@Body() registerSuperAdminDto: RegisterSuperAdminDto) {
    return this.authService.registerSuperAdmin(registerSuperAdminDto);
  }

  @Post('superadmin/login')
  async loginSuperAdmin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginSuperAdmin(loginUserDto);
  }

  // Routes pour Admin Contenu
  @Post('admin-content/register')
  async registerAdminContent(@Body() registerAdminContentDto: RegisterAdminContentDto) {
    return this.authService.registerAdminContent(registerAdminContentDto);
  }

  @Post('admin-content/login')
  async loginAdminContent(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginAdminContent(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }
} 