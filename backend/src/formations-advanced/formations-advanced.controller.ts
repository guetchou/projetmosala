import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { FormationsAdvancedService } from './formations-advanced.service';
import { CreateFormationAdvancedDto, UpdateFormationAdvancedDto } from './dto/create-formation-advanced.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('formations-advanced')
export class FormationsAdvancedController {
  constructor(private readonly formationsAdvancedService: FormationsAdvancedService) {}

  // Récupérer les formations publiques (sans authentification)
  @Get()
  async findAll(@Query('status') status?: string) {
    return this.formationsAdvancedService.findAll(status);
  }

  // Récupérer une formation par ID (sans authentification)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.formationsAdvancedService.findOne(parseInt(id, 10));
  }

  // Créer une formation (Admin Content + Superadmin)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async create(@Body() createFormationDto: CreateFormationAdvancedDto, @Request() req) {
    return this.formationsAdvancedService.create(createFormationDto, req.user.sub);
  }

  // Mettre à jour une formation (Admin Content + Superadmin)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async update(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationAdvancedDto) {
    return this.formationsAdvancedService.update(parseInt(id, 10), updateFormationDto);
  }

  // Supprimer une formation (Admin Content + Superadmin)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async remove(@Param('id') id: string) {
    return this.formationsAdvancedService.remove(parseInt(id, 10));
  }

  // Publier une formation (Admin Content + Superadmin)
  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async publish(@Param('id') id: string) {
    return this.formationsAdvancedService.publish(parseInt(id, 10));
  }

  // Archiver une formation (Admin Content + Superadmin)
  @Patch(':id/archive')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async archive(@Param('id') id: string) {
    return this.formationsAdvancedService.archive(parseInt(id, 10));
  }

  // Augmenter le nombre de participants (Candidat)
  @Patch(':id/enroll')
  @UseGuards(JwtAuthGuard)
  async enrollParticipant(@Param('id') id: string) {
    return this.formationsAdvancedService.incrementParticipants(parseInt(id, 10));
  }
}
