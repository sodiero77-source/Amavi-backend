import { Module } from '@nestjs/common';
import { TreatmentPlansModule } from './modules/treatment-plans/treatment-plans.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/db/prisma.module';
import { EventBusModule } from './common/events/event-bus.module';
import { HealthModule } from './modules/health/health.module';
import { ResidentsModule } from './modules/residents/residents.module';
import { ClinicalNotesModule } from './modules/clinical-notes/clinical-notes.module';
import { MedicationModule } from './modules/medication/medication.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ComplianceModule } from './modules/compliance/compliance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EventBusModule,
    HealthModule,
    ResidentsModule,
    ClinicalNotesModule,
    MedicationModule,
    TasksModule,
    ComplianceModule,
    TreatmentPlansModule,
  ],
})
export class AppModule {}
