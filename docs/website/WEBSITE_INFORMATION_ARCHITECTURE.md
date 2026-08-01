---
document_id: ETA-WEB-IA-001
title: Website Information Architecture
version: 0.1
status: Draft — awaiting approval
owner: Exir Tejarat Atlas
classification: Internal
supersedes: none
related: ETA-SITEMAP-001 (Blueprint, Approved v1.0 — partially superseded, see §9)
last_updated: 2026-07-27
---

# ETA Digital Headquarters — Information Architecture

## 1. What this document decides

This is the structural contract for `www.exiratlas.com`. It defines **what content exists, who it is for, how it nests, and what each page must earn**. It does not define visuals (see `DESIGN_SYSTEM.md`) or page-level copy blocks (see `PAGE_SPECIFICATIONS.md`).

One rule governs every decision below:

> **A page that does not answer a buyer question, build trust, or move a visitor toward an RFQ does not exist.**

---

## 2. The audience, in priority order

The site is not for a general audience. It is for four people, weighted by commercial value.

| # | Persona | Role | What they need in 30 seconds | Conversion |
|---|---------|------|------------------------------|------------|
| **P1** | **Procurement Manager / Buyer** | Steel mill, refinery, petrochemical complex, power plant | "Can these people supply my item, and will they deliver?" | **RFQ** |
| **P2** | **Project / EPC Procurement Engineer** | EPC contractor, capital project | "Do they understand my datasheet and my standards?" | **RFQ + technical dialogue** |
| **P3** | **Supplier / Manufacturer** | OEM, agent, mill representative | "Is this a serious counterparty worth registering with?" | **Supplier registration** |
| **P4** | **Existing Customer** | Already transacting | "Where is my order / quote / document?" | **Portal login** |

Everyone else — job seekers, students, competitors, journalists — is served, but never at the cost of P1–P4. Careers and News sit deliberately far from the primary path.

### 2.1 The eight buyer questions

Every top-level section maps to at least one of these. This is the acceptance test for the IA.

1. Who are these people?
2. Can they supply what I need?
3. Where do they source from?
4. Which manufacturers do they work with?
5. Can they actually deliver?
6. Do they understand technical procurement?
7. Can I trust them?
8. Why ETA rather than someone else?

**Source:** Company Profile Permanent Operating Context (user directive, 2026-07-25). Confidence: **VERIFIED**.

---

## 3. The single most important structural decision

**Industrial Equipment and Steel Products are two independent business lines. They are never merged into a generic "Products" section.**

They differ in every operational dimension:

| | **Industrial Equipment** | **Steel Products** |
|---|---|---|
| Sourcing direction | **Inbound international** — Europe, China, UAE | **Domestic** — Iranian mills |
| Named sources | *(OEM names not yet documented — see §10)* | Mobarakeh, Oxin, Hormozgan, Haft Almas, Taraz, Amir Kabir Kashan, Shahrekord, Khorasan |
| Buying unit | Item / tag number / datasheet | Tonnage × dimension × grade |
| Selection driver | Technical compliance to spec | Grade, standard, coating, dimensional tolerance |
| Lead-time driver | Manufacturing slot + international logistics | Mill rolling schedule + domestic haulage |
| Risk profile | FAT, inspection, spare-part continuity | Mill certificate, coating adhesion, coil weight |
| RFQ form fields | Tag, service, datasheet upload | Thickness × width × length, grade, standard, coating, tonnage |

Because the *buying behaviour* is different, the *navigation, the page templates, and the RFQ form must all fork*. A visitor sourcing 400 t of galvanized coil and a visitor sourcing a replacement API 610 pump have nothing in common except the RFQ button.

**Sources:** Company Profile mandate (user directive, 2026-07-25); `09-DATABASE/Manufacturers/Iran_Steel_Comprehensive_V2.xlsx` (19 mill worksheets, all 8 named mills verified present); live About page at `exiratlas.com/about.html` (Europe/China/UAE sourcing). Confidence: **VERIFIED**.

---

## 4. Primary navigation

