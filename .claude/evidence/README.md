# Evidence Cache

This documents the evidence-cache **format**; it does not hold a second copy of the data. The real cache is the `evidence` array on each entry in [`ai/knowledge/retrieval/inventory.json`](../../ai/knowledge/retrieval/inventory.json), queried via `InventoryStore.verified_evidence_for()`. Building a parallel cache here would violate the standing no-duplicate-concepts rule and would immediately drift out of sync with the real one.

## Format (as implemented in `inventory.json`)

Each cached evidence item carries:

```json
{
  "excerpt": "short quoted text",
  "heading": "the document heading it came from",
  "section": "the specific section/subsection",
  "modified_at": "ISO 8601 timestamp, from the source's native metadata",
  "content_hash": "UNKNOWN",
  "confidence": "VERIFIED | PARTIALLY_VERIFIED | INFERRED | UNKNOWN",
  "discovery_id": "DISC-NNNN, linking to the discovery_log.json record that produced it"
}
```

`content_hash` is always `"UNKNOWN"` for Drive-sourced evidence — the connector has no checksum field. Never compute or guess one.

## Rules

- **Never re-fetch unchanged content.** If `verified_evidence_for()` returns a `VERIFIED` item for what you need, cite it directly.
- **Never cache an `INFERRED` finding as if it were `VERIFIED`.** The confidence field exists specifically so a later reader (or hook, or memory promotion) can filter correctly — see `eta-evidence`.
- **A cache entry without a `discovery_id` is a bug**, not a shortcut — every cached fact must trace back to the discovery session that produced it.
- When a source document changes (`modified_at` moves forward), the old cached excerpt is stale — re-fetch and update via `InventoryStore.upsert`, don't leave two conflicting entries.

## Non-Drive evidence

For repo-local or GitHub-sourced facts, the "cache" is simply the file/commit itself — `git blame`, `git log`, or a direct file read are always more current than any cache could be. Only Drive content (expensive to re-fetch, not natively versioned in a way we can diff) benefits from caching at all.
