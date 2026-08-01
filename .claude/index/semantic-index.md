# ETA-System Semantic Index — coverage map

This is a pointer document, not a second index. The bootstrap spec asked for a semantic index over: Google Drive, Repository, ADR, Blueprint, Knowledge, Business Domains, Odoo, Website, Company Profile, Brand Assets, Prompt Library, Architecture. Per the standing no-duplicate-concepts rule, coverage is provided by two existing/adjacent stores, not a new parallel one:

- **`ai/knowledge/retrieval/inventory.json`** (+ `inventory_store.py`) — the real semantic index: concepts, tags, relationships, dependencies, cached evidence with confidence levels. Canonical for anything Drive-sourced.
- **`.claude/index/repository-index.json`** — a lightweight, regenerable structural map of this repo's own top-level packages (which subpackages exist, whether they have `src/`, file counts). Canonical for "what exists in the repo," not what it means.

## Coverage by requested domain

| Domain | Covered by | Status |
|---|---|---|
| Google Drive | `inventory.json` | Populated — 48+ entries as of last count, growing via `eta-knowledge-discovery` |
| Repository | `repository-index.json` | Populated, structural only |
| ADR | `docs/decisions/ADR-*.md` directly (15 ADRs) — indexed by number/title, not yet mirrored into `inventory.json` | Partial — real source is the files themselves; not yet cross-referenced into the semantic index as entries |
| Blueprint | `inventory.json` (ETA-Blueprint vault entries) | Partial — real content confirmed in `00-VISION/`, `01-BUSINESS/`, `02-BLUEPRINT/`, `03-ARCHITECTURE/`, `04-DATA/`, `11-AI/`, `20-BRANDING/`; most individual documents not yet indexed as separate entries |
| Knowledge (general) | `inventory.json` + `discovery_log.json` | Populated for what's been discovered; ~100k-file Drive vault means most of it is still unindexed by volume |
| Business Domains | `docs/architecture/context-map.md` (repo) + Blueprint `Domains/` (Drive) | Partial — architecture-level description exists; no business-logic content to index since `domains/*` is still mostly stubs |
| Odoo | `inventory.json` (docker-compose prior art) + `eta-odoo` skill (live env facts) | Partial — the real dev environment's actual module/data state isn't indexed anywhere, only its existence and shape |
| Website | none | **UNKNOWN / not indexed** — no verified mapping exists yet between any live website and repo code |
| Company Profile | none | **UNKNOWN / not indexed** — Drive's `01_Company` folder is confirmed empty; actual profile content, if it exists, hasn't been located |
| Brand Assets | `inventory.json` (partially) | Partial — folders confirmed to have real content (`02-BRANDING`, Blueprint `20-BRANDING/`), individual assets not yet itemized |
| Prompt Library | `.claude/prompts/` (this build) + `ai/prompts/README.md` (stub) | New — the prompt templates themselves are now the index; no separate metadata index needed for 15 files |
| Architecture | `docs/architecture/` + `docs/decisions/` directly | Full — this is the frozen, canonical description; no indexing gap |

## Why gaps are left as gaps

Filling "Website" or "Company Profile" with content here would mean asserting facts nobody has verified — a violation of the evidence standard (`eta-evidence`). The honest state is `UNKNOWN`, tracked as a known gap, not backfilled with plausible-sounding content. Closing a gap means running an actual discovery session (`eta-knowledge-discovery`, `eta-googledrive`) and recording it — not editing this table to look more complete.

## Maintenance

Regenerate `repository-index.json` after any structural repo change (script logic lives inline in the build history; re-run an equivalent `os.walk` over the ten top-level packages). Update this table's status column whenever a discovery session materially changes a domain's coverage — don't let it silently drift out of sync with `inventory.json`.
