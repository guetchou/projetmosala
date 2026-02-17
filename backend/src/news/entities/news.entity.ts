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

@Entity('news')
export class News {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Titre de l\'actualité' })
  @Column({ length: 200 })
  title: string;

  @ApiProperty({ example: 'Description de l\'actualité...' })
  @Column('text')
  description: string;

  @ApiProperty({ example: 'Contenu détaillé...' })
  @Column('text')
  content: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @Column({ nullable: true })
  imageUrl?: string;

  @ApiProperty({ example: 'https://example.com/article', required: false, description: 'Lien vers l\'article officiel' })
  @Column({ nullable: true })
  link?: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isPublished: boolean;

  @ApiProperty({ example: false, description: 'Si true, cette actualité est mise à la une (une seule à la fois)' })
  @Column({ default: false })
  isFeatured: boolean;

  @ApiProperty({ example: 'news' })
  @Column({ default: 'news' })
  category: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  author?: User;

  @Column({ nullable: true })
  authorId?: number;
}
