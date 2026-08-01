# ETA-System Production Safety Policy

This is the source-of-truth policy that `eta-production-safety` points to and that the `before-*.sh` hooks mechanically enforce a subset of. Six protected surfaces:

## 1. Docker (local dev stack)
- **Safe without asking:** `docker ps`, `docker info`, `docker version`, `docker logs`, `docker inspect`, `docker port`.
- **Needs confirmation:** anything that removes volumes or prunes state (`docker compose down -v`, `docker volume rm`, `docker volume prune`, `docker system prune`) — this can delete the Postgres data backing the real Odoo environment.
- **Enforced by:** `before-docker.sh` (warns, non-blocking).

## 2. Odoo (the real environment at `/Users/ali/Development/ETA`)
- This environment exists and is running — never recreate it, never spin up a parallel instance.
- **Safe without asking:** read-only inspection.
- **Needs confirmation:** installing modules, writing data, changing config, anything that could touch the "no custom addons, no real data" state.
- **Enforced by:** `before-odoo.sh` (warns; blocks-by-convention-only — no hard technical block on Odoo mutations exists, so human judgment is the real backstop here).

## 3. PostgreSQL (data inside the dev stack)
- Covered by the Docker and Odoo rules above — Postgres isn't a separate attack surface here, it's what those two protect.
- `DROP DATABASE`, `dropdb`, or any destructive SQL against a real (non-throwaway) database needs explicit confirmation, no exceptions.

## 4. Git History
- No `--force`/`-f` push to `main`/`master` — **blocked outright** by `before-push.sh` (exit 2).
- No `git reset --hard` or `git clean -f` without first checking `git status` — warned by `before-delete.sh`.
- Always create new commits rather than amending, unless the user explicitly asks for an amend.

## 5. The Repository (this working tree)
- No unscoped/repo-root `rm -rf` — **blocked outright** by `before-delete.sh` (exit 2) when the target is `/`, `~`, `.`, or a bare wildcard.
- New top-level directories need an ADR first — `before-write.sh` warns when a write targets a path outside the ten ADR-0001 packages plus `docs/`/`.claude/`.
- Branch/merge operations get a reconciliation reminder given the abandoned `develop`/`feature/system-core` branches (`before-branch-creation.sh`, `before-merge.sh`, `before-git-sync.sh`).

## 6. The Production Website
- Out of scope entirely for this Claude-OS bootstrap (explicit mission exclusion). `before-website.sh` warns if a command/write looks like a site deploy/publish action.
- Once a live site exists and is in-scope for future work: any deploy/publish action needs explicit per-action confirmation — never batch-approved.

## What's deliberately NOT automated

Hooks only pattern-match command/file-path text — they cannot assess whether an action is *semantically* safe (e.g., a correctly-worded but ill-advised migration). That judgment stays with whoever is driving the session. Hook silence is not proof of safety; see `eta-production-safety`'s limitations section.
