import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Encounter } from '../encounters/encounters.entity';
import { Patient } from '../patients/patients.entity';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => Encounter, { eager: true }) encounter: Encounter;
  @Column() billing_code: string;
  @Column('decimal', { precision: 10, scale: 2 }) amount: number;
  @Column() submission_status: string;
  @Column('json') line_items: any;
  @Column('json') totals: any;
  @CreateDateColumn() created_at: Date;
  @ManyToOne(() => Patient, { eager: true }) patient: Patient;
}
