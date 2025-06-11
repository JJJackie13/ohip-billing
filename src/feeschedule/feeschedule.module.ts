import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeeSchedule, FeeScheduleSchema } from './feeschedule.schema';
import { FeeScheduleService } from './feeschedule.service';
import { FeeScheduleController } from './feeschedule.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeeSchedule.name, schema: FeeScheduleSchema },
    ]),
    AuthModule,
  ],
  providers: [FeeScheduleService],
  controllers: [FeeScheduleController],
  exports: [FeeScheduleService],
})
export class FeeScheduleModule {}