The brief lists 17 destinations. Seventeen items cannot sit in a navigation bar. They are organised into **six primary sections plus a persistent utility rail** — nothing from the brief is dropped.

```
┌────────────────────────────────────────────────────────────────────────────┐
│  [ETA LOGO]   What We Supply ▾   Industries ▾   Capabilities ▾            │
│               ETA Platform    Knowledge ▾    Company ▾                     │
│                                        🔍   FA/EN   Portal ▾  [Request Quote]│
└────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Section map

**1 · What We Supply** — *answers Q2, Q6*
- Industrial Equipment
  - Rotating Equipment
  - Static Equipment
  - Instrumentation & Control
  - Mechanical & Spare Parts
  - Chemicals & Catalysts
- Steel Products
  - Hot Rolled (HR)
  - Cold Rolled (CR)
  - Galvanized / Galvalume / Aluzinc
  - Pre-Painted (PPGI / PPGL)
  - Tinplate
  - Stainless
- *Cross-link:* Manufacturers, Request a Quote

**2 · Industries** — *answers Q1, Q6*
Steel · Oil & Gas · Petrochemical · Refining · Power Generation · Mining · Cement · Water & Wastewater · Heavy Manufacturing · EPC Projects

**3 · Capabilities** — *answers Q3, Q5, Q6, Q8*
- Procurement Services
- Engineering & Technical Evaluation
- Manufacturers & Supplier Network
- Logistics & Trade Terms
- Projects & Track Record
- Quality, Inspection & Documentation

**4 · ETA Platform** — *answers Q8*
- Overview
- Customer Workspace
- Supplier Workspace
- *(links to Portal login in utility rail)*

**5 · Knowledge** — *answers Q6, Q7*
- Knowledge Center (technical guides, standards explainers, selection guides)
- News (company announcements)
- Blog (industry commentary)

**6 · Company** — *answers Q1, Q7*
- About ETA
- Why ETA
- Careers
- Contact

### 4.2 Utility rail (persistent, all pages)

| Element | Behaviour |
|---------|-----------|
| **Request a Quote** | Primary button. Accent orange. Present in header on every page, in every viewport, and as a sticky mobile bar. |
| **Search** | Enterprise search across products, manufacturers, industries, documents, articles. |
| **FA / EN** | Language switch. Persists across navigation, never resets to default. |
| **Portal ▾** | Customer Portal · Supplier Portal — visually separated from marketing nav (see §6). |

### 4.3 Why this grouping

- **"What We Supply" leads.** Buyer question 2 ("can they supply what I need") is the highest-frequency entry intent. Putting *About* first — the conventional corporate default — answers a question nobody is asking yet.
- **"Capabilities" is the trust cluster.** Procurement Services, Logistics, Projects, Quality and Manufacturers are individually thin but collectively decisive. Grouped, they read as an operational spine.
- **ETA Platform is its own top-level item, not a sub-page.** The brief requires it to be a visible destination, and it is the answer to Q8 ("why ETA over someone else"). It sits *fourth* — after capability is established, not before. Leading with software would contradict the sourcing-company positioning.
- **News and Blog nest under Knowledge.** Three separate content destinations in the primary bar would dilute it. Knowledge Center carries the SEO weight; News and Blog ride along.

---

## 5. Content hierarchy — full inventory

```
/
├── Home
│
├── What We Supply
│   ├── Industrial Equipment (line landing)
│   │   ├── Rotating Equipment
│   │   ├── Static Equipment
│   │   ├── Instrumentation & Control
│   │   ├── Mechanical & Spare Parts
│   │   └── Chemicals & Catalysts
│   └── Steel Products (line landing)
│       ├── Hot Rolled
│       ├── Cold Rolled
│       ├── Galvanized / Galvalume / Aluzinc
│       ├── Pre-Painted (PPGI / PPGL)
│       ├── Tinplate
│       └── Stainless
│
├── Industries
│   └── [10 industry pages]
│
├── Capabilities
│   ├── Procurement Services
│   ├── Engineering & Technical Evaluation
│   ├── Manufacturers & Supplier Network
│   ├── Logistics & Trade Terms
│   ├── Projects & Track Record
│   └── Quality, Inspection & Documentation
│
├── ETA Platform
│   ├── Overview
│   ├── Customer Workspace
│   └── Supplier Workspace
│
├── Knowledge
│   ├── Knowledge Center
│   │   └── [article detail]
│   ├── News
│   │   └── [news detail]
│   └── Blog
│       └── [post detail]
│
├── Company
│   ├── About ETA
│   ├── Why ETA
│   ├── Careers
│   │   └── [position detail]
│   └── Contact
│
├── Request a Quote  ← conversion spine, reachable from everywhere
│   ├── Equipment RFQ
│   ├── Steel RFQ
│   └── Confirmation
│
├── Become a Supplier
│   └── Supplier Registration
│
├── Search
│
├── Portal (authenticated — separate application shell)
│   ├── Customer Portal
│   └── Supplier Portal
│
└── Legal
    ├── Privacy Policy
    ├── Terms of Service
    └── Cookie Policy
