# ADR-0015: Existing Odoo Environment is Primary — Refines ADR-0003/ADR-0011

Status: Accepted — refines ADR-0003 and ADR-0011, does not replace either
Date: 2026-07-23

## Context

A read-only audit (2026-07-23) discovered a pre-existing, independently-running Odoo environment on this machine, unrelated to anything built in this repository or found in the Drive knowledge base's docker-compose prototype. Full findings in the accompanying audit report. Summary of what it changes:

- **Postgres 17**, not 16 as ADR-0003/ADR-0011 assumed (the Drive prototype used 16; this real environment uses 17 — matching the Blueprint vault's "Approved" tech stack spec of "PostgreSQL 17+," which is now confirmed against a real running instance, not just a document).
- **Odoo 19**, official Docker image (not a from-source build like the Drive prototype or the vendored source copies found in Drive).
- **Database name `eta_dev`**, not `eta` as ADR-0011 recorded from the Drive prototype.
- **Host project directory `/Users/ali/Development/ETA/`** — entirely separate from this repository (`/Users/ali/Projects/ETA-System/`), with empty `addons/`, `config/`, and `logs/` directories (zero custom Odoo development has happened yet) and a vendored (unused-by-the-running-container) Odoo source clone under `odoo/`.
- Installed Odoo apps: **base, Sales, Accounting**, plus standard supporting modules. **Purchase (procurement) and CRM apps are NOT installed.** No custom modules exist. No real business data has been entered (company is still named "My Company," zero products, zero real partners).

## Decision

This existing Odoo 19 + Postgres 17 instance is the **primary ERP environment** going forward. `integrations/odoo` targets it, not a newly-created stack. Specifically:

- `platform/persistence` / `integrations/odoo` configuration defaults should be able to point at Postgres 17 semantics (no known 16-vs-17 breaking differences expected for the queries used, but noted as a compatibility check for Phase 7 work).
- `integrations/odoo`'s custom addon code (once built) is delivered into `/Users/ali/Development/ETA/addons/`, matching the real mounted `extra-addons` path — not into a new Docker stack.
- No second Odoo or Postgres instance is created for integration development. My own demo stack (`docker-compose.yml` in this repo — Postgres 16 on port 5433, used for the Supplier Management vertical slice) remains for `domains/*` development only and is unrelated to Odoo integration work.
- The Purchase and CRM apps must be installed on this real instance before `integrations/odoo`'s purchase-order/CRM sync can be exercised end-to-end — installing an app is a real, standing change to this environment and requires explicit approval before being performed (per the standing production-protection rule), not something to do unilaterally.

## Consequences

- ADR-0003 (Postgres engine) and ADR-0011 (Odoo prototype prior art) are not reversed — they correctly identified Postgres and Odoo as the direction. This ADR corrects the specific version/naming details now that a real instance is confirmed, and establishes that instance as authoritative over the Drive prototype's assumptions.
- Any future Odoo integration code should be written to be schema/version-tolerant where reasonable (19.0 module structure), since this is now a concrete, checkable target rather than an assumption.
