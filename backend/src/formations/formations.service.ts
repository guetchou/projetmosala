import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formation } from './formation.entity';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formation)
    private readonly formationRepository: Repository<Formation>,
  ) {}

  create(data: Partial<Formation>) {
    const formation = this.formationRepository.create(data);
    return this.formationRepository.save(formation);
  }

  findAll() {
    return this.formationRepository.find();
  }

  findOne(id: number) {
    return this.formationRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Formation>) {
    return this.formationRepository.update(id, data);
  }

  remove(id: number) {
    return this.formationRepository.delete(id);
  }
} 