import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

/**
 * Postgres 16 connection pool (ADR-0003, ADR-0011). One pool per process;
 * schema isolation between domains (ADR-0005) happens via the `schema`
 * option, not via separate pools/databases.
 */
export interface PostgresConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  /** Default schema for this connection's search_path — one per domain (ADR-0005). */
  schema: string;
  max?: number;
}

export class PostgresConnection {
  private readonly pool: Pool;

  constructor(config: PostgresConfig) {
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      max: config.max ?? 10,
      options: `-c search_path=${config.schema},public`,
    });
  }

  async query<R extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[],
  ): Promise<QueryResult<R>> {
    return this.pool.query<R>(text, params);
  }

  /**
   * Runs `fn` inside a transaction. Commits on success, rolls back and
   * rethrows on any error — this is the building block the outbox pattern
   * (ADR-0004) depends on: a domain write and its outbox insert must
   * share this same transaction.
   */
  async withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await fn(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
