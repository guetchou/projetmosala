import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  CANDIDAT = 'candidat',
  RECRUTEUR = 'recruteur',
  ADMIN = 'admin',
  ADMIN_CONTENT = 'admin_content',
  SUPERADMIN = 'superadmin',
}

@Entity('users')
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 'john@doe.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashedpassword' })
  @Column()
  password: string;

  @ApiProperty({ 
    example: 'candidat', 
    enum: UserRole,
    description: 'User role: candidat, recruteur, admin, admin_content, or superadmin'
  })
  @Column({ default: UserRole.CANDIDAT, type: 'enum', enum: UserRole })
  role: UserRole;

  @ApiProperty({ example: true, description: 'Whether the user account is active' })
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
