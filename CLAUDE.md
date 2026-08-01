# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

ETA-System ("Enterprise Procurement AI Operating System") is past the bootstrap taxonomy stage. As of 2026-07-23 the target architecture is frozen (see [ADR-0001](docs/decisions/ADR-0001-eta-system-target-architecture.md)) and the repository has been scaffolded to match it — but there is still no `package.json`, no monorepo tooling installed, no source code, no build pipeline, no test suite, and no lockfile anywhere in the tree. Every file under `domains/`, `platform/`, `ai/`, `integrations/`, `data/`, `infra/` is currently a `README.md` stub (or `.gitkeep` placeholder in the deeper hexagonal-layering folders) describing intent, not implementation.

**Do not assume build/lint/test commands exist.** Before running or suggesting any command (`npm run ...`, `nx ...`, `pytest`, `docker compose up`, etc.), verify the relevant config/manifest file actually exists and is non-empty — none currently do. `docs/setup/SETUP.md` says so explicitly and is the file to check before assuming otherwise.

The old bootstrap taxonomy (`00-System/`, root-level `agents/`, `architecture/`, `packages/`, `releases/`, `roadmap/`, `standards/`, `templates/`, `TREE.txt`) has been retired and removed — see [ADR-0001](docs/decisions/ADR-0001-eta-system-target-architecture.md) and the full audit trail in `docs/decisions/` for why. Two remote branches (`origin/develop`, `origin/feature/system-core`) still carry an even earlier, abandoned numbered-doc scheme (`bootstrap/`, `system/`) that was never merged into `main` — see [ADR-0008](docs/decisions/ADR-0008-branch-reconciliation.md).

## Repository layout (frozen architecture — ADR-0001)

The full canonical description lives in [`docs/architecture/repository-structure.md`](docs/architecture/repository-structure.md); this is a summary. **The architecture is frozen** — any structural change requires a new ADR in `docs/decisions/` per the process in that folder, not an ad hoc edit here.

- **`apps/`** — deployable surfaces only: `web`, `bff`, `gateway`, `workers`. Never business logic — that lives in `domains/`.
- **`domains/`** — DDD bounded contexts: `procurement-core`, `sourcing`, `contracts`, `invoicing`, `suppliers`, `catalog`. Each follows a fixed hexagonal layering (`domain/ → application/{commands,queries}/ → ports/ ← adapters/{inbound,outbound}/`) — dependencies only ever point inward. See [`docs/architecture/context-map.md`](docs/architecture/context-map.md) for how they relate to each other.
- **`platform/`** — cross-cutting capabilities every domain depends on: `kernel` (shared kernel — deliberately minimal), `events`, `workflow-engine`, `audit`, `secrets`, `feature-flags`, `observability`, `plugins`, `documents`, `design-system`, `persistence`.
- **`ai/`** — peer to `domains/`, not nested under `platform/`: `orchestrator/{router,guardrails,evaluation,execution}`, `agents`, `memory`, `knowledge/{graph,retrieval}`, `prompts`, `mcp-registry`.
- **`integrations/`** — anti-corruption layer: `odoo` (primary ERP system of record — Odoo-first per ADR-0001), `crm` (target system not yet chosen), `punchout` (future, not built).
- **`data/`** — analytics/ML pipeline, separate from transactional persistence: `pipeline`, `warehouse`, `feature-store`.
- **`infra/`** — infrastructure as code, zero business logic: `iac`, `k8s`, `messaging`, `observability`, `secrets`, `environments`.
- **`governance/`** — `security`, `ai-governance`, `compliance`.
- **`docs/`** — the single documentation source of truth: `architecture`, `decisions` (ADRs — read these before assuming a decision hasn't been made), `standards`, `setup`, `templates`.

When adding real content, place it under the `domains/` / `platform/` / `ai/` / `integrations/` package whose name matches its purpose, following that package's internal layering convention — never invent a new top-level directory without first writing an ADR (per the standing "no duplicate concepts, ask before new architecture" rule).

Language split (ADR-0002): TypeScript for `apps/`, `domains/`, `platform/`, `integrations/`, `data/`; Python for `ai/`.

## License

Proprietary — Copyright (c) Exir Tejarat Atlas, All Rights Reserved. This is not an open-source project.
