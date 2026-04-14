import { Injectable, Logger } from '@nestjs/common';
import { DomainEvent } from './domain-event.interface';

@Injectable()
export class EventBusService {
  private readonly logger = new Logger(EventBusService.name);

  publish(event: DomainEvent): void {
    this.logger.log(`Published event: ${event.name} ${JSON.stringify(event.payload)}`);
  }
}
