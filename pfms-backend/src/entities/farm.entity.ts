import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Batch } from './batch.entity';
import { Pen } from './pen.entity';

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'text' })
  contact_info: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => User, (user) => user.farm)
  users: User[];

  @OneToMany(() => Batch, (batch) => batch.farm)
  batches: Batch[];

  @OneToMany(() => Pen, (pen) => pen.farm)
  pens: Pen[];
}
