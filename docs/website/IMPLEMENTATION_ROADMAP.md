---
document_id: ETA-WEB-RM-007
title: Implementation Roadmap
version: 0.1
status: Draft — awaiting approval
owner: Exir Tejarat Atlas
classification: Internal
last_updated: 2026-07-27
---

# ETA Digital Headquarters — Implementation Roadmap

Phasing, gates, and blockers. **No code is written until the gates in §2 are cleared** — several of them are architectural decisions that this document has no authority to make.

---

## 1. Current state — verified

| Asset | State |
|-------|-------|
| `www.exiratlas.com` | **Live.** Static HTML/CSS, no framework. Home / About / Products / Industries / Contact. |
| `portal.exiratlas.com` | **Live.** "ETA Operations Portal", Persian login. Temporary; to be replaced by the ETA Platform. Footer mislabels it "CRM Portal". |
| `apps/web` (this repo) | **Stub.** README only, no `src/`. Described as an internal auth-gated procurement UI — *not* the public site. |
| `platform/design-system` | **Stub.** No `src/`. The frozen-architecture home for brand tokens. |
| Monorepo tooling | Nx configured (ADR-0002). No website build pipeline exists. |
| Odoo | **Running** (Odoo 19 + Postgres 17). **Purchase, Sales, and CRM apps not installed.** No custom addons. No real data. |
| Brand assets | **Logo family only** (9 files). Colours/Fonts/Icons/Images/Videos folders empty. `Brandbook.md` is 0 bytes. |
| Photography / video | **None exists.** |

**The public website is not currently represented anywhere in this repository** — no ADR, no code, no deployment configuration.

---

## 2. Gates — must clear before development

These are decisions, not tasks. Each is blocking.

### 🚪 Gate A — Where does the public site live? *(requires an ADR)*

The architecture is frozen (ADR-0001). `apps/` is defined as `web`, `bff`, `gateway`, `workers`, and `apps/web`'s own README describes an internal auth-gated UI — a different product from a public marketing site.

| Option | Assessment |
|--------|-----------|
| **A1 — New `apps/site` deployable** | Cleanest separation: public marketing vs. authenticated portal, independent deploy cadence and caching. **Adds a package to a frozen structure → needs an ADR.** *Recommended.* |
| **A2 — Repurpose `apps/web`** | No new package, but conflates two products with opposite audiences, caching, and indexing rules. Contradicts the existing README. |
| **A3 — Separate repository** | Fastest to start; permanently forfeits shared tokens, shared types, and one CI pipeline. Recreates the drift problem the frozen architecture exists to prevent. |

**Recommendation: A1**, with `apps/web` retained for the portal. A draft ADR is provided — see §9.

---

### 🚪 Gate B — Authentication *(requires an ADR)*

The brief states *"Everything should authenticate through Odoo."* **ADR-0012 (Accepted) selects Keycloak as the identity provider**, implementing ADR-0007's OIDC/RBAC model.

These are in direct conflict and cannot both stand.

| Option | Assessment |
|--------|-----------|
| **B1 — Keycloak as IdP, Odoo federated** | Preserves ADR-0007/0012. Keycloak brokers identity; Odoo remains the business system of record. Handles customers, suppliers, and staff under one model. *Recommended.* |
| **B2 — Odoo as IdP directly** | Matches the brief literally and is simpler short-term. **Supersedes ADR-0012**, and Odoo's native auth is weaker for multi-audience RBAC, MFA, and delegated AI-agent authority (ADR-0007). |
| **B3 — Keycloak now, Odoo portal users mapped** | Pragmatic middle path; needs a defined user-provisioning direction. |

**This does not block the marketing site** — no marketing page is authenticated. It blocks portal work only. Marketing development can proceed while it is resolved.

---

### 🚪 Gate C — Technology stack

| Source | Says |
|--------|------|
| **ADR-0002 (Accepted)** | TypeScript + Nx for `apps/` |
| Blueprint `Technical.md` (`ETA-TECH-001`, Approved) | React / Vite / Supabase / Lovable / Vercel / Cloudflare |
| **Brief (2026-07-27)** | Hosting on **IranServer** |

