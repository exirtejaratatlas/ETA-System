# platform/persistence

Generic Postgres toolkit (ADR-0003) — migration runner, base repository pattern, and the outbox table convention used by platform/events.

**Status: Implemented.** Traceable to: ADR-0001 (defines scope) · ADR-0003/ADR-0011 (Postgres 16, `eta` db) · ADR-0004 (outbox pattern) · ADR-0005 (schema-per-domain). Built and typechecked clean via `nx build persistence`.

- `postgres-connection.ts` — pooled connection scoped to one domain's schema via `search_path`; `withTransaction` is the primitive the outbox pattern depends on.
- `migration-runner.ts` — sequential `.sql` file runner, tracked in a schema-scoped `_migrations` table.
- `base-repository.ts` — generic row-to-entity mapping base for domain repositories.
- `outbox.ts` — `insertOutboxEvent` (call inside the same transaction as the domain write) and `OutboxRelay` (polls unpublished rows; publish function is injected so this package never depends on platform/events).
