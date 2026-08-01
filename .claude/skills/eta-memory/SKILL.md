---
name: eta-memory
description: Use when deciding what to persist to memory and where — Claude's personal auto-memory vs. this repo's shared .claude/memory/ — or when auditing/consolidating either. Trigger on "remember this," "what do we know about X," or "update memory."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - .claude/memory/ (repo-local shared memory)
  - ~/.claude/projects/-Users-ali-Projects-ETA-System/memory/ (personal auto-memory, not in this repo)
related_skills:
  - eta-evidence
  - eta-indexing
  - eta-knowledge-discovery
---

# ETA Memory

## Two distinct memory systems — don't conflate them

1. **Personal auto-memory** (`~/.claude/projects/.../memory/`) — per-user, persists across sessions for this one user, not committed to git, not visible to collaborators. Holds user/feedback/project/reference memories per the standard auto-memory categories.
2. **Repo-local shared memory** (`.claude/memory/`) — git-committed, visible to any collaborator or Claude session working in this repo. Ten categories: business, technical, architecture, knowledge, repository, odoo, website, company-profile, brand, prompt. This is what the bootstrap spec's "Memory System" requirement refers to.

## Best practices

- A fact worth remembering across your own future sessions with this user → personal auto-memory.
- A fact the whole team/any Claude session on this repo should know → `.claude/memory/<category>.md`.
- Every entry in either system must carry a confidence label: `VERIFIED`, `PARTIALLY VERIFIED`, or `UNKNOWN` — never write an inferred fact as verified (see `eta-evidence`).
- Before writing a new memory entry, check whether an existing one already covers it — update in place rather than creating a near-duplicate entry.
- Periodically consolidate: merge duplicates, correct facts that have drifted, prune anything superseded — treat memory as a living document, not an append-only log (that's what the discovery log is for).

## Limitations

Repo-local memory can go stale exactly like documentation can — nothing currently re-verifies its claims automatically. Treat any repo-memory fact older than the current session as needing a quick sanity check before being relied on for something consequential.
