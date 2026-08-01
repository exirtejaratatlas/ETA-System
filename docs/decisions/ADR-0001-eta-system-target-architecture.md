# ADR-0001: ETA-System Target Architecture

Status: Accepted
Date: 2026-07-23

## Context

ETA-System started as an empty directory taxonomy with no real content. Across several design and gate-review passes, a target architecture was developed, challenged, and re-reviewed against DDD, Clean/Hexagonal Architecture, Event-Driven Architecture, CQRS-readiness, and enterprise-scale concerns (identity, observability, secrets, audit, data governance). This ADR is the single, canonical record of that architecture. It supersedes the empty placeholder that previously lived at `decisions/ADR-001-Repository-Architecture.md`.

## Decision

Adopt the following top-level repository structure as frozen:

- `apps/` — deployable surfaces only: `web`, `bff`, `gateway`, `workers`.
- `domains/` — DDD bounded contexts: `procurement-core`, `sourcing`, `contracts`, `invoicing`, `suppliers`, `catalog`. Each follows a fixed internal layering: `domain/` (entities, value objects, domain events — zero outward dependencies) → `application/{commands,queries}/` (CQRS-ready use cases) → `ports/` (interfaces the domain owns) ← `adapters/{inbound,outbound}/` (implement the ports). Dependencies only ever point inward.
- `platform/` — cross-cutting capabilities every domain depends on: `kernel` (shared kernel: Money, Currency, EntityId, DomainEvent, Result — deliberately minimal), `events` (event bus abstraction + schema registry), `workflow-engine`, `audit`, `secrets`, `feature-flags`, `observability`, `plugins`, `documents`, `design-system`, `persistence`.
- `ai/` — peer to `domains/`, not nested under `platform/`: `orchestrator/{router,guardrails,evaluation,execution}`, `agents`, `memory`, `knowledge/{graph,retrieval}`, `prompts`, `mcp-registry`.
- `integrations/` — anti-corruption layer, adapters implementing domain ports: `odoo` (primary ERP system of record), `crm`, `punchout` (flagged for the future, not built).
- `data/` — analytics/ML pipeline, separate from transactional persistence: `pipeline`, `warehouse`, `feature-store`.
- `infra/` — infrastructure as code, zero business logic: `iac`, `k8s`, `messaging`, `observability`, `secrets`, `environments`.
- `governance/` — `security`, `ai-governance`, `compliance`.
- `docs/` — the single documentation tree: `architecture` (including a bounded-context map and C4 diagrams), `decisions` (this ADR sequence), `standards`, `setup`, `templates`.

## Consequences

- The architecture is frozen. Any future structural change requires a new ADR that states motivation, describes impact, preserves backward compatibility where possible, and justifies why the change is necessary rather than avoidable.
- The prior taxonomy (`00-System/`, root-level `agents/`, `architecture/`, `packages/*`, `releases/`, `roadmap/`, `standards/`, `templates/`, `TREE.txt`) is retired in favor of the structure above — tracked in this same Phase 0/1 pass, not left to accumulate as dead weight.
- Enterprise-scaling stance: build as a modular monolith with hexagonal seams, not microservices on day one. Each domain's only public surface is its `application/` + `ports/`; today that's called in-process, and any domain can be extracted into an independently deployed service later by swapping the in-process call for a network/event call at the port boundary, without a domain rewrite.
