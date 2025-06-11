import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLogDocument } from './audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel('AuditLog')
    private auditModel: Model<AuditLogDocument>,
  ) {}

  async logAction(userId: string, action: string, metadata: any = {}) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.auditModel.create({
      userId,
      action,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      metadata,
      timestamp: new Date(),
    });
  }
}
