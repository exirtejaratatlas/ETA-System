# Prompt: Procurement Domain

**Use with:** `eta-procurement`, `eta-architecture`

```
Design/implement [specific capability] for the [sourcing|contracts|invoicing|
suppliers|catalog|procurement-core] bounded context. Before starting:
1. Check docs/architecture/context-map.md for where this capability actually
   belongs — cross-domain leakage is the most common DDD mistake here.
2. Confirm the hexagonal layering (domain/ -> application/ -> ports/ <-
   adapters/) and keep dependencies pointing inward only.
3. Cross-reference the Blueprint vault's Domains/ folder (via
   eta-knowledge-discovery) for real-world design intent before modeling
   from assumption.

Never put business logic in apps/ or platform/ — it belongs in domains/.
```
