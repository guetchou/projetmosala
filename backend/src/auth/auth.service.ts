import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RegisterSuperAdminDto, RegisterAdminContentDto } from '../users/dto/register-admin.dto';
import { UserRole } from '../users/entities/user.entity';

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

  async registerSuperAdmin(registerSuperAdminDto: RegisterSuperAdminDto) {
    // Vérifier si l'email existe déjà
    const users = await this.usersService.findAll();
    if (users.find(u => u.email === registerSuperAdminDto.email)) {
      throw new ConflictException('Email déjà utilisé');
    }
    
    const createUserDto: CreateUserDto = {
      name: registerSuperAdminDto.name,
      email: registerSuperAdminDto.email,
      password: registerSuperAdminDto.password,
      role: UserRole.SUPERADMIN,
    };
    
    return this.usersService.create(createUserDto);
  }

  async registerAdminContent(registerAdminContentDto: RegisterAdminContentDto) {
    // Vérifier si l'email existe déjà
    const users = await this.usersService.findAll();
    if (users.find(u => u.email === registerAdminContentDto.email)) {
      throw new ConflictException('Email déjà utilisé');
    }
    
    const createUserDto: CreateUserDto = {
      name: registerAdminContentDto.name,
      email: registerAdminContentDto.email,
      password: registerAdminContentDto.password,
      role: UserRole.ADMIN_CONTENT,
    };
    
    return this.usersService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const users = await this.usersService.findAll();
    const user = users.find(u => u.email === email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    if (!user.isActive) return null;
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

  async loginSuperAdmin(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) throw new UnauthorizedException('Email ou mot de passe invalide');
    if (user.role !== UserRole.SUPERADMIN) {
      throw new ForbiddenException('Accès refusé. Vous devez être un superadministrateur.');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async loginAdminContent(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) throw new UnauthorizedException('Email ou mot de passe invalide');
    if (user.role !== UserRole.ADMIN_CONTENT) {
      throw new ForbiddenException('Accès refusé. Vous devez être un administrateur de contenu.');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
} 