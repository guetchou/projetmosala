import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formation } from './formation.entity';
import { FormationsService } from './formations.service';
import { FormationsController } from './formations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Formation])],
  providers: [FormationsService],
  controllers: [FormationsController],
})
export class FormationsModule {} 