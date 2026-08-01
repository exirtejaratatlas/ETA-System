# Architecture Memory

**VERIFIED** — The target architecture is frozen as of 2026-07-23 ([ADR-0001](../../docs/decisions/ADR-0001-eta-system-target-architecture.md)). Ten top-level packages: `apps/`, `domains/`, `platform/`, `ai/`, `integrations/`, `data/`, `infra/`, `governance/`, `docs/`, plus this `.claude/` operating layer (not part of the frozen business architecture). Canonical description: `docs/architecture/repository-structure.md`.

**VERIFIED** — Six DDD bounded contexts under `domains/`: `procurement-core`, `sourcing`, `contracts`, `invoicing`, `suppliers`, `catalog`. Each follows fixed hexagonal layering: `domain/ -> application/{commands,queries}/ -> ports/ <- adapters/{inbound,outbound}/`, dependencies only pointing inward.

**VERIFIED** — Language split ([ADR-0002](../../docs/decisions/ADR-0002-monorepo-tooling-and-runtime-split.md)): TypeScript for `apps/`, `domains/`, `platform/`, `integrations/`, `data/`; Python for `ai/`.

**VERIFIED** (as of this build, 2026-07-24) — `apps/bff` and several `platform/*` packages (`kernel`, `events`, `secrets`, `feature-flags`, `observability`, `persistence`) and `integrations/odoo` now have real `src/` directories with compiled output (`out-tsc`) — implementation has progressed past pure stubs for at least these packages. `domains/*` remain README-only stubs as of the last structural scan (`.claude/index/repository-index.json`). Re-run that scan before trusting this line long-term.

**PARTIALLY VERIFIED** — Multi-tenancy / multi-entity structure ([ADR-0005](../../docs/decisions/ADR-0005-multi-tenancy-and-domain-data-isolation.md)) may need to account for an "Allison General Trading LLC" entity mentioned in the Blueprint's Enterprise Data Dictionary — surfaced by a subagent report, not independently re-read.

**UNKNOWN** — Whether the abandoned `develop`/`feature/system-core` branch taxonomies ([ADR-0008](../../docs/decisions/ADR-0008-branch-reconciliation.md)) contain anything worth salvaging beyond what ADR-0008 already extracted.