```

---

## 6. The marketing/application boundary

This is an architectural boundary, not a design preference.

| | **Marketing site** | **Portal / Platform** |
|---|---|---|
| Audience | Anonymous visitors | Authenticated users |
| Purpose | Trust → RFQ | Transact |
| Content source | CMS / static content | Odoo (system of record) |
| Rendering | Static / ISR, aggressively cached | Client-rendered, never cached |
| Shell | Marketing header + footer | Application chrome — sidebar, no marketing nav |
| Indexing | Fully indexed | `noindex`, excluded from sitemap |

The transition between them is deliberate and visible. A user clicking **Portal** should feel they have entered a different, more serious environment — the way a bank's marketing site differs from its online banking. Carrying the marketing navigation into the portal makes the platform feel like a brochure feature rather than a real system.

**Architectural note.** `apps/web`'s own README describes an *internal, auth-gated enterprise procurement UI* — that is the Portal, not the public site. Whether the public marketing site becomes a second deployable under `apps/` or lives outside the monorepo is **an open decision requiring an ADR** (the architecture is frozen per ADR-0001). See `IMPLEMENTATION_ROADMAP.md` §2, Gate A.

---

## 7. The RFQ spine

The RFQ is not a page. It is a **spine running through every page of the site**, and it is the primary measure of whether this IA works.

### 7.1 Entry points

| Location | Form |
|----------|------|
| Header | Persistent **Request a Quote** button, every page |
| Mobile | Sticky bottom bar, always visible |
| Home | Hero primary CTA + mid-page conversion band |
| Product line / category | Contextual CTA, **pre-filled with that category** |
| Industry page | Contextual CTA, pre-filled with that industry |
| Manufacturer page | "Request a quote for this brand" |
| Article / Knowledge | Inline CTA at end of technical content |
| Footer | Standing link, every page |
| Direct | `/rfq` — usable in email signatures, tenders, and print |

### 7.2 Branching flow

```
                        ┌─────────────────────────┐
                        │   What are you sourcing? │
                        └────────────┬─────────────┘
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
            ┌──────────────┐  ┌────────────┐  ┌──────────────┐
            │  Equipment   │  │   Steel    │  │ Not sure /   │
            │              │  │            │  │ mixed scope  │
            └──────┬───────┘  └─────┬──────┘  └──────┬───────┘
                   ▼                ▼                ▼
        ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐
        │ Category         │ │ Product type     │ │ Free-form +  │
        │ Tag / service    │ │ Grade / standard │ │ file upload  │
        │ Qty · datasheet  │ │ Thk × W × L      │ │              │
        │                  │ │ Coating · tonnage│ │              │
        └────────┬─────────┘ └────────┬─────────┘ └──────┬───────┘
                 └────────────────────┼──────────────────┘
                                      ▼
                        ┌──────────────────────────┐
                        │  Documents               │
                        │  PDF · XLSX · DWG · IMG  │
                        │  ZIP · multi-file        │
                        └────────────┬─────────────┘
                                     ▼
                        ┌──────────────────────────┐
                        │  Commercial context      │
                        │  Incoterm · destination  │
                        │  Required date · project │
                        └────────────┬─────────────┘
                                     ▼
                        ┌──────────────────────────┐
                        │  Who you are  (LAST)     │
                        │  Company · name · email  │
                        └────────────┬─────────────┘
                                     ▼
                        ┌──────────────────────────┐
                        │  ETA-RFQ-2026-0001       │
                        │  Response SLA stated     │
                        │  Email receipt + copy    │
                        └──────────────────────────┘
