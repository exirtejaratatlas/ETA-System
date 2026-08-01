# ETA Company Profile — Understanding Report

**Date:** 2026-07-25
**Status:** For approval. No profile design, structure, or copy has been produced.
**Prepared under:** Master System Prompt — ETA Company Profile Permanent Operating Context

---

## 0. How to read this report

Every claim below is tagged with its source and a confidence score.

| Tag | Meaning |
|---|---|
| **OPERATIONAL** | Evidence from documents ETA actually uses with customers, or from the live public website. Highest sales credibility. |
| **DOCUMENTED** | Evidence from the Approved Blueprint vault (`ETA-Blueprint/`). Internally approved, but aspirational in places. |
| **REFERENCE DATA** | Real structured data files (steel database, mill catalogs, price lists). |
| **RUNTIME** | Verified state of running systems. |
| **GAP** | Does not exist in any source. Must never be fabricated. |

Confidence is scored 0–100 on *how well I understand the topic*, not on how good ETA is at it.

---

## 1. The single most important finding

**ETA's own sources describe two different companies, and only one of them can sell.**

**Company A — the operating business.** Evidenced by the live website, the Offer/Invoice/Letterhead templates, and the steel mill database. A ~10-year-old Tehran-based industrial trading and sourcing house. Project-based, no warehouse inventory. Supplies equipment sourced from Europe/China/UAE and steel sourced from Iranian mills, to oil & gas, petrochemical, and steel buyers. Works through formal technical offers, commercial offers, LCs, bank guarantees, FAT inspection, and export documentation.

**Company B — the aspirational platform.** Evidenced by the Approved Blueprint documents (`ETA-BM-001`, `ETA-VALUE-001`, `ETA-CP-001`, `ETA-BLUEPRINT-001`). An "AI-native Enterprise Procurement Ecosystem," a four-model business including Enterprise SaaS and AI Procurement Intelligence, aiming to be "the operating system of industrial procurement across the Middle East."

Company B is where ETA is going. **Company A is what a procurement manager can buy from today.** The Company Profile must be built almost entirely from Company A evidence. Company B currently occupies the majority of the Approved profile documents — which is why those documents, as written, cannot serve as the profile's content source without substantial rework.

This is consistent with your mandate (AI last and minimal), and it is now backed by evidence rather than preference.

---

## 2. Business understanding

**Confidence: 88/100**

### Legal and operational identity

| Fact | Value | Source | Confidence |
|---|---|---|---|
| Legal/trading name | Exir Tejarat Atlas (ETA) | All sources, consistent | 100 |
| Registered address | No. 70, Unit 5, Zafar St, Tehran, Iran | **OPERATIONAL** — Offer template footer | 90 |
| CEO | Ali Hejazi, Chief Executive Officer | **OPERATIONAL** — Offer template signature block, Letterhead signature | 90 |
| Years operating | "10+ Years experience" | **OPERATIONAL** — live website About + Home | 85 |
| Supplier network size | "50+ manufacturers & suppliers" | **OPERATIONAL** — live website Home/About | 80 |
| Product categories | 8 | **OPERATIONAL** — live website | 95 |
| Focus industries | 3 (oil & gas, petrochemical, steel) | **OPERATIONAL** — live website | 95 |
| Operating currency | USD | **OPERATIONAL** — Offer template, Invoice template | 90 |
| Contact | info@exiratlas.com (documents) / ai@exiratlas.com (website) | Both sources — *inconsistent* | 70 |

### Business model

**OPERATIONAL, confidence 92.** Verbatim from the live About page: *"Supplies industrial equipment and components on a project basis — sourcing from trusted international manufacturers and suppliers without holding warehouse inventory."*

This is the most commercially important sentence ETA has written about itself. It defines the model precisely:

- **Project-based, not stock-based.** No inventory risk, no catalog-and-warehouse model. Every transaction begins with a customer requirement.
- **Sourcing intermediary with direct manufacturer relationships** — the website claims *"Direct relationships with international manufacturers without unnecessary intermediaries."*
- **Revenue is procurement margin** on sourced goods. Confirmed structurally by the steel database, which carries explicit `قیمت خرید` (purchase price) / `قیمت فروش` (sale price) / `سود ناخالص` (gross profit) / `مالیات ۱۰٪` (10% tax) / `سود خالص` (net profit) columns — a buy-sell margin model, not a fee or subscription model.
- **Two go-to-market motions:** B2B direct sales *and* tender participation (**OPERATIONAL** — About page core activities list).

