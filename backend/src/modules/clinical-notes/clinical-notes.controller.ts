import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RequestContextGuard } from '../../common/guards/request-context.guard';
import { ClinicalNotesService } from './clinical-notes.service';
import { CreateClinicalNoteDto } from './dto';

@Controller('clinical-notes')
@UseGuards(RequestContextGuard)
export class ClinicalNotesController {
  constructor(private readonly clinicalNotesService: ClinicalNotesService) {}

  @Post()
  create(@Req() request: any, @Body() dto: CreateClinicalNoteDto) {
    return this.clinicalNotesService.create(request.actorContext, dto);
  }

  @Get()
  list(@Req() request: any) {
    return this.clinicalNotesService.list(request.actorContext);
  }
}
