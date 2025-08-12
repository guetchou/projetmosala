import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Vérifier si l'email existe déjà
    const users = await this.usersService.findAll();
    if (users.find(u => u.email === createUserDto.email)) {
      throw new ConflictException('Email déjà utilisé');
    }
    return this.usersService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const users = await this.usersService.findAll();
    const user = users.find(u => u.email === email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    // On ne retourne pas le mot de passe
    const { password: _, ...result } = user;
    return result;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) throw new UnauthorizedException('Email ou mot de passe invalide');
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
} 