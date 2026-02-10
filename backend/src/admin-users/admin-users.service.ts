import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Récupérer tous les administrateurs
  async getAllAdmins() {
    return this.userRepository.find({
      where: [
        { role: UserRole.SUPERADMIN },
        { role: UserRole.ADMIN },
        { role: UserRole.ADMIN_CONTENT },
      ],
    });
  }

  // Récupérer tous les utilisateurs (Superadmin only)
  async getAllUsers() {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  // Récupérer un utilisateur par ID
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user;
  }

  // Supprimer un utilisateur (Superadmin only)
  async deleteUser(id: number, currentUserId: number) {
    if (id === currentUserId) {
      throw new ForbiddenException('Vous ne pouvez pas supprimer votre propre compte');
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (user.role === UserRole.SUPERADMIN) {
      throw new ForbiddenException('Vous ne pouvez pas supprimer un superadministrateur');
    }

    await this.userRepository.remove(user);
    return { message: 'Utilisateur supprimé avec succès' };
  }

  // Désactiver un utilisateur
  async deactivateUser(id: number, currentUserId: number) {
    if (id === currentUserId) {
      throw new ForbiddenException('Vous ne pouvez pas désactiver votre propre compte');
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.isActive = false;
    await this.userRepository.save(user);

    return user;
  }

  // Activer un utilisateur
  async activateUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    user.isActive = true;
    await this.userRepository.save(user);

    return user;
  }

  // Changer le rôle d'un utilisateur
  async updateUserRole(id: number, newRole: UserRole, currentUserId: number) {
    if (id === currentUserId) {
      throw new ForbiddenException('Vous ne pouvez pas modifier votre propre rôle');
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (user.role === UserRole.SUPERADMIN) {
      throw new ForbiddenException('Vous ne pouvez pas modifier le rôle d\'un superadministrateur');
    }

    user.role = newRole;
    await this.userRepository.save(user);

    return user;
  }
}
