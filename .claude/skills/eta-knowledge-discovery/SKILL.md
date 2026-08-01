---
name: eta-knowledge-discovery
description: Look up or reason about anything in the ETA-Knowledge-v1 Google Drive vault, or check what's already indexed for ETA-System, before running a fresh Drive search. Use this whenever a task touches ETA-System's business/architecture knowledge base, needs to cite a Drive document as evidence, needs to know what's already in ai/knowledge/retrieval/inventory.json or discovery_log.json, or needs the Google Drive folder structure for ETA-Knowledge-v1 — even if the user just says "check the knowledge base," "what does the Blueprint say about X," or "look this up in Drive," without naming the skill directly.
version: 1.1.0
last_updated: 2026-07-23
source_documents:
  - ai/knowledge/retrieval/inventory.json
  - ai/knowledge/retrieval/discovery_log.json
  - docs/architecture/CONFLICT-REPORT.md
related_adrs:
  - ADR-0009-knowledge-base-taxonomy-reconciliation
  - ADR-0011-odoo-prototype-prior-art
  - ADR-0012-identity-provider-keycloak
  - ADR-0013-crm-target-microsoft-dynamics
  - ADR-0014-vector-database-qdrant
  - ADR-0015-existing-odoo-environment
dependencies:
  - Google Drive MCP connector (search_files, read_file_content, download_file_content, get_file_metadata)
  - ai/knowledge/retrieval/inventory_store.py (InventoryStore)
  - ai/knowledge/retrieval/discovery_log.py (DiscoveryLog)
---

# ETA Knowledge Discovery

**v1.1.0, last updated 2026-07-23.** Source documents, related ADRs, and dependencies are listed in the frontmatter above — this is a version-controlled knowledge asset (rule 30), not a one-off note. When the inventory schema, the Drive folder map, or the evidence standard changes, bump the version and update `last_updated` here.

This skill exists so nobody — human or Claude — has to re-derive the ETA-Knowledge-v1 folder map or the evidence-citation standard from scratch. Both were built through several rounds of exhaustive, expensive exploration, recorded as Discovery IDs DISC-0001 through DISC-0006 in `discovery_log.json`. Treat this file as the starting point for any Drive lookup, not a fresh crawl.

## Before doing anything else

Check `ai/knowledge/retrieval/inventory.json` in the local repo first — this is a real semantic index, not a bare file list (rule 27): each entry carries `path`/`title`/`doc_type`/`modified_at`/`repository`, plus `concepts`, `tags`, `relationships`, `dependencies`, and a cached `evidence` list (short verified excerpts with heading/section, each tagged `VERIFIED`/`PARTIALLY_VERIFIED`/`INFERRED`/`UNKNOWN`). Use `InventoryStore.by_concept()`, `.search_keywords()`, or `.verified_evidence_for()` (in `inventory_store.py`) to query it — that last one filters to only evidence you can safely treat as fact, excluding anything still `INFERRED`. If what you need already has cached `VERIFIED` evidence, cite that directly instead of re-fetching from Drive.

Also check `ai/knowledge/retrieval/discovery_log.json` — an append-only, versioned log of every past discovery session (rule 28), each with a `DISC-NNNN` ID, scope, and what it found. It tells you what's already been looked at, when, and whether a later session already updated or superseded an earlier finding — check this before assuming something hasn't been discovered yet.

If what you need isn't in either, or only has `INFERRED`/`UNKNOWN` evidence, search Drive directly (see below), then: (1) add or update the inventory entry via `InventoryStore.upsert`, (2) append a new record to the discovery log via `DiscoveryLog.append` with the next sequential ID from `.next_id()` — never edit or overwrite a past discovery record, even to correct it; append a new one that supersedes it instead.

## The Drive folder map (as last verified 2026-07-23)

Root: **ETA-Knowledge-v1**, folder ID `1QaxlqaLuBDaZXchV-eYPqIktx_Ebd696`.

