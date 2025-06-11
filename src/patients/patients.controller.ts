import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patients.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly service: PatientsService) {}

  @Post()
  create(@Body() body: Partial<Patient>) {
    return this.service.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id/total-billing')
  getTotalBilling(@Param('id') id: string) {
    return this.service.getPatientBillingTotal(+id);
  }

  @Get(':id/billing-summary/file')
  async exportBillingSummaryToFile(
    @Param('id') id: string,
    @Query('format') format: 'csv' | 'json' = 'json',
  ) {
    return this.service.generateBillingSummaryFile(+id, format);
  }
}
