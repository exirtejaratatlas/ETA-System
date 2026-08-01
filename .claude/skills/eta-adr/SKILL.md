---
name: eta-adr
description: Use whenever creating, reviewing, or reasoning about Architecture Decision Records for ETA-System. Trigger on "write an ADR," "does an ADR cover this," "ADR process," or any proposal for a structural/technical decision.
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - .claude/hooks/check-adr-sequence.sh (numbering check)
  - .claude/hooks/before-adr.sh (pre-creation reminder)
related_skills:
  - eta-architecture
  - eta-github
related_adrs:
  - ADR-0001-eta-system-target-architecture
---

# ETA ADR

## Ground truth

15 ADRs exist (`docs/decisions/ADR-0001` through `ADR-0015`), covering: target architecture, monorepo tooling/runtime split, database engine, event bus/outbox, multi-tenancy, secrets management, identity/authz, branch reconciliation, knowledge-base taxonomy, repo visibility, Odoo prototype prior art, Keycloak identity provider, Dynamics CRM target, Qdrant vector DB, and the existing Odoo environment. The architecture they collectively describe is **frozen** — any structural change needs a new ADR, not an edit to an existing one.

## Best practices

- Before writing a new ADR, search `docs/decisions/` for one that already covers the decision area — extend/supersede rather than duplicate.
- Number sequentially from the highest existing ADR; the `check-adr-sequence.sh` hook flags duplicates or gaps automatically after every write/edit to `docs/decisions/ADR-*.md`.
- ADRs are append-only artifacts: an accepted ADR gets superseded by a new one, never rewritten in place (the `before-edit.sh` hook warns on this).
- Every ADR should state: context, decision, alternatives considered, consequences, and status (Proposed/Accepted/Superseded) — check an existing ADR for the house format before writing a new one from scratch.
- Never mark an ADR "Accepted" on Claude's own authority — that status reflects explicit user/stakeholder sign-off.

## Limitations

This skill doesn't enforce ADR content quality, only numbering — a technically well-numbered ADR can still duplicate an existing decision if the search step above is skipped.
