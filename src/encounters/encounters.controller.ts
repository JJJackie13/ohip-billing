import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EncountersService } from './encounters.service';
import { Encounter } from './encounters.entity';

@Controller('encounters')
export class EncountersController {
  constructor(private readonly service: EncountersService) {}

  @Post()
  create(@Body() body: Partial<Encounter>) {
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
}
