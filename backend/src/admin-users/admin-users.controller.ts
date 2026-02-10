import {
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
  Body,
} from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  // Obtenir tous les administrateurs (Admin Content + Superadmin)
  @Get('admins')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async getAllAdmins() {
    return this.adminUsersService.getAllAdmins();
  }

  // Obtenir tous les utilisateurs (Superadmin only)
  @Get()
  @Roles(UserRole.SUPERADMIN)
  async getAllUsers() {
    return this.adminUsersService.getAllUsers();
  }

  // Obtenir un utilisateur par ID (Superadmin only)
  @Get(':id')
  @Roles(UserRole.SUPERADMIN)
  async getUserById(@Param('id') id: string) {
    return this.adminUsersService.getUserById(parseInt(id, 10));
  }

  // Supprimer un utilisateur (Superadmin only)
  @Delete(':id')
  @Roles(UserRole.SUPERADMIN)
  async deleteUser(@Param('id') id: string, @Request() req) {
    return this.adminUsersService.deleteUser(parseInt(id, 10), req.user.sub);
  }

  // Désactiver un utilisateur (Superadmin only)
  @Patch(':id/deactivate')
  @Roles(UserRole.SUPERADMIN)
  async deactivateUser(@Param('id') id: string, @Request() req) {
    return this.adminUsersService.deactivateUser(parseInt(id, 10), req.user.sub);
  }

  // Activer un utilisateur (Superadmin only)
  @Patch(':id/activate')
  @Roles(UserRole.SUPERADMIN)
  async activateUser(@Param('id') id: string) {
    return this.adminUsersService.activateUser(parseInt(id, 10));
  }

  // Changer le rôle d'un utilisateur (Superadmin only)
  @Patch(':id/role')
  @Roles(UserRole.SUPERADMIN)
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: UserRole,
    @Request() req,
  ) {
    return this.adminUsersService.updateUserRole(
      parseInt(id, 10),
      role,
      req.user.sub,
    );
  }
}
