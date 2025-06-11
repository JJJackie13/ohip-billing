/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patients.entity';
import { Billing } from '../billing/billing.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Parser } from 'json2csv';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private repo: Repository<Patient>,
    @InjectRepository(Billing) private billingRepo: Repository<Billing>,
  ) {}

  create(data: Partial<Patient>) {
    const patient = this.repo.create(data);
    return this.repo.save(patient);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async getPatientBillingTotal(patientId: number): Promise<{ total: number }> {
    const { total } = await this.billingRepo
      .createQueryBuilder('billing')
      .leftJoin('billing.encounter', 'encounter')
      .leftJoin('encounter.patient', 'patient')
      .select('SUM(billing.amount)', 'total')
      .where('patient.id = :patientId', { patientId })
      .getRawOne();

    return { total: parseFloat(total) || 0 };
  }

  async generateBillingSummaryFile(
    patientId: number,
    format: 'csv' | 'json' = 'json',
  ): Promise<{ path: string }> {
    const data = await this.billingRepo.find({
      where: { patient: { id: patientId } },
      select: ['id', 'billing_code', 'amount', 'submission_status'],
    });

    const exportDir = path.join(__dirname, '../../export');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const fileName = `billing-summary-${patientId}.${format}`;
    const filePath = path.join(exportDir, fileName);

    if (format === 'csv') {
      const parser = new Parser({
        fields: ['id', 'billing_code', 'amount', 'submission_status'],
      });
      const csv = parser.parse(data || []);
      fs.writeFileSync(filePath, csv);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(data || [], null, 2));
    }
    return { path: filePath };
  }
}
