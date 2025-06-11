import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './providers.entity';

@Injectable()
export class ProvidersService {
  constructor(@InjectRepository(Provider) private repo: Repository<Provider>) {}

  create(data: Partial<Provider>) {
    const provider = this.repo.create(data);
    return this.repo.save(provider);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
