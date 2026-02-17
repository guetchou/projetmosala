import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class RegisterSuperAdminDto {
  @ApiProperty({ example: 'Admin User' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'superadmin@mosala.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!', minLength: 8, description: 'Must be at least 8 characters' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  role?: UserRole = UserRole.SUPERADMIN;
}

export class RegisterAdminContentDto {
  @ApiProperty({ example: 'Content Admin' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'admin.content@mosala.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!', minLength: 8, description: 'Must be at least 8 characters' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  role?: UserRole = UserRole.ADMIN_CONTENT;
}
