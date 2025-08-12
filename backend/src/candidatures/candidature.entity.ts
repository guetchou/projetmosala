import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('candidatures')
export class Candidature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  jobId: number;

  @Column({ length: 32, default: 'en_attente' })
  statut: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
} 