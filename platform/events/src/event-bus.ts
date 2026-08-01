import type { DomainEvent } from '@eta/kernel';

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(eventName: string, handler: (event: DomainEvent) => Promise<void>): Promise<void>;
  close(): Promise<void>;
}