ADR-0002 governs — it is an approved ADR of this repository and the Blueprint stack document is a knowledge source, not an ADR (this is the standing resolution recorded as CR-001).

The IranServer constraint independently rules out the Blueprint's hosting choices: Vercel, Netlify, and Cloudflare are not viable deployment targets for the primary market, and Supabase adds an external dependency in the critical path (IA §12).

**Recommendation**
- **Next.js (App Router) + TypeScript**, inside the Nx workspace — satisfies ADR-0002, gives SSG/ISR for the marketing site and SSR for the RFQ, with i18n routing and RTL support
- **Self-hosted** on IranServer: Node under a process manager behind Nginx, containerised
- **Tailwind CSS** driven by the tokens from `platform/design-system`
- **No third-party runtime dependencies** — fonts, icons, analytics, video all self-hosted

`ETA-TECH-001` is superseded on hosting and backend; flag for a version bump.

---

### 🚪 Gate D — Content approvals

| # | Item | Approver |
|---|------|----------|
| D1 | Supersede `ETA-SITEMAP-001` v1.0 → v2.0 with the new IA | Brand owner |
| D2 | Supersede `ETA-VISUAL-001` (`Colors.md`) — Navy/Copper does not match the logo | Brand owner |
| D3 | Reconcile `ETA-CP-001` positioning (AI-forward, technology-company framing) with the standing sourcing-company mandate | Business owner |
| D4 | Resolve the contact email: `info@` (documents) vs `ai@` (live site) | Business owner |
| D5 | Confirm the RFQ response SLA | Commercial |

---

### 🚪 Gate E — Photography commission ⚠️ **longest lead item**

No industrial photography or video exists. The entire visual concept depends on it.

**This must start first — before design completes, before development begins.** It is the only item on this roadmap with a lead time measured in months, and every hero on the site is blocked by it.

Minimum viable shot list:

| Category | Shots | Priority |
|----------|-------|----------|
| Refinery / petrochemical, blue hour | 6–8 | **P0** |
| Steel mill, coils, rolling line | 6–8 | **P0** |
| Rotating & static equipment, detail | 8–10 | **P0** |
| Hero video loops (12–20 s) | 3–4 | **P0** |
| Inspection, QA, documentation | 4–6 | P1 |
| Logistics — port, containers, cranes | 4–6 | P1 |
| Control room / operations | 3–4 | P1 |
| Power, mining, cement | 6–9 | P2 |

**Fallback if commissioning is not possible:** licensed premium industrial photography (not free stock), passed through a single consistent LUT to match `DESIGN_SYSTEM.md` §7.1. This is materially weaker — the brand's own imagery guidance explicitly warns against generic stock — but it is far better than launching with placeholders.

---

## 3. Phasing

### Phase 0 — Decisions *(blocking)*
Clear Gates A–E. Write and approve the ADRs. **Start the photography commission immediately** — it runs in parallel with everything that follows.

### Phase 1 — Foundations
- Populate `platform/design-system` with tokens from `DESIGN_SYSTEM.md` §12
- Publish the Figma Foundations library (Gate G2)
- Scaffold the chosen app in the Nx workspace, with i18n routing and RTL
- Self-hosted fonts, subset and preloaded
- CI: build, lint, type-check, Lighthouse budget enforcement
- Deployment pipeline to IranServer, staging first

### Phase 2 — Component library
- Build every component in `FIGMA_STRUCTURE.md` §3
- Verify each in EN and FA, all states including focus
- Accessibility harness in CI (axe), contrast assertions from `DESIGN_SYSTEM.md` §2.5

### Phase 3 — Conversion spine *(highest commercial value)*
- `/rfq` — all steps, both branches, full upload handling
- Confirmation with reference number
- Server-side validation, virus scanning, chunked resumable upload
- **Fallback capture path** — an RFQ is never lost when a downstream system is unavailable
- `/contact`
- Home

