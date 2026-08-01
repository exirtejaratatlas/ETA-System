# Prompt: Architecture Review

**Use with:** `eta-architecture`, `eta-adr`

```
Review [proposed change] against the frozen ETA-System architecture (ADR-0001).

1. Identify which top-level package(s) it touches and whether that placement
   matches docs/architecture/repository-structure.md and context-map.md.
2. Check docs/decisions/ for an existing ADR covering the same ground —
   extend/supersede rather than duplicate.
3. If the change is structural (new top-level concept, new cross-cutting
   capability, a layering violation), it needs a new ADR before
   implementation, not an ad hoc file.

Report clearly labeled as Proposed unless the user or an approved ADR has
confirmed it — never mark an architectural change "Implemented" on your
own authority.
```
