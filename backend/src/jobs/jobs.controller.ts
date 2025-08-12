import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les offres d\'emploi' })
  @ApiResponse({ status: 200, description: 'Liste des jobs', type: [Object] })
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une offre d\'emploi par id' })
  @ApiResponse({ status: 200, description: 'Job trouvé', type: Object })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(Number(id));
  }

  @Post()
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Créer une offre d\'emploi' })
  @ApiResponse({ status: 201, description: 'Job créé', type: Object })
  create(@Body() data) {
    return this.jobsService.create(data);
  }

  @Patch(':id')
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Mettre à jour une offre d\'emploi' })
  @ApiResponse({ status: 200, description: 'Job mis à jour', type: Object })
  update(@Param('id') id: string, @Body() data) {
    return this.jobsService.update(Number(id), data);
  }

  @Delete(':id')
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Supprimer une offre d\'emploi' })
  @ApiResponse({ status: 204, description: 'Job supprimé' })
  remove(@Param('id') id: string) {
    return this.jobsService.remove(Number(id));
  }
} 