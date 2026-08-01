# Business Memory

**VERIFIED** — ETA-System is described as the "Enterprise Procurement AI Operating System" ([CLAUDE.md](../../CLAUDE.md)). Its business domain is procurement: sourcing, contracts, invoicing, suppliers, catalog, per the six `domains/` bounded contexts in [ADR-0001](../../docs/decisions/ADR-0001-eta-system-target-architecture.md).

**VERIFIED** — Odoo is the primary ERP system of record ("Odoo-first," [ADR-0001](../../docs/decisions/ADR-0001-eta-system-target-architecture.md)); Microsoft Dynamics is the target CRM system ([ADR-0013](../../docs/decisions/ADR-0013-crm-target-microsoft-dynamics.md)), not yet built.

**PARTIALLY VERIFIED** — The business may involve multiple legal entities (see "Allison General Trading LLC" in `company-profile.md`) with implications for multi-tenancy design ([ADR-0005](../../docs/decisions/ADR-0005-multi-tenancy-and-domain-data-isolation.md)) — not independently re-confirmed.

**UNKNOWN** — Detailed business model specifics (revenue model, customer base, org chart) beyond what's captured in ADRs — see `company-profile.md` and `knowledge.md` for the Drive-side gaps.
