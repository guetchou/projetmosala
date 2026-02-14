import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  // Créer une actualité
  async create(createNewsDto: CreateNewsDto, authorId: number) {
    // Si cette actualité est mise à la une, dépublier l'ancienne
    if (createNewsDto.isFeatured) {
      await this.newsRepository.update(
        { isFeatured: true },
        { isFeatured: false }
      );
    }

    const news = this.newsRepository.create({
      ...createNewsDto,
      authorId,
    });
    return this.newsRepository.save(news);
  }

  // Récupérer toutes les actualités
  async findAll(published?: boolean) {
    const query = this.newsRepository.createQueryBuilder('news');

    if (published !== undefined) {
      query.where('news.isPublished = :published', { published });
    }

    return query.orderBy('news.createdAt', 'DESC').getMany();
  }

  // Récupérer l'actualité à la une
  async getFeatured() {
    return this.newsRepository.findOne({
      where: { isFeatured: true, isPublished: true },
    });
  }

  // Récupérer les 3 actualités les plus récentes
  async getLatest(limit: number = 3) {
    return this.newsRepository.find({
      where: { isPublished: true },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  // Récupérer une actualité par ID
  async findOne(id: number) {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!news) {
      throw new NotFoundException('Actualité non trouvée');
    }

    return news;
  }

  // Mettre à jour une actualité
  async update(id: number, updateNewsDto: UpdateNewsDto) {
    await this.findOne(id); // Vérifier que l'actualité existe

    // Si cette actualité est mise à la une, dépublier l'ancienne
    if (updateNewsDto.isFeatured) {
      await this.newsRepository.update(
        { isFeatured: true } as any,
        { isFeatured: false }
      );
    }

    await this.newsRepository.update(id, updateNewsDto);

    return this.findOne(id);
  }

  // Supprimer une actualité
  async remove(id: number) {
    const news = await this.findOne(id);
    await this.newsRepository.remove(news);
    return { message: 'Actualité supprimée avec succès' };
  }

  // Publier une actualité
  async publish(id: number) {
    await this.findOne(id);
    await this.newsRepository.update(id, { isPublished: true });
    return this.findOne(id);
  }

  // Dépublier une actualité
  async unpublish(id: number) {
    await this.findOne(id);
    await this.newsRepository.update(id, { isPublished: false });
    return this.findOne(id);
  }

  // Mettre à la une
  async setFeatured(id: number) {
    await this.findOne(id);
    // Dépublier l'ancienne
    await this.newsRepository.update(
      { isFeatured: true },
      { isFeatured: false }
    );
    // Mettre à la une la nouvelle
    await this.newsRepository.update(id, { isFeatured: true });
    return this.findOne(id);
  }

  // Retirer de la une
  async unsetFeatured(id: number) {
    await this.findOne(id);
    await this.newsRepository.update(id, { isFeatured: false });
    return this.findOne(id);
  }
}
