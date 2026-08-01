---
name: eta-odoo
description: Use when auditing, planning, or discussing Odoo work for ETA-System — the primary ERP system of record per ADR-0001. Covers the real running dev environment at /Users/ali/Development/ETA (Odoo 19, Postgres 17), the vendored Odoo source found in the Drive knowledge base, and how integrations/odoo/ (the anti-corruption layer) relates to it. Trigger on "check Odoo," "Odoo audit," "what's in our Odoo setup," or any custom-addon/module planning.
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - eta-knowledge-discovery (Drive-side Odoo prior art)
  - eta-production-safety (before touching the real dev environment)
related_skills:
  - eta-architecture
  - eta-procurement
  - eta-evidence
related_adrs:
  - ADR-0011-odoo-prototype-prior-art
  - ADR-0015-existing-odoo-environment
  - ADR-0003-database-engine
---

# ETA Odoo

## Ground truth (VERIFIED, 2026-07-06 environment build)

A real Odoo 19 instance backed by Postgres 17 is already running at `/Users/ali/Development/ETA/` — this is not a proposal, it exists. As of the last verified check it has **no custom addons installed, no Purchase/CRM apps configured, and no real business data**. It is the primary ERP target per ADR-0001 (Odoo-first). **Never spin up a second/parallel Odoo instance** — extend this one.

A separate, older prototype's `docker-compose.yml` was found in the Drive knowledge base (Postgres 16, db name `eta`, a from-source Odoo build with a `custom_addons` mount, hardcoded weak `odoo/odoo` credentials) — treat this as prior art to learn from, not to repeat, especially the credentials.

`integrations/odoo/` in this repo is the anti-corruption layer boundary — Odoo-specific adapter code belongs there, never inside a `domains/` package directly.

## Best practices

- Before proposing any Odoo customization, check `integrations/odoo/` for existing adapter code and `docs/decisions/` for an ADR covering the same integration surface.
- Treat the real dev environment as a live system: read-only inspection (`docker ps`, `docker logs`, read-only SQL) is safe by default; anything mutating (installing a module, writing data, changing config) needs explicit user confirmation — `before-odoo.sh` warns on this automatically.
- Cite Odoo facts with the evidence standard from `eta-evidence` — "the dev environment has X" is a claim that needs a verification timestamp, since environments drift.

## Limitations

No custom addons or business data exist yet — any "what does our Odoo have" question about Purchase/CRM/Procurement workflows currently resolves to `UNKNOWN`, not to be inferred from the vendored prototype source.
