import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './patients.entity';
import { Billing } from '../billing/billing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Billing])],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
