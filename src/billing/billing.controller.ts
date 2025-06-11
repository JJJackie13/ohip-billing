/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Param,
  Get,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BillingService } from './billing.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(RolesGuard)
@Controller('billing')
export class BillingController {
  constructor(private readonly service: BillingService) {}

  @Roles('admin', 'provider')
  @Post(':encounterId')
  create(@Param('encounterId') encounterId: number, @Req() req) {
    return this.service.create(encounterId, req.user.id);
  }

  @Roles('admin', 'provider')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Roles('admin')
  @Get('/patient/:id')
  findByPatient(@Param('id') id: number) {
    return this.service.findByPatientId(id);
  }

  @Roles('admin', 'provider')
  @Get()
  exportSummary(@Query('format') format: 'json' | 'csv' = 'json') {
    return this.service.exportSummary(format);
  }
}
