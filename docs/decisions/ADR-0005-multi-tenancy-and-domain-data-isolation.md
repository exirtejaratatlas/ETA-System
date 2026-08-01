# ADR-0005: Multi-Tenancy and Domain Data Isolation

Status: Accepted (inferred — see Confidence note)
Date: 2026-07-23

## Context

Multi-tenancy was repeatedly flagged across prior audits as an open decision that compounds with domain data isolation and must be decided jointly, before any domain's persistence schema is finalized.

## Confidence note

This decision is **inferred from available evidence, not explicitly confirmed by the user**. The knowledge base contains real commercial documents (offer templates, invoices, letterhead) bearing Exir Tejarat Atlas's own company details as the selling/operating party, not a configurable customer identity — this reads as ETA-System being Exir Tejarat Atlas's own internal operating platform, not a multi-tenant SaaS product resold to other companies. If that reading is wrong, this ADR must be revisited before Phase 3 persistence work proceeds.

## Decision

- **Single-tenant.** ETA-System is built for one operating company (Exir Tejarat Atlas), not multiple customer organizations sharing the platform.
- **Domain data isolation: schema-per-domain** within one Postgres instance (ADR-0003) — each bounded context in `domains/` owns its own Postgres schema. This is lighter than database-per-domain but still gives each domain a real, enforced boundary, preserving the future-extraction seam from ADR-0001 without the operational cost of N separate database instances at current scale.

## Consequences

- No tenant-id partitioning is built into `platform/kernel` or `platform/persistence` at this stage.
- If ETA-System is ever offered to other companies as a product, tenancy must be designed in before that happens — this is flagged explicitly as a revisit trigger, not something to retrofit quietly later.
- Each domain's migrations live under its own schema; cross-domain queries (if ever needed) go through each domain's `application/queries`, never direct cross-schema joins from application code.
