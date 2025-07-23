import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pig } from './pig.entity';
import { User } from './user.entity';

export enum HealthStatus {
  HEALTHY = 'healthy',
  SICK = 'sick',
  UNDER_TREATMENT = 'under_treatment',
  RECOVERED = 'recovered',
  DEAD = 'dead'
}

@Entity('health_records')
export class Health {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pig, (pig) => pig.health_records, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pig_id' })
  pig: Pig;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'recorded_by' })
  recorded_by: User;

  @Column({ type: 'date' })
  examination_date: Date;

  @Column({ type: 'enum', enum: HealthStatus })
  health_status: HealthStatus;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  temperature: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'text', nullable: true })
  symptoms: string;

  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  treatment: string;

  @Column({ type: 'text', nullable: true })
  medication: string;

  @Column({ type: 'date', nullable: true })
  next_checkup: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
