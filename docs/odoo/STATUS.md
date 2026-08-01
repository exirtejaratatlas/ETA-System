# STATUS.md — ETA Odoo Enterprise Transformation

Last updated: 2026-07-27, after Milestone 1

## Completed

- **Milestone 0 — Understand, Audit, Plan.** `PROJECT_UNDERSTANDING.md`, `CURRENT_STATE.md`, `IMPLEMENTATION_PLAN.md` written, grounded in the owner's authoritative business definition, this repo's ADRs, and a live read-only Odoo audit.
- **Milestone 1 — executed on the real environment (`eta-odoo`/`eta-postgres`, db `eta_dev`), verified after the fact:**
  - Installed and verified 10 requested apps + their auto-pulled bridge modules (123 modules total, up from 56): **CRM, Purchase, Inventory (stock), Project, Website, Employees (hr), Expenses (hr_expense), Calendar, Contacts, Email Marketing (mass_mailing)**. No demo data loaded (`--without-demo=all`).
  - **Enterprise-only apps could not be installed — this is new information, not previously documented anywhere:** Documents, Approvals, Helpdesk, Knowledge, Quality, Sign, and Marketing Automation are Odoo **Enterprise** features. This deployment runs the official Community image with no Enterprise addons mounted (`/mnt/extra-addons` empty). `helpdesk`, `knowledge`, `quality_control`, `sign`, `marketing_automation` exist as addon stubs in the image but are marked `uninstallable`; `documents` and `approvals` aren't present at all. **This is a licensing decision, not a technical blocker** — see "Next step."
  - Company renamed from "My Company" to **Exir Tejarat Atlas**; official logo (`Logo-large.png` from `~/Documents/ETA/00-KNOWLEDGE/02-BRANDING/Logo/`) applied via the ORM (not a raw DB write, so Odoo's image-variant generation stayed consistent); website set to `https://exiratlas.com` (the independently-confirmed live company site).
  - Persian (`fa_IR`) language pack installed and active (previously English-only).
  - **Postgres `odoo`/`odoo` weak default credential rotated** to a generated 31-character password — role password changed live via `ALTER ROLE`, `docker-compose.yml` updated to reference `${POSTGRES_PASSWORD}` instead of a literal value (an inline hardcoded secret was explicitly blocked by the session's own safety tooling — correctly, since that's the exact anti-pattern ADR-0011 flagged), actual value in a new untracked `.env` in `/Users/ali/Development/ETA/` (directory is not a git repo, so no accidental-commit risk). Verified end-to-end: containers recreated, Odoo reconnected, all 123 modules reloaded, company/logo/website data intact, `eta_dev` database unchanged.
  - **Not done — needs input, not something to invent:** outgoing mail server. Zero SMTP servers configured; no real SMTP credentials exist anywhere in any source. Needed before password resets, approval notifications, or portal invites work.

- **Website welcome page — built and verified in-browser.** Homepage (`website.homepage` view, website-specific override) rewritten with a branded hero (company logo, "Precision Supply · Global Reach" tagline from the actual logo lockup, headline, two-domain summary) and two domain cards (Industrial Equipment Procurement / Steel Sheet Trading) using only verified facts from `PROJECT_UNDERSTANDING.md` — no fabricated marketing claims. Company `primary_color`/`secondary_color`/email colors set to the exact hex values extracted from the brand SVG source (`#023D3C` teal, `#FF7001` orange), not guessed. Website record renamed to "Exir Tejarat Atlas"; website header logo synced from the company logo (was a separate, independently-stored field that had gone stale). Verified by loading the page in-browser and reading rendered text/accessibility tree, not just asserting from the write.
  - **Note for next session:** editing `ir.ui.view` arch via a separate `odoo shell` process (not the running server) does not immediately reflect in the live site — a container restart was needed twice to clear stale QWeb/image caches. Prefer restarting `eta-odoo` after any view/asset edit made this way, or make the edit through the running server's own shell/process where possible.
  - **Not touched, still generic Odoo defaults:** footer (placeholder email `info@yourcompany.example.com`, "Company name" copyright, fake social links), Contact Us page. Left alone rather than filled with invented contact details — needs real public contact info from the user.

## Pending

- Milestones 2–9 per `IMPLEMENTATION_PLAN.md` — CRM/Sales pipeline configuration, RBAC group build-out, Keycloak SSO, portals, AI-readiness structuring, website scoping decision.
- Footer/Contact Us page still has generic Odoo placeholder content — needs real public email/phone from the user before it can be de-genericized.

## Risks

- **Enterprise vs. Community gap (new):** roughly a third of the originally-requested module list (Documents, Approvals, Helpdesk, Knowledge, Quality, Sign, Marketing Automation) requires an Odoo Enterprise subscription. Needs a decision: upgrade to Enterprise, find Community-compatible alternatives per feature, or accept the gap for now. Not decided here.
- **Two Exited containers (`eta_postgres`, `eta_nats`, `eta_keycloak`, underscore-named)** alongside the real hyphen-named pair — unexplained, possibly a prior abandoned Keycloak attempt. Not touched; needs a read-only look before Milestone 6 (SSO).
- **Company knowledge base is 50% complete** per the Blueprint's own gap register (95% threshold before Company Profile generation). Does not block Odoo technical work already grounded in the confirmed 50%; any RBAC role, approval threshold, or business record needing one of the unknown facts stays a flagged placeholder.
- **No outgoing mail server** — blocks portal invites, notifications, password resets. Needs real SMTP details from the user; not fabricated.
- **Installing Odoo's Website app (Milestone 9)** risks creating a third, redundant web presence — `exiratlas.com` and `portal.exiratlas.com` are already live outside this repo and outside Odoo. Needs explicit intent confirmation before that milestone starts.

## Next step

Decide the Enterprise-vs-Community question (blocks Documents/Approvals/Helpdesk/Knowledge/Quality), and provide real SMTP credentials for outgoing mail. Then proceed to Milestone 2 (CRM/Sales pipeline configuration).
