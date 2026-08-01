"""A real, functioning JSON-file-backed inventory store.

This is intentionally lightweight — a metadata catalog doesn't need a
vector database or a running Postgres instance to be useful, and this
store is what the semantic-index-building phases (1-2 of the discovery
protocol) write to and read from. `QdrantSemanticIndex` (see
qdrant_ingestion.py) is a separate, heavier layer built on top of this
for actual similarity search once a real Qdrant instance is available.
"""

from __future__ import annotations

import json
from pathlib import Path

from inventory_schema import DocType, InventoryEntry, Repository, VerificationStatus


class InventoryStore:
    def __init__(self, path: Path):
        self.path = path
        self._entries: dict[str, InventoryEntry] = {}
        if path.exists():
            self._load()

    def _load(self) -> None:
        raw = json.loads(self.path.read_text(encoding="utf-8"))
        for item in raw.get("entries", []):
            entry = InventoryEntry.from_dict(item)
            self._entries[entry.path] = entry

    def save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        payload = {"entries": [entry.to_dict() for entry in self._entries.values()]}
        self.path.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")

    def upsert(self, entry: InventoryEntry) -> None:
        self._entries[entry.path] = entry

    def get(self, path: str) -> InventoryEntry | None:
        return self._entries.get(path)

    def all(self) -> list[InventoryEntry]:
        return list(self._entries.values())

    def by_type(self, doc_type: DocType) -> list[InventoryEntry]:
        return [e for e in self._entries.values() if e.doc_type == doc_type]

    def by_repository(self, repository: Repository) -> list[InventoryEntry]:
        return [e for e in self._entries.values() if e.repository == repository]

    def related_to(self, path: str) -> list[InventoryEntry]:
        """Entries that either list `path` in their relationships, or that `path`'s own entry lists."""
        entry = self.get(path)
        direct = set(entry.relationships) if entry else set()
        reverse = {e.path for e in self._entries.values() if path in e.relationships}
        related_paths = direct | reverse
        return [self._entries[p] for p in related_paths if p in self._entries]

    def depends_on(self, path: str) -> list[InventoryEntry]:
        entry = self.get(path)
        if not entry:
            return []
        return [self._entries[p] for p in entry.dependencies if p in self._entries]

    def by_concept(self, concept: str) -> list[InventoryEntry]:
        """Case-insensitive exact match against an entry's concept list — this is what makes
        'what do we know about X' answerable without rereading Drive (rule 27)."""
        needle = concept.lower()
        return [e for e in self._entries.values() if needle in (c.lower() for c in e.concepts)]

    def by_tag(self, tag: str) -> list[InventoryEntry]:
        needle = tag.lower()
        return [e for e in self._entries.values() if needle in (t.lower() for t in e.tags)]

    def search_keywords(self, query: str) -> list[InventoryEntry]:
        """Loose keyword search across title, concepts, and tags — a cheap stand-in for real
        semantic search until a vector index (ADR-0014) exists. Good enough for 'have we already
        looked at this' before touching the Drive connector again."""
        needle = query.lower()
        results = []
        for e in self._entries.values():
            haystack = " ".join([e.title, *e.concepts, *e.tags]).lower()
            if needle in haystack:
                results.append(e)
        return results

    def verified_evidence_for(self, path: str) -> list:
        """Only VERIFIED (or PARTIALLY_VERIFIED) cached evidence — use this, not `.evidence`
        directly, whenever the caller needs to treat something as fact rather than a lead."""
        entry = self.get(path)
        if not entry:
            return []
        return [
            ev
            for ev in entry.evidence
            if ev.verification_status in (VerificationStatus.VERIFIED, VerificationStatus.PARTIALLY_VERIFIED)
        ]

    def __len__(self) -> int:
        return len(self._entries)