### Phase 4 — Capability pages
- Both business lines and all 11 category pages
- Steel specification data extracted from `Iran_Steel_Comprehensive_V2.xlsx`
- Procurement Services, Logistics, Quality & Inspection — built on verified trade-terms content

### Phase 5 — Context pages
- 11 industry pages (genuinely written, not templated)
- About, Why ETA, ETA Platform

### Phase 6 — Content engine
- Knowledge Center, News, Blog, Careers, Become a Supplier

### Phase 7 — Search
- Bilingual index with Persian analysers, ZWNJ normalisation, synonym dictionary
- Five entity types, zero-result RFQ CTA

### Phase 8 — Trust pages *(gated on content)*
- Manufacturers, Projects — **only once real content exists**

### Phase 9 — Launch readiness
- Full redirect map from the audited legacy URL list
- `sitemap.xml`, `robots.txt`, structured data, `hreflang` verification
- Performance validation on a constrained connection
- WCAG 2.2 AA audit
- **Crawlability verification from outside Iran**
- Security review, load test on the upload path

### Phase 10 — Portal *(separate track, gated on B)*
`apps/web` and the ETA Platform surfaces. Out of scope for the marketing site build.

---

## 4. Dependency chain

```
Gate E (photography) ─────────────────────────────────► every hero
                                                              │
Gate A ──► Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4-7 ──► Phase 9
Gate C ──►    │                        ▲
Gate D ───────┘                        │
                          Odoo B1/B2/B3 (RFQ backend)
Gate B ────────────────────────────────────────────────► Phase 10
```

The photography commission and the decision gates are the two things that can start today. Everything else waits on them.

---

## 5. Content production — the real critical path

Design and engineering are the visible work. **Content is the actual constraint.**

| Content | Owner | Blocks | Status |
|---------|-------|--------|--------|
| Industrial photography & video | Brand + external | Every hero | ❌ **Not started — longest lead** |
| Equipment category technical content — sub-types, standards | **ETA engineers** | 5 category pages | ❌ Missing |
| Steel specification data extraction | Data | 6 steel pages | ⚠️ Source exists, needs structuring |
| Project case studies (≥ 3, anonymised acceptable) | Business | Projects page, trust | ❌ Missing |
| Equipment OEM / manufacturer list | Business | Manufacturers section | ❌ Missing |
| Certifications, ISO, registration | Business | Trust, About | ❌ Missing |
| Industry page copy (×11) | Business + engineers | Phase 5 | ❌ Missing |
| Persian translation, all pages | Business | Launch | ❌ Missing |
| Knowledge Center seed articles (≥ 6) | Business + engineers | SEO | ❌ Missing |

**The equipment technical content must come from ETA's engineers.** Sub-types and applicable standards cannot be written by a copywriter or generated by a model — a wrong standard on a public page is worse than an omitted one, and this audience will notice.

---

## 6. What is already verified and needs no research

These are ready to publish today and, notably, are **absent from the current live site** — putting them up is immediate, zero-risk credibility:

- Payment terms — 30% advance + 70% before shipment, or LC at sight
- Incoterms — EXW / FOB / CIF / DDP / DAP
- Warranty — 12 months from delivery/commissioning
- Documentation set — Commercial Invoice, Packing List, COO, COC, Test Report
- FAT inspection regime; 30-day offer validity
- Performance bonds and prepayment guarantees via a first-class SWIFT-enabled bank
- **Unpriced technical offer issued separately from the commercial offer** — the strongest single differentiator ETA owns
- Eight named Iranian steel mills, with per-mill product and dimensional data
- Statistics — 10+ years, 50+ manufacturers & suppliers, 8 product categories, 100% project-based
- Project-based model, no warehouse inventory; equipment sourced Europe / China / UAE
- CEO Ali Hejazi; registered address, Zafar St, Tehran
- Bilingual tagline — *Precision in Supply. Confidence in Every Decision.* / مهندسی تأمین برای صنایع بزرگ

---

## 7. Risks

