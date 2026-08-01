# Bounded Context Map

Initial bounded-context map for `domains/`, per ADR-0001. This is provisional in a way the top-level architecture is not — it should be validated against real procurement process knowledge (e.g. event storming with actual domain experts) before or during Phase 6, rather than treated as immutable.

| Context | Owns | Depends on |
|---|---|---|
| `procurement-core` | Requisition -> approval -> PO -> receipt | `suppliers` (minimal reference data — a PO cannot exist without a supplier to reference) |
| `sourcing` | RFx, e-auctions, vendor bidding | `suppliers`, `catalog` |
| `contracts` | Contract lifecycle management | `suppliers` |
| `invoicing` | AP, invoice matching, payment triggers | `procurement-core` (PO/receipt data), `suppliers` |
| `suppliers` | Supplier master data, performance, risk | none — foundational |
| `catalog` | Item/catalog management, punchout content | none |

Cross-context dependencies happen through each context's `application/queries` or through domain events on `platform/events` — never through direct database access across schemas (ADR-0005) and never through one domain importing another's `domain/` internals.

External systems (`integrations/odoo`, `integrations/crm`) are consumed through each domain's own `ports/`, translated at the adapter boundary — no domain's `domain/` layer ever references Odoo or CRM data shapes directly (anti-corruption layer, ADR-0001).
