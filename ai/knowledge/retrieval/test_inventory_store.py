import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path

from inventory_schema import DocType, EvidenceCache, InventoryEntry, Repository, VerificationStatus
from inventory_store import InventoryStore


class InventoryStoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp_dir = tempfile.TemporaryDirectory()
        self.store_path = Path(self.tmp_dir.name) / "inventory.json"
        self.store = InventoryStore(self.store_path)

    def tearDown(self):
        self.tmp_dir.cleanup()

    def test_upsert_and_get(self):
        entry = InventoryEntry(
            path="a/b.md", title="b", doc_type=DocType.ADR, modified_at=None, repository=Repository.GITHUB_LOCAL_REPO
        )
        self.store.upsert(entry)
        self.assertEqual(self.store.get("a/b.md").title, "b")

    def test_save_and_reload_round_trips(self):
        self.store.upsert(
            InventoryEntry(
                path="a/b.md", title="b", doc_type=DocType.ADR, modified_at=None, repository=Repository.GITHUB_LOCAL_REPO
            )
        )
        self.store.save()

        reloaded = InventoryStore(self.store_path)
        self.assertEqual(len(reloaded), 1)
        self.assertEqual(reloaded.get("a/b.md").doc_type, DocType.ADR)

    def test_by_type_filters_correctly(self):
        self.store.upsert(
            InventoryEntry(path="x", title="x", doc_type=DocType.ODOO, modified_at=None, repository=Repository.GOOGLE_DRIVE)
        )
        self.store.upsert(
            InventoryEntry(path="y", title="y", doc_type=DocType.BRANDING, modified_at=None, repository=Repository.GOOGLE_DRIVE)
        )
        self.assertEqual(len(self.store.by_type(DocType.ODOO)), 1)

    def test_related_to_is_bidirectional(self):
        self.store.upsert(
            InventoryEntry(
                path="a", title="a", doc_type=DocType.BLUEPRINT, modified_at=None,
                repository=Repository.GOOGLE_DRIVE, relationships=["b"],
            )
        )
        self.store.upsert(
            InventoryEntry(path="b", title="b", doc_type=DocType.PROCUREMENT, modified_at=None, repository=Repository.GITHUB_LOCAL_REPO)
        )
        # "a" declares a relationship to "b" -> querying from either side should find the pair.
        self.assertEqual([e.path for e in self.store.related_to("a")], ["b"])
        self.assertEqual([e.path for e in self.store.related_to("b")], ["a"])

    def test_by_concept_matches_case_insensitively(self):
        self.store.upsert(
            InventoryEntry(
                path="a", title="a", doc_type=DocType.ARCHITECTURE, modified_at=None,
                repository=Repository.GOOGLE_DRIVE, concepts=["Keycloak", "OAuth2"],
            )
        )
        self.assertEqual([e.path for e in self.store.by_concept("keycloak")], ["a"])
        self.assertEqual(self.store.by_concept("nonexistent"), [])

    def test_search_keywords_covers_title_concepts_and_tags(self):
        self.store.upsert(
            InventoryEntry(
                path="a", title="Technology Stack", doc_type=DocType.ARCHITECTURE, modified_at=None,
                repository=Repository.GOOGLE_DRIVE, concepts=["Qdrant"], tags=["conflict:ADR-0002"],
            )
        )
        self.assertEqual(len(self.store.search_keywords("qdrant")), 1)
        self.assertEqual(len(self.store.search_keywords("ADR-0002")), 1)
        self.assertEqual(len(self.store.search_keywords("nothing-matches-this")), 0)

    def test_depends_on_resolves_dependency_paths(self):
        self.store.upsert(
            InventoryEntry(
                path="platform/persistence", title="persistence", doc_type=DocType.AI, modified_at=None,
                repository=Repository.GITHUB_LOCAL_REPO,
            )
        )
        self.store.upsert(
            InventoryEntry(
                path="platform/events", title="events", doc_type=DocType.AI, modified_at=None,
                repository=Repository.GITHUB_LOCAL_REPO, dependencies=["platform/persistence"],
            )
        )
        self.assertEqual([e.path for e in self.store.depends_on("platform/events")], ["platform/persistence"])

    def test_verified_evidence_for_excludes_inferred(self):
        now = datetime.now(timezone.utc)
        self.store.upsert(
            InventoryEntry(
                path="a", title="a", doc_type=DocType.ARCHITECTURE, modified_at=None,
                repository=Repository.GOOGLE_DRIVE,
                evidence=[
                    EvidenceCache(
                        excerpt="verified quote", heading=None, section=None,
                        verification_status=VerificationStatus.VERIFIED, cached_at=now, source_modified_at=None,
                    ),
                    EvidenceCache(
                        excerpt="guessed quote", heading=None, section=None,
                        verification_status=VerificationStatus.INFERRED, cached_at=now, source_modified_at=None,
                    ),
                ],
            )
        )
        verified = self.store.verified_evidence_for("a")
        self.assertEqual(len(verified), 1)
        self.assertEqual(verified[0].excerpt, "verified quote")

    def test_evidence_round_trips_through_save_and_reload(self):
        now = datetime.now(timezone.utc)
        self.store.upsert(
            InventoryEntry(
                path="a", title="a", doc_type=DocType.ARCHITECTURE, modified_at=None,
                repository=Repository.GOOGLE_DRIVE,
                evidence=[
                    EvidenceCache(
                        excerpt="quote", heading="# Heading", section="Section",
                        verification_status=VerificationStatus.VERIFIED, cached_at=now, source_modified_at=now,
                    )
                ],
            )
        )
        self.store.save()
        reloaded = InventoryStore(self.store_path)
        self.assertEqual(reloaded.get("a").evidence[0].excerpt, "quote")
        self.assertEqual(reloaded.get("a").evidence[0].heading, "# Heading")


if __name__ == "__main__":
    unittest.main()
