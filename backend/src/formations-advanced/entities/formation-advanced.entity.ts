import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export enum FormationLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum FormationStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('formations_advanced')
export class FormationAdvanced {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Titre de la formation' })
  @Column({ length: 200 })
  title: string;

  @ApiProperty({ example: 'Description de la formation...' })
  @Column('text')
  description: string;

  @ApiProperty({ example: 'Contenu détaillé...' })
  @Column('text')
  content: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @Column({ nullable: true })
  imageUrl?: string;

  @ApiProperty({ example: 'beginner', enum: FormationLevel })
  @Column({ default: FormationLevel.BEGINNER, type: 'enum', enum: FormationLevel })
  level: FormationLevel;

  @ApiProperty({ example: 'published', enum: FormationStatus })
  @Column({ default: FormationStatus.DRAFT, type: 'enum', enum: FormationStatus })
  status: FormationStatus;

  @ApiProperty({ example: 12, description: 'Durée en semaines' })
  @Column({ default: 12 })
  duration: number;

  @ApiProperty({ example: 50, description: 'Nombre de places disponibles' })
  @Column({ default: 50 })
  maxParticipants: number;

  @ApiProperty({ example: 0, description: 'Nombre de participants actuels' })
  @Column({ default: 0 })
  currentParticipants: number;

  @ApiProperty({ example: 150, description: 'Prix en dollars' })
  @Column({ nullable: true })
  price?: number;

  @ApiProperty({ example: 'beginner,intermediate' })
  @Column({ default: '' })
  prerequisites: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  author?: User;

  @Column({ nullable: true })
  authorId?: number;
}
