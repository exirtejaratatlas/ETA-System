---
name: eta-semantic-search
description: Use when deciding how to search across ETA's knowledge sources (Drive, repo, ADRs) efficiently — which store to query, in what order, before falling back to a fresh crawl. Trigger on "search for X across everything," "where is X documented," or "find anything about Y."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - ai/knowledge/retrieval/inventory_store.py (InventoryStore)
related_skills:
  - eta-knowledge-discovery
  - eta-indexing
  - eta-evidence
---

# ETA Semantic Search

## Search order (cheapest/most-current first)

1. **`ai/knowledge/retrieval/inventory.json`** via `InventoryStore.by_concept()` / `.search_keywords()` — the real semantic index over Drive knowledge, with cached evidence and confidence levels. Check `.verified_evidence_for()` first; if it returns something, you likely don't need to re-fetch.
2. **Repo grep/`find`** — for anything that's actual code or committed docs, a direct search of the working tree is faster and more current than any cache.
3. **`docs/decisions/`** — for "has this been decided," scan ADR titles/frontmatter before assuming a gap.
4. **`ai/knowledge/retrieval/discovery_log.json`** — check whether a past session already searched this exact scope in Drive, to avoid repeating an expensive crawl.
5. **Fresh Drive search** (`eta-knowledge-discovery` / `eta-googledrive`) — only once 1-4 come up empty or stale.

## Best practices

- Never jump straight to a fresh Drive crawl — the ~100k-file vault is expensive to search blindly, and most of it is empty placeholder folders (documented in `eta-knowledge-discovery`).
- When a search spans both repo and Drive, say explicitly which source answered which part of the question — don't blend them into one undifferentiated answer.
- If steps 1-4 return `UNKNOWN`/nothing, that itself is useful information — record it (a discovery log entry) rather than silently treating it as "not worth mentioning."

## Limitations

This is a routing heuristic, not a real cross-source index — it doesn't unify Drive/repo/ADR results into one ranked list, it just tells you which store to check in which order.