| # | Risk | Impact | Mitigation |
|---|------|--------|-----------|
| R1 | Photography commission slips | **Launch blocked** — no hero can ship | Start now; pre-approve a licensed fallback library |
| R2 | Trust content never materialises | Site looks polished but unconvincing; RFQ rate stays low | Lead with verified trade terms; **do not build empty proof pages** |
| R3 | Odoo RFQ integration blocked (Purchase/CRM apps not installed) | RFQ cannot reach the system of record | Ship the standalone capture path first; swap the adapter later (the ADR-0017 port seam makes this a one-file change) |
| R4 | IranServer performance or reliability | Buyers cannot reach the site | Aggressive static generation, self-hosted everything, no third-party critical path |
| R5 | Persian treated as an afterthought | Half the primary audience underserved | FA required at every design gate, not added at the end |
| R6 | Gate A/B decided without an ADR | Frozen architecture erodes silently | ADR required before any code |
| R7 | Placeholder content ships to production | Direct credibility damage | CI check failing the build on `[Content Required]` in production output |
| R8 | Crawlers cannot reach an IranServer-hosted site | SEO investment wasted | Verify crawlability from outside Iran during Phase 9 |
| R9 | Scope creep from marketing site into ETA Platform | Neither ships | Hard boundary at IA §6; portal is a separate track |

**R7 warrants a CI rule.** A build containing `[Content Required]` in production output should fail — placeholders exist to be visible in staging, never to leak to buyers.

---

## 8. Success measures

**Launch**
- Lighthouse ≥ 95 across all four categories, measured on a constrained connection
- WCAG 2.2 AA, verified with real assistive technology, not only automated tooling
- Full EN/FA parity on every product, industry, capability, and RFQ page
- RFQ submits successfully with a 100 MB multi-file upload on a slow connection
- Zero third-party runtime requests
- Every legacy URL 301s correctly

**90 days**
- RFQ submissions measured and trending up against the pre-launch baseline
- RFQ start → completion above 60 %
- Search zero-result log reviewed monthly — a direct record of demand ETA is not visibly serving
- Portal click-through establishes real P4 volume

---

## 9. Required ADRs

Two decisions in §2 change the frozen architecture and need ADRs before code. A draft for the first is provided at `docs/decisions/ADR-0018-public-website-deployable.md` — **status `Proposed`, not `Accepted`.** It records the decision and its consequences; it does not enact it. Approval is the business owner's, not this document's.

| ADR | Subject | Status |
|-----|---------|--------|
| **ADR-0018** | Public website as a deployable surface (Gate A) | **Proposed** — drafted, awaiting approval |
| **ADR-0019** | Authentication: Keycloak vs. Odoo-direct (Gate B) | Not drafted — needs a business decision first |

ADR-0019 is deliberately not drafted. Gate B is a genuine either/or where the brief and an accepted ADR conflict; drafting a recommendation before that conflict is resolved would presume an answer that is the business owner's to give.

---

## 10. Immediate next actions

| # | Action | Owner | Blocks |
|---|--------|-------|--------|
| 1 | **Commission industrial photography & video** | Brand | Everything visual |
| 2 | Approve or amend ADR-0018 (Gate A) | Architecture | All code |
| 3 | Decide Gate B — Keycloak vs. Odoo auth | Architecture | Portal track |
| 4 | Approve superseding `Colors.md` (D2) | Brand | Design system |
| 5 | Approve the IA and sitemap (D1) | Business | Design |
| 6 | Task ETA engineers with equipment category technical content | Business | 5 category pages |
| 7 | Extract steel specification data from the mill workbook | Data | 6 steel pages |
| 8 | Decide whether ≥ 3 anonymised case studies can be published | Business | Trust gap |
| 9 | Resolve the contact email conflict (D4) | Business | Contact page |
| 10 | Crawl the live site and produce the complete legacy URL list | Engineering | Redirect map |

Items 1, 6, 7, and 8 are the true critical path. Design and engineering can absorb delay; content cannot be compressed.

---

*Document set complete. See `WEBSITE_INFORMATION_ARCHITECTURE.md` for the structural contract and `README.md` in this folder for the index.*
