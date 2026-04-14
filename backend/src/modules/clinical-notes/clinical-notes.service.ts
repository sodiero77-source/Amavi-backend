import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { EventBusService } from '../../common/events/event-bus.service';
import { RequestActorContext } from '../../common/auth/request-context.interface';
import { CreateClinicalNoteDto } from './dto';

@Injectable()
export class ClinicalNotesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService,
  ) {}

  async create(actor: RequestActorContext, dto: CreateClinicalNoteDto) {
    const resident = await this.prisma.resident.findFirst({
      where: { id: dto.residentId, facilityId: actor.facilityId },
    });

    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    const note = await this.prisma.clinicalNote.create({
      data: {
        facilityId: actor.facilityId,
        residentId: dto.residentId,
        title: dto.title,
        content: dto.content,
        problem: dto.problem,
        goal: dto.goal,
        objective: dto.objective,
        createdById: actor.actorId,
      },
    });

    this.eventBus.publish({
      name: 'ClinicalNoteCreated',
      occurredAt: new Date().toISOString(),
      payload: { noteId: note.id, residentId: dto.residentId, actorId: actor.actorId },
    });

    return note;
  }

  async list(actor: RequestActorContext) {
    return this.prisma.clinicalNote.findMany({
      where: { facilityId: actor.facilityId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
