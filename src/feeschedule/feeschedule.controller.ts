import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FeeScheduleService } from './feeschedule.service';
import { FeeSchedule } from './feeschedule.schema'; // Import from schema file
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('fee-schedule')
export class FeeScheduleController {
  constructor(private readonly feeScheduleService: FeeScheduleService) {}

  @Get(':code')
  @UseGuards(JwtAuthGuard)
  async getFeeScheduleByCode(
    @Param('code') code: string,
  ): Promise<FeeSchedule> {
    return await this.feeScheduleService.findOneByCode(code);
  }
}
