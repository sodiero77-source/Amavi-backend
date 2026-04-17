import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/db/prisma.service';
import { CreateTreatmentPlanDto, ListTreatmentPlansQueryDto } from './dto';

@Injectable()
export class TreatmentPlansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(actor: any, dto: CreateTreatmentPlanDto) {
    return this.prisma.treatmentPlan.create({
      data: {
        residentId: dto.residentId,
        problem: dto.problem,
        goal: dto.goal,
        objective: dto.objective,
        createdBy: actor.actor_id,
        facilityId: actor.facility_id,
      },
    });
  }

  async list(actor: any, query: ListTreatmentPlansQueryDto) {
    return this.prisma.treatmentPlan.findMany({
      where: {
        facilityId: actor.facility_id,
        ...(query.residentId && { residentId: query.residentId }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