**Sourcing direction is asymmetric, and this is a structural insight the existing documents miss entirely:**

| Business line | Sourcing direction | Evidence |
|---|---|---|
| Industrial Equipment | **Inbound international** — Europe, China, UAE → Iranian industrial buyers | Live website Home/About; Invoice template shows Origin "EU" |
| Steel Products | **Domestic** — Iranian mills | Live website Products: *"steel sheets from domestic steel mills"*; Industries: *"from reputable mills"*; 19-mill database |

These are not two versions of the same activity. They involve different suppliers, different logistics, different currencies of risk, different lead times, and different buyer conversations. Your mandate's instruction that the two lines must never be merged is confirmed by the underlying sourcing reality — not merely a presentational preference.

---

## 3. Products understood

**Confidence: 90/100 for equipment categories, 95/100 for steel, 25/100 for specific brands**

### Business Line 1 — Industrial Equipment

**OPERATIONAL** — live website Products page, 8 categories with named sub-types:

| # | Category | Sub-types (verbatim) |
|---|---|---|
| 1 | Pumps | Centrifugal, Reciprocating, Gear, Submersible |
| 2 | Valves | Gate, Globe, Check, Ball, Butterfly, Control, Safety Relief |
| 3 | Piping & Fittings | Carbon Steel Pipes, Stainless Steel Pipes, Special Alloy Pipes, Flanges & Fittings |
| 4 | Rotary Equipment | Compressors, Turbines, Gearboxes, Fans & Blowers |
| 5 | Static Equipment | Heat Exchangers, Pressure Vessels, Filters & Separators |
| 6 | Instrumentation | Flow Meters, Pressure Gauges, Temperature Instruments, Control Systems |
| 7 | Spare Parts | Mechanical Seals, Bearings, Gaskets & Seals |
| 8 | Steel Sheets | Hot Rolled, Cold Rolled, Galvanized, Alloy & Stainless Plate |

Real specification-level line items appear in ETA's own Invoice template (**OPERATIONAL**, but note these are template examples, not evidence of a completed sale): `API 600 Gate Valve 6" CL150 RF`, `Globe Valve 4" CL300 WCB`, `Seamless Pipe ASTM A106 Gr.B 6"`. The Letterhead template's subject line reads *"Supply of API 600 Gate Valves & Associated Piping Materials."*

**Note vs. your mandate:** your operating context lists a broader equipment scope (gas/air/steam turbines, reactors, drums, columns, DCS/PLC/transmitters, catalysts). The website's 8 categories cover turbines, heat exchangers, pressure vessels, and control systems, but do **not** mention reactors, drums, columns, catalysts, or DCS/PLC by name. Confidence that these are in scope: 55 — asserted by you, not yet present in any document. Flagged in §12.

### Business Line 2 — Steel Products

**REFERENCE DATA, confidence 95.** `00-KNOWLEDGE/09-DATABASE/Manufacturers/Iran_Steel_Comprehensive_V2.xlsx` — 19 mill-specific worksheets plus an overview. Each product row carries: product name, product type, thickness/size (mm), width (mm), length/form, **standard**, **grade/alloy**, primary application, and technical notes.

This is genuine procurement-grade product data. Examples read directly from the file:

| Mill | Product | Thickness | Width | Standard | Grade |
|---|---|---|---|---|---|
| Mobarakeh | Hot rolled (ورق سیاه) | 1.20–16.00 mm | 1000–1850 mm | DIN 17100 | ST37 / ST52 |
| Mobarakeh | Cold rolled (ورق روغنی) | 0.35–3.00 mm | 1000–1500 mm | EN 10130 | DC01 / DC04 |
| Mobarakeh | Galvanized | 0.25–2.50 mm | 1000–1500 mm | EN 10346 | DX51D |
| Mobarakeh | Tinplate (قلع‌اندود) | 0.13–0.40 mm | 600–1050 mm | EN 10202 | T1–T5 |
| Mobarakeh | Color-coated (رنگی) | 0.25–1.50 mm | 1000–1500 mm | EN 10169 | DX51D |
| Haft Almas | Galvalume | 0.25–1.25 mm | 1000/1250 mm | ASTM A792 | AZ150 |
| Haft Almas | Pickled (اسیدشویی) | 1.50–4.50 mm | 1000/1250 mm | DIN 1614 | DD11 / St22 |

