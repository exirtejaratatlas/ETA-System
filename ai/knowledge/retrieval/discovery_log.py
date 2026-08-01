"""Versioned discovery log (rule 28). Every discovery session gets a unique,
immutable Discovery ID. Records are appended, never overwritten or edited —
if a later session finds that an earlier discovery was wrong, it's recorded
as a *new* entry with `superseded_findings` pointing back at the old one,
not by rewriting history.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path


@dataclass
class DiscoveryRecord:
    discovery_id: str  # "DISC-0001", sequential, never reused
    timestamp: datetime
    scope: str
    sources_inspected: list[str] = field(default_factory=list)
    new_findings: list[str] = field(default_factory=list)
    updated_findings: list[str] = field(default_factory=list)
    superseded_findings: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "discovery_id": self.discovery_id,
            "timestamp": self.timestamp.isoformat(),
            "scope": self.scope,
            "sources_inspected": self.sources_inspected,
            "new_findings": self.new_findings,
            "updated_findings": self.updated_findings,
            "superseded_findings": self.superseded_findings,
        }

    @staticmethod
    def from_dict(data: dict) -> "DiscoveryRecord":
        return DiscoveryRecord(
            discovery_id=data["discovery_id"],
            timestamp=datetime.fromisoformat(data["timestamp"]),
            scope=data["scope"],
            sources_inspected=data.get("sources_inspected", []),
            new_findings=data.get("new_findings", []),
            updated_findings=data.get("updated_findings", []),
            superseded_findings=data.get("superseded_findings", []),
        )


class DiscoveryLog:
    """Append-only. There is deliberately no `update` or `delete` method —
    that's the point of versioning discovery (rule 28)."""

    def __init__(self, path: Path):
        self.path = path
        self._records: list[DiscoveryRecord] = []
        if path.exists():
            self._load()

    def _load(self) -> None:
        raw = json.loads(self.path.read_text(encoding="utf-8"))
        self._records = [DiscoveryRecord.from_dict(d) for d in raw.get("discoveries", [])]

    def save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        payload = {"discoveries": [r.to_dict() for r in self._records]}
        self.path.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    def next_id(self) -> str:
        if not self._records:
            return "DISC-0001"
        last_num = max(int(r.discovery_id.split("-")[1]) for r in self._records)
        return f"DISC-{last_num + 1:04d}"

    def append(self, record: DiscoveryRecord) -> None:
        existing_ids = {r.discovery_id for r in self._records}
        if record.discovery_id in existing_ids:
            raise ValueError(f"Discovery ID {record.discovery_id} already recorded — IDs are never reused or overwritten")
        self._records.append(record)

    def all(self) -> list[DiscoveryRecord]:
        return list(self._records)

    def get(self, discovery_id: str) -> DiscoveryRecord | None:
        for r in self._records:
            if r.discovery_id == discovery_id:
                return r
        return None

    def __len__(self) -> int:
        return len(self._records)
