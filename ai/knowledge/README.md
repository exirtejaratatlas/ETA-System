# ai/knowledge

graph/ — relationship-aware knowledge graph (suppliers, contracts, spend categories). retrieval/ — RAG/vector index over canonical documents.

**`retrieval/` status: Implemented** (metadata inventory layer) **· Proposed** (Qdrant similarity search — needs a live Qdrant instance/API key, not available in this environment). Traceable to: standing knowledge-discovery protocol · ADR-0014 (Qdrant) · [semantic index memory](../../docs/architecture/CONFLICT-REPORT.md).

- `inventory_schema.py` / `inventory_store.py` — a real, working metadata-only catalog (path, title, type, modified date, repository, relationships) — no document bodies stored, per the discovery protocol's explicit "metadata only" rule.
- `seed_inventory.py` — seeds the store with everything already discovered from prior exhaustive Drive/repo audits (44 entries as of 2026-07-23). Run `python3 seed_inventory.py` to regenerate `inventory.json`.
- 4 unit tests passing (`python3 -m unittest test_inventory_store`).
- **Deliberately not a full 100k-file crawl.** Per the discovery protocol, this seeds from already-known findings and grows incrementally — each new feature's targeted discovery should call `InventoryStore.upsert(...)` for what it finds, not trigger a from-scratch re-crawl.
- **Not yet built**: the Qdrant-backed similarity search layer and the embedding pipeline — both need a live Qdrant instance and an embedding provider, which this environment doesn't have credentials for. The metadata layer above is fully functional independent of that.