Product types across all 19 mills: hot rolled, cold rolled, coated sheet (galvanized/galvalume/color-coated/tinplate), wide hot rolled plate, billet (شمش), wide billet, heavy billet, rebar (میلگرد), sections (مقاطع), profile, tube, wire rod (مفتول), raw materials.

**This database is ETA's strongest single sales asset and it appears in none of the current profile documents.** It demonstrably answers "can you supply exactly what I need" at grade-and-tolerance level.

---

## 4. Services understood

**Confidence: 80/100**

Two source layers, which do not fully agree.

**OPERATIONAL (live website — what is actually offered today):** Industrial equipment supply, International sourcing, B2B sales, Tender participation, Business development, Supplier & manufacturer management. Four stated capabilities: Direct Sourcing, Project-Based Supply, Technical Compliance (*"Matching pressure class, temperature, material grade and industry certifications"*), Global Network.

**DOCUMENTED (`ETA-SERVICES-001`, Approved v1.0):** a wider list — Industrial Procurement (global sourcing, RFQ management, supplier evaluation, commercial negotiation, PO management, vendor qualification, procurement consulting); Engineering Services (technical evaluation, datasheet review, equipment selection, manufacturer matching, material verification, **alternative product recommendation**, engineering consultation); Industrial Supply; Supplier Intelligence; Digital Procurement Platform; Artificial Intelligence; Logistics Support (international shipping, customs documentation, delivery tracking, inspection coordination, Incoterms management); Consulting.

The Logistics Support and Engineering Services lists are **corroborated** by the Offer templates (§6), so I treat them as real capability, not aspiration. The "Digital Procurement Platform" and "AI" service lines are **not** corroborated by any delivered artifact and are aspiration (§9).

**"Alternative product recommendation"** deserves attention: for a buyer facing an obsolete or unavailable specified item, this is a high-value service and a genuine differentiator. It is currently buried as one bullet in an internal document.

---

## 5. Industries understood

**Confidence: 92/100**

There is a clean, decision-relevant split here.

**OPERATIONAL — the 3 industries ETA actually markets to,** with what it supplies to each (verbatim from the live Industries page):

| Industry | What ETA supplies |
|---|---|
| Oil & Gas | *"rotating & static equipment, valves and instrumentation for refineries and process facilities"* |
| Petrochemical | *"heat exchangers, pressure vessels, alloy piping & fittings and control systems"* |
| Steel | *"industrial equipment and a full range of steel sheets (hot, cold, galvanized and alloy) from reputable mills"* |

**DOCUMENTED — the 9–12 industries claimed in the Approved documents:** Steel, Oil & Gas, Petrochemical, Refining, Mining, Cement, Power Generation, Water & Wastewater, Heavy Manufacturing, EPC Projects (+ Industrial Automation, Infrastructure in `ETA-MARKET-001`).

**Assessment.** The 3-industry focus is the more credible and more sellable claim: it is specific, it matches the product mix, and it matches the sourcing network. The 9–12 industry list dilutes the specialist positioning that industrial buyers reward. Note the Steel industry entry is the one place where both business lines converge on a single customer — steel mills buy *equipment* from ETA and ETA buys *steel* from mills. That relationship is a credibility asset worth understanding before we structure anything.

**Buyer personas** (**DOCUMENTED**, `ETA-TARGET-001`): Procurement Managers, Supply Chain Directors, Technical Managers, Maintenance Managers, Engineering Managers, Project Managers, Commercial Managers, CEOs. This matches the mandate's target reader.

---

## 6. Procurement workflow understood

**Confidence: 85/100 operationally, 95/100 as documented**

