---
name: eta-companyprofile
description: Use when a task references the ETA Company Profile document — reviewing it, redesigning it, or citing it as a source of business facts (legal name, structure, stakeholders). Trigger on "company profile," "review our profile doc," or "what does the company profile say."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - eta-knowledge-discovery
  - eta-evidence
related_skills:
  - eta-branding
  - eta-design-handoff
related_adrs:
  - ADR-0009-knowledge-base-taxonomy-reconciliation
---

# ETA Company Profile

## Ground truth

The Company Profile lives in the Drive knowledge base, not in this repo. `ETA-Knowledge-v1/01_Company` is indexed as an empty placeholder folder (VERIFIED 2026-07-23) — any real Company Profile content, if it exists, is elsewhere in the vault (check `00-KNOWLEDGE/` or the `ETA-Blueprint` vault's `01-BUSINESS/` first via `eta-knowledge-discovery`) or hasn't been authored yet.

Flagged for follow-up, not yet resolved: an "Allison General Trading LLC" mention surfaced in the Blueprint's Enterprise Data Dictionary, suggesting possible multi-tenancy / multi-entity structure relevant to the Company Profile — treat this as `PARTIALLY VERIFIED` until directly re-confirmed.

## Best practices

- This is explicitly out of scope for Claude-OS bootstrap work (the mission statement says "Do NOT modify the Company Profile") — `before-companyprofile.sh` warns if a write/edit targets a matching path.
- When asked to review or design the Company Profile, treat it as a Drive-knowledge task first (via `eta-knowledge-discovery`), not a repo-code task.
- Any business fact drawn from it (legal entity name, ownership, address) needs the full evidence citation from `eta-evidence` — these are exactly the kind of facts that must never be stated as `VERIFIED` from memory alone.

## Limitations

The actual Company Profile document has not been located and read this session as of this build — its content, format, and location are `UNKNOWN` until a discovery session runs `eta-knowledge-discovery` against it.
