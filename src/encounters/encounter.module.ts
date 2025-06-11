import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encounter } from './encounters.entity';
import { EncountersService } from './encounters.service';
import { EncountersController } from './encounters.controller';
import { Patient } from '../patients/patients.entity';
import { Provider } from '../providers/providers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Encounter, Patient, Provider])],
  providers: [EncountersService],
  controllers: [EncountersController],
})
export class EncountersModule {}
