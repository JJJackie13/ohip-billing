import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encounter } from './encounters.entity';
import { Patient } from '../patients/patients.entity';
import { Provider } from '../providers/providers.entity';

@Injectable()
export class EncountersService {
  constructor(
    @InjectRepository(Encounter) private repo: Repository<Encounter>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Provider) private providerRepo: Repository<Provider>,
  ) {}

  async create(data: Partial<Encounter>) {
    const patient = await this.patientRepo.findOne({
      where: { id: data.patient?.id },
    });
    const provider = await this.providerRepo.findOne({
      where: { id: data.provider?.id },
    });

    const encounter = this.repo.create({ ...(data as any), patient, provider });
    return this.repo.save(encounter);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