### What ETA actually does — reconstructed from its own commercial documents

**OPERATIONAL, confidence 90.** The `ETA Offer_Template.xlsx` is a two-sheet document, and the separation is professionally significant:

1. **TECHNICAL OFFER** (ref. format `TO-2025-0001`) — explicitly *"an unpriced technical offer for review and approval purposes only."* Carries item/description, **manufacturer**, unit, qty, weight, Incoterms, packing, country of origin, inspection/testing, warranty, documentation. States *"Specifications and delivery times are subject to final confirmation by manufacturer."*
2. **COMMERCIAL OFFER** — adds manufacturer, origin, qty, unit price, total, delivery time per line, plus subtotal/discount/tax/grand total and full commercial terms.

Issuing technical approval separately from price is exactly how disciplined EPC and plant procurement works. **This is a trust signal of the highest order and it is absent from every current profile document.**

### Standard commercial terms carried on ETA's own offer

**OPERATIONAL, confidence 88.** From the Commercial Offer terms block:

- **Payment Terms** — e.g. *"30% advance + 70% before shipment / LC at sight"*
- **Incoterms** — EXW, FOB, CIF, DDP, DAP, *"specify clearly"*
- **Estimated Lead Time** — *"From receipt of advance payment / confirmed PO"*
- **Packing** — Standard Export Packing (wooden crate / palletized / as required)
- **Country of Origin** — as per manufacturer
- **Warranty** — *"12 Months from delivery / commissioning"*
- **Documentation** — *"Commercial Invoice, Packing List, COO, COC, Test Report"* (Technical Offer adds Datasheet)
- **Inspection/Testing** — *"FAT — Factory Acceptance Test as agreed"*
- **Offer Validity** — 30 days from issue
- **Bank Guarantee & Payment Security** — Performance Bond/BG as % of contract value provided by seller on PO; Prepayment Bank Guarantee protecting buyer's advance; BG issuing bank *"Acceptable first-class international bank (SWIFT-enabled)"*; BG validity to *"final delivery date + 30-day defect liability period."*

**This materially corrects my earlier gap list.** Warranty terms, Incoterms, LC/payment capability, inspection regime, and export documentation were previously recorded as unknown. They are documented — as ETA's own standard terms.

The Invoice template additionally shows: 30-day payment terms, *"8 weeks ex-advance"* lead time, and IBAN/SWIFT bank detail fields (values blank).

### Documented target workflow

**DOCUMENTED, confidence 95.** `ETA-BLUEPRINT-005` defines a 12-stage lifecycle: Customer Acquisition → Opportunity → RFQ Management → Supplier Collaboration → Technical Evaluation → Commercial Evaluation → Purchase Order → Manufacturing & Supply → Logistics → Customer Delivery → Knowledge Capture → Analytics. Each stage has a named owner and defined outputs.

Stages 3–10 describe the real trading process and are directly usable as profile content once stripped of the AI and platform framing. Stages 11–12 are internal, not buyer-facing.

---

## 7. Manufacturer network understood

**Confidence: 90/100 for steel, 20/100 for equipment**

**This is the single largest asymmetry in ETA's evidence base, and the largest risk to the profile.**

### Steel side — strong, named, verifiable

**REFERENCE DATA, confidence 95.** 19 Iranian mills named in the database, with product counts and product-type coverage:

Haft Almas (4 products), Gharb, Mobarakeh (5), Bahman, Semnan, Dashtestan, Shahrekord, Amir Kabir Kashan, Khorasan, Khuzestan (3), Hormozgan, Oxin, Taraz, Gilan (3), Bonab, Yazd (4), Saba Steel, Arfa, Sirjan.

Corroborated by **8 physical mill product catalogs** on file (Mobarakeh 1401 and 1404 editions, Amir Kabir Kashan Persian + English, Taraz, Semnan Hot Rolling, Fouladyar Kourosh, Tarten) and by **6 daily Haft Almas price-estimate PDFs** (Tir 1405 — 7th, 20th, 22nd, 24th, 27th, 28th). The price-list cadence is evidence of live, ongoing market tracking, not a static archive.

