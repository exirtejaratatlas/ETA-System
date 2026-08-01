# ADR-0017: Single Source of Truth — Odoo Owns Business Persistence

Status: Accepted
Date: 2026-07-24

## Context

ADR-0016 established that Odoo ERP is the single source of truth for Sales, Purchase, Inventory, Accounting, Contacts, Documents, Projects, Helpdesk, and Approvals, with the ETA Platform extending Odoo rather than replacing it. This ADR makes the implementation-level consequence explicit, resolving the tension flagged in ADR-0016's Consequences section and in `.claude/memory/odoo.md`: `domains/procurement-core` and `domains/suppliers` currently persist their aggregates in their own Postgres schemas (ADR-0005, schema-per-domain), which duplicates business data Odoo now owns.

The user has clarified ETA-System's own identity directly: **ETA is not a business-data platform — it is an AI orchestration platform built on top of Odoo.** ETA owns AI, automation, workflows, portals, and integrations. It does not own business persistence.

## Decision

- **Odoo is the only source of truth** for business entities: Suppliers, Purchase Orders, Customers, Inventory, Accounting, Approvals, Contacts — and, per ADR-0016, Sales/Documents/Projects/Helpdesk as those domains are built out.
- **No duplicate persistence.** A domain's aggregate is never simultaneously stored in ETA's own Postgres and in Odoo. Where a domain's data belongs to Odoo, ETA holds no independent copy beyond what's needed transiently in memory for a request.
- **The hexagonal layering does not change** (ADR-0001): `domain/` (entities, invariants) and `application/` (command/query handlers) are unaffected by this decision — they remain persistence-ignorant, as hexagonal architecture requires. Only the **adapter** changes:
  - Before: `Repository (port) → PostgresXRepository (adapter) → PostgreSQL`
  - Now: `Repository (port) → OdooXRepository (adapter) → Odoo external API (XML-RPC)`
- Each domain's `PurchaseOrderRepositoryPort` / `SupplierRepositoryPort` (etc.) is unchanged as an interface — the port is the seam that made this swap possible without touching business logic.
- **Identity round-tripping** uses a custom field (`x_eta_id`) on the relevant Odoo model to store ETA's own string-typed entity ID alongside Odoo's native integer `id`. This is a new, explicit prerequisite on the Odoo side (a small custom field per model, not a full custom addon) — see Consequences.
- **ETA-specific concepts with no native Odoo field** (e.g. a Supplier's `certifications`, ETA's richer `PurchaseOrderStatus` enum) are stored as additional custom fields on the same Odoo record (`x_eta_certifications`, `x_eta_status`), not in a separate ETA-owned table. This keeps the record whole in Odoo rather than splitting an aggregate across two systems.

## Alternatives considered

- **Keep Postgres as a local cache/read-model, synced from Odoo.** Rejected — this is exactly the "duplicate persistence" the user ruled out. A cache implies a second copy that can drift from the source of truth.
- **Event-sourced sync (outbox pattern) between ETA's Postgres and Odoo.** Rejected for the same reason — still two persisted copies, just kept eventually-consistent instead of avoided.
- **Give up the hexagonal port/adapter boundary and let application handlers call Odoo directly.** Rejected — the port already isolates business logic from storage; discarding it would mean rewriting `application/` for every future storage change instead of just the adapter, which is precisely the flexibility ADR-0001 bought.

## Consequences

- `domains/procurement-core/adapters/outbound/postgres-purchase-order-repository.ts` and `domains/suppliers/adapters/outbound/postgres-supplier-repository.ts`, plus their SQL migrations, are removed — replaced by `odoo-purchase-order-repository.ts` / `odoo-supplier-repository.ts`.
- A new platform package, **`platform/odoo`** (`@eta/odoo-client`), holds the transport-only `OdooClient` (XML-RPC) and ID-mapping helpers — the Odoo equivalent of what `platform/persistence`'s `PostgresConnection` provided for Postgres. It has zero dependency on any `domains/*` package, so `domains/*/adapters/outbound` can depend on it without inverting ADR-0001's dependency direction (domains never depend on `integrations/`).
- **`integrations/odoo`'s previous role (batch "sync Odoo data into ETA's Postgres via domain commands") is obsolete** now that repositories talk to Odoo directly — there is no local copy left to sync into. Its sync classes are removed; the package returns to a stub (README only) pending a genuinely new purpose (e.g. the one-time Dynamics-to-Odoo legacy migration from ADR-0016, or future webhook ingestion) — not invented here.
- **New operational prerequisite, not yet done:** the real Odoo environment (ADR-0015) needs `x_eta_id` (and `x_eta_status` / `x_eta_certifications` where used) added as custom fields on `purchase.order` and `res.partner` before this code can run end-to-end. Until then, this is implemented and unit-tested but not live-verified — same "credentials/access required" stop condition already documented for `integrations/odoo`.
- `apps/bff` no longer opens any Postgres connection for suppliers/procurement-core — it opens one shared `OdooClient` instead. `platform/persistence` itself is untouched and remains available for anything ETA does own the persistence of (e.g. its own automation/workflow state), just not for these two domains anymore.
- Every future domain that models an Odoo-owned business concept (Inventory, Accounting, Contacts, Documents, Projects, Helpdesk, Approvals) should follow this same pattern by default: Odoo-backed adapter first, not Postgres.
