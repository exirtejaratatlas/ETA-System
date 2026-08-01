# domains/suppliers

Bounded context: supplier master data, performance, risk.

**Status: Implemented.** Traceable to: ADR-0001 (bounded context definition) · [context-map.md](../../docs/architecture/context-map.md) · Blueprint vault's Supplier Domain spec (semantic index) · real Iranian steel manufacturer data (semantic index) informing the Certification/standard-grade model. Business requirement: real commercial documents (Offer/Invoice templates) require a Standard/Grade on every line item, so the domain enforces "no Active status without at least one certification" as a real rule, not a cosmetic one.

- `domain/` — `Supplier` aggregate with `register`/`activate`/`suspend`/`recordCertification`, all validated.
- `application/` — command handlers (Register, Activate, Suspend, RecordCertification) and query handlers (GetById, ListByProductCategory), all returning `Result` rather than throwing for expected failures.
- `ports/` — `SupplierRepositoryPort`.
- `adapters/outbound/` — `OdooSupplierRepository` ([ADR-0017](../../docs/decisions/ADR-0017-single-source-of-truth-odoo.md): Odoo is the single source of truth — the earlier `PostgresSupplierRepository` and its migration are retired). Talks to `res.partner` via `@eta/odoo-client`; ETA-only concepts (`certifications`, `category`, `status`) round-trip through custom fields (`x_eta_id`, `x_eta_certifications`, `x_eta_category`, `x_eta_status`).
- Unit tests passing (`npx vitest run`), covering domain rules and command-handler behavior against an in-memory port implementation — the Odoo adapter itself is implemented but not yet live-verified (needs the custom fields provisioned on the real Odoo instance first).
