import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Titre de l\'actualité' })
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

  @ApiProperty({ example: 'https://example.com/article', required: false })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean = true;

  @ApiProperty({ example: false, required: false, description: 'Mettre à la une (une seule à la fois)' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;

  @ApiProperty({ example: 'news', required: false })
  @IsOptional()
  @IsString()
  category?: string = 'news';
}

export class UpdateNewsDto {
  @ApiProperty({ example: 'Titre de l\'actualité', required: false })
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

  @ApiProperty({ example: 'https://example.com/article', required: false })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiProperty({ example: 'news', required: false })
  @IsOptional()
  @IsString()
  category?: string;
}
