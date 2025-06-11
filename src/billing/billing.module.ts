import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Billing } from './billing.entity';
import { Encounter } from '../encounters/encounters.entity';
import { ManualJwtMiddleware } from '../auth/manual-jwt.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FeeSchedule,
  FeeScheduleSchema,
} from '../feeschedule/feeschedule.schema';
import { AuditModule } from '../auth/audit.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Billing, Encounter]),
    MongooseModule.forFeature([
      { name: FeeSchedule.name, schema: FeeScheduleSchema },
    ]),
    AuditModule,
    AuthModule,
  ],
  providers: [BillingService],
  controllers: [BillingController],
})
export class BillingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ManualJwtMiddleware).forRoutes(BillingController);
  }
}
