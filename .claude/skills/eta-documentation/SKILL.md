---
name: eta-documentation
description: Use when writing or maintaining ETA-System documentation — READMEs, architecture docs, ADRs, runbooks, or setup guides. Trigger on "write docs for," "document this," "update the README," or "is this documented anywhere."
version: 1.0.0
last_updated: 2026-07-24
dependencies: []
related_skills:
  - eta-adr
  - eta-architecture
  - eta-evidence
related_adrs:
  - ADR-0001-eta-system-target-architecture
---

# ETA Documentation

## Ground truth

`docs/` is the single documentation source of truth per `CLAUDE.md`: `architecture/`, `decisions/` (ADRs), `standards/`, `setup/`, `templates/`. `docs/setup/SETUP.md` explicitly states no build/lint/test commands exist yet — always verify a command's backing config file is real and non-empty before suggesting it, per that file and the standing repo rule.

## Best practices

- Before writing new documentation, check `docs/` for an existing doc covering the same ground — extend it, don't fork a parallel doc (this repo's history of `00-System/` vs `bootstrap/` vs `system/` is the object lesson).
- Structural/architectural claims belong in `docs/architecture/` or an ADR, not scattered across READMEs — keep the single-source-of-truth property real, not just stated.
- Never document a command or feature as working without having verified it actually runs — `docs/setup/SETUP.md`'s caveat about unverified commands applies to any doc, not just that file.
- The `after-documentation.sh` hook reminds to cross-check ADR links after any `docs/decisions/` write — follow through on it rather than treating it as noise.

## Limitations

This skill doesn't generate documentation automatically from code — there's very little real code yet to document. Most current "documentation" work is intent/architecture description, which needs to be clearly labeled as such (Proposed, not Implemented) per standing project rules.
