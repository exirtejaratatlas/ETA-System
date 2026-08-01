"""Semantic index schema for the ETA-Knowledge-v1 discovery protocol.

Per the standing protocol (updated 2026-07-23, rule 27): a bare file
inventory is not a semantic index. Every entry carries metadata (path,
title, type, modified date, repository), semantic structure (concepts,
tags, relationships, dependencies), and a small cache of already-verified
evidence (short excerpts + citation location, never full document bodies
— rule 31's "cache evidence, not content" applies at the excerpt level,
not by inlining entire files here).
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum


class DocType(str, Enum):
    FOLDER = "folder"
    ARCHITECTURE = "architecture"
    BLUEPRINT = "blueprint"
    ADR = "adr"
    ODOO = "odoo"
    DOCKER = "docker"
    POSTGRES = "postgres"
    WEBSITE = "website"
    BRANDING = "branding"
    COMPANY_PROFILE = "company_profile"
    PROCUREMENT = "procurement"
    CRM = "crm"
    AI = "ai"
    MCP = "mcp"
    PROMPT = "prompt"
    SKILL = "skill"
    WORKFLOW = "workflow"
    INTEGRATION = "integration"
    BUSINESS_DOCUMENT = "business_document"
    REFERENCE_DATA = "reference_data"


class Repository(str, Enum):
    GOOGLE_DRIVE = "google_drive"
    GITHUB_LOCAL_REPO = "github_local_repo"
    RUNNING_ENVIRONMENT = "running_environment"


class VerificationStatus(str, Enum):
    """Rule 26/29: an inventory entry may catalog an INFERRED or UNKNOWN
    finding (that's useful — it flags what still needs confirmation), but
    only VERIFIED entries may ever be promoted into Claude's Memory files.
    This status travels with the evidence so that promotion boundary is
    checkable, not assumed."""

    VERIFIED = "VERIFIED"
    PARTIALLY_VERIFIED = "PARTIALLY_VERIFIED"
    INFERRED = "INFERRED"
    UNKNOWN = "UNKNOWN"


@dataclass
class EvidenceCache:
    """A single cached, already-verified citation. Short excerpt only —
    this is a citation cache, not a document mirror."""

    excerpt: str
    heading: str | None
    section: str | None
    verification_status: VerificationStatus
    cached_at: datetime
    source_modified_at: datetime | None  # the source's modifiedTime AT THE TIME this was cached
    discovery_id: str | None = None  # links back to discovery_log.json

    def to_dict(self) -> dict:
        return {
            "excerpt": self.excerpt,
            "heading": self.heading,
            "section": self.section,
            "verification_status": self.verification_status.value,
            "cached_at": self.cached_at.isoformat(),
            "source_modified_at": self.source_modified_at.isoformat() if self.source_modified_at else None,
            "discovery_id": self.discovery_id,
        }

    @staticmethod
    def from_dict(data: dict) -> "EvidenceCache":
        return EvidenceCache(
            excerpt=data["excerpt"],
            heading=data.get("heading"),
            section=data.get("section"),
            verification_status=VerificationStatus(data["verification_status"]),
            cached_at=datetime.fromisoformat(data["cached_at"]),
            source_modified_at=datetime.fromisoformat(data["source_modified_at"]) if data.get("source_modified_at") else None,
            discovery_id=data.get("discovery_id"),
        )


@dataclass
class InventoryEntry:
    """One semantic-index record. `content` is deliberately not a field —
    only short cached excerpts (via EvidenceCache) are stored, never full
    document bodies."""

    path: str
    title: str
    doc_type: DocType
    modified_at: datetime | None
    repository: Repository
    relationships: list[str] = field(default_factory=list)
    concepts: list[str] = field(default_factory=list)
    tags: list[str] = field(default_factory=list)
    dependencies: list[str] = field(default_factory=list)
    evidence: list[EvidenceCache] = field(default_factory=list)
    external_id: str | None = None  # e.g. Google Drive file ID, for re-fetching content on demand
    is_empty_placeholder: bool = False

    def to_dict(self) -> dict:
        return {
            "path": self.path,
            "title": self.title,
            "doc_type": self.doc_type.value,
            "modified_at": self.modified_at.isoformat() if self.modified_at else None,
            "repository": self.repository.value,
            "relationships": self.relationships,
            "concepts": self.concepts,
            "tags": self.tags,
            "dependencies": self.dependencies,
            "evidence": [e.to_dict() for e in self.evidence],
            "external_id": self.external_id,
            "is_empty_placeholder": self.is_empty_placeholder,
        }

    @staticmethod
    def from_dict(data: dict) -> "InventoryEntry":
        return InventoryEntry(
            path=data["path"],
            title=data["title"],
            doc_type=DocType(data["doc_type"]),
            modified_at=datetime.fromisoformat(data["modified_at"]) if data.get("modified_at") else None,
            repository=Repository(data["repository"]),
            relationships=data.get("relationships", []),
            concepts=data.get("concepts", []),
            tags=data.get("tags", []),
            dependencies=data.get("dependencies", []),
            evidence=[EvidenceCache.from_dict(e) for e in data.get("evidence", [])],
            external_id=data.get("external_id"),
            is_empty_placeholder=data.get("is_empty_placeholder", False),
        )
