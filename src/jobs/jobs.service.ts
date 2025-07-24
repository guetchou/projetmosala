import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

const demoJobs = [
  { id: 1, title: 'Développeur React', company: 'Mosala Tech', location: 'Brazzaville', type: 'CDI' },
  { id: 2, title: 'Chargé de projet', company: 'Caravane Mosala', location: 'Pointe-Noire', type: 'CDD' },
  { id: 3, title: 'Designer UI/UX', company: 'Mosala Studio', location: 'Dolisie', type: 'Stage' },
];

@Injectable()
export class JobsService {
  create(createJobDto: CreateJobDto) {
    // Simule l'ajout en mode DEMO
    return { demo: true, message: 'Action simulée en mode DÉMO/sandbox.' };
  }

  findAll() {
    // Retourne des données mockées en mode DEMO
    return demoJobs;
  }

  findOne(id: number) {
    return demoJobs.find(j => j.id === id) || null;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return { demo: true, message: 'Action simulée en mode DÉMO/sandbox.' };
  }

  remove(id: number) {
    return { demo: true, message: 'Action simulée en mode DÉMO/sandbox.' };
  }
}
