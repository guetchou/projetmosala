import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('formations')
@Controller('formations')
@UseGuards(JwtAuthGuard)
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les formations' })
  @ApiResponse({ status: 200, description: 'Liste des formations', type: [Object] })
  findAll() {
    return this.formationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une formation par id' })
  @ApiResponse({ status: 200, description: 'Formation trouvée', type: Object })
  findOne(@Param('id') id: string) {
    return this.formationsService.findOne(Number(id));
  }

  @Post()
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Créer une formation' })
  @ApiResponse({ status: 201, description: 'Formation créée', type: Object })
  create(@Body() data) {
    return this.formationsService.create(data);
  }

  @Patch(':id')
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Mettre à jour une formation' })
  @ApiResponse({ status: 200, description: 'Formation mise à jour', type: Object })
  update(@Param('id') id: string, @Body() data) {
    return this.formationsService.update(Number(id), data);
  }

  @Delete(':id')
  @Roles('recruteur', 'admin')
  @ApiOperation({ summary: 'Supprimer une formation' })
  @ApiResponse({ status: 204, description: 'Formation supprimée' })
  remove(@Param('id') id: string) {
    return this.formationsService.remove(Number(id));
  }
} 