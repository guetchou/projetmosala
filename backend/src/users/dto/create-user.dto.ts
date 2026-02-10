import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@doe.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: 'candidat', 
    enum: ['candidat', 'recruteur', 'admin', 'admin_content', 'superadmin'], 
    required: false,
    description: 'User role'
  })
  @IsOptional()
  @IsIn([UserRole.CANDIDAT, UserRole.RECRUTEUR, UserRole.ADMIN, UserRole.ADMIN_CONTENT, UserRole.SUPERADMIN])
  role?: UserRole | string = UserRole.CANDIDAT;
}
