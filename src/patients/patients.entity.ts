import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 10 }) health_card_number: string;
  @Column({ length: 255 }) name: string;
  @Column({ type: 'date' }) DOB: Date;
  @Column({ length: 1 }) sex: string;
  @Column({ length: 15, nullable: true }) phone: string;
  @Column({ length: 255, nullable: true }) email: string;
  @Column({ length: 500, nullable: true }) address: string;
}
