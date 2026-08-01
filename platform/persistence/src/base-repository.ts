import type { PoolClient, QueryResultRow } from 'pg';
import { PostgresConnection } from './postgres-connection.js';

/**
 * Minimal base repository pattern. Concrete repositories (one per aggregate,
 * living in a domain's `adapters/outbound/`) extend this for their specific
 * table and row-to-entity mapping — this base only owns the connection
 * plumbing, never domain-specific query logic.
 */
export abstract class BaseRepository<Entity, Row extends QueryResultRow> {
  protected constructor(protected readonly connection: PostgresConnection) {}

  protected abstract toEntity(row: Row): Entity;

  protected async queryOne(
    text: string,
    params: unknown[],
    client?: PoolClient,
  ): Promise<Entity | null> {
    const result = client
      ? await client.query<Row>(text, params)
      : await this.connection.query<Row>(text, params);
    const row = result.rows[0];
    return row ? this.toEntity(row) : null;
  }

  protected async queryMany(
    text: string,
    params: unknown[],
    client?: PoolClient,
  ): Promise<Entity[]> {
    const result = client
      ? await client.query<Row>(text, params)
      : await this.connection.query<Row>(text, params);
    return result.rows.map((row) => this.toEntity(row));
  }
}