Your mandate named: Mobarakeh, Haft Almas, Taraz, Amir Kabir Kashan, Oxin, Hormozgan, Shahrekord, Khorasan — **all 8 verified present in the database.** Your mandate also cites Chinese mills; those are **not** in any file (confidence 30, asserted only).

### Equipment side — no named manufacturers anywhere

**GAP, verified by exhaustive search.** I searched every markdown, text, and CSV file across the entire ETA document tree for the OEM names that would be expected in this sector (Flowserve, Sulzer, KSB, Grundfos, Siemens, ABB, Emerson, Honeywell, Yokogawa, Schneider, Atlas Copco, Howden, Weir, SPX, Alfa Laval, GEA, Endress+Hauser). **Zero genuine hits** — the only matches were inside vendored Odoo source code and file-inventory listings.

What exists instead is category-level origin claims only: *"Europe, China and the UAE"*, *"50+ manufacturers & suppliers"*, and Origin `EU` on template invoice lines.

**Consequence for the profile.** The mandate's buyer question "which manufacturers do you work with" is the one question ETA currently cannot answer on the equipment side, which is its primary revenue line. This must be resolved by you before the profile is designed — it cannot be solved by writing. See §12, item 1.

---

## 8. Supplier strategy understood

**Confidence: 70/100 as intent, 30/100 as current practice**

**DOCUMENTED** (`ETA-DOMAIN-SUP-001` v2.0, Approved). An 11-stage supplier lifecycle: Discovery → Registration → Qualification → Technical Assessment → Commercial Assessment → Compliance Verification → Approved Vendor → Active Procurement → Performance Evaluation → Preferred Supplier → Strategic Partner. Supported by an Approved Vendor List (AVL), supplier certificates, capability records, performance ratings, risk records, and audits.

`ETA-MARKET-001` classifies the supplier ecosystem as: Manufacturers, Authorized Distributors, Regional Suppliers, International Suppliers, OEM Partners, Engineering Partners, Logistics Partners, Inspection Companies.

**What is corroborated operationally:** "Supplier & manufacturer management" is listed as a core activity on the live site, and "50+ manufacturers & suppliers" is claimed. Direct-relationship sourcing is claimed.

**What is not corroborated:** there is no AVL file, no supplier register, no qualification record, no performance scorecard, and no completed supplier assessment anywhere in the document tree. The `04-SUPPLIERS`, `03-PRODUCTS`, `05_Suppliers`, and `04_Products` folders are **empty**. The Supplier Domain document describes a system to be built, not a process with records.

The honest reading: ETA has a working supplier network operated on relationship and experience, and a designed-but-unimplemented formal qualification system. For the profile, the *capability* can be described; a *formal AVL* cannot be claimed.

---

## 9. Technical capability understood

**Confidence: 82/100**

This is stronger than I expected, and it is ETA's most under-used asset.

**Corroborated technical capability (OPERATIONAL):**

- **Specification matching** — *"Matching pressure class, temperature, material grade and industry certifications"* (website). Reflected in the real specification format used on offers (`API 600 Gate Valve 6" CL150 RF`).
- **Standards fluency** — the steel database is organised natively by international standard and grade: DIN 17100, DIN 1623, DIN 1614, EN 10130, EN 10346, EN 10202, EN 10169, ASTM A792, plus grades ST37/ST52, DC01/DC03/DC04, DX51D, SGCC, AZ150, T1–T5, DD11. Equipment side shows API 600, ASTM A106 Gr.B, WCB, CL150/CL300, RF facing.
- **Unpriced technical offer discipline** — technical approval decoupled from commercial negotiation (§6).
- **Inspection and documentation control** — FAT, COO, COC, Test Report, Datasheet, Packing List.
- **Trade-finance literacy** — LC at sight, staged advance/pre-shipment payment, performance bonds, prepayment BGs, SWIFT-enabled first-class issuing banks, defect liability periods.

**Claimed but unevidenced (DOCUMENTED only):** datasheet review, equipment selection, material verification, alternative product recommendation, engineering consultation — plausible and consistent with the above, but no worked example, engineering report, or technical evaluation document exists on file.

