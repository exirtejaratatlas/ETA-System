# CURRENT_STATE.md — Live Odoo Environment Audit

Status: Initial audit was read-only (pre-Milestone-1); this document was then updated in place after Milestone 1's changes were executed (see `STATUS.md` for the change log and evidence). Treat this as the current snapshot, not the original point-in-time audit.
Audit date: 2026-07-27 (initial), updated 2026-07-27 (post-Milestone 1)
Environment: `/Users/ali/Development/ETA/` (separate from this repository — see ADR-0015)

Initial findings came from `docker ps`, `docker exec ... psql` (read-only `SELECT`s), `docker logs`, and unauthenticated Odoo JSON-RPC endpoints. This supersedes the 2026-07-23 snapshot recorded in ADR-0015/`.claude/memory/odoo.md` where they differ — environments drift, this is the current ground truth.

## Docker

| Container | Image | Status | Ports | Notes |
|---|---|---|---|---|
| `eta-odoo` | `odoo:19` | Up | `0.0.0.0:8069→8069` | Official image, not from-source |
| `eta-postgres` | `postgres:17` | Up | `0.0.0.0:5432→5432` | |

Compose file: `/Users/ali/Development/ETA/docker-compose.yml`. **Update:** the Postgres `odoo`/`odoo` weak default credential (flagged here as matching the anti-pattern ADR-0011 warned against) has been rotated. The role password was changed live via `ALTER ROLE`; `docker-compose.yml` now references `${POSTGRES_PASSWORD}` rather than a literal value; the actual value lives in a new untracked `.env` in the same directory (not a git repo, so no commit-exposure risk). Verified end-to-end after container recreation — see `STATUS.md`.

Bind mounts `./addons` and `./config` on the host (`/Users/ali/Development/ETA/addons`, `/config`, `/logs`) are **empty** — confirmed by direct `ls`. Zero custom Odoo development has happened in this environment.

Resource usage at audit time: `eta-odoo` 179.6MiB / 0.07% CPU, `eta-postgres` 101.4MiB / 0% CPU — negligible load, consistent with an idle, unconfigured instance. Database size: 47MB.

Two unrelated container pairs (`eta_postgres`, `eta_nats`, `eta_keycloak` — underscore naming, distinct from the hyphenated `eta-odoo`/`eta-postgres` pair above) exist on this machine but are **Exited**, not running. They appear to belong to a separate local infra experiment (NATS + Keycloak + a second Postgres) unrelated to the live Odoo stack. Not touched, not in scope here — flagged only so they aren't confused with the real Odoo environment.

Odoo container logs show only benign `psycopg2.OperationalError` / bus-loop retry entries from a recent Postgres container restart (connection refused → reconnect) — no application errors, no tracebacks indicating a broken install.

## Server version

Odoo **19.0-20260630** (`server_serie: "19.0"`), confirmed via `/web/webclient/version_info`.

## Database

Single database: **`eta_dev`** (confirmed via `/web/database/list`) — matches ADR-0015, unchanged.

## Installed apps/modules (123 total as of Milestone 1, up from 56 — verified via `ir_module_module`)

**Update after Milestone 1:** CRM, Purchase, Inventory (`stock`), Project, Website, Employees (`hr`), Expenses (`hr_expense`), Calendar, Contacts, and Email Marketing (`mass_mailing`) are now installed, along with auto-pulled bridge modules (`sale_crm`, `sale_purchase`, `sale_stock`, `sale_project`, etc.). Installed with `--without-demo=all` — no demo data was loaded. The sections below describe the pre-Milestone-1 state where relevant for comparison; the "Missing" table immediately below has been updated to current.

**Functional apps present:**
- `account` — Accounting (installed)
- `sale`, `sale_management` — Sales (installed)
- `product`, `uom` — base product/UoM data model
- `portal` — customer portal framework (installed, not populated)
- `mail`, `bus` — Discuss/messaging backend
- `spreadsheet_dashboard*` — dashboarding

