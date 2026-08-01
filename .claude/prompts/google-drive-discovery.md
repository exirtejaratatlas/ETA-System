# Prompt: Google Drive Discovery

**Use with:** `eta-knowledge-discovery`, `eta-googledrive`, `eta-evidence`

```
Discover [specific topic/document] in the ETA-Knowledge-v1 Drive vault.

1. Check ai/knowledge/retrieval/inventory.json first (InventoryStore.by_concept
   / .search_keywords / .verified_evidence_for) — don't re-crawl what's cached.
2. Check discovery_log.json for a prior DISC-NNNN record covering this scope.
3. If genuinely new, search narrowly (parentId or title-contains queries,
   never a blind full-vault crawl — it's ~100k files, mostly empty
   placeholders per eta-knowledge-discovery's folder map).
4. Cite every finding with the full evidence standard (eta-evidence).
5. Persist: InventoryStore.upsert + DiscoveryLog.append before ending the
   session — an unlogged finding has to be re-discovered next time.
```
