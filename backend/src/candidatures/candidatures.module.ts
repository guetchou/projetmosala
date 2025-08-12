import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidature } from './candidature.entity';
import { CandidaturesService } from './candidatures.service';
import { CandidaturesController } from './candidatures.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Candidature])],
  providers: [CandidaturesService],
  controllers: [CandidaturesController],
})
export class CandidaturesModule {} 