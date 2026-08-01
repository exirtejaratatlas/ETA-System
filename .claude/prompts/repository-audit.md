# Prompt: Repository Audit

**Use with:** `eta-architecture`, `eta-github`, `eta-indexing`

```
Audit the current state of the ETA-System repository: branches, uncommitted
changes, structural drift from ADR-0001, and test/build tooling that
actually works (vs. just has config present).

Steps:
1. git status / git branch -a / git log --oneline -20
2. Regenerate .claude/index/repository-index.json and diff against the
   version committed here to see what's structurally changed.
3. Check docs/decisions/ for any ADR whose status may need updating given
   what you find.

Report as findings (VERIFIED facts, not assumptions) — this is read-only
investigation, not a scaffolding or cleanup task unless explicitly asked.
```
