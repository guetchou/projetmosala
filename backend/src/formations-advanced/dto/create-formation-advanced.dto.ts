import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { FormationLevel, FormationStatus } from '../entities/formation-advanced.entity';

export class CreateFormationAdvancedDto {
  @ApiProperty({ example: 'Titre de la formation' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Description brève' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Contenu détaillé...' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 'beginner', enum: FormationLevel, required: false })
  @IsOptional()
  @IsEnum(FormationLevel)
  level?: FormationLevel = FormationLevel.BEGINNER;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  @IsNumber()
  duration?: number = 12;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number = 50;

  @ApiProperty({ example: 150, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  prerequisites?: string = '';
}

export class UpdateFormationAdvancedDto {
  @ApiProperty({ example: 'Titre de la formation', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Description brève', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Contenu détaillé...', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 'beginner', enum: FormationLevel, required: false })
  @IsOptional()
  @IsEnum(FormationLevel)
  level?: FormationLevel;

  @ApiProperty({ example: 'published', enum: FormationStatus, required: false })
  @IsOptional()
  @IsEnum(FormationStatus)
  status?: FormationStatus;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ example: 50, required: false })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @ApiProperty({ example: 150, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: '', required: false })
  @IsOptional()
  @IsString()
  prerequisites?: string;
}
