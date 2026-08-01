# ETA-System Claude Operating System — Build Report

**Built:** 2026-07-24 · **Scope:** Claude tooling infrastructure only — no ETA business logic, no Odoo/website/Company Profile changes, per the bootstrap mission.

## Skills created — 23 total (22 new + 1 pre-existing, extended-by-reference)

`eta-knowledge-discovery` (pre-existing, unchanged), `eta-odoo`, `eta-website`, `eta-companyprofile`, `eta-branding`, `eta-procurement`, `eta-github`, `eta-googledrive`, `eta-adr`, `eta-evidence`, `eta-architecture`, `eta-ui-review`, `eta-documentation`, `eta-testing`, `eta-deployment`, `eta-design-handoff`, `eta-cowork-handoff`, `eta-claudechat-handoff`, `eta-claudedesign-handoff`, `eta-production-safety`, `eta-semantic-search`, `eta-indexing`, `eta-memory`. Each has versioned frontmatter, dependencies, related skills, related ADRs where relevant, and examples/best-practices/limitations sections. Registered automatically — Claude Code discovered and listed all of them live during this build (verified: appeared in the system's available-skills listing after each `Write`, no manual registration step exists or is needed).

## Hooks created — 22 scripts, wired into `settings.json`

21 new scripts (`before-write`, `before-edit`, `before-commit`, `before-push`, `before-delete`, `before-adr`, `before-odoo`, `before-website`, `before-companyprofile`, `before-docker`, `before-git-sync`, `before-knowledge-read`, `before-discovery`, `before-implementation`, `before-branch-creation`, `before-merge`, `after-commit`, `after-push`, `after-documentation`, `after-index-update`, `after-discovery`) plus the pre-existing `check-adr-sequence.sh`, all sharing `hooks/lib/common.sh`. Mapped onto real `PreToolUse`/`PostToolUse` events (see `hooks/README.md` for the conceptual-name → real-event table, since Claude Code doesn't have 20 literal hook types).

**Validated, not just written:**
- `settings.json` and `repository-index.json` parse as valid JSON.
- All 22 shell scripts pass `bash -n` syntax checks.
- Five scripts functionally tested end-to-end with real JSON payloads: `before-push.sh` correctly **blocked** (`exit 2`) a force-push to `main`; `before-delete.sh` correctly **blocked** an unscoped `rm -rf /` (this fired live and unprompted during this session's own testing, on a real Bash tool call — direct proof the wiring works); `before-write.sh`, `before-docker.sh`, `before-branch-creation.sh`, `before-implementation.sh`, `before-edit.sh` all produced correct non-blocking warnings/notes on realistic inputs.

## Semantic Index

No new parallel index was built. `.claude/index/semantic-index.md` documents how the existing `ai/knowledge/retrieval/inventory.json` (Drive semantic index) and the new `.claude/index/repository-index.json` (generated structural map of the ten top-level packages) jointly cover the ten requested domains — with an honest coverage table marking Website and Company Profile as `UNKNOWN`/not indexed, since no discovery has actually happened there yet.

## Discovery Log

Not duplicated. The existing `ai/knowledge/retrieval/discovery_log.json` (append-only, `DISC-NNNN` records) remains canonical; hooks (`before-discovery`, `after-discovery`, `after-index-update`) now remind sessions to use it rather than letting Drive findings go unlogged.

## Evidence Cache

`.claude/evidence/README.md` documents the cache format already implemented on `inventory.json` entries (excerpt/heading/section/modified_at/content_hash/confidence/discovery_id) — again, a spec pointer, not a second cache.

## Memory System — 10 categories + README

`.claude/memory/{business,technical,architecture,knowledge,repository,odoo,website,company-profile,brand,prompt}.md`, each seeded with real, ADR-cited `VERIFIED`/`PARTIALLY VERIFIED`/`UNKNOWN` entries — no inferred fact written as settled. Explicitly distinguished from Claude's personal per-user auto-memory, which stays out of this repo.

## Prompt Library — 15 prompts

Website review/refactor, Company Profile review/design, Odoo audit/development, procurement domain, repository audit, Google Drive discovery, evidence report, three handoff prompts (Design/Chat/CoWork), GitHub synchronization, architecture review.

## Handoff Packages — 3 templates + README

`.claude/handoffs/template-claude-{design,chat,cowork}.md`, each with Context / Requirements / Constraints / Related ADRs / Required Documents / Implementation Status.

## Safety Layer

`.claude/safety/policy.md` — six protected surfaces (Docker, Odoo, PostgreSQL, Git History, the Repository, the Production Website), each mapped to which hook enforces it and whether that enforcement blocks or only warns. Two hard blocks exist today: force-push to `main`/`master`, and unscoped repo-root deletes.

## Workspace Intelligence

`.claude/workspace/routing.md` — a decision table for Code vs. Chat vs. Design vs. CoWork, plus the rule to split mixed tasks rather than handing off the whole thing to one surface.

## Remaining improvements (honest gaps, not silently filled)

- **ADR cross-reference**: the 15 existing ADRs aren't yet mirrored as individual entries in `inventory.json` — they're covered by direct file reference only.
- **Website / Company Profile discovery**: both remain genuinely `UNKNOWN` — closing these gaps needs an actual `eta-knowledge-discovery` session, not backfilled content.
- **Hook coverage is pattern-based, not semantic**: a differently-worded destructive command could slip past a `before-*.sh` check; `eta-production-safety`'s judgment remains the real backstop.
- **No automated skill/hook test harness**: validation this session was manual (`bash -n` + five live-fire tests); a repeatable test script would catch regressions if hooks are edited later.
- **`repository-index.json` is a one-time snapshot**: it needs to be regenerated (not hand-edited) after future structural changes — no automation currently triggers that regeneration.
