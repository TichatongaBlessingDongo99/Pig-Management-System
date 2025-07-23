import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pig } from './pig.entity';
import { User } from './user.entity';

@Entity('feeding_logs')
export class FeedingLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pig, (pig) => pig.feeding_logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pig_id' })
  pig: Pig;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'fed_by' })
  fed_by: User;

  @Column({ type: 'date' })
  feeding_date: Date;

  @Column({ type: 'varchar', length: 255 })
  feed_type: string;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  quantity_kg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cost_per_kg: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
