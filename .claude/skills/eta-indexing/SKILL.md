---
name: eta-indexing
description: Use when adding, updating, or auditing entries in the semantic index or repository index. Trigger on "index this," "update the inventory," "what's in the index," or "is this indexed yet."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - ai/knowledge/retrieval/inventory_store.py
  - ai/knowledge/retrieval/discovery_log.py
  - .claude/index/semantic-index.md
  - .claude/index/repository-index.json
related_skills:
  - eta-semantic-search
  - eta-knowledge-discovery
  - eta-memory
---

# ETA Indexing

## Ground truth

The canonical semantic index is `ai/knowledge/retrieval/inventory.json` (Drive-side knowledge: concepts, tags, dependencies, cached evidence). `.claude/index/semantic-index.md` documents how its coverage maps onto the ten domains this Claude-OS bootstrap asked to index (Drive, Repository, ADR, Blueprint, Knowledge, Business Domains, Odoo, Website, Company Profile, Brand Assets, Prompt Library, Architecture) and which are still uncovered. `.claude/index/repository-index.json` is a lightweight, regenerable structural index of this repo's own directory tree — not a semantic index, just a map of what top-level packages/subpackages exist.

## Best practices

- Add a new Drive-knowledge entry via `InventoryStore.upsert` — never hand-edit `inventory.json`'s JSON directly, to keep the schema consistent.
- Regenerate `repository-index.json` after any structural change (new domain subpackage, new platform capability) rather than letting it drift — it's meant to be cheap to regenerate (`find` + a small script), not hand-maintained.
- Every new inventory entry should get a matching `discovery_log.json` record (via `DiscoveryLog.append`) — an index update without a logged discovery is untraceable.
- Check `.claude/index/semantic-index.md`'s coverage table before claiming "we have no index for X" — it may already be tracked as a known gap rather than truly unindexed.

## Limitations

`repository-index.json` is a structure map, not a content index — it tells you a directory exists, not what's meaningfully inside it. For content, use the Drive-side `inventory.json` or a direct repo read.
