# IMPLEMENTATION_PLAN.md — ETA Odoo Enterprise Transformation

Status: Draft plan, pending approval to begin Milestone 1 execution
Date: 2026-07-27
Grounded in: `PROJECT_UNDERSTANDING.md`, `CURRENT_STATE.md`, ADR-0011/0012/0015/0016/0017

## Standing rule this plan operates under

ADR-0015 states explicitly: *"installing an app is a real, standing change to this environment and requires explicit approval before being performed... not something to do unilaterally."* The `eta-production-safety` skill in this repo confirms the same: read-only inspection needs no confirmation; anything that mutates the real Odoo/Postgres environment does. This plan is sequenced so that **all research, design, and document-writing happens without asking**, and **each milestone's actual mutating steps (module installs, config changes, RBAC/security changes) are batched into one explicit confirmation request before execution**, not one approval per click. This is a scoping decision, not a stall — the brief's "don't ask questions" instruction governs business/design questions; it does not override this repository's own standing production-safety rule for a real running system.

Never a second Odoo/Postgres instance — always this one (`eta-odoo`/`eta-postgres`, db `eta_dev`).

## Milestone 1 — Core business apps (Purchase, Inventory) + company identity

**Why first:** procurement is ETA's core business and currently has zero Odoo support (no Purchase, no Inventory). Sales/Accounting already exist but are unconfigured. Nothing else in this plan is usable until this lands.

