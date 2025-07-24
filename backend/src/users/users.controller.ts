import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les utilisateurs' })
  @ApiResponse({ status: 200, type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver un utilisateur par id' })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({ status: 200, type: User })
  update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>): Promise<User | null> {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(Number(id));
  }
}