**Auth/identity-adjacent modules already installed** (notable — someone previously explored this): `auth_passkey`, `auth_passkey_portal`, `auth_signup`, `auth_totp`, `auth_totp_mail`, `auth_totp_portal`, `google_gmail`, `microsoft_outlook`. **No Keycloak/OIDC/SAML module is installed** — these are Odoo-native 2FA/passkey/email-provider modules only, not enterprise SSO. ADR-0012's Keycloak decision has no corresponding implementation in this environment yet.

**Everything else is base/technical infrastructure**: `base`, `base_setup`, `base_import`, `web`, `bus`, `analytic`, `iap`, `payment`, `resource`, `spreadsheet`, `digest`, `onboarding`, `partner_autocomplete`, `phone_validation`, `privacy_lookup`, `rpc`, `sms`, `snailmail`, `utm`, `web_tour`, `web_unsplash`, `api_doc`, `html_editor`, `http_routing`.

### Status by app — updated after Milestone 1

| App | Installed? | Notes |
|---|---|---|
| CRM | **Yes** (Milestone 1) | Structure only — zero leads/opportunities, none fabricated |
| Purchase | **Yes** (Milestone 1) | |
| Inventory | **Yes** (Milestone 1, `stock`) | |
| Sales | Yes (pre-existing) | |
| Accounting | Yes (pre-existing) | Still unconfigured — see Accounting section below |
| Project | **Yes** (Milestone 1) | |
| Website | **Yes** (Milestone 1) | Installed per explicit instruction — see `IMPLEMENTATION_PLAN.md` Milestone 9 caveat about not accidentally competing with the already-live `exiratlas.com`; not yet published/configured |
| Employees (HR) | **Yes** (Milestone 1, `hr`) | |
| Expenses | **Yes** (Milestone 1, `hr_expense`) | |
| Calendar | **Yes** (Milestone 1) | |
| Contacts | **Yes** (Milestone 1) | |
| Marketing (Email) | **Yes** (Milestone 1, `mass_mailing`) | |
| Documents | **No — Enterprise-only, not available in this Community image** | Not present in `ir_module_module` at all |
| Knowledge | **No — Enterprise-only** | Present as an addon stub, `state='uninstallable'` |
| Helpdesk | **No — Enterprise-only** | Present as an addon stub, `state='uninstallable'` |
| Quality | **No — Enterprise-only** | `quality_control`, `state='uninstallable'` |
| Approvals | **No — Enterprise-only** | Not present in `ir_module_module` at all |
| Sign | **No — Enterprise-only** | `state='uninstallable'` |
| Marketing Automation | **No — Enterprise-only** | `state='uninstallable'` (distinct from Email Marketing/`mass_mailing`, which is Community and is installed) |
| Manufacturing | Not installed, not requested | Trading company, not a manufacturer — no verified need |

**New finding, not previously documented anywhere:** this deployment is the Odoo **Community** edition (official `odoo:19` image, no Enterprise addons mounted). Enterprise-only apps cannot be installed without either an Enterprise subscription or a different deployment. This is a licensing/commercial decision, not something to route around technically — see `STATUS.md` "Next step."

## Companies

