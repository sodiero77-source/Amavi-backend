import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { EventBusService } from '../../common/events/event-bus.service';
import { RequestActorContext } from '../../common/auth/request-context.interface';
import { CreateResidentDto } from './dto';

@Injectable()
export class ResidentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService,
  ) {}

  async create(actor: RequestActorContext, dto: CreateResidentDto) {
    const resident = await this.prisma.resident.create({
      data: {
        facilityId: actor.facilityId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: new Date(dto.dateOfBirth),
        admissionDate: new Date(dto.admissionDate),
      },
    });

    this.eventBus.publish({
      name: 'ResidentCreated',
      occurredAt: new Date().toISOString(),
      payload: {
        residentId: resident.id,
        facilityId: actor.facilityId,
        actorId: actor.actorId,
      },
    });

    return resident;
  }

  async list(facilityId: string) {
    return this.prisma.resident.findMany({
      where: { facilityId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOne(facilityId: string, residentId: string) {
    const resident = await this.prisma.resident.findFirst({
      where: { id: residentId, facilityId },
    });

    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    return resident;
  }
}
