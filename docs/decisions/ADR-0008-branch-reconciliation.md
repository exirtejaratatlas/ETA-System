# ADR-0008: Branch Reconciliation

Status: Accepted
Date: 2026-07-23

## Context

`origin/develop` and `origin/feature/system-core` diverged from `main` after the `9385ea4` merge commit and were never merged back in. They carried a competing numbered `bootstrap/`+`system/` documentation scheme, and were historically the only place naming Odoo, a Memory-System, Skills, an MCP-Registry, or an AI-Orchestrator as concepts.

## Decision

Every concept those branches anticipated is now fully represented in the frozen architecture recorded in ADR-0001 (`integrations/odoo`, `ai/memory`, `ai/mcp-registry`, `ai/orchestrator`). Nothing unique remains stranded on them.

Recommendation (not executed by this ADR, since deleting shared remote branches is a visible, hard-to-reverse action left to explicit user execution): tag the tip commits of both branches for posterity (e.g. `archive/develop-2026-07-22`, `archive/feature-system-core-2026-07-22`), then delete the branches from the remote.

## Consequences

- No prior work is lost — it's superseded and the supersession is documented here, not silently discarded.
- Until the branches are actually archived/deleted, they remain a source of confusion for anyone browsing the repo on GitHub and should not be treated as active development lines.
