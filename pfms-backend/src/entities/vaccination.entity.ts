import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pig } from './pig.entity';
import { User } from './user.entity';

@Entity('vaccinations')
export class Vaccination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pig, (pig) => pig.vaccinations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pig_id' })
  pig: Pig;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'administered_by' })
  administered_by: User;

  @Column({ type: 'varchar', length: 255 })
  vaccine_name: string;

  @Column({ type: 'varchar', length: 100 })
  batch_number: string;

  @Column({ type: 'date' })
  vaccination_date: Date;

  @Column({ type: 'date', nullable: true })
  next_due_date: Date;

  @Column({ type: 'varchar', length: 50 })
  dosage: string;

  @Column({ type: 'varchar', length: 50 })
  route: string; // intramuscular, subcutaneous, oral, etc.

  @Column({ type: 'date' })
  expiry_date: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  manufacturer: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