Most of this tree is empty placeholder folders — knowing this in advance saves you from re-opening them expecting content:
- `01_Company`, `02_Brand`, `07_Procurement`, `08_Odoo`, `09_Blueprint`, `10_AI`, `11_Prompts`, `12_Workflows`, `13_Regulations`, `14_Database` — each holds one or two 0-byte index files.
- `Document/` — the exception: real commercial templates (offer, invoice, letterhead).
- `00-KNOWLEDGE/` — a second, parallel numbered taxonomy (`02-BRANDING`, `06-ODOO`, `09-DATABASE`, `10-DOCUMENTS`, `11-WEBSITE`, `15-BLUEPRINT`). Some subfolders here have real content (manufacturer data, price lists, brand assets, vendored Odoo source) — see the Conflict Report / ADR-0009 in the local repo for why this duplicate taxonomy exists and why it isn't being reconciled from this skill.

**The one genuinely rich source** is an Obsidian vault called **ETA-Blueprint**, which exists duplicated at two Drive paths — confirmed byte-identical, so reading one tells you everything about the other:
- Top-level: `ETA-Knowledge-v1/ETA-Blueprint/`
- Nested: `ETA-Knowledge-v1/00-KNOWLEDGE/15-BLUEPRINT/`

Inside the vault, real content lives under: `00-VISION/`, `01-BUSINESS/` (+ `Finance/`), `02-BLUEPRINT/` (+ `Domains/`), `03-ARCHITECTURE/` (+ `Finance/`, mostly empty), `04-DATA/` (+ `Finance/`), `11-AI/`, `20-BRANDING/`. The folders `05-AI/`, `06-UX/`, `07-SECURITY/`, `08-AUTOMATION/`, `09-ROADMAP/` are empty placeholders — don't expect to find anything there.

## How to search without loading everything

The vault is one part of a knowledge base with roughly 100,000 files total. Never enumerate the whole thing.

- Use `search_files` with a `parentId = '<id>'` query to list one folder's children, or a `title contains '<word>'` query to find a specific document by name.
- Set `excludeContentSnippets: true` when you only need metadata (building an inventory pass), and drop it when you actually need to read content.
- Only call `read_file_content` (or `download_file_content` for binary/unsupported mime types) on documents that are actually relevant to the current task — not everything a folder listing turns up.
- If a `search_files` call errors with a size/token limit, retry with a smaller `pageSize` (10–15) rather than giving up or guessing at the content.

## Evidence-citation standard

Every conclusion drawn from a Drive document must be traceable. When citing one, give:

- **File Name** and **File ID** (from the API response, not typed from memory)
- **Folder Path** — reconstruct this from the `parentId` chain if you need it, but say explicitly that it's reconstructed, not a native Drive field (the API returns `parentId`, never a path string)
- **Heading** and **Section** the quote comes from
- **Quoted excerpt** — read the actual relevant section before quoting it; a truncated snippet is not sufficient evidence for content past the truncation point
- **SHA256 / content hash** — write `UNKNOWN`. No metadata response from this connector has included a checksum field; don't compute or guess one.
- **Last Modified** — the `modifiedTime` field, always available
- **Source Type** — Google Drive, GitHub, Local Repository, or Running Environment as appropriate
- **Confidence Level** — mark `VERIFIED` only if you read the relevant section yourself this session. If you're relying on an earlier summary (yours or a subagent's) that you haven't re-checked, say so and don't call it verified.

## GitHub / Drive synchronization

There is no automated sync between this Drive vault and the ETA-System GitHub repo — none has ever been built. Any comparison between the two defaults to one of:
- **LOCAL_ONLY** — something exists in the repo's working tree but isn't committed/pushed
- **DRIVE_ONLY** — something exists in Drive with no repo-side counterpart

As of 2026-07-23, nothing built in ETA-System sessions had been committed to git — check `git log` / `git status` fresh rather than assuming this is still true later. Never report `IDENTICAL`, `DIVERGED`, `GITHUB_NEWER`, or `DRIVE_NEWER` without an actual commit to compare against.

## When you find something new

Add it to `ai/knowledge/retrieval/inventory.json` (via `InventoryStore.upsert`, or by editing `seed_inventory.py`'s entry list) and log the session in `discovery_log.json` (via `DiscoveryLog.append`) so the next person — or the next session — doesn't have to search for it again. This skill, the inventory, and the discovery log are meant to grow together; treat a Drive lookup that doesn't get recorded anywhere as unfinished work.

Only promote a finding into a Claude Memory file if it's `VERIFIED` (rule 29) — `INFERRED` or `UNKNOWN` findings belong in the inventory/discovery log (where uncertainty is trackable) but must never be written into Memory framed as settled fact.
