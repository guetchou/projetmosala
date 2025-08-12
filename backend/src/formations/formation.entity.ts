import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('formations')
export class Formation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 80 })
  organisme: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
} 