# Knowledge (Base) Memory

**VERIFIED** — The Google Drive knowledge base root is **ETA-Knowledge-v1** (folder ID `1QaxlqaLuBDaZXchV-eYPqIktx_Ebd696`). Most top-level folders (`01_Company`, `02_Brand`, `07_Procurement`, `08_Odoo`, `09_Blueprint`, `10_AI`, `11_Prompts`, `12_Workflows`, `13_Regulations`, `14_Database`) are empty placeholders holding one or two 0-byte index files.

**VERIFIED** — A second, parallel numbered taxonomy exists at `ETA-Knowledge-v1/00-KNOWLEDGE/` ([ADR-0009](../../docs/decisions/ADR-0009-knowledge-base-taxonomy-reconciliation.md)), with real content in some subfolders (manufacturer data, price lists, brand assets, vendored Odoo source).

**VERIFIED** — The one genuinely rich source is the **ETA-Blueprint** Obsidian vault, duplicated byte-identical at two Drive paths (`ETA-Knowledge-v1/ETA-Blueprint/` and `ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/`). Real content: `00-VISION/`, `01-BUSINESS/` (+`Finance/`), `02-BLUEPRINT/` (+`Domains/`), `03-ARCHITECTURE/` (+`Finance/`, mostly empty), `04-DATA/` (+`Finance/`), `11-AI/`, `20-BRANDING/`. Empty: `05-AI/`, `06-UX/`, `07-SECURITY/`, `08-AUTOMATION/`, `09-ROADMAP/`.

**PARTIALLY VERIFIED** — The Blueprint's approved tech stack (FastAPI/Python, Postgres 17, Qdrant, Keycloak) as reported by a prior discovery session conflicts with ADR-0002's TypeScript-first split for non-`ai/` packages — this conflict is tracked, not yet resolved by a new ADR beyond the specific pieces ADR-0012 (Keycloak) and ADR-0014 (Qdrant) already settled.

**VERIFIED** — There is no automated sync between the Drive vault and this GitHub repo. Any repo-vs-Drive comparison defaults to `LOCAL_ONLY` or `DRIVE_ONLY` — never assume `IDENTICAL`/`DIVERGED` without an actual commit-level comparison.

**UNKNOWN** — Full content of `10_AI/`, `11_Prompts/`, `12_Workflows/`, `13_Regulations/`, `14_Database/` beyond their index-file placeholders.
