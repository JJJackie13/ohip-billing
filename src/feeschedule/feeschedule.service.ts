/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeeSchedule, FeeScheduleDocument } from './feeschedule.schema';

@Injectable()
export class FeeScheduleService {
  constructor(
    @InjectModel(FeeSchedule.name)
    private feeScheduleModel: Model<FeeScheduleDocument>,
  ) {}

  async findOneByCode(code: string): Promise<FeeSchedule> {
    const feeItem = await this.feeScheduleModel
      .findOne({ code: code.toUpperCase() })
      .exec();

    if (!feeItem) {
      throw new NotFoundException(
        `Fee schedule item with code ${code} not found.`,
      );
    }

    return feeItem;
  }

  async findAll(): Promise<FeeSchedule[]> {
    return this.feeScheduleModel.find().exec();
  }
}
