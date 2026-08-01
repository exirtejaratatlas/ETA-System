# integrations/odoo

Reserved by [ADR-0001](../../docs/decisions/ADR-0001-eta-system-target-architecture.md) for Odoo-facing integration concerns. Currently a stub — no buildable code.

**Status: Retired back to stub, 2026-07-24 ([ADR-0017](../../docs/decisions/ADR-0017-single-source-of-truth-odoo.md)).** This package previously held `OdooClient` (XML-RPC transport), ID mapping, and "sync Odoo data into ETA's own Postgres via domain commands" logic for `domains/suppliers` and `domains/procurement-core`. Under ADR-0017 (Odoo is the single source of truth; no duplicate persistence), that sync pattern is obsolete — there is no longer a local copy to sync into. Domain repositories now talk to Odoo directly:

- `OdooClient` and the Odoo-ID ↔ ETA-ID mapping helpers moved to **`platform/odoo`** (`@eta/odoo-client`) — reusable transport infrastructure with zero dependency on `domains/*`, the Odoo-backed equivalent of what `platform/persistence` provides for Postgres.
- The actual repository adapters now live where they belong per ADR-0001's hexagonal layering: `domains/procurement-core/adapters/outbound/odoo-purchase-order-repository.ts` and `domains/suppliers/adapters/outbound/odoo-supplier-repository.ts`.

This package is kept as a placeholder for a genuinely new purpose, not invented here — candidates raised elsewhere but not decided: the one-time Dynamics-CRM-to-Odoo legacy migration ([ADR-0016](../../docs/decisions/ADR-0016-remove-dynamics-crm-eta-platform-extends-odoo.md)), or future Odoo-side webhook ingestion.
