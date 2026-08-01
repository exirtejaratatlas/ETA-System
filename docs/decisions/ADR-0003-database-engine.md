# ADR-0003: Database Engine

Status: Accepted
Date: 2026-07-23

## Context

`.gitignore` implied Postgres (`postgres/` entry) but no engine was ever formally chosen. Separately, prior prototyping (found during the knowledge-base audit) already stood up Odoo against a Postgres instance directly — Odoo itself requires Postgres, and that requirement extends transitively to ETA-System given Odoo-first ERP integration is frozen policy.

## Decision

**PostgreSQL** is the primary OLTP engine for ETA-System, one instance per environment. Within that instance, domains are isolated by **schema-per-domain** (see ADR-0005) rather than one shared schema or fully separate databases per domain — a middle ground appropriate to current scale that still preserves a clean seam for future extraction.

## Consequences

- `platform/persistence` is built around Postgres/standard Node Postgres tooling; a specific migration tool is chosen at Phase 3, not here.
- Odoo's own Postgres requirement and ETA-System's transactional store can run as separate logical databases on the same or different Postgres instances — they are not the same database, to keep the anti-corruption layer (ADR-0001) real rather than nominal.
- If a future domain's throughput or compliance requirements demand a dedicated engine (e.g. a time-series store for observability data), that is scoped as an addition alongside Postgres, not a replacement of this decision, and gets its own ADR.
