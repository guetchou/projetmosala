import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  create(data: Partial<Job>) {
    const job = this.jobRepository.create(data);
    return this.jobRepository.save(job);
  }

  findAll() {
    return this.jobRepository.find();
  }

  findOne(id: number) {
    return this.jobRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Job>) {
    return this.jobRepository.update(id, data);
  }

  remove(id: number) {
    return this.jobRepository.delete(id);
  }
} 