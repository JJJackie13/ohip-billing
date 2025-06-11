import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn() id: number;
  @Column() provider_id: string;
  @Column() name: string;
  @Column() specialty: string;
  @Column() registration_number: string;
}