```

### 7.3 Non-negotiable rules

1. **Identity is requested last.** Asking "who are you" before "what do you need" is the single largest cause of industrial RFQ abandonment. The buyer invests effort first; by the time contact details are requested, they are committed.
2. **No account required.** Ever. An RFQ from an anonymous visitor is worth more than a registration wall.
3. **Upload is first-class, not an afterthought.** In real industrial procurement the datasheet *is* the RFQ. Drag-and-drop, multi-file, visible progress, named-file confirmation.
4. **Every RFQ returns a reference number** in the format `ETA-RFQ-YYYY-NNNN`, mirroring the existing offer numbering convention (`TO-2025-0001`).
5. **A response commitment is stated on screen**, not merely implied. *(Exact SLA — `[Content Required]`, see §10.)*
6. **Partial submissions are recoverable.** A buyer with an incomplete spec should still be able to submit and talk to an engineer.

### 7.4 Accepted upload formats

`PDF` · `XLSX / XLS / CSV` · `DWG / DXF` · `DOC / DOCX` · `JPG / PNG / TIFF` · `ZIP / RAR`

Server-side validation, virus scanning, and per-file plus per-submission size caps are specified in `PAGE_SPECIFICATIONS.md` §RFQ.

---

## 8. Enterprise search

Search is a first-class capability, not a filter widget. Five indexed entity types, each rendering a distinct result card:

| Entity | Indexed fields | Result card shows |
|--------|----------------|-------------------|
| **Products** | Category, subcategory, spec attributes, synonyms | Category path, key specs, RFQ button |
| **Manufacturers** | Brand, category, country, industries | Logo, category, "request quote for this brand" |
| **Industries** | Name, description, served equipment | Industry, linked capability |
| **Documents** | Title, abstract, type, language | Type badge, language badge, download |
| **Articles** | Title, body, tags, author, date | Section badge, date, excerpt |

**Requirements**
- Bilingual index with per-language analysers — Persian stemming and ZWNJ normalisation are not optional; `فولاد` and `فولادی` must resolve together.
- Synonym dictionary spanning EN/FA *and* industry vernacular: `pump ⇄ پمپ`, `HR coil ⇄ ورق گرم ⇄ hot rolled`, `PPGI ⇄ ورق رنگی`.
- Standards and grades are searchable literals: `S235JR`, `API 610`, `ASTM A36`, `EN 10025`, `DIN 17100`.
- Empty-state returns curated category entry points, never a blank page.
- Zero-result state offers **Request a Quote** — a failed search is a qualified lead.

---

## 9. Relationship to the approved Blueprint sitemap

`ETA-SITEMAP-001` (Blueprint, Approved v1.0) is the prior structure. This IA **supersedes it on three points** and inherits the rest.

| Change | Blueprint v1.0 | This IA | Reason |
|--------|----------------|---------|--------|
| **Products** | Not present as a top-level section; steel appears only as one industry among ten | **What We Supply**, forked into two independent business lines, placed first | Buyer question 2 is the highest-frequency intent; the two lines have opposite operating models (§3) |
| **CRM** | Listed as an ETA Platform module | **Removed** | ADR-0016: no standalone CRM in the target architecture, now or later |
| **AI positioning** | AI-forward throughout; "AI Platform" as a peer top-level section | Retained as a **capability within ETA Platform**, placed after capability sections | Brand voice is explicitly *not buzzword driven*; sourcing capability must establish credibility first |

Everything else — Industries, Services, Manufacturers, Suppliers, Projects, Knowledge Center, Blog, Careers, Contact, the two portals, and Legal — is carried forward.

**ETA-SITEMAP-001 is `status: Approved v1.0`.** Superseding it is a version bump and re-approval, not a silent edit. Flagged in `IMPLEMENTATION_ROADMAP.md` §2, Gate B.

---

## 10. Content gaps — never fabricate

The following do not exist in any repository file, Drive document, or the live site. Every one of them is load-bearing for buyer trust. **Each must render as a visible `[Content Required]` placeholder until sourced — none may be invented, estimated, or filled with plausible-sounding text.**

| Gap | Blocks | Severity |
|-----|--------|----------|
| Equipment-side OEM / manufacturer names | Manufacturers page — **the entire section** | **Critical** |
| Project case studies / track record | Projects page — the strongest trust asset a sourcing company has | **Critical** |
| Certifications, ISO, vendor approvals | Quality page, trust bar | **Critical** |
| Client references / logos | Home trust bar, Projects | High |
| Industrial photography — any at all | Every hero, every card, the entire visual concept | **Critical** |
| RFQ response SLA | RFQ confirmation | High |
| Founding year | About, timeline | Medium |
| Commercial registration number | Footer, About, legal credibility | Medium |
| Engineering team size / disciplines | About, Engineering capability | Medium |
| Named logistics & inspection partners | Logistics page | Medium |
| Leadership beyond CEO | About | Low |

**Verification note.** An exhaustive grep for equipment OEM names (Flowserve, Sulzer, KSB, Siemens, ABB, Emerson, Yokogawa, and others) across the repository and knowledge base returned **zero real hits** — only vendored Odoo source code. The `03-PRODUCTS`, `04-SUPPLIERS`, `04_Products`, and `05_Suppliers` folders are all **empty**. No approved vendor list exists.

### 10.1 What *is* verified and may be used freely

These are sourced and quotable today:

| Fact | Source | Confidence |
|------|--------|-----------|
| CEO: **Ali Hejazi** | Offer template signature block; letterhead | VERIFIED |
| Address: **No. 70, Unit 5, Zafar St, Tehran, Iran** | Offer footer | VERIFIED |
| Payment terms: **30% advance + 70% before shipment, or LC at sight** | `ETA Offer_Template.xlsx` | VERIFIED |
| Incoterms: **EXW / FOB / CIF / DDP / DAP** | `ETA Offer_Template.xlsx` | VERIFIED |
| Warranty: **12 months from delivery / commissioning** | `ETA Offer_Template.xlsx` | VERIFIED |
| Documentation set: **Commercial Invoice, Packing List, COO, COC, Test Report** | `ETA Offer_Template.xlsx` | VERIFIED |
| **FAT inspection** regime; **30-day** offer validity | `ETA Offer_Template.xlsx` | VERIFIED |
| Performance bonds & prepayment BGs via **first-class SWIFT-enabled bank** | `ETA Offer_Template.xlsx` | VERIFIED |
| **Technical offer issued unpriced, separately from commercial offer** | `ETA Offer_Template.xlsx` (two sheets) | VERIFIED |
| **10+ years · 3 focus industries · 50+ manufacturers & suppliers · 8 product categories · 100% project-based** | Live site statistics | VERIFIED |
| **Project-based trading, no warehouse inventory**; sourcing Europe / China / UAE | `exiratlas.com/about.html` | VERIFIED |
| Eight named Iranian steel mills (§3) | `Iran_Steel_Comprehensive_V2.xlsx`, 19 worksheets | VERIFIED |

**The unpriced technical offer is a differentiator worth building a page around.** Issuing a technical offer separately from the commercial one is exactly what a buyer means by "do they understand technical procurement" (Q6). It is documented, it is real, and no competitor messaging currently uses it.

Similarly, the **trade-terms set** — Incoterms, LC capability, bank guarantees, 12-month warranty, full documentation set, FAT — collectively answers Q5 ("can they actually deliver") with verifiable specifics rather than adjectives. This is the strongest trust content ETA currently owns, and it is presently invisible on the live site.

---

## 11. Bilingual architecture

| Decision | Rule |
|----------|------|
| URL strategy | Path prefix — `/fa/...` and `/en/...`. No language subdomains, no cookie-only switching. |
| Default | Negotiated from `Accept-Language`, then persisted. Neither language is a second-class translation of the other. |
| `hreflang` | Reciprocal `fa-IR` / `en` / `x-default` on every page pair. |
| Direction | `dir="rtl"` on `<html>` for Persian; all layout uses CSS **logical properties** so mirroring is automatic. |
| Never mirrored | Logo, technical drawings, product photography, charts with a time axis, code and standard designations. |
| Numerals | Persian digits in body prose; **Latin digits always** for grades, standards, dimensions, and part numbers — `S235JR` and `12×1500×6000` are never localised. |
| Dates | Jalali on Persian pages, Gregorian on English pages. |
| Fonts | **Self-hosted.** Vazirmatn (FA) + Inter (EN). See §12. |
| Content parity | Product, industry, capability, and RFQ content is fully bilingual. Blog and News may be single-language with a visible language badge. |

---

## 12. Hosting constraints — IranServer

Hosting on IranServer materially constrains the technical design. These are requirements, not preferences.

1. **No third-party CDN dependency for critical assets.** Google Fonts, Cloudflare, jsDelivr, and similar are unreliable or unreachable for the primary audience. Fonts, icons, scripts, and styles are **self-hosted without exception**.
2. **Vercel, Netlify, and Cloudflare Pages are not viable deployment targets** for the primary market — this contradicts the Blueprint's `Technical.md` (`ETA-TECH-001`), which specifies Lovable/Vercel/Cloudflare. That document predates the IranServer decision and is superseded on this point.
3. **Self-hosted runtime.** Node.js under a process manager behind Nginx, containerised. Deployment is push-based to IranServer, not platform-managed.
4. **Video must be self-hosted and aggressively optimised** — no YouTube or Vimeo embeds for hero backgrounds. Budgets in `DESIGN_SYSTEM.md` §Motion.
5. **Analytics must be self-hosted** (e.g. Plausible or Matomo on the same infrastructure). Google Analytics is unreliable for the primary audience and creates a privacy-consent burden.
6. **Assume constrained, variable bandwidth.** The performance budget is not a nicety — it is the difference between a buyer seeing the site and closing the tab.

---

## 13. Acceptance criteria for this IA

The structure is correct when all of the following hold:

- [ ] Every one of the 17 destinations in the brief has a home, and no navigation level exceeds seven items.
- [ ] Each of the eight buyer questions is answered by at least one page, and every page answers at least one.
- [ ] Equipment and Steel never share a page template, a category tree, or an RFQ form.
- [ ] **Request a Quote** is reachable in one click from every page, in every viewport, in both languages.
- [ ] The RFQ requests identity last and requires no account.
- [ ] Every unverified fact renders as a visible `[Content Required]` placeholder, never as invented copy.
- [ ] The marketing/portal boundary is visible to the user and enforced in routing, caching, and indexing.
- [ ] Persian is a first-class language, not a translation layer.
- [ ] No page depends on a third-party CDN to render.

---

## 14. Open decisions requiring approval

| # | Decision | Owner | Blocks |
|---|----------|-------|--------|
| **D1** | Does the public site live in `apps/` (new deployable) or outside the monorepo? Architecture is frozen — **requires an ADR**. | Architecture | All implementation |
| **D2** | "Everything authenticates through Odoo" (brief) vs. **Keycloak as IdP** (ADR-0012, Accepted). **Requires an ADR.** | Architecture | Portal work |
| **D3** | Supersede `ETA-SITEMAP-001` v1.0 → v2.0 with this IA. | Brand owner | Content production |
| **D4** | Supersede `ETA-VISUAL-001` (`Colors.md`) — its Navy/Copper palette does not match the official logo. | Brand owner | Design system |
| **D5** | Confirm the RFQ response SLA. | Commercial | RFQ launch |
| **D6** | Approve the photography commission — no industrial imagery exists in any form. | Brand owner | **Entire visual concept** |

---

*Next: `SITEMAP.md` — URL structure, page inventory, and routing.*
