import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { CandidaturesService } from './candidatures.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('candidatures')
@Controller('candidatures')
@UseGuards(JwtAuthGuard)
export class CandidaturesController {
  constructor(private readonly candidaturesService: CandidaturesService) {}

  @Get()
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Lister toutes les candidatures' })
  @ApiResponse({ status: 200, description: 'Liste des candidatures', type: [Object] })
  findAll() {
    return this.candidaturesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une candidature par id' })
  @ApiResponse({ status: 200, description: 'Candidature trouvée', type: Object })
  findOne(@Param('id') id: string, @Request() req) {
    // Un utilisateur ne peut voir que ses propres candidatures, sauf admin/recruteur
    // (Ici, on suppose que l'entité Candidature a un champ userId)
    // À adapter selon la logique métier réelle
    return this.candidaturesService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Créer une candidature' })
  @ApiResponse({ status: 201, description: 'Candidature créée', type: Object })
  create(@Body() data, @Request() req) {
    // Associer la candidature à l'utilisateur connecté
    return this.candidaturesService.create({ ...data, userId: req.user.userId });
  }

  @Patch(':id')
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Mettre à jour une candidature' })
  @ApiResponse({ status: 200, description: 'Candidature mise à jour', type: Object })
  update(@Param('id') id: string, @Body() data) {
    return this.candidaturesService.update(Number(id), data);
  }

  @Delete(':id')
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Supprimer une candidature' })
  @ApiResponse({ status: 204, description: 'Candidature supprimée' })
  remove(@Param('id') id: string) {
    return this.candidaturesService.remove(Number(id));
  }
} 