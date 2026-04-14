export interface DomainEvent<TPayload = Record<string, unknown>> {
  name: string;
  occurredAt: string;
  payload: TPayload;
}
