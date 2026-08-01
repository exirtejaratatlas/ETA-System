---
name: eta-production-safety
description: Use before any action that could affect a real, running system — the Odoo/Postgres dev environment, Docker, git history, the repository itself, or (once it exists) the live website. This is the safety-layer skill; load it whenever a task looks destructive or irreversible. Trigger on "is this safe," "will this affect production," or automatically before any BeforeOdoo/BeforeDocker/BeforeDelete hook fires.
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - .claude/safety/policy.md
  - .claude/hooks/before-odoo.sh
  - .claude/hooks/before-docker.sh
  - .claude/hooks/before-delete.sh
  - .claude/hooks/before-push.sh
related_skills:
  - eta-odoo
  - eta-deployment
  - eta-github
---

# ETA Production Safety

Full protected-surface list and rules live in [`.claude/safety/policy.md`](../../safety/policy.md) — this skill is the pointer to load before acting, not a duplicate of it.

## The six protected surfaces (see policy.md for detail)

Docker (the local dev stack), Odoo (the real environment at `/Users/ali/Development/ETA`), PostgreSQL (data inside that stack), Git History (no force-push/hard-reset without confirmation), the Repository (no unscoped deletes), and the Production Website (once one exists — currently out of scope entirely).

## Best practices

- Read-only inspection is always fine without asking (`docker ps`, `git log`, `git status`, `SELECT` queries).
- Anything that mutates state on a real system — even a "just testing" mutation — needs explicit confirmation, regardless of how confident the action seems.
- The corresponding `before-*.sh` hooks (odoo/docker/delete/push/merge) enforce the mechanical half of this automatically; this skill is the reasoning half — deciding whether an action that a hook *didn't* catch still deserves a pause.
- When a hook blocks an action (exit 2), don't retry with a workaround that defeats the check (e.g., rewording a force-push to dodge a string match) — address why it was flagged.

## Limitations

Hooks pattern-match on command text — a sufficiently different phrasing of the same destructive action could slip past one. This skill's judgment is the actual backstop; don't treat hook silence as proof an action is safe.
