import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Billing } from './billing.entity';
import { Repository } from 'typeorm';
import { Encounter } from '../encounters/encounters.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FeeSchedule,
  FeeScheduleDocument,
} from '../feeschedule/feeschedule.schema';
import { Parser } from 'json2csv';
import * as fs from 'fs';
import * as path from 'path';
import { AuditService } from 'src/auth/audit.service';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing) private billingRepo: Repository<Billing>,
    @InjectRepository(Encounter) private encounterRepo: Repository<Encounter>,
    @InjectModel(FeeSchedule.name) private feeModel: Model<FeeScheduleDocument>,
    private readonly auditService: AuditService,
  ) {}

  async create(encounterId: number, userId: string) {
    const encounter = await this.encounterRepo.findOne({
      where: { id: encounterId },
    });
    if (!encounter) throw new NotFoundException('Encounter not found');

    let billingCode = encounter.billing_code;
    if (!billingCode || billingCode.trim() === '') {
      billingCode = this.suggestBillingCode(encounter.notes);
    }

    const fee = await this.feeModel.findOne({ code: billingCode }).exec();
    if (!fee) throw new NotFoundException('Fee schedule entry not found');

    const billing = this.billingRepo.create({
      encounter,
      billing_code: encounter.billing_code,
      amount: fee.amount,
      submission_status: 'Pending',
      line_items: [
        {
          description: fee.description,
          code: fee.code,
          amount: fee.amount,
        },
      ],
      totals: {
        total: fee.amount,
      },
    });
    const savedBilling = await this.billingRepo.save(billing);

    await this.auditService.logAction(userId, 'CREATE_BILLING', {
      encounterId,
      billingCode,
      billingId: savedBilling.id,
      amount: fee.amount,
    });

    return savedBilling;
  }

  suggestBillingCode(notes: string): string {
    const rules: { keyword: string; code: string }[] = [
      { keyword: 'cough', code: 'A001' },
      { keyword: 'fever', code: 'A002' },
      { keyword: 'pain', code: 'A003' },
      { keyword: 'injury', code: 'A004' },
    ];
    const found = rules.find((rule) =>
      notes.toLowerCase().includes(rule.keyword),
    );

    return found ? found.code : 'A000';
  }

  findById(id: number) {
    return this.billingRepo.findOne({ where: { id } });
  }

  async findByPatientId(patientId: number) {
    return this.billingRepo
      .createQueryBuilder('billing')
      .innerJoinAndSelect('billing.encounter', 'encounter')
      .where('encounter.patient.id = :patientId', { patientId })
      .getMany();
  }

  async exportSummary(format: 'json' | 'csv') {
    const allBillings = await this.billingRepo.find();

    if (format === 'json') {
      return allBillings;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const parser = new Parser({
        fields: ['id', 'billing_code', 'amount', 'submission_status'],
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const csv = parser.parse(allBillings);
      const filePath = path.join(
        __dirname,
        '../../exports/billing_summary.csv',
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      fs.writeFileSync(filePath, csv);
      return { path: filePath };
    }
  }
}
