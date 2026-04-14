import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RequestContextGuard } from '../../common/guards/request-context.guard';
import { CreateResidentDto } from './dto';
import { ResidentsService } from './residents.service';

@Controller('residents')
@UseGuards(RequestContextGuard)
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Post()
  create(@Req() request: any, @Body() dto: CreateResidentDto) {
    return this.residentsService.create(request.actorContext, dto);
  }

  @Get()
  list(@Req() request: any) {
    return this.residentsService.list(request.actorContext.facilityId);
  }

  @Get(':residentId')
  getOne(@Req() request: any, @Param('residentId') residentId: string) {
    return this.residentsService.getOne(request.actorContext.facilityId, residentId);
  }
}
