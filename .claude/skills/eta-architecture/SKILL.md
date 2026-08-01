---
name: eta-architecture
description: Use for any question about ETA-System's overall repository/system architecture — the frozen v3 target layout, how packages relate, or whether a proposed change fits within it. Trigger on "architecture review," "where should this go," "does this fit the frozen architecture," or "explain the repo layout."
version: 1.0.0
last_updated: 2026-07-24
dependencies: []
related_skills:
  - eta-adr
  - eta-procurement
  - eta-indexing
related_adrs:
  - ADR-0001-eta-system-target-architecture
  - ADR-0002-monorepo-tooling-and-runtime-split
---

# ETA Architecture

## Ground truth

The target architecture is frozen as of 2026-07-23 (ADR-0001). Canonical description: `docs/architecture/repository-structure.md` (full detail) and `CLAUDE.md` (summary). Top-level packages: `apps/` (deployable surfaces only), `domains/` (six DDD bounded contexts), `platform/` (cross-cutting capabilities), `ai/` (peer to domains, not nested under platform), `integrations/` (anti-corruption layer), `data/` (analytics/ML, separate from transactional persistence), `infra/` (IaC, zero business logic), `governance/`, `docs/`. Language split per ADR-0002: TypeScript everywhere except `ai/`, which is Python.

No `package.json`, monorepo tooling, source code, build pipeline, test suite, or lockfile existed as of the last verified check (per `CLAUDE.md`) beyond what's been added since — always verify current state with `find`/`ls` rather than assuming the bootstrap-stage description in `CLAUDE.md` is still accurate.

## Best practices

- Structural change (new top-level dir, new cross-cutting package) requires a new ADR — never an ad hoc edit. `before-write.sh` warns automatically when a write targets a path outside the ten known top-level packages.
- When unsure where a capability belongs, check `docs/architecture/context-map.md` for how domains/platform/integrations relate before guessing.
- Prefer extending an existing package over introducing a new one — this is the single most important standing rule across this entire codebase's history (see the retired `00-System/`/`bootstrap/`/`system/` schemes for the cautionary tale).

## Limitations

This skill describes the target, not what's built — always distinguish "the frozen architecture says X belongs here" from "X currently exists here," since almost everything is still a stub.
