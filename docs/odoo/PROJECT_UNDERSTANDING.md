# PROJECT_UNDERSTANDING.md — ETA Odoo Enterprise Transformation

Status: Living document, Milestone 0 (Understand)
Date: 2026-07-27
Scope: Understanding of Exir Tejarat Atlas (ETA) as a business, to ground the Odoo ERP transformation. This does not redesign the business — it restates what is already established, with sources, and flags what is genuinely unknown rather than inventing it.

## Evidence hierarchy used in this document

Per this repository's standing conflict-resolution order (`docs/architecture/CONFLICT-REPORT.md`): **Approved ADRs → latest implementation → latest semantic index → Blueprint vault**, with one override — `SOURCE-Ali-Business-Definition.md` (owner's direct statement, 2026-07-25) is explicitly authoritative over every Blueprint document it conflicts with. That precedence is followed here.

Primary sources for this document:
- `~/Documents/ETA/ETA-Blueprint/50-KNOWLEDGE/SOURCE-Ali-Business-Definition.md` (Authoritative, direct owner statement, 2026-07-25)
- `~/Documents/ETA/ETA-Blueprint/50-KNOWLEDGE/00-KNOWLEDGE-MODEL-INDEX.md` and `99-GAP-REGISTER.md` (consolidation of ~180 Blueprint files against operational artifacts, 2026-07-25, overall completeness scored **50%**)
- This repo's ADR-0011, ADR-0015, ADR-0016, ADR-0017 (Odoo environment and target architecture decisions)
- Live audit of the running Odoo instance, performed 2026-07-27 (see `CURRENT_STATE.md`)

## Company

**Exir Tejarat Atlas (ETA)** — an industrial trading and procurement company operating inside Iran. Not a manufacturer, not an EPC contractor, not a software company.

