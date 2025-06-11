import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../patients/patients.entity';
import { Provider } from '../providers/providers.entity';

@Entity()
export class Encounter {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => Patient, { eager: true }) patient: Patient;
  @ManyToOne(() => Provider, { eager: true }) provider: Provider;
  @Column() date_of_service: Date;
  @Column() diagnosis_code: string;
  @Column() billing_code: string;
  @Column() notes: string;
}
