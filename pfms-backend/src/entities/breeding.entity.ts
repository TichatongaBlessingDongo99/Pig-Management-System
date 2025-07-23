import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pig } from './pig.entity';
import { User } from './user.entity';
import { Farrowing } from './farrowing.entity';

export enum BreedingMethod {
  NATURAL = 'natural',
  ARTIFICIAL_INSEMINATION = 'artificial_insemination'
}

export enum BreedingStatus {
  PLANNED = 'planned',
  COMPLETED = 'completed',
  FAILED = 'failed',
  PREGNANT = 'pregnant',
  NOT_PREGNANT = 'not_pregnant'
}

@Entity('breeding_records')
export class Breeding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pig, (pig) => pig.breeding_as_sow, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sow_id' })
  sow: Pig;

  @ManyToOne(() => Pig, (pig) => pig.breeding_as_boar, { nullable: true })
  @JoinColumn({ name: 'boar_id' })
  boar: Pig;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'recorded_by' })
  recorded_by: User;

  @Column({ type: 'date' })
  breeding_date: Date;

  @Column({ type: 'enum', enum: BreedingMethod })
  method: BreedingMethod;

  @Column({ type: 'enum', enum: BreedingStatus })
  status: BreedingStatus;

  @Column({ type: 'date', nullable: true })
  expected_farrowing_date: Date;

  @Column({ type: 'date', nullable: true })
  pregnancy_check_date: Date;

  @Column({ type: 'boolean', nullable: true })
  pregnancy_confirmed: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  semen_batch: string; // for AI

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Farrowing, (farrowing) => farrowing.breeding)
  farrowings: Farrowing[];
}
