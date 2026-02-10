import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormationAdvanced } from './entities/formation-advanced.entity';
import { CreateFormationAdvancedDto, UpdateFormationAdvancedDto } from './dto/create-formation-advanced.dto';

@Injectable()
export class FormationsAdvancedService {
  constructor(
    @InjectRepository(FormationAdvanced)
    private readonly formationRepository: Repository<FormationAdvanced>,
  ) {}

  // Créer une formation
  async create(createFormationDto: CreateFormationAdvancedDto, authorId: number) {
    const formation = this.formationRepository.create({
      ...createFormationDto,
      authorId,
    });
    return this.formationRepository.save(formation);
  }

  // Récupérer toutes les formations
  async findAll(status?: string) {
    const query = this.formationRepository.createQueryBuilder('formation');

    if (status) {
      query.where('formation.status = :status', { status });
    } else {
      query.where('formation.status = :status', { status: 'published' });
    }

    return query.orderBy('formation.createdAt', 'DESC').getMany();
  }

  // Récupérer une formation par ID
  async findOne(id: number) {
    const formation = await this.formationRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!formation) {
      throw new NotFoundException('Formation non trouvée');
    }

    return formation;
  }

  // Mettre à jour une formation
  async update(id: number, updateFormationDto: UpdateFormationAdvancedDto) {
    await this.findOne(id); // Vérifier que la formation existe

    await this.formationRepository.update(id, updateFormationDto);

    return this.findOne(id);
  }

  // Supprimer une formation
  async remove(id: number) {
    const formation = await this.findOne(id);
    await this.formationRepository.remove(formation);
    return { message: 'Formation supprimée avec succès' };
  }

  // Publier une formation
  async publish(id: number) {
    await this.findOne(id);
    await this.formationRepository.update(id, { status: 'published' });
    return this.findOne(id);
  }

  // Archiver une formation
  async archive(id: number) {
    await this.findOne(id);
    await this.formationRepository.update(id, { status: 'archived' });
    return this.findOne(id);
  }

  // Augmenter le nombre de participants
  async incrementParticipants(id: number) {
    const formation = await this.findOne(id);

    if (formation.currentParticipants >= formation.maxParticipants) {
      throw new Error('La formation est complète');
    }

    formation.currentParticipants += 1;
    return this.formationRepository.save(formation);
  }
}
