---
name: eta-procurement
description: Use when discussing the procurement domain — sourcing, contracts, invoicing, suppliers, catalog bounded contexts, or the Enterprise Procurement AI Operating System's core business purpose. Trigger on "procurement domain," "sourcing workflow," "supplier management," or "what does ETA actually do."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - eta-architecture
  - eta-knowledge-discovery
related_skills:
  - eta-odoo
  - eta-documentation
related_adrs:
  - ADR-0001-eta-system-target-architecture
  - ADR-0005-multi-tenancy-and-domain-data-isolation
---

# ETA Procurement

## Ground truth

Per ADR-0001, `domains/` holds six DDD bounded contexts: `procurement-core`, `sourcing`, `contracts`, `invoicing`, `suppliers`, `catalog`. Each follows a fixed hexagonal layering (`domain/ -> application/{commands,queries}/ -> ports/ <- adapters/{inbound,outbound}/`), dependencies only pointing inward. All six are currently `README.md` stubs — no procurement business logic exists yet anywhere in the repo.

`docs/architecture/context-map.md` documents how these six contexts relate to each other and to `platform/` and `integrations/` — read it before proposing any cross-domain interaction, since bounded-context boundaries are exactly what DDD is meant to protect.

## Best practices

- Never implement procurement business logic outside `domains/` — no shortcuts into `apps/` or `platform/`, per the ADR-0001 layering rule.
- Before adding a new capability to any of the six domains, check that domain's existing hexagonal folders (even if currently just `.gitkeep`s) for the right layer, and check `docs/architecture/context-map.md` for whether the capability actually belongs in a different bounded context.
- Cross-reference real-world procurement knowledge from the Blueprint vault (`02-BLUEPRINT/Domains/`) via `eta-knowledge-discovery` before designing a domain model from assumption.

## Limitations

Zero procurement business logic exists in code yet. Any question about "how sourcing currently works" resolves to the Blueprint's design intent (if verified) or `UNKNOWN` — never to an inferred implementation.
