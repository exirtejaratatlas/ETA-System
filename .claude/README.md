# ETA-System Claude Operating System

This directory is Claude's internal operating environment for the ETA-System repository — not part of the frozen business architecture in [ADR-0001](../docs/decisions/ADR-0001-eta-system-target-architecture.md). It exists so Claude can work on ETA efficiently across sessions without repeatedly re-reading the entire repository, re-crawling the Google Drive knowledge base, or re-deriving conventions that are already settled.

**This directory contains no ETA business logic.** It does not implement Odoo customizations, the website, the Company Profile, or any `domains/`/`platform/`/`ai/`/`integrations/` package. It only builds the tooling that makes working on those things faster and safer.

## Layout

| Path | Purpose |
|---|---|
| `skills/` | Specialized, invokable knowledge packages — one per recurring workstream (Odoo, website, branding, procurement, GitHub, Drive, ADRs, evidence, architecture, UI review, docs, testing, deployment, handoffs, safety, semantic search, indexing, memory). |
| `hooks/` | Shell scripts wired into `settings.json` lifecycle events (`BeforeWrite`, `AfterCommit`, etc.) that validate, warn, or block — never that silently modify production systems. |
| `index/` | Pointers into the canonical semantic index and a generated repository structure index. |
| `memory/` | Repo-local, git-committed **shared** memory (team-visible facts with VERIFIED/PARTIALLY VERIFIED/UNKNOWN confidence) — distinct from Claude's personal per-user auto-memory at `~/.claude/projects/.../memory/`, which is not committed to this repo and not visible to other collaborators. |
| `evidence/` | Evidence-cache format spec. The actual cached excerpts live in `ai/knowledge/retrieval/inventory.json` (see below) — this folder documents the format, it doesn't duplicate the data. |
| `prompts/` | Reusable prompt templates for recurring review/audit/handoff workstreams. |
| `handoffs/` | Templates for generating handoff packages to Claude Design, Claude Chat, and Claude CoWork. |
| `safety/` | The production-safety policy: what's protected (Docker, Odoo, Postgres, git history, the repo, the live website) and which hooks enforce which rule. |
| `workspace/` | Workspace-intelligence routing rules — which Claude surface (Code/Chat/Design/CoWork) a given task belongs to. |
| `reports/` | Build/validation reports for this operating system itself. |

## Why this doesn't duplicate `ai/knowledge/retrieval/`

A real semantic index and discovery log already exist and are load-bearing:

- **`ai/knowledge/retrieval/inventory.json`** + `inventory_store.py` — the semantic index over the Google Drive knowledge base (concepts, tags, dependencies, cached evidence, confidence).
- **`ai/knowledge/retrieval/discovery_log.json`** + `discovery_log.py` — the append-only discovery log (DISC-NNNN records).
- **`.claude/skills/eta-knowledge-discovery/SKILL.md`** — the skill that already encapsulates both.

Per the standing "no duplicate concepts" rule, this build extends that infrastructure rather than creating a second, parallel semantic index or discovery log under `.claude/`. `index/semantic-index.md` documents how the existing store's coverage maps onto the ten domains this bootstrap asked for (Drive, Repository, ADR, Blueprint, Knowledge, Business Domains, Odoo, Website, Company Profile, Brand Assets, Prompt Library, Architecture) and flags which of those are still `UNKNOWN` because no discovery has happened yet — not invented data to fill the gap.

## Ground rules inherited from standing project memory

- Never duplicate a concept that already exists (folder, skill, ADR, domain, workflow). Extend, don't recreate.
- Never mark something "Implemented" unless a user or an approved ADR confirms it — everything here is Claude tooling, explicitly out of scope for that distinction, but any *business* claim these skills surface must still respect it.
- Never touch Odoo, the live website, the Company Profile, or production infrastructure directly from a hook or skill — these are read/advise-only surfaces; the human executes anything destructive or production-facing.
- Confidence levels (`VERIFIED` / `PARTIALLY VERIFIED` / `UNKNOWN`) are mandatory wherever a skill or memory file states a fact. `UNKNOWN` is a valid, expected answer — it is not a failure state.

## Status

Built 2026-07-24 as the initial scaffold. See [`reports/BUILD-REPORT.md`](reports/BUILD-REPORT.md) for what was created, what was validated, and what's still a stub.
