# Prompt (Library) Memory

**VERIFIED** — `ai/prompts/` is the frozen-architecture home for the AI prompt library ([ADR-0001](../../docs/decisions/ADR-0001-eta-system-target-architecture.md)); as of the last check it's a README stub.

**VERIFIED** (this build, 2026-07-24) — `.claude/prompts/` now holds 15 reusable prompt templates for recurring review/audit/handoff workstreams (website review/refactor, company-profile review/design, Odoo audit/development, procurement domain, repository audit, Google Drive discovery, evidence report, three handoff types, GitHub synchronization, architecture review). These are Claude-tooling prompts, distinct from `ai/prompts/`, which is reserved for prompts that are part of the ETA product itself (e.g., prompts the `ai/orchestrator` runtime would execute).

**UNKNOWN** — Whether Drive's `11_Prompts` folder (currently indexed as an empty placeholder) is meant to seed `ai/prompts/` once real product prompts are authored.
