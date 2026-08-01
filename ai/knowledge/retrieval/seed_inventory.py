"""Seeds the semantic index with everything already discovered from prior
exhaustive audits of ETA-Knowledge-v1 and the local repository. This is the
Phase-1 starting point the discovery protocol calls for — subsequent
targeted discovery (Phase 4/5) extends this file or calls
InventoryStore.upsert directly rather than re-running a full crawl.

Per rule 27, a bare path/title list is not a semantic index — entries below
carry concepts/tags/dependencies, and the highest-value ones carry cached,
VERIFIED evidence (short excerpts, with heading/section, tied to the
Discovery ID that produced them — see discovery_log.json).

Run: python seed_inventory.py
"""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from inventory_schema import DocType, EvidenceCache, InventoryEntry, Repository, VerificationStatus
from inventory_store import InventoryStore

DRIVE = Repository.GOOGLE_DRIVE
REPO = Repository.GITHUB_LOCAL_REPO
VERIFIED = VerificationStatus.VERIFIED
INFERRED = VerificationStatus.INFERRED


def _dt(iso: str) -> datetime:
    return datetime.fromisoformat(iso).replace(tzinfo=timezone.utc)


def build_seed_entries() -> list[InventoryEntry]:
    entries: list[InventoryEntry] = []

    # --- Drive: ETA-Knowledge-v1 top level (mostly empty placeholders) ---
    for folder, doc_type in [
        ("01_Company", DocType.COMPANY_PROFILE),
        ("02_Brand", DocType.BRANDING),
        ("07_Procurement", DocType.PROCUREMENT),
        ("08_Odoo", DocType.ODOO),
        ("09_Blueprint", DocType.BLUEPRINT),
        ("10_AI", DocType.AI),
        ("11_Prompts", DocType.PROMPT),
        ("12_Workflows", DocType.WORKFLOW),
        ("13_Regulations", DocType.REFERENCE_DATA),
        ("14_Database", DocType.REFERENCE_DATA),
    ]:
        entries.append(
            InventoryEntry(
                path=f"ETA-Knowledge-v1/{folder}",
                title=folder,
                doc_type=doc_type,
                modified_at=_dt("2026-07-22T13:13:09+00:00"),
                repository=DRIVE,
                tags=["empty-placeholder"],
                is_empty_placeholder=True,
            )
        )

    # --- Drive: real business documents ---
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/Document/ETA Offer_Template.xlsx",
            title="ETA Commercial + Technical Offer Template",
            doc_type=DocType.BUSINESS_DOCUMENT,
            modified_at=_dt("2026-06-23T08:38:09+00:00"),
            repository=DRIVE,
            external_id="16VLnTDaTOnvifxHROtIas5m06RHT_caj",
            relationships=["domains/procurement-core"],
            concepts=["commercial offer", "technical offer", "Incoterms", "payment terms", "bank guarantee"],
            tags=["business-document", "real-content"],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/Document/Invoice.docx",
            title="ETA Invoice Template",
            doc_type=DocType.BUSINESS_DOCUMENT,
            modified_at=_dt("2026-06-19T09:00:56Z".replace("Z", "+00:00")),
            repository=DRIVE,
            external_id="1BZeBCxHcE5A3Et9crz-o219ggy2Nt1Ka",
            relationships=["domains/procurement-core"],
            concepts=["invoice", "Gulf Petrochemical Industries", "bank details"],
            tags=["business-document", "real-content"],
            evidence=[
                EvidenceCache(
                    excerpt='Bill To | Gulf Petrochemical Industries | Due Date | 19 July 2026\\nCustomer Ref | PO-9920 | Currency | USD',
                    heading=None,
                    section="Invoice header table",
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:00:00+00:00"),
                    source_modified_at=_dt("2026-06-19T09:00:56+00:00"),
                    discovery_id="DISC-0004",
                )
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/00-KNOWLEDGE/09-DATABASE/Manufacturers/Iran_Steel_Comprehensive_V2.xlsx",
            title="Iranian Steel Manufacturers — comprehensive product/spec database",
            doc_type=DocType.REFERENCE_DATA,
            modified_at=_dt("2026-07-18T09:31:11+00:00"),
            repository=DRIVE,
            external_id="1IdwqqTbfWSsIX4CR7HjJNlOTclu8B89Z",
            relationships=["domains/suppliers"],
            concepts=["Mobarakeh Steel", "Kashan Amir Kabir Steel", "Taraz Steel", "certification", "standard/grade"],
            tags=["reference-data", "real-content"],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/00-KNOWLEDGE/09-DATABASE/PriceLists",
            title="Daily steel price tracking (Haft Almas products)",
            doc_type=DocType.REFERENCE_DATA,
            modified_at=_dt("2026-07-22T10:03:05+00:00"),
            repository=DRIVE,
            relationships=["domains/suppliers", "domains/procurement-core"],
            concepts=["Haft Almas", "steel pricing", "price benchmarking"],
            tags=["reference-data", "real-content"],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Platform/config/docker-compose.yml",
            title="docker-compose.yml (Drive prototype)",
            doc_type=DocType.DOCKER,
            modified_at=_dt("2026-07-22T08:35:05+00:00"),
            repository=DRIVE,
            external_id="1qQGag4-tma2VZcYK32ZGNgShb754ahXA",
            relationships=["docs/decisions/ADR-0011-odoo-prototype-prior-art.md"],
            concepts=["Postgres 16", "eta database name", "Odoo from-source build", "custom_addons"],
            tags=["infrastructure", "real-content", "superseded-by-ADR-0015"],
            evidence=[
                EvidenceCache(
                    excerpt="image: postgres:16\ncontainer_name: eta_postgres\nenvironment:\n  POSTGRES_DB: eta\n  POSTGRES_USER: odoo\n  POSTGRES_PASSWORD: odoo",
                    heading=None,
                    section="services.postgres",
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T15:00:00+00:00"),
                    source_modified_at=_dt("2026-07-22T08:35:05+00:00"),
                    discovery_id="DISC-0002",
                )
            ],
        )
    )

    # --- Drive: ETA-Blueprint vault (duplicated at two paths — indexed once, evidence applies to both) ---
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/00-VISION/Project Constitution.md",
            title="Project Constitution.md",
            doc_type=DocType.ARCHITECTURE,
            modified_at=_dt("2026-07-11T00:00:00+00:00"),
            repository=DRIVE,
            external_id="1R8NigEUTVzKMaUbpWzGXteINgpzL6X3r",
            relationships=["ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/00-VISION/Project Constitution.md"],
            concepts=["documentation strategy", "decision hierarchy", "ETA Blueprint", "ETA Platform"],
            tags=["governance", "duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="Every feature implemented inside ETA Platform must first exist inside ETA Blueprint. ETA Blueprint is the Documentation Source of Truth. ETA Platform is the Implementation Source of Truth. If it is not documented, it does not exist.",
                    heading="# Documentation Strategy",
                    section=None,
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:10:00+00:00"),
                    source_modified_at=_dt("2026-07-11T00:00:00+00:00"),
                    discovery_id="DISC-0005",
                )
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/01-BUSINESS/Stakeholders.md",
            title="Stakeholders.md",
            doc_type=DocType.COMPANY_PROFILE,
            modified_at=_dt("2026-07-16T06:49:20+00:00"),
            repository=DRIVE,
            external_id="1BX3tI3pc-ZGv-GYpmi4E6GZEUzh_JIRC",
            relationships=[
                "ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/01-BUSINESS/Stakeholders.md",
                "docs/decisions/ADR-0013-crm-target-microsoft-dynamics.md",
            ],
            concepts=["RBAC", "AI Stakeholders", "Odoo ERP", "Microsoft Dynamics CRM", "Integrated Systems"],
            tags=["governance", "duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="External enterprise systems include:\n\n- Odoo ERP\n- Microsoft Dynamics CRM\n- OpenAI\n- Claude\n- Email Server",
                    heading="# Integrated Systems",
                    section=None,
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:05:00+00:00"),
                    source_modified_at=_dt("2026-07-16T06:49:20+00:00"),
                    discovery_id="DISC-0005",
                )
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/02-BLUEPRINT/Domains/Procurement Domain.md",
            title="Procurement Domain.md",
            doc_type=DocType.PROCUREMENT,
            modified_at=_dt("2026-07-11T00:00:00+00:00"),
            repository=DRIVE,
            relationships=["ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/02-BLUEPRINT/Domains/Procurement Domain.md", "domains/procurement-core"],
            concepts=["procurement bounded context", "Odoo Mapping"],
            tags=["duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="(subagent-reported: Odoo Mapping section maps to Purchase/Inventory/Approvals/Documents/Quality/PLM/Accounting/Project/Discuss apps)",
                    heading=None,
                    section=None,
                    verification_status=INFERRED,
                    cached_at=_dt("2026-07-23T15:00:00+00:00"),
                    source_modified_at=None,
                    discovery_id="DISC-0003",
                )
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/02-BLUEPRINT/Domains/Supplier Domain.md",
            title="Supplier Domain.md",
            doc_type=DocType.PROCUREMENT,
            modified_at=_dt("2026-07-11T00:00:00+00:00"),
            repository=DRIVE,
            relationships=["ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/02-BLUEPRINT/Domains/Supplier Domain.md", "domains/suppliers"],
            concepts=["supplier bounded context"],
            tags=["duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="(subagent-reported, not yet directly re-read this session)",
                    heading=None,
                    section=None,
                    verification_status=INFERRED,
                    cached_at=_dt("2026-07-23T15:00:00+00:00"),
                    source_modified_at=None,
                    discovery_id="DISC-0003",
                )
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/03-ARCHITECTURE/Technology-Stack.md",
            title="Technology-Stack.md",
            doc_type=DocType.ARCHITECTURE,
            modified_at=_dt("2026-07-16T06:49:20+00:00"),
            repository=DRIVE,
            external_id="1yoXMrKHbpP7VbaApHGSrVPz9WLkqXD2C",
            relationships=[
                "ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/03-ARCHITECTURE/Technology-Stack.md",
                "docs/decisions/ADR-0002-monorepo-tooling-and-runtime-split.md",
                "docs/decisions/ADR-0012-identity-provider-keycloak.md",
                "docs/decisions/ADR-0014-vector-database-qdrant.md",
            ],
            dependencies=["docs/architecture/CONFLICT-REPORT.md"],
            concepts=["FastAPI", "Python 3.12", "Postgres", "Qdrant", "Keycloak", "pnpm", "Turborepo", "Next.js"],
            tags=["architecture", "conflict:ADR-0002", "duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="Framework\n\n- FastAPI\n\nLanguage\n\n- Python 3.12+",
                    heading="# Backend",
                    section=None,
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:15:00+00:00"),
                    source_modified_at=_dt("2026-07-16T06:49:20+00:00"),
                    discovery_id="DISC-0005",
                ),
                EvidenceCache(
                    excerpt="Preferred\n\n- Keycloak\n\nProtocols\n\n- OAuth2\n- OpenID Connect",
                    heading="# Authentication",
                    section="Preferred",
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:15:00+00:00"),
                    source_modified_at=_dt("2026-07-16T06:49:20+00:00"),
                    discovery_id="DISC-0005",
                ),
                EvidenceCache(
                    excerpt="Operational Database\n\n- PostgreSQL\n\nVector Database\n\n- Qdrant",
                    heading="# Databases",
                    section=None,
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:15:00+00:00"),
                    source_modified_at=_dt("2026-07-16T06:49:20+00:00"),
                    discovery_id="DISC-0005",
                ),
                EvidenceCache(
                    excerpt="Package Manager\n\n- pnpm\n\nMonorepo\n\n- Turborepo",
                    heading="# Development Tools",
                    section="Package Manager / Monorepo",
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:15:00+00:00"),
                    source_modified_at=_dt("2026-07-16T06:49:20+00:00"),
                    discovery_id="DISC-0005",
                ),
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/03-ARCHITECTURE/Security-Architecture.md",
            title="Security-Architecture.md",
            doc_type=DocType.ARCHITECTURE,
            modified_at=_dt("2026-07-11T00:00:00+00:00"),
            repository=DRIVE,
            relationships=["ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/03-ARCHITECTURE/Security-Architecture.md"],
            concepts=["Zero Trust", "RBAC", "AES-256", "TLS 1.3", "ISO 27001", "SOC2", "GDPR"],
            tags=["duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="(subagent-reported, not yet directly re-read this session)",
                    heading=None,
                    section=None,
                    verification_status=INFERRED,
                    cached_at=_dt("2026-07-23T15:00:00+00:00"),
                    source_modified_at=None,
                    discovery_id="DISC-0003",
                )
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/04-DATA/Enterprise Data Dictionary.md",
            title="Enterprise Data Dictionary.md",
            doc_type=DocType.REFERENCE_DATA,
            modified_at=_dt("2026-07-11T00:00:00+00:00"),
            repository=DRIVE,
            external_id="1Cc2bDC8AQhbVEL2Il14hDz60VJPIZFua",
            relationships=["ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/04-DATA/Enterprise Data Dictionary.md"],
            concepts=["Organization Master Data", "Exir Tejarat Atlas", "Allison General Trading LLC", "master data", "SSOT"],
            tags=["reference-data", "duplicated-at-two-paths", "needs-business-confirmation"],
            evidence=[
                EvidenceCache(
                    excerpt="Represents legal entities operating within ETA.\n\nExamples\n\n- Exir Tejarat Atlas\n- Allison General Trading LLC",
                    heading="# Organization Master Data",
                    section="Examples",
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:20:00+00:00"),
                    source_modified_at=_dt("2026-07-11T00:00:00+00:00"),
                    discovery_id="DISC-0005",
                ),
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/04-DATA/Data-Classification.md",
            title="Data-Classification.md",
            doc_type=DocType.AI,
            modified_at=_dt("2026-07-11T00:00:00+00:00"),
            repository=DRIVE,
            relationships=["ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/04-DATA/Data-Classification.md", "governance/ai-governance"],
            concepts=["data classification", "Public", "Internal", "Confidential", "Restricted", "Highly Restricted"],
            tags=["duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="(subagent-reported: 5-tier classification with per-tier AI-access rules, not yet directly re-read this session)",
                    heading=None,
                    section=None,
                    verification_status=INFERRED,
                    cached_at=_dt("2026-07-23T15:00:00+00:00"),
                    source_modified_at=None,
                    discovery_id="DISC-0003",
                )
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/11-AI/PROJECT_RULES.md",
            title="PROJECT_RULES.md",
            doc_type=DocType.AI,
            modified_at=_dt("2026-07-16T06:49:20+00:00"),
            repository=DRIVE,
            external_id="1z5UYmKB9xKX0Qk3_y2o9CliPwyxP2JPA",
            relationships=["ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/11-AI/PROJECT_RULES.md"],
            concepts=["AI operating rules", "ETA-Blueprint", "ETA-Platform"],
            tags=["governance", "duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="Never recreate the project.\n- Never scaffold a new project.\n- Never overwrite existing work.\n- Continue from GitHub only.",
                    heading="# PROJECT RULES",
                    section=None,
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T18:12:00+00:00"),
                    source_modified_at=_dt("2026-07-16T06:49:20+00:00"),
                    discovery_id="DISC-0005",
                )
            ],
        )
    )
    entries.append(
        InventoryEntry(
            path="ETA-Knowledge-v1/ETA-Blueprint/20-BRANDING/04-Visual-Identity",
            title="04-Visual-Identity",
            doc_type=DocType.BRANDING,
            modified_at=_dt("2026-07-11T00:00:00+00:00"),
            repository=DRIVE,
            relationships=["ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/20-BRANDING/04-Visual-Identity", "platform/design-system"],
            concepts=["ETA Navy", "ETA Copper", "color system"],
            tags=["duplicated-at-two-paths"],
            evidence=[
                EvidenceCache(
                    excerpt="(subagent-reported: ETA Navy #0F172A, ETA Copper #C57B39, WCAG-AA requirement, not yet directly re-read this session)",
                    heading=None,
                    section=None,
                    verification_status=INFERRED,
                    cached_at=_dt("2026-07-23T15:00:00+00:00"),
                    source_modified_at=None,
                    discovery_id="DISC-0003",
                )
            ],
        )
    )

    # --- Local repo: ADRs ---
    adrs = [
        ("0001", "eta-system-target-architecture"),
        ("0002", "monorepo-tooling-and-runtime-split"),
        ("0003", "database-engine"),
        ("0004", "event-bus-and-outbox-pattern"),
        ("0005", "multi-tenancy-and-domain-data-isolation"),
        ("0006", "secrets-management"),
        ("0007", "identity-and-authorization-model"),
        ("0008", "branch-reconciliation"),
        ("0009", "knowledge-base-taxonomy-reconciliation"),
        ("0010", "repository-visibility-and-github-process"),
        ("0011", "odoo-prototype-prior-art"),
        ("0012", "identity-provider-keycloak"),
        ("0013", "crm-target-microsoft-dynamics"),
        ("0014", "vector-database-qdrant"),
        ("0015", "existing-odoo-environment"),
    ]
    for number, slug in adrs:
        entries.append(
            InventoryEntry(
                path=f"docs/decisions/ADR-{number}-{slug}.md",
                title=f"ADR-{number}: {slug.replace('-', ' ')}",
                doc_type=DocType.ADR,
                modified_at=None,
                repository=REPO,
                concepts=slug.replace("-", " ").split(),
                tags=["adr"],
            )
        )

    # --- Local repo: implemented packages ---
    for pkg, doc_type, deps in [
        ("platform/kernel", DocType.AI, []),
        ("platform/persistence", DocType.AI, ["platform/kernel"]),
        ("platform/events", DocType.AI, ["platform/kernel", "platform/persistence"]),
        ("domains/suppliers", DocType.PROCUREMENT, ["platform/kernel", "platform/persistence"]),
        ("domains/procurement-core", DocType.PROCUREMENT, ["platform/kernel", "platform/persistence"]),
        ("integrations/odoo", DocType.ODOO, ["domains/suppliers", "domains/procurement-core"]),
        ("apps/bff", DocType.INTEGRATION, ["platform/persistence", "domains/suppliers"]),
    ]:
        entries.append(
            InventoryEntry(
                path=pkg,
                title=pkg,
                doc_type=doc_type,
                modified_at=None,
                repository=REPO,
                relationships=["docs/decisions/ADR-0001-eta-system-target-architecture.md"],
                dependencies=deps,
                tags=["implemented", "tested"],
            )
        )

    # --- Running environment: the real pre-existing Odoo instance ---
    entries.append(
        InventoryEntry(
            path="/Users/ali/Development/ETA (eta-odoo + eta-postgres containers)",
            title="Existing Odoo 19 / Postgres 17 environment",
            doc_type=DocType.ODOO,
            modified_at=_dt("2026-07-06T07:53:50+00:00"),
            repository=Repository.RUNNING_ENVIRONMENT,
            relationships=["docs/decisions/ADR-0015-existing-odoo-environment.md", "integrations/odoo"],
            concepts=["Odoo 19", "Postgres 17", "eta_dev database", "Community Edition"],
            tags=["running-environment", "primary-erp-target", "no-custom-addons-yet"],
            evidence=[
                EvidenceCache(
                    excerpt="79 installed modules including account, sale, sale_management; NO purchase or crm module installed; 0 custom addons",
                    heading=None,
                    section="ir_module_module query result",
                    verification_status=VERIFIED,
                    cached_at=_dt("2026-07-23T17:40:00+00:00"),
                    source_modified_at=None,
                    discovery_id="DISC-0006",
                )
            ],
        )
    )

    return entries


if __name__ == "__main__":
    store = InventoryStore(Path(__file__).parent / "inventory.json")
    for entry in build_seed_entries():
        store.upsert(entry)
    store.save()
    print(f"Seeded {len(store)} inventory entries -> {store.path}")