One company record: **id 1, name "Exir Tejarat Atlas"** (renamed from "My Company" in Milestone 1), website `https://exiratlas.com`, official logo applied from `~/Documents/ETA/00-KNOWLEDGE/02-BRANDING/Logo/Logo-large.png`. Currency id 1 (not yet verified as IRR — worth checking before go-live given Iran operations). Address, VAT/economic code, and other legal fields remain unset — those facts are genuinely unknown (`PROJECT_UNDERSTANDING.md` gaps #1–8), not entered as placeholders.

Single-company setup — no multi-company structure for the "Allison General Trading LLC" entity referenced once in the Blueprint (see `PROJECT_UNDERSTANDING.md`), and no decision has been made about whether that entity needs one. Not assumed here.

## Warehouses / Inventory

Inventory app (`stock`) installed in Milestone 1 — Odoo's default warehouse record now exists (auto-created on install), unconfigured beyond defaults. No real warehouse/location data entered (worth confirming per `PROJECT_UNDERSTANDING.md` gap #37: does ETA operate a physical warehouse at all, or is this a pure trading flow with no physical stock holding — that answer changes how Inventory should actually be configured, not assumed here).

## Users

| id | login | active |
|---|---|---|
| 1 | `__system__` | inactive (Odoo internal) |
| 2 | `ai@exiratlas.com` | **active** — sole real user |
| 3 | `public` | inactive (portal default) |
| 4 | `portaltemplate` | inactive (portal default) |

**Exactly one active, real user.** No RBAC structure exists yet — there is nothing to audit for role separation because no roles beyond Odoo's defaults have been assigned. The 18-role RBAC model in this engagement's brief (CEO, GM, Sales Director, etc.) has zero corresponding implementation today.

## Accounting

`account` module installed, but unconfigured: no chart of accounts customization verified beyond Odoo defaults, no bank accounts, no fiscal localization confirmed for Iran (Odoo's standard fiscal localization modules are country-specific — an Iran-specific package, if one exists in the Odoo 19 app store, has not been checked or installed). Flag for IMPLEMENTATION_PLAN.md: verify whether Odoo 19 ships an Iran fiscal localization module before assuming the standard chart of accounts is usable as-is.

## CRM

Installed in Milestone 1. No pipeline stages customized yet, no leads/opportunities — zero real customers exist in any source, so none were fabricated. See `IMPLEMENTATION_PLAN.md` Milestone 2.

## Security

- Single active user is presumably the Odoo instance administrator; no group/access-right customization beyond Odoo defaults has been made. RBAC build-out is `IMPLEMENTATION_PLAN.md` Milestone 5, not yet started.
- No 2FA is enforced despite `auth_totp*` being installed (installed ≠ enabled/required).
- No SSO/OIDC provider configured — `auth_oauth` (Odoo's generic OAuth login module, prerequisite for wiring in Keycloak) is **not** in the installed list. Milestone 6, not yet started.
- **Postgres credentials rotated in Milestone 1** — no longer the weak `odoo`/`odoo` default (see Docker section above).
- No outgoing mail server configured (`ir_mail_server` count: 0) — password resets, notifications, and portal invites will not function until one is set up. Needs real SMTP credentials from the user; not fabricated.
- Locale: **Persian (`fa_IR`) installed and active in Milestone 1**, alongside `en_US`.

## Performance

Idle-load resource usage is trivial (see Docker section) — no performance concern at this data volume (47MB, effectively empty). Not a meaningful signal for future load; revisit once real data and concurrent users exist.

## Data

Zero products (`product_template` count: 0). Five partner records (`res_partner` count: 5 — almost certainly Odoo's own default/system partners, not real business contacts; not independently verified further). No purchase orders, sales orders, or invoices exist (not queried directly, but implied by zero products and a single-day-old empty database relative to the modules installed).

## Summary

As of Milestone 1: the core business apps (CRM, Purchase, Inventory, Sales, Accounting, Project, HR, Expenses, Calendar, Contacts, Marketing) are installed with no fabricated demo data, the company record reflects ETA's real name/logo/website, Persian is active, and the weak default DB credential is rotated. Still empty by design (no products, no real partners, no transactions) since none of that data exists in any verified source yet. The two open blockers are commercial, not technical: an Enterprise-vs-Community licensing decision (Documents/Approvals/Helpdesk/Knowledge/Quality/Sign need Enterprise) and real SMTP credentials for outgoing mail. See `STATUS.md` for the full change log and `IMPLEMENTATION_PLAN.md` for what's next (CRM/Sales pipeline configuration, RBAC, SSO).