- Install **Purchase** and **Inventory** apps (Inventory is typically a dependency of Purchase's receipt flow — install together).
- Rename company record from "My Company" to Exir Tejarat Atlas's confirmed legal name; add address, currency (confirm IRR is correct base currency before setting), logo (from `20-BRANDING` once a canonical asset is chosen — see Brand note below).
- Install a Persian (`fa_IR`) language pack — currently only `en_US` is active, a real gap given Persian-script commercial documents.
- Set up two product categories aligned to the two verified business domains (Industrial Equipment / Steel Sheets) as Odoo product categories, not as two separate companies — matches the "two domains, one company" structure from `PROJECT_UNDERSTANDING.md`. Do not create products with fabricated codes/prices; leave the catalogue empty until real SKUs/specs are provided.
- Rotate the Postgres `odoo`/`odoo` credential via `platform/secrets` conventions (ADR-0006) before this environment holds any real business data.
- Configure at least one outgoing mail server (currently zero) — required for portal invites, approval notifications, password resets used by every later milestone.

**Blocked on:** explicit go-ahead on the specific install/config list above (mutating actions).

## Milestone 2 — Sales & CRM completion

- Install **CRM**.
- Configure Sales/CRM pipeline stages matching the two-stage process already confirmed for Domain 1 (technical offer → commercial offer) and the price/availability-driven process for Domain 2 — these are structurally different and may warrant separate CRM pipelines/teams rather than one shared pipeline.
- Do not import or fabricate leads, opportunities, or customer records — zero real customers exist in any source (`PROJECT_UNDERSTANDING.md` gap #13). Structure only; data entry is a separate, later activity once real records exist.

**Blocked on:** Milestone 1 landing; explicit go-ahead for CRM install.

## Milestone 3 — Documents, Knowledge, Approvals

- Install **Documents**, **Knowledge**, **Approvals**.
- Configure Documents with tags/versioning and links to Purchase, CRM, Suppliers, Customers, Projects, Products per the brief's own requirement — structurally straightforward once the underlying apps (Milestones 1–2) exist to link against.
- Approvals: the six-level approval matrix (Dept Manager → Business Manager → Finance Manager → CFO/Finance Director → CEO → Board) is documented but **every threshold value is blank** (`PROJECT_UNDERSTANDING.md` gap #52) and the CFO-vs-Finance-Director role conflict (gap S12) is unresolved. Build the workflow structure with **configurable, clearly-placeholder thresholds** (e.g. flagged as "TBD — confirm with Ali") rather than inventing numbers — this is a case where proceeding without asking would mean fabricating a financial control, which the evidence standard explicitly prohibits.

**Blocked on:** Milestones 1–2; explicit go-ahead for installs; one real business decision needed (approval thresholds) that should be surfaced as a flagged TBD in the built workflow, not silently invented.

## Milestone 4 — Project, Helpdesk, Quality

- Install **Project**, **Helpdesk**, and (if warranted — trading company, not manufacturer, so likely lighter-weight than a manufacturer's QC needs) **Quality**, e.g. for inspection-certificate tracking (SGS/BV/TÜV/Intertek third-party inspection is a known but undocumented process — `PROJECT_UNDERSTANDING.md` gap #38) rather than production quality control.
- Structure only, no fabricated project/ticket data.

## Milestone 5 — Security & RBAC

- Build Odoo security groups matching the 18-role model from the brief (CEO, GM, Sales Director, Procurement Director, Procurement Engineer, Commercial Engineer, Technical Engineer, Finance Manager, Finance Officer, Warehouse, Logistics, HR, Legal, Project Manager, Document Controller, Customer, Supplier, Read Only, Auditor).
- Important caveat carried from `PROJECT_UNDERSTANDING.md`: which of these roles are actually staffed today is unverified (gap #10) — currently there is exactly **one** active user. Build the group/permission structure as the target model regardless (it's cheap to have unused groups), but do not assign real people to roles without confirming headcount and assignments first.
- This is the highest-blast-radius milestone alongside Milestone 6 (identity) — group/access-right misconfiguration on a real system is exactly the kind of mutating, hard-to-reverse-if-wrong change that needs explicit sign-off on the concrete group/permission matrix before applying, not just on "doing RBAC" in the abstract.

## Milestone 6 — Identity / SSO (Keycloak)

- ADR-0012 already decided Keycloak (preferred over Authentik/Entra ID/Google Workspace, matching this brief's own preference order exactly).
- Install/enable Odoo's `auth_oauth` module (currently absent) and register Odoo as an OIDC client against Keycloak.
- **Note the two "eta-" prefixed but underscore-named Keycloak/NATS/Postgres containers found in `CURRENT_STATE.md` are currently Exited** — determine whether that's a prior abandoned Keycloak attempt worth reviving/inspecting before standing up a fresh Keycloak instance, rather than assuming a clean start. This needs a quick read-only check (`docker logs`, `docker inspect`) before deciding, not a fresh `docker run`.
- One-identity-many-systems as instructed: Keycloak becomes the source of truth for authentication; Odoo users, and eventually the website/portal, federate against it rather than maintaining separate local credentials.

**Blocked on:** confirming the dormant Keycloak container's history; explicit go-ahead before enabling SSO on the real instance (authentication changes are high-blast-radius by nature — a misconfiguration can lock out the one existing user).

## Milestone 7 — Portals (Customer / Supplier / Employee)

- `portal` module is already installed but unpopulated. Build out portal access once Milestone 1–3 apps exist to expose through it.
- Important context: a **live, already-deployed "temporary operational portal"** exists today at `portal.exiratlas.com` (per this repo's ADR-0016/CONFLICT-REPORT CR-008), explicitly intended to be *replaced* by ETA's own platform eventually — this Odoo portal work is a piece of that replacement, not a greenfield build competing with nothing. Do not assume there's no existing user expectation to migrate from.

## Milestone 8 — AI-readiness (structure only, no AI implementation)

- Per the brief: prepare Odoo to be AI-readable, do not implement AI agents yet.
- Practically: ensure custom fields, tags, and document metadata (from Milestones 1–3) are structured consistently enough for future retrieval — this is a natural side effect of doing Milestones 1–3 well, not a separate large effort.
- Respect the Iran filtering constraint (`PROJECT_UNDERSTANDING.md`): any future AI wiring must default to self-hosted/local models (Ollama, Qwen, GLM), not cloud AI providers, unless a specific exception is confirmed reachable from Iran.

## Milestone 9 — Website

- Out of scope for direct action: the live site (`exiratlas.com`) and portal are **outside this repository and outside the Odoo environment**, per CONFLICT-REPORT CR-008. Installing Odoo's **Website** app (currently absent) would create a *third* web presence unless explicitly intended as the long-term replacement target — confirm intent before installing, since this is a case where "just install the app" could quietly conflict with already-live production systems the user did not ask to be duplicated.

## Explicitly not doing (per verified facts, not assumption)

- **Not installing Manufacturing (`mrp`)** — ETA is a trading/procurement company, not a manufacturer; nothing in verified sources indicates a production process to model. Revisit only if contradicted.
- **Not building a standalone CRM domain in ETA-System** — ADR-0016 explicitly rejected this; CRM-shaped functionality lives in Odoo.
- **Not fabricating any of the P0 gap-register unknowns** (legal entity data, named customers/suppliers, revenue, commercial policy figures, approval thresholds) anywhere in configuration — placeholders and flagged TBDs only.

## Next step

Milestone 1's mutating actions (listed above) are ready to execute pending one explicit confirmation. Everything else in this plan is sequenced behind it.
