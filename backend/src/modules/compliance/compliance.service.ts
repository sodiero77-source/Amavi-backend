import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { EventBusService } from '../../common/events/event-bus.service';
import { RequestActorContext } from '../../common/auth/request-context.interface';
import { CreateComplianceAlertDto } from './dto';

@Injectable()
export class ComplianceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService,
  ) {}

  async create(actor: RequestActorContext, dto: CreateComplianceAlertDto) {
    const alert = await this.prisma.complianceAlert.create({
      data: {
        facilityId: actor.facilityId,
        residentId: dto.residentId,
        title: dto.title,
        detail: dto.detail,
      },
    });

    this.eventBus.publish({
      name: 'ComplianceAlertCreated',
      occurredAt: new Date().toISOString(),
      payload: { alertId: alert.id, actorId: actor.actorId },
    });

    return alert;
  }

  async list(actor: RequestActorContext) {
    return this.prisma.complianceAlert.findMany({
      where: { facilityId: actor.facilityId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
