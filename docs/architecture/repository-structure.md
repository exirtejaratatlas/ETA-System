# Repository Structure

This is the single canonical description of ETA-System's top-level layout. It replaces the previous, duplicated `Folder-Map.md` / `Repository-Map.md` / `docs/architecture/SYSTEM.md` files. The full rationale and decision record lives in [ADR-0001](../decisions/ADR-0001-eta-system-target-architecture.md).

```
apps/           deployable surfaces: web, bff, gateway, workers
domains/        DDD bounded contexts: procurement-core, sourcing, contracts, invoicing, suppliers, catalog
platform/       cross-cutting capabilities: kernel, events, workflow-engine, audit, secrets,
                feature-flags, observability, plugins, documents, design-system, persistence
ai/             orchestrator, agents, memory, knowledge (graph + retrieval), prompts, mcp-registry
integrations/   anti-corruption layer: odoo, crm, punchout (future)
data/           analytics/ML pipeline: pipeline, warehouse, feature-store
infra/          infrastructure as code: iac, k8s, messaging, observability, secrets, environments
governance/     security, ai-governance, compliance
docs/           architecture, decisions (ADRs), standards, setup, templates
```

Each `domains/*` package follows a fixed internal layering (see ADR-0001):

```
domain/                    entities, value objects, domain events — zero outward dependencies
application/commands/      write-side use cases
application/queries/       read-side use cases
ports/                     interfaces the domain owns
adapters/inbound/          controllers (REST/GraphQL/event handlers)
adapters/outbound/         persistence and external-system clients — implement ports/
```

Dependencies only ever point inward (`adapters` → `ports` ← `application` → `domain`). See the [bounded-context map](context-map.md) for how the six domains relate to each other.
