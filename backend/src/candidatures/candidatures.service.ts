import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidature } from './candidature.entity';

@Injectable()
export class CandidaturesService {
  constructor(
    @InjectRepository(Candidature)
    private readonly candidatureRepository: Repository<Candidature>,
  ) {}

  create(data: Partial<Candidature>) {
    const candidature = this.candidatureRepository.create(data);
    return this.candidatureRepository.save(candidature);
  }

  findAll() {
    return this.candidatureRepository.find();
  }

  findOne(id: number) {
    return this.candidatureRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Candidature>) {
    return this.candidatureRepository.update(id, data);
  }

  remove(id: number) {
    return this.candidatureRepository.delete(id);
  }
} 