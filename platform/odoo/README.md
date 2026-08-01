# platform/odoo

Odoo transport toolkit ([ADR-0017](../../docs/decisions/ADR-0017-single-source-of-truth-odoo.md)) — the Odoo-backed equivalent of what `platform/persistence` provides for Postgres: reusable infrastructure any domain's `adapters/outbound` can depend on directly, with zero dependency on `domains/*` itself (so the dependency direction stays domains → platform, never platform → domains, per ADR-0001).

**Status: Implemented.** Moved out of `integrations/odoo` when that package's old "sync into local Postgres" role became obsolete under ADR-0017 (Odoo is the single source of truth — there is no local copy to sync into anymore).

- `odoo-client.ts` — `OdooClient`, XML-RPC transport (`authenticate`, `execute`, `searchRead`, `create`, `write`, `unlink`) against Odoo's standard `/xmlrpc/2/common` and `/xmlrpc/2/object` external API.
- `id-mapping.ts` — deterministic, reversible Odoo-ID ↔ ETA-EntityId mapping (`odoo-partner-{id}`, `odoo-po-{id}`), plus `extractOdooId` for recovering the original Odoo id when one is available without a lookup.
- Consumed by `domains/procurement-core/adapters/outbound/odoo-purchase-order-repository.ts` and `domains/suppliers/adapters/outbound/odoo-supplier-repository.ts`.
- **Not yet live-verified**: needs `x_eta_id` (and per-domain `x_eta_status`/`x_eta_category`/`x_eta_certifications`) custom fields provisioned on the real Odoo instance (ADR-0015) before these repositories can run end-to-end — same "credentials/access required" stop condition documented in `integrations/odoo`'s history.
