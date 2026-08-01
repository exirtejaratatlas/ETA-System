import type { OutboxRow, PostgresConnection } from '@eta/persistence';
import { OutboxRelay } from '@eta/persistence';
import { EventBus } from './event-bus.js';

/**
 * Wires platform/persistence's generic OutboxRelay to a concrete EventBus,
 * turning outbox rows into DomainEvent publications. This lives in
 * platform/events (not platform/persistence) specifically so
 * platform/persistence never depends on a message-bus implementation —
 * the dependency direction only ever goes one way.
 */
export function createOutboxRelay(connection: PostgresConnection, bus: EventBus): OutboxRelay {
  return new OutboxRelay(connection, async (row: OutboxRow) => {
    await bus.publish({
      eventName: row.event_name,
      aggregateId: row.aggregate_id as never,
      occurredAt: row.occurred_at,
      payload: row.payload,
    });
  });
}

/** Runs the relay on a fixed interval until `stop()` is called. Returns the stop function. */
export function startOutboxRelayLoop(relay: OutboxRelay, intervalMs = 1000): { stop: () => void } {
  const handle = setInterval(() => {
    relay.relayOnce().catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Outbox relay pass failed', error);
    });
  }, intervalMs);
  return { stop: () => clearInterval(handle) };
}
