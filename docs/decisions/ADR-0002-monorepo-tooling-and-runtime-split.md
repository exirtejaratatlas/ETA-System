# ADR-0002: Monorepo Tooling and Language/Runtime Split

Status: Accepted
Date: 2026-07-23

## Context

`.gitignore` hinted at both a Node/Next.js stack and a Python stack without ever committing to how they coexist. Separately, the audit flagged that hexagonal dependency-direction rules (`domain → application → ports ← adapters`, `platform` has zero outward deps) need real tooling enforcement, not just a lint convention, or they erode silently as the codebase grows.

## Decision

- Use **Nx** as the monorepo tool. Nx supports polyglot workspaces natively and provides enforceable module-boundary rules via project tags, which solves the tooling gap and the boundary-enforcement gap in one decision rather than two.
- Language split: **TypeScript** for `apps/`, `domains/`, `platform/`, `integrations/`, and `data/` orchestration code. **Python** for `ai/` (agents, orchestrator, memory, knowledge, and any ML/embedding work), where the ecosystem is materially stronger.
- Nx boundary tags are assigned to every package the moment it's created (e.g. `scope:domain`, `scope:platform`, `type:domain-core`, `type:adapter`) so illegal imports (a domain importing another domain's internals, or importing an adapter directly instead of through a port) fail CI rather than being caught in review.

## Consequences

- CI needs both a Node toolchain and a Python toolchain from Phase 1 onward.
- Cross-language calls between TypeScript domains/platform and the Python `ai/` stack happen through defined interfaces (HTTP/RPC or the event bus in `platform/events`), never direct imports — this is a natural consequence of the language boundary and reinforces the hexagonal seam between `ai/` and everything else.
- If a future domain's needs outgrow this split (e.g. a domain needs Python for a specific calculation), that is a genuine architectural change and needs its own ADR, not a silent exception.
