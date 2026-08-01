import { connect, NatsConnection, Subscription } from '@nats-io/transport-node';
import type { DomainEvent } from '@eta/kernel';
import { EventBus } from './event-bus.js';

/**
 * NATS-backed event bus (ADR-0004). Events are published as JSON on a
 * subject equal to the event name — subscribers filter by subject rather
 * than by inspecting payloads. Publication is only ever driven by the
 * outbox relay (see outbox-relay.ts) — nothing calls `publish` directly
 * from a domain write path, or the transactional guarantee ADR-0004
 * requires is lost.
 */
export class NatsEventBus implements EventBus {
  private constructor(private readonly connection: NatsConnection) {}

  static async connect(servers: string | string[]): Promise<NatsEventBus> {
    const connection = await connect({ servers });
    return new NatsEventBus(connection);
  }

  async publish(event: DomainEvent): Promise<void> {
    const payload = JSON.stringify({
      aggregateId: event.aggregateId,
      occurredAt: event.occurredAt.toISOString(),
      payload: event.payload,
    });
    this.connection.publish(event.eventName, payload);
  }

  async subscribe(eventName: string, handler: (event: DomainEvent) => Promise<void>): Promise<void> {
    const subscription: Subscription = this.connection.subscribe(eventName);
    (async () => {
      for await (const msg of subscription) {
        const decoded = JSON.parse(new TextDecoder().decode(msg.data));
        await handler({
          eventName,
          aggregateId: decoded.aggregateId,
          occurredAt: new Date(decoded.occurredAt),
          payload: decoded.payload,
        });
      }
    })();
  }

  async close(): Promise<void> {
    await this.connection.close();
  }
}
