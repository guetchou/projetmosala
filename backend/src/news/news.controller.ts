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
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/entities/user.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // Récupérer les actualités publiques (sans authentification)
  @Get()
  async findAll(@Query('published') published?: boolean) {
    if (published === undefined) {
      return this.newsService.findAll(true);
    }
    return this.newsService.findAll(published);
  }

  // Récupérer une actualité par ID (sans authentification)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.newsService.findOne(parseInt(id, 10));
  }

  // Créer une actualité (Admin Content + Superadmin)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async create(@Body() createNewsDto: CreateNewsDto, @Request() req) {
    return this.newsService.create(createNewsDto, req.user.sub);
  }

  // Mettre à jour une actualité (Admin Content + Superadmin)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(parseInt(id, 10), updateNewsDto);
  }

  // Supprimer une actualité (Admin Content + Superadmin)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async remove(@Param('id') id: string) {
    return this.newsService.remove(parseInt(id, 10));
  }

  // Publier une actualité (Admin Content + Superadmin)
  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async publish(@Param('id') id: string) {
    return this.newsService.publish(parseInt(id, 10));
  }

  // Dépublier une actualité (Admin Content + Superadmin)
  @Patch(':id/unpublish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async unpublish(@Param('id') id: string) {
    return this.newsService.unpublish(parseInt(id, 10));
  }

  // Récupérer l'actualité à la une (sans authentification)
  @Get('featured/latest')
  async getFeatured() {
    return this.newsService.getFeatured();
  }

  // Récupérer les actualités les plus récentes (sans authentification)
  @Get('latest/:limit')
  async getLatest(@Param('limit') limit: string = '3') {
    return this.newsService.getLatest(parseInt(limit, 10));
  }

  // Mettre à la une une actualité (Admin Content + Superadmin)
  @Patch(':id/set-featured')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async setFeatured(@Param('id') id: string) {
    return this.newsService.setFeatured(parseInt(id, 10));
  }

  // Retirer de la une une actualité (Admin Content + Superadmin)
  @Patch(':id/unset-featured')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN_CONTENT)
  async unsetFeatured(@Param('id') id: string) {
    return this.newsService.unsetFeatured(parseInt(id, 10));
  }
}
