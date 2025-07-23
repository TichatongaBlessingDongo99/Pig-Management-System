import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Breeding } from './breeding.entity';
import { User } from './user.entity';

@Entity('farrowing_records')
export class Farrowing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Breeding, (breeding) => breeding.farrowings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'breeding_id' })
  breeding: Breeding;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'attended_by' })
  attended_by: User;

  @Column({ type: 'date' })
  farrowing_date: Date;

  @Column({ type: 'int' })
  total_born: number;

  @Column({ type: 'int' })
  born_alive: number;

  @Column({ type: 'int' })
  stillborn: number;

  @Column({ type: 'int' })
  mummified: number;

  @Column({ type: 'int' })
  weaned: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  average_birth_weight: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  litter_weight: number;

  @Column({ type: 'text', nullable: true })
  complications: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
