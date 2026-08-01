# domains/procurement-core

Bounded context: requisition -> approval -> PO -> receipt. The core domain (ADR-0001) — depends on domains/suppliers for a minimal supplier reference, nothing else.

**Status: Implemented.** Traceable to: ADR-0001 (core bounded context) · [context-map.md](../../docs/architecture/context-map.md) (depends on `suppliers` for a minimal reference, by ID only) · Blueprint vault's Procurement Domain spec and Financial Approval Matrix concept (semantic index) · real commercial document structure (Offer/Invoice templates: description, standard, quantity, unit price, total).

- `domain/` — `PurchaseOrder` aggregate with `create`/`submitForApproval`/`approve`/`send`/`recordReceipt`/`cancel`, full status lifecycle (Draft → PendingApproval/Approved → Sent → PartiallyReceived/Received, plus Cancelled), and an injected `ApprovalPolicy` (threshold-based approval requirement — the concrete threshold is a business/finance configuration, not hardcoded into the domain).
- `application/` — Create, SubmitForApproval, Approve, Send, RecordReceipt, Cancel command handlers; GetById query handler.
- `ports/` — `PurchaseOrderRepositoryPort`.
- `adapters/outbound/` — `OdooPurchaseOrderRepository` ([ADR-0017](../../docs/decisions/ADR-0017-single-source-of-truth-odoo.md): Odoo is the single source of truth, not Postgres — the earlier `PostgresPurchaseOrderRepository` and its migration are retired). Talks to `purchase.order`/`purchase.order.line` via `@eta/odoo-client`, round-tripping ETA's id through a custom `x_eta_id` field.
- `apps/bff` exposes the full lifecycle over HTTP (`/api/purchase-orders`, auth-gated same as suppliers) — see `apps/bff/src/purchase-order-routes.ts`.
- 13 unit tests passing (9 domain-level lifecycle + 4 command-handler-level), covering the full status lifecycle, both sides of the approval-threshold policy, and error-result handling for invalid input / unknown ids.