**Engineering headcount and qualifications: GAP.** `ETA-SERVICES-001` refers to *"Our engineering team"* but no name, CV, discipline, or headcount exists anywhere. This is a significant gap for a profile whose core claim is engineering-driven procurement.

---

## 10. AI role understood

**Confidence: 95/100 on intent, 95/100 on current delivery status**

**Intent (DOCUMENTED).** AI is pervasive in the Approved documents: `ETA-BM-001` makes "AI Procurement Intelligence" one of four business models with its own revenue lines; `ETA-VALUE-001` embeds AI across ten capability areas; `ETA-CAP-001` states *"Artificial Intelligence is considered a native enterprise capability and not an optional feature"*; `ETA-CP-001`'s Vision **is** an AI statement; the brand promise is *"Engineering Intelligence. Enterprise Procurement. Powered by AI."*

**Delivery status (RUNTIME + repository, confidence 95).** Nothing customer-facing exists. The ETA-System repository is a scaffolded monorepo whose `ai/` tree contains a knowledge-retrieval index and README stubs. Running containers are Odoo 19, Postgres 17/16, Keycloak, NATS — an unconfigured internal development environment with no custom addons and no production procurement data. `portal.exiratlas.com` is a temporary operational portal slated for retirement, not an AI product.

**One documented AI governance principle is genuinely reusable in a sales context** (`ETA-BLUEPRINT-005`): *"AI supports decision-making but does not replace human approval for critical business decisions."* For a procurement manager worried about automated sourcing, that is a reassurance, not a pitch.

**Assessment.** Every AI claim in the Approved documents is roadmap, not capability. Presented to a procurement manager as present-tense fact, it would be unverifiable at best and damaging at worst — an industrial buyer who probes an AI claim and finds nothing behind it re-evaluates every other claim in the document. Your instruction to place AI last and minimal is, on this evidence, the correct commercial call and the only defensible one.

---

## 11. Conflicts found

| # | Conflict | Sources | Severity |
|---|---|---|---|
| C-1 | **Self-description.** *"Industrial procurement, engineering, and technology company"* / *"more than an industrial trading company"* (`ETA-CP-001`) vs. *"An industrial trading and sourcing company"* (live website). | Approved doc vs. live site | **High** — determines the profile's entire identity |
| C-2 | **AI weighting.** AI leads Vision, Mission, Strengths, and brand promise in Approved docs; the live website's homepage, product pages, and industry pages contain no AI claim at all. | Approved docs vs. live site | **High** |
| C-3 | **Industry count.** 3 (live site) vs. 9–12 (`ETA-CP-001`, `ETA-IND-001`, `ETA-MARKET-001`). | Live site vs. Approved docs | **Medium-High** — specialist vs. generalist positioning |
| C-4 | **Steel's status.** One industry among ten and a single product bullet (Approved docs) vs. an independent business line with a 19-mill, multi-grade database (mandate + reference data). | Approved docs vs. mandate + data | **High** |
| C-5 | **Tagline.** *"Engineering Intelligence. Enterprise Procurement. Powered by AI."* (brand system) vs. *"Precision Supply · Global Reach"* (actual letterhead footer). | Brand docs vs. operational document | **Medium** — the letterhead line is closer to the mandate |
| C-6 | **Business model breadth.** Four business models incl. Enterprise SaaS and AI Intelligence (`ETA-BM-001`) vs. project-based equipment/steel supply (live site, offer templates). | Approved doc vs. operational | **High** |
| C-7 | **Contact address.** `info@exiratlas.com` (offer/letterhead) vs. `ai@exiratlas.com` (live website). | Operational vs. live site | **Low** but must be settled before publication |
| C-8 | **Equipment scope.** Mandate lists reactors, drums, columns, DCS/PLC/transmitters, catalysts; website's 8 categories do not name them. | Mandate vs. all documents | **Medium** |
| C-9 | **Chinese steel mills.** Named in the mandate; absent from the steel database and every catalog. | Mandate vs. reference data | **Medium** |

**Note on C-1/C-2/C-4/C-6:** `ETA-CP-001` and its siblings are `status: Approved, v1.0`. Correcting them is a version bump and re-approval, not a silent edit. I have not modified them.

---

## 12. Missing information — must be supplied, never invented

