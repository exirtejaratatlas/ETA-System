# ADR-0016: Remove Microsoft Dynamics CRM From Target Architecture — ETA Platform Extends Odoo

Status: Accepted
Date: 2026-07-24

## Context

[ADR-0013](ADR-0013-crm-target-microsoft-dynamics.md) targeted Microsoft Dynamics CRM as an ongoing external system, integrated read-only via `integrations/crm`. A same-day follow-up correction from the user ([CR-008](../architecture/CONFLICT-REPORT.md#cr-008-live-public-website-and-operations-portal-exist-entirely-outside-this-repository--net-new-discovered-2026-07-24)) had refined this to a legacy chain (Website → Temporary Portal → Dynamics CRM 2016 On-Premise → Odoo ERP → ETA Platform) with Dynamics as an ongoing intermediate system.

The user has now issued a direct, explicit architecture decision superseding both: Dynamics is removed from the target architecture entirely, not merely repositioned in a chain.

## Decision

- **No standalone CRM system** in ETA's target architecture, now or later. `integrations/crm` is not an ongoing integration target.
- **Microsoft Dynamics CRM (2016 On-Premise)** is retired. If legacy data exists in it, it is migrated **once** into Odoo, then the Dynamics system is decommissioned — a one-time migration task, not a standing integration.
- **New target system chain:** Website → ETA Platform → Odoo ERP. The Temporary Portal and Dynamics both drop out of the ongoing chain (the portal is still real and still gets replaced by the ETA Platform per CR-008, but it is not itself part of the *target* chain being designed toward).
- **The ETA Platform extends Odoo — it does not replace it or duplicate its data.** Odoo ERP is the single source of truth for: Sales, Purchase, Inventory, Accounting, Contacts, Documents, Projects, Helpdesk, and Approvals.

## Alternatives considered

- **Keep Dynamics as the ongoing external CRM (ADR-0013's original position).** Rejected outright by the user — explicitly not part of the future system.
- **Build a standalone CRM domain inside ETA-System instead of Dynamics.** Explicitly rejected by the user ("Do not design any standalone CRM") — CRM-shaped functionality (Contacts, Sales) is Odoo's responsibility, not a new bounded context.

## Consequences

- **Supersedes [ADR-0013](ADR-0013-crm-target-microsoft-dynamics.md) in full.** ADR-0013's status is updated to reflect this; its content is left intact as a historical record (ADRs are append-only).
- **`integrations/crm`** (scaffolded per ADR-0001/ADR-0013) is repurposed as a one-time Dynamics-to-Odoo migration utility, not an anti-corruption layer for an ongoing integration. Whether it stays a permanent package for one migration run, or is deleted after the migration completes, is an open implementation question — not decided here.
- **A major open question this ADR does not resolve:** ADR-0005 and the existing `domains/procurement-core` / `domains/suppliers` implementation give each domain its own Postgres-backed persistence (schema-per-domain) as the aggregate's source of truth. This ADR now states Odoo is the single source of truth for Purchase, Contacts (suppliers/customers), etc. Whether `domains/procurement-core`'s own `PurchaseOrder` aggregate and Postgres table remain authoritative (with Odoo as a downstream sync target) or whether Odoo becomes authoritative (with `domains/` becoming a read-model/orchestration layer over Odoo) is **not decided by this ADR** and must be resolved — likely via its own ADR — before procurement-core/suppliers backend work resumes.
- The running Odoo environment ([ADR-0015](ADR-0015-existing-odoo-environment.md)) does not yet have Purchase or CRM-equivalent apps installed — this ADR increases the priority of installing them, since Odoo must now natively cover Sales/Purchase/Contacts/Documents/Projects/Helpdesk/Approvals.
- Any future mention of Microsoft Dynamics CRM in ETA-System documentation or code should be scoped strictly to the one-time legacy migration, never to an ongoing architectural role.
