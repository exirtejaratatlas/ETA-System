import type { PoolClient } from 'pg';
import type { DomainEvent } from '@eta/kernel';
import { PostgresConnection } from './postgres-connection.js';

/**
 * Transactional outbox pattern (ADR-0004). `insertOutboxEvent` must be
 * called with the SAME `PoolClient` used for the domain's own state
 * change, inside one `withTransaction` block — that's what makes the
 * state change and the event publication atomic.
 */
export async function insertOutboxEvent(client: PoolClient, event: DomainEvent): Promise<void> {
  await client.query(
    `INSERT INTO outbox_events (event_name, aggregate_id, occurred_at, payload, published)
     VALUES ($1, $2, $3, $4, false)`,
    [event.eventName, event.aggregateId, event.occurredAt, JSON.stringify(event.payload)],
  );
}

export interface OutboxRow {
  id: number;
  event_name: string;
  aggregate_id: string;
  occurred_at: Date;
  payload: unknown;
}

/**
 * Polls unpublished outbox rows and hands each to `publish`, marking it
 * published only after `publish` resolves — so a crash between publish
 * and the mark-as-published update just results in redelivery, never
 * silent loss. `publish` is injected rather than imported from
 * platform/events directly, so platform/persistence has no dependency
 * on the event-bus package.
 */
export class OutboxRelay {
  constructor(
    private readonly connection: PostgresConnection,
    private readonly publish: (row: OutboxRow) => Promise<void>,
    private readonly batchSize = 50,
  ) {}

  /** Returns the number of events successfully relayed in this pass. */
  async relayOnce(): Promise<number> {
    const { rows } = await this.connection.query<OutboxRow>(
      `SELECT id, event_name, aggregate_id, occurred_at, payload
       FROM outbox_events
       WHERE published = false
       ORDER BY id ASC
       LIMIT $1`,
      [this.batchSize],
    );

    let relayed = 0;
    for (const row of rows) {
      await this.publish(row);
      await this.connection.query('UPDATE outbox_events SET published = true WHERE id = $1', [
        row.id,
      ]);
      relayed++;
    }
    return relayed;
  }
}
