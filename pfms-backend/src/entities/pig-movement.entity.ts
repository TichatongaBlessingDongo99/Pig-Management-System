import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Pig } from './pig.entity';
import { Pen } from './pen.entity';
import { User } from './user.entity';

export enum MovementType {
  TRANSFER = 'transfer',
  SALE = 'sale',
  SLAUGHTER = 'slaughter',
  DEATH = 'death',
  BIRTH = 'birth'
}

@Entity('pig_movements')
export class PigMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pig, (pig) => pig.movements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pig_id' })
  pig: Pig;

  @ManyToOne(() => Pen, { nullable: true })
  @JoinColumn({ name: 'from_pen_id' })
  from_pen: Pen;

  @ManyToOne(() => Pen, { nullable: true })
  @JoinColumn({ name: 'to_pen_id' })
  to_pen: Pen;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'moved_by' })
  moved_by: User;

  @Column({ type: 'enum', enum: MovementType })
  movement_type: MovementType;

  @Column({ type: 'date' })
  movement_date: Date;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
