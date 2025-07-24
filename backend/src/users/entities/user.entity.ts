import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ example: 'candidat', enum: ['candidat', 'recruteur', 'admin'] })
  @Column({ default: 'candidat' })
  role: string;
}
