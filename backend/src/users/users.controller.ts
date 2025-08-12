import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Lister tous les utilisateurs' })
  @ApiResponse({ status: 200, type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver un utilisateur par id' })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id') id: string, @Request() req): Promise<User | null> {
    // Un utilisateur ne peut voir que son propre profil, sauf admin
    if (req.user.role !== 'admin' && req.user.userId !== Number(id)) {
      throw new Error('Accès refusé');
    }
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({ status: 200, type: User })
  update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>, @Request() req): Promise<User | null> {
    // Un utilisateur ne peut modifier que son propre profil, sauf admin
    if (req.user.role !== 'admin' && req.user.userId !== Number(id)) {
      throw new Error('Accès refusé');
    }
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(Number(id));
  }
}
