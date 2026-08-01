"""Retroactively records the discovery sessions that already happened in
this project's history, before the Discovery Log itself existed. Going
forward, new discovery sessions should be appended directly via
DiscoveryLog.append rather than by editing this seed file.

Run: python seed_discovery_log.py
"""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from discovery_log import DiscoveryLog, DiscoveryRecord


def _dt(iso: str) -> datetime:
    return datetime.fromisoformat(iso).replace(tzinfo=timezone.utc)


def build_records() -> list[DiscoveryRecord]:
    return [
        DiscoveryRecord(
            discovery_id="DISC-0001",
            timestamp=_dt("2026-07-23T13:00:00+00:00"),
            scope="Initial exhaustive traversal of ETA-Knowledge-v1 top level and the 00-KNOWLEDGE/ nested taxonomy.",
            sources_inspected=[
                "ETA-Knowledge-v1/ (root, all top-level folders)",
                "ETA-Knowledge-v1/00-KNOWLEDGE/ (nested taxonomy)",
                "ETA-Knowledge-v1/ETA-Platform/config/ (docker-compose.yml, .env, postgres/, odoo/, logs/)",
            ],
            new_findings=[
                "Most top-level folders are 0-byte placeholders",
                "00-KNOWLEDGE/ is a second, parallel numbered taxonomy",
                "Real content exists: brand assets, Iranian steel manufacturer data, daily price lists, real commercial documents",
                "An exposed .env file and a live/crashed Postgres data directory exist under ETA-Platform/config/",
            ],
        ),
        DiscoveryRecord(
            discovery_id="DISC-0002",
            timestamp=_dt("2026-07-23T13:30:00+00:00"),
            scope="Direct read of ETA-Platform/config/docker-compose.yml content (base64-decoded).",
            sources_inspected=["ETA-Platform/config/docker-compose.yml (file ID 1qQGag4-tma2VZcYK32ZGNgShb754ahXA)"],
            new_findings=[
                "Postgres 16, db name 'eta', from-source Odoo build with custom_addons mount",
                "Hardcoded weak odoo/odoo credentials — flagged as prior art to learn from, not repeat",
            ],
        ),
        DiscoveryRecord(
            discovery_id="DISC-0003",
            timestamp=_dt("2026-07-23T14:00:00+00:00"),
            scope="Subagent-delegated deep traversal of the ETA-Blueprint Obsidian vault (both duplicate Drive paths).",
            sources_inspected=[
                "ETA-Knowledge-v1/ETA-Blueprint/ (full tree)",
                "ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/ (confirmed byte-identical duplicate)",
            ],
            new_findings=[
                "Vault confirmed duplicated at two paths, byte-identical",
                "Reported (not yet directly re-verified at time of this record): Technology-Stack.md tech stack, Stakeholders.md org chart + integrated systems, Enterprise Data Dictionary Allison General Trading LLC mention, Data-Classification 5-tier scheme, Project Constitution decision hierarchy",
            ],
        ),
        DiscoveryRecord(
            discovery_id="DISC-0004",
            timestamp=_dt("2026-07-23T18:00:00+00:00"),
            scope="First direct-evidence re-verification pass, in response to the evidence-citation standard: re-fetched several files' exact metadata live rather than relying on the DISC-0003 subagent report.",
            sources_inspected=[
                "docker-compose.yml (metadata re-fetch)",
                "Invoice.docx (full metadata + content snippet)",
                "ETA Offer_Template.xlsx (full metadata + content snippet)",
                "Technology-Stack.md, both copies (full content read)",
            ],
            updated_findings=[
                "Confirmed live: docker-compose.yml has no inventory entry yet at time of check (later fixed)",
                "Confirmed live: Technology-Stack.md pnpm+Turborepo monorepo conflict, not previously called out as precisely as the FastAPI/Python conflict",
            ],
        ),
        DiscoveryRecord(
            discovery_id="DISC-0005",
            timestamp=_dt("2026-07-23T18:15:00+00:00"),
            scope="Second, deeper evidence re-verification pass: full-content reads of Stakeholders.md, Enterprise Data Dictionary.md, Project Constitution.md, PROJECT_RULES.md — specifically to promote DISC-0003's subagent-reported findings to directly-VERIFIED status.",
            sources_inspected=[
                "Stakeholders.md (full content, including the Integrated Systems section truncated out of the earlier snippet)",
                "Enterprise Data Dictionary.md (full content, including Organization Master Data section)",
                "Project Constitution.md (Documentation Strategy section)",
                "PROJECT_RULES.md (full content, short file)",
            ],
            updated_findings=[
                "Microsoft Dynamics CRM + Odoo ERP under '# Integrated Systems' — promoted from INFERRED (DISC-0003) to VERIFIED",
                "Allison General Trading LLC under '# Organization Master Data' — promoted from INFERRED (DISC-0003) to VERIFIED (the document text is verified; whether it denotes a real subsidiary remains unconfirmed with the user)",
                "'If it is not documented, it does not exist' governance rule — VERIFIED",
            ],
            superseded_findings=[
                "DISC-0003's un-re-verified claims about these same three documents are superseded by this record's direct reads — DISC-0003 itself is not deleted, since it accurately reflects what was known at that time",
            ],
        ),
        DiscoveryRecord(
            discovery_id="DISC-0006",
            timestamp=_dt("2026-07-23T17:30:00+00:00"),
            scope="Read-only Docker/PostgreSQL/Odoo environment audit of a pre-existing, independently-running Odoo instance discovered at /Users/ali/Development/ETA/ (unrelated to this repository).",
            sources_inspected=[
                "docker inspect eta-odoo, eta-postgres",
                "docker exec eta-postgres psql — database list, ir_module_module, res_company, res_users, res_partner, product_template",
                "docker exec eta-odoo cat /etc/odoo/odoo.conf",
                "Host filesystem: /Users/ali/Development/ETA/{addons,config,data,logs,odoo,docker-compose.yml}",
            ],
            new_findings=[
                "Real Odoo 19 (official image) + Postgres 17 instance, running since 2026-07-06",
                "Database 'eta_dev': 79 modules installed (base, Sales, Accounting) — Purchase and CRM apps NOT installed",
                "Zero custom addons, zero real business data — company still named 'My Company'",
                "A vendored, unused Odoo-19 source git clone sits alongside but is not used by the running container",
            ],
            updated_findings=[
                "Refines ADR-0003/ADR-0011: real Postgres version is 17 (not 16), real db name is 'eta_dev' (not 'eta')",
            ],
        ),
    ]


if __name__ == "__main__":
    log = DiscoveryLog(Path(__file__).parent / "discovery_log.json")
    for record in build_records():
        if log.get(record.discovery_id) is None:
            log.append(record)
    log.save()
    print(f"Discovery log now has {len(log)} records -> {log.path}")
