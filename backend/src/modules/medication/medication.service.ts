import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { EventBusService } from '../../common/events/event-bus.service';
import { RequestActorContext } from '../../common/auth/request-context.interface';
import { CreateMedicationOrderDto } from './dto';

@Injectable()
export class MedicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService,
  ) {}

  async createOrder(actor: RequestActorContext, dto: CreateMedicationOrderDto) {
    const resident = await this.prisma.resident.findFirst({
      where: { id: dto.residentId, facilityId: actor.facilityId },
    });

    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    const order = await this.prisma.medicationOrder.create({
      data: {
        facilityId: actor.facilityId,
        residentId: dto.residentId,
        medicationName: dto.medicationName,
        dose: dto.dose,
        route: dto.route,
        frequency: dto.frequency,
        createdById: actor.actorId,
      },
    });

    this.eventBus.publish({
      name: 'MedicationOrderCreated',
      occurredAt: new Date().toISOString(),
      payload: { orderId: order.id, residentId: dto.residentId, actorId: actor.actorId },
    });

    return order;
  }

  async list(actor: RequestActorContext) {
    return this.prisma.medicationOrder.findMany({
      where: { facilityId: actor.facilityId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
