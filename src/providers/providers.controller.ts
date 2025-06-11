import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { Provider } from './providers.entity';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly service: ProvidersService) {}

  @Post()
  create(@Body() body: Partial<Provider>) {
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
