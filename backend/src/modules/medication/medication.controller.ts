import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RequestContextGuard } from '../../common/guards/request-context.guard';
import { MedicationService } from './medication.service';
import { CreateMedicationOrderDto } from './dto';

@Controller('medication-orders')
@UseGuards(RequestContextGuard)
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  createOrder(@Req() request: any, @Body() dto: CreateMedicationOrderDto) {
    return this.medicationService.createOrder(request.actorContext, dto);
  }

  @Get()
  list(@Req() request: any) {
    return this.medicationService.list(request.actorContext);
  }
}
