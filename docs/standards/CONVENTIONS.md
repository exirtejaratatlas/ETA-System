# Coding & Repository Conventions

- **Folder naming:** kebab-case for all directories (`procurement-core`, not `ProcurementCore` or `procurement_core`).
- **ADRs:** sequential numbering in `docs/decisions/`, never reused, never renumbered. Format: `ADR-NNNN-short-kebab-title.md`. See [ADR-0001](../decisions/ADR-0001-eta-system-target-architecture.md) for the architecture they govern.
- **No parallel documentation trees.** `docs/` is the single documentation source of truth (ADR-0001). Do not create a second numbered or differently-organized doc scheme elsewhere in the repo — this repository has already made that mistake once (see the retired `00-System/` vs `bootstrap/` history) and it is not to be repeated.
- **No duplicate concepts.** Before creating a new domain, package, workflow, prompt, or ADR, search `domains/`, `platform/`, `integrations/`, `ai/`, and `docs/decisions/` for existing coverage. Extend, don't duplicate.
- **Dependency direction (hexagonal):** within any `domains/*` package, dependencies only point inward — `adapters` depend on `ports`, `application` depends on `domain`, `domain` depends on nothing in this repository. Enforced via Nx module-boundary tags (ADR-0002).
- **Language split:** TypeScript for `apps/`, `domains/`, `platform/`, `integrations/`, `data/`; Python for `ai/` (ADR-0002).