Ordered by how much each blocks the profile.

**Blocking — the profile cannot be credible without these:**

1. **Equipment manufacturer names.** Which OEMs/brands does ETA source, represent, or have supply relationships with? Any authorisations or distribution agreements? *This is the mandate's own buyer question #4 and the profile's largest hole.*
2. **Project track record.** Any delivered project — client type, industry, scope, value band, year. Even anonymised ("a Southern Iran refinery, 2024, valve package") transforms the document. Currently zero exist.
3. **Certifications and registrations.** ISO 9001 or others; commercial registration number; chamber of commerce membership; any vendor approvals held with end users.

**High value — materially strengthen trust:**

4. **Team.** Engineering headcount, disciplines, years of experience. Total company headcount. (CEO Ali Hejazi is the only named person on file.)
5. **Client references or sectors served,** even unnamed and count-only.
6. **Verification basis for the website statistics** — "10+ years", "50+ suppliers". They will be read as claims; we should know what supports them.
7. **Founding year and company history** — "10+ years" implies ~2015–2016, but no founding date is stated anywhere.
8. **Typical lead times by category.** The templates show placeholders ("8 weeks ex-advance"); real ranges per product family would be strong content.
9. **Logistics and inspection partners.** Freight forwarders, customs brokers, third-party inspection agencies (SGS/BV/TÜV or equivalent) actually used.
10. **Banking capability** — the Invoice template's IBAN/SWIFT fields are blank. Which bank, and what LC instruments can realistically be handled?

**Confirmations needed from you (mandate assertions not present in any source):**

11. Chinese steel mill relationships — which mills? (C-9)
12. Equipment scope beyond the website's 8 categories — reactors, drums, columns, DCS/PLC/transmitters, catalysts, chemicals/catalysts. (C-8)
13. Is the equipment line strictly international-inbound, or does ETA also source equipment domestically?

**Brand asset gaps (blocking design, not understanding):**

14. Only the 9-file logo family exists (`Logo`/`mark`/`type` × svg/pdf/png). Colors (#0F172A Navy, #C57B39 Copper) and typography (Inter / Vazirmatn / JetBrains Mono) are documented in writing but no swatch files, font files, or icon sets are produced. Photography, imagery, and video folders are **empty** — an industrial profile with no equipment or facility photography is a serious constraint. `Brandbook.md` is a 0-byte file.

---

## 13. Confidence summary

| Section | Confidence | Basis |
|---|---|---|
| Business model & identity | **88** | Live site + own commercial documents agree |
| Products — steel | **95** | 19-mill database + 8 mill catalogs + price lists |
| Products — equipment categories | **90** | Live site, 8 categories with sub-types |
| Products — equipment brands | **20** | No named OEM exists anywhere |
| Services | **80** | Operational core corroborated; platform/AI lines are aspiration |
| Industries | **92** | 3 operational vs. 9–12 documented — split is clear |
| Manufacturer network — steel | **90** | Named, verified, catalogued |
| Manufacturer network — equipment | **20** | Origin regions only |
| Supplier strategy | **70** intent / **30** practice | Designed system, no records |
| Procurement workflow | **85** operational / **95** documented | Offer templates are strong evidence |
| Technical capability | **82** | Standards fluency and offer discipline are real |
| AI role | **95** | Intent and non-delivery both clearly established |
| Track record / proof | **5** | Effectively nothing exists |
| Brand & visual system | **85** documented / **25** produced | Systems written, assets absent |
| **Overall readiness to design the profile** | **72** | Sufficient to propose structure; three blocking gaps must be filled before content |

---

## 14. What I did not do

Per instruction: no Company Profile designed, no structure or table of contents proposed, no copy written, no Figma work, no Approved document edited. No benchmarking of other companies was performed or used.

---

## 15. Recommended next step

Approve, correct, or extend this understanding. Once approved, my next deliverable is the **proposed profile structure** with the buyer-question rationale for each section — still no copy — and an explicit statement of which sections are blocked by the §12 gaps.

The three blocking gaps (equipment manufacturers, project track record, certifications) are the only items that require your input rather than my analysis. Everything else in §12 can be marked `[Content Required]` and worked around during structural design.
