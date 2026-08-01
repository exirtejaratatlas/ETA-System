---
name: eta-website
description: Use when a task touches the ETA public website — reviewing it, planning a refactor, or checking its relationship to apps/web in this repo. Trigger on "review the website," "website refactor," "check our site," or "is the website in this repo."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - eta-production-safety (the live site is production, not a sandbox)
  - eta-evidence
related_skills:
  - eta-ui-review
  - eta-branding
  - eta-deployment
related_adrs:
  - ADR-0001-eta-system-target-architecture
---

# ETA Website

## Ground truth

`apps/web` is the frozen-architecture home for any web frontend (ADR-0001) — currently a stub, no source code. Whether the live public ETA website is the same codebase as `apps/web`, a separate CMS-driven site, or something else entirely is **UNKNOWN** until verified — don't assume they're the same system just because the names line up.

Google Drive's `00-KNOWLEDGE/11-WEBSITE` folder is an indexed but largely unverified source for website-related material — check `ai/knowledge/retrieval/inventory.json` for any cached entries before re-crawling it.

## Best practices

- Before any website review, establish which system is actually live (ask the user or check DNS/hosting config) rather than assuming `apps/web` is deployed anywhere yet.
- Website changes are explicitly out of scope for Claude-OS infrastructure work (this bootstrap's own mandate) — `before-website.sh` warns if a write/command looks like a site deploy. Confirm explicit authorization before proceeding past that warning.
- Any live-site change is a production action per `eta-production-safety` — never publish/deploy without explicit user confirmation of the exact change.

## Limitations

No verified mapping exists yet between "the ETA website" as a business asset and any code in this repo. Treat every claim about "the website's current state" as `UNKNOWN` unless a session has actually fetched and confirmed it.
