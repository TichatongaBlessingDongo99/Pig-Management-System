import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Farm } from './farm.entity';
import { Pig } from './pig.entity';

export enum PenType {
  NURSERY = 'nursery',
  GROWING = 'growing',
  FINISHING = 'finishing',
  BREEDING = 'breeding',
  FARROWING = 'farrowing',
  ISOLATION = 'isolation'
}

export enum PenStatus {
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  INACTIVE = 'inactive'
}

@Entity('pens')
export class Pen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Farm, (farm) => farm.pens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @Column({ type: 'varchar', length: 50, unique: true })
  pen_number: string;

  @Column({ type: 'enum', enum: PenType })
  pen_type: PenType;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  current_occupancy: number;

  @Column({ type: 'enum', enum: PenStatus, default: PenStatus.ACTIVE })
  status: PenStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Pig, (pig) => pig.current_pen)
  pigs: Pig[];
}
