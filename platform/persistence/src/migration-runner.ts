import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { PoolClient } from 'pg';
import { PostgresConnection } from './postgres-connection.js';

/**
 * Sequential SQL-file migration runner. Migration files are plain `.sql`,
 * named with a sortable numeric prefix (e.g. `0001_create_suppliers.sql`),
 * applied in filename order, and tracked in a `_migrations` table scoped
 * to the connection's schema so each domain's migration history stays
 * isolated (ADR-0005).
 */
export class MigrationRunner {
  constructor(
    private readonly connection: PostgresConnection,
    private readonly migrationsDir: string,
  ) {}

  private async ensureMigrationsTable(client: PoolClient): Promise<void> {
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
  }

  private async appliedFilenames(client: PoolClient): Promise<Set<string>> {
    const result = await client.query<{ filename: string }>('SELECT filename FROM _migrations');
    return new Set(result.rows.map((row) => row.filename));
  }

  /** Returns the filenames actually applied during this call (empty if already up to date). */
  async run(): Promise<string[]> {
    const allFiles = (await readdir(this.migrationsDir))
      .filter((name) => name.endsWith('.sql'))
      .sort();

    return this.connection.withTransaction(async (client) => {
      await this.ensureMigrationsTable(client);
      const applied = await this.appliedFilenames(client);
      const newlyApplied: string[] = [];

      for (const filename of allFiles) {
        if (applied.has(filename)) continue;
        const sql = await readFile(join(this.migrationsDir, filename), 'utf-8');
        await client.query(sql);
        await client.query('INSERT INTO _migrations (filename) VALUES ($1)', [filename]);
        newlyApplied.push(filename);
      }

      return newlyApplied;
    });
  }
}