Legal form, registration number, national ID, founding year, ownership structure: **UNKNOWN** — flagged as a P0 gap in the gap register (#1–8). Do not state these as fact anywhere downstream until answered.

A second name, **Allison General Trading LLC**, appears once in the Blueprint's Enterprise Data Dictionary alongside Exir Tejarat Atlas, with no explanation. Status: **UNKNOWN** (entity? partner? legacy name? jurisdiction?) — flagged in this repo's `CONFLICT-REPORT.md` CR-006 and gap register #5. Do not assume it is a subsidiary, alias, or unrelated party.

## The business is two structurally different domains, not one business with product lines

This is the single most important corrective fact in the knowledge base — established directly by the owner and **not present in any prior Blueprint document**.

| | **Domain 1 — Industrial Equipment Procurement** | **Domain 2 — Steel Sheet Trading** |
|---|---|---|
| Nature | Engineered, specification-driven | Commodity, grade-standard |
| Served industries | Oil, Gas, Petrochemical, Steel (4 — not the 12 the Blueprint separately claims; reconciliation is an open gap) | Commodity steel market |
| Sourcing | International OEMs (specific OEMs not yet named — gap #39) | Iranian **and** Chinese mills (Chinese mills confirmed as a source; individual mill names unknown — gap #3/N3) |
| Channel | Direct / agent / distributor (unconfirmed which) | Stock exchange — Iran Mercantile Exchange / بورس کالا (high tonnage) **and** open market via companies/brokers/wholesalers (lower tonnage) |
| Selection basis | Technical evaluation and datasheet approval | Grade, dimension, price, availability |
| Unit of sale | Item, set, package | Tonnage |
| Payment | LC, advance payment, performance bonds, prepayment guarantees (URDG 758) | LC and cash |
| Lead time | Weeks to months (8 weeks evidenced) | 10 days to 3 months |
| Sales process | Two-stage: technical offer → commercial offer | Price and availability driven |
| Key documents | Datasheets, GA drawings, Certificate of Conformity, test reports, FAT reports | Mill certificates, weight lists |

Whether the two domains are run as separate operations (different people, suppliers, customers, margins), and which generates more revenue, are **open questions** (gap register N10, N11) — do not assume equal weight or shared operations between them without confirmation.

### Domain 1 — Industrial Equipment Procurement: product categories

- **Rotating equipment:** pumps, compressors, gas turbines, air turbines, gearboxes
- **Valves & flow control:** valves, control valves, actuators
- **Control & automation:** DCS (Distributed Control Systems), control systems, control room equipment
- **Instrumentation & measurement:** transmitters, gauges, measurement instruments
- **Static & process equipment:** tanks, drums, reactors
- **Material handling:** conveyors
- **Process consumables:** chemicals, catalysts

Note: "gearboxes" and "electric motors" are sometimes paired in adjacent references; "electric motors" specifically is not in the owner's verbatim category list — do not add it to the catalogue without confirming. Instrumentation and mechanical categories are named at the category level only in most Blueprint docs; the owner's breakdown above is the more granular, higher-confidence source.

### Domain 2 — Steel Sheet Trading: scope and correction

ETA's steel business is **sheets only** — hot rolled ("black"), cold rolled ("oiled"), galvanized, galvalume/aluzinc, tinplate, stainless, plus other grades (e.g. colour coated, pickled & oiled) in varied dimensions/sizes/thicknesses. This is a **correction** to an earlier misreading: a 20-mill dataset covering rebar, beams, angle, channel, wire rod, billet, bloom, slab and DRI (`Iran_Steel_Comprehensive_V2.xlsx`) is market/supplier research, **not ETA's own product catalogue** — do not treat it as such.

Procurement channel is split by tonnage, not a single channel: Iran Mercantile Exchange for high tonnage, open market (companies/brokers/wholesalers) for lower tonnage. This has direct commercial-process consequences (exchange purchasing needs broker access/deposits/settlement discipline; open market needs a broker/wholesaler network; price discovery differs — this is why daily mill price tracking, "Haft Alamas," exists as a practice).

## Governing infrastructure constraint: Iran internet filtering

Stated directly by the owner as a hard constraint on **all** solutions, and confirmed to be **absent from every one of the sixteen architecture documents** in the Blueprint vault (Technology Stack, Infrastructure, Deployment, Integration, Security, AI Architecture all omit it). This is the single most significant unaddressed architectural gap identified in the knowledge model.

Direct implications already identified:
- Cloud-hosted dependencies named in Blueprint docs (Supabase for ETA-Platform, OpenAI/Anthropic/Google/OpenRouter as AI providers, Odoo.sh hosting, Google-Fonts-via-CDN) are all **at risk of being unreachable** from inside Iran on a filtered connection and must be verified, not assumed to work.
- Locally-hosted/self-hosted options (Ollama, Qwen, GLM — already named as reference options; self-hosted fonts; domestic infrastructure) are the only ones compatible by design.
- This directly matches this ROLE brief's own stated preference order (local AI, Ollama, Qwen, GLM, Docker, self-hosted) — the two sources agree.
- **No decision has been recorded anywhere** about which system components are permitted to sit outside Iran. Treat this as open, not resolved, and flag it explicitly whenever a cloud dependency is proposed for anything ETA staff use daily.

## Relationship to this repository's own architecture decisions

This repository (`ETA-System`) already made structural decisions that bear directly on the Odoo transformation, dated 2026-07-23/24, i.e. concurrently with or just before the Blueprint knowledge-model consolidation:

- **ADR-0015**: the real Odoo 19 / Postgres 17 environment at `/Users/ali/Development/ETA/` (database `eta_dev`) is the primary ERP environment — not a new stack.
- **ADR-0016**: no standalone CRM, ever. Microsoft Dynamics CRM (2016 on-prem, legacy) is retired via a one-time migration into Odoo, not integrated on an ongoing basis. Target chain: **Website → ETA Platform → Odoo ERP.**
- **ADR-0017**: **Odoo is the single source of truth** for Sales, Purchase, Inventory, Accounting, Contacts, Documents, Projects, Helpdesk, Approvals. ETA-System's own domain code (`domains/procurement-core`, `domains/suppliers`) does not persist these independently — it adapts to Odoo via `platform/odoo` (`OdooClient`, XML-RPC), using custom fields (`x_eta_id`, `x_eta_status`, etc.) for round-tripping.

This resolves, as of this repository, the Blueprint knowledge model's structural cleanup item **S13** ("Decide: Odoo-native or custom platform — two incompatible strategies documented as one"), which was still open as of the Blueprint's own 2026-07-25 gap register. **ETA-System is not a business-data platform; it is an AI/automation/workflow orchestration layer built on top of Odoo** (direct user statement, recorded in ADR-0017). This document's framing follows that: the Odoo transformation below is filling in Odoo as the actual system of record, not building a parallel one.

Also relevant and unresolved: `apps/web` (an internal, never-deployed, empty-stub "Enterprise procurement UI") is distinct from two real, live, already-deployed systems discovered outside this repo — `https://exiratlas.com` (public marketing site) and `https://portal.exiratlas.com` (a temporary "ETA Operations Portal," explicitly **not** Dynamics CRM, intended to eventually be replaced by the ETA Platform). See `CONFLICT-REPORT.md` CR-008. Odoo module/portal configuration work below should not assume it is starting from zero on the customer/employee-portal front — a temporary portal already exists in production and is the thing eventually being replaced.

## What is confirmed vs. genuinely unknown (do not fabricate the unknowns)

**Confirmed, high confidence** (operational artifact or direct owner statement): the two-domain structure; product categories per domain; sourcing geography (OEMs / Iranian+Chinese mills); payment instrument types per domain; the Iran filtering constraint; the running Odoo environment's exact current state (see `CURRENT_STATE.md`).

**Explicitly unknown — do not invent, surface as a question instead of assuming:**
- Legal entity details (registration number, national ID, economic code, founding year, ownership) — gaps #1–8
- Named customers (zero exist in any source) — gap #13
- Named suppliers in either domain (zero exist in any source) — gap #14, #39–47
- Annual revenue, procurement volume, any historical transaction — gap #11, #12
- Standard payment terms ETA offers/accepts, advance payment %, bond %, target margin, bank/IBAN/SWIFT details — gaps #16–23 (commercial policy is entirely blank on existing templates)
- Monetary approval thresholds — a six-level approval matrix exists (Dept Manager → Business Manager → Finance Manager → CFO → CEO → Board) with **every threshold value blank/"configurable"** — gap #52
- Headcount, org fill (which of the roles this brief lists are actually staffed today) — gap #9, #10
- Import/export process specifics (customs, HS codes, freight forwarders, Incoterms used) — Logistics is the weakest-documented domain at 20% completeness
- Whether "CFO" or "Finance Director" is the correct role — two documents disagree (gap S12)

The Blueprint knowledge model's own overall completeness score is **50%**, with an explicit gate: it recommends **not** generating a final Company Profile until 95%. That gate governs Company Profile generation specifically — it does not block Odoo technical configuration grounded in the confirmed facts above, but any RBAC role, approval workflow, or customer/supplier record created during this transformation should use placeholder/configurable values for the unknowns above, not invented numbers.

## Roles referenced in this brief vs. verified org reality

The role list in this engagement's brief (CEO, General Manager, Sales Director, Procurement Director, Procurement Engineer, Commercial Engineer, Technical Engineer, Finance Manager, Finance Officer, Warehouse, Logistics, HR, Legal, Project Manager, Document Controller, Customer, Supplier, Read Only, Auditor) has not been cross-checked against which roles are actually filled at ETA today (gap #10: "Which of the 12 workflow roles are actually filled, and by whom" is unresolved). RBAC group design (see IMPLEMENTATION_PLAN.md) will use this role list as the **target** structure since it is a direct, current instruction — but headcount reality should be confirmed before assuming every role maps to a distinct real person.
