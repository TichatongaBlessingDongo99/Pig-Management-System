import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Batch } from './batch.entity';
import { Pen } from './pen.entity';
import { Health } from './health.entity';
import { Vaccination } from './vaccination.entity';
import { FeedingLog } from './feeding-log.entity';
import { PigMovement } from './pig-movement.entity';
import { Breeding } from './breeding.entity';

export enum PigSex {
  MALE = 'male',
  FEMALE = 'female'
}

export enum PigStatus {
  ALIVE = 'alive',
  DEAD = 'dead',
  SOLD = 'sold',
  SLAUGHTERED = 'slaughtered',
  TRANSFERRED = 'transferred'
}

@Entity('pigs')
export class Pig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Batch, (batch) => batch.pigs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'batch_id' })
  batch: Batch;

  @ManyToOne(() => Pen, (pen) => pen.pigs, { nullable: true })
  @JoinColumn({ name: 'current_pen_id' })
  current_pen: Pen;

  @Column({ type: 'varchar', length: 50, unique: true })
  tag_id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  rfid_tag: string;

  @Column({ type: 'enum', enum: PigSex })
  sex: PigSex;

  @Column({ type: 'varchar', length: 100 })
  breed: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  birth_weight: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  current_weight: number;

  @Column({ type: 'enum', enum: PigStatus, default: PigStatus.ALIVE })
  status: PigStatus;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sire_tag: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  dam_tag: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Health, (health) => health.pig)
  health_records: Health[];

  @OneToMany(() => Vaccination, (vaccination) => vaccination.pig)
  vaccinations: Vaccination[];

  @OneToMany(() => FeedingLog, (feeding) => feeding.pig)
  feeding_logs: FeedingLog[];

  @OneToMany(() => PigMovement, (movement) => movement.pig)
  movements: PigMovement[];

  @OneToMany(() => Breeding, (breeding) => breeding.boar)
  breeding_as_boar: Breeding[];

  @OneToMany(() => Breeding, (breeding) => breeding.sow)
  breeding_as_sow: Breeding[];
}
