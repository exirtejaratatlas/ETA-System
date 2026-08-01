---
document_id: ETA-WEB-PS-004
title: Page Specifications
version: 0.1
status: Draft — awaiting approval
owner: Exir Tejarat Atlas
classification: Internal
last_updated: 2026-07-27
---

# ETA Digital Headquarters — Page Specifications

Section-by-section build specification for each of the 26 templates. Every section states its **purpose**, **content**, **behaviour**, and — where content does not yet exist — an explicit `[Content Required]` marker.

**Notation**

- `[Content Required: …]` — does not exist anywhere; must render as a visible placeholder, never as invented copy
- `[Verified: source]` — sourced and safe to publish
- `⚠️` — blocked or requires a decision

---

## 0. Global components

### 0.1 Header

Two states, one component.

| State | Trigger | Appearance |
|-------|---------|-----------|
| **Transparent** | Top of page, over a hero | No background. Logo in white/light lockup. Bottom hairline at 12 % opacity. |
| **Solid** | Scroll > 80 px | Deep petrol background, blurred backdrop, soft shadow. Logo in standard lockup. Height reduces 88 → 64 px. |

Transition: 240 ms, `cubic-bezier(0.4, 0, 0.2, 1)`. Never animates on load.

**Contents, in inline order (LTR; mirrored in RTL):**

```
[Logo] · What We Supply ▾ · Industries ▾ · Capabilities ▾ · ETA Platform · Knowledge ▾ · Company ▾
                              ⟵ flex spacer ⟶
                                   🔍 · FA|EN · Portal ▾ · [ Request a Quote ]
```

- **Logo** — `Logo.svg`, min-width 120 px, clear space ≥ ½ mark height. Never distorted, recoloured, or placed on an insufficiently contrasting background.
- **Mega-menu** (What We Supply, Capabilities): two-column panel. Opens on hover ≥ 1024 px with 120 ms intent delay; on click below. Full keyboard operation, `Escape` closes, focus returns to the trigger.
- **Request a Quote** — accent orange, the only orange button in the header. Never duplicated.
- **Mobile** — full-screen overlay, accordion sections, Request a Quote pinned to the bottom of the overlay **and** to a persistent bottom bar.

### 0.2 Footer

Four columns (stacked on mobile):

1. **Company** — logo, one-sentence descriptor, `[Verified]` address: No. 70, Unit 5, Zafar St, Tehran, Iran
2. **What We Supply** — both business lines, all categories
3. **Company & Capabilities** — About, Why ETA, Projects, Careers, Contact
4. **Get in touch** — Request a Quote, Become a Supplier, Portal, email, phone

Bottom bar: `© Exir Tejarat Atlas` · Privacy · Terms · Cookies · language switch
`[Content Required: commercial registration number]` — carries real legal weight with Iranian industrial buyers.

⚠️ The current live footer label **"CRM Portal"** must not be carried forward — there is no CRM in the target architecture (ADR-0016). Label: **Portal**.

### 0.3 Persistent RFQ affordance

| Viewport | Form |
|----------|------|
| ≥ 1024 px | Header button, always visible |
| < 1024 px | Sticky bottom bar, 56 px, full width, accent orange, above all content, never dismissible |

### 0.4 Language switch

Toggle, not a dropdown — there are exactly two languages. Switching preserves the current page (`/en/steel-products` ⇄ `/fa/steel-products`), never returns to Home. Choice persists in a first-party cookie. `<html lang dir>` updates; layout mirrors via CSS logical properties.

---

## 1. `home`

The single most important page. Its only job: **make a buyer believe ETA is serious, then move them to an RFQ.**

### 1.1 Hero — full viewport

| Property | Specification |
|----------|--------------|
| Height | `100dvh`, min 640 px, max 900 px |
| Background | Cinematic industrial video loop, muted, autoplay, 12–20 s, seamless |
| Poster | High-quality still, shown until video is buffered; the **only** thing shown on `prefers-reduced-motion` or connections below ~2 Mbps |
| Overlay | Petrol gradient, 45 % → 85 % opacity toward the bottom, ensuring ≥ 7:1 text contrast |
| Motion | Slow scale 1.0 → 1.06 over 20 s. No parallax on mobile. |

**Content**

```
        [ EN ]                                    [ FA ]

Precision in Supply.                     مهندسی تأمین
Confidence in Every Decision.            برای صنایع بزرگ
```

`[Verified: Company Profile page 01 + letterhead tagline]` — this is ETA's real, already-approved bilingual headline pairing. It is stronger than the brand system's "Engineering Intelligence. Enterprise Procurement. Powered by AI." for this audience: it names the buyer's actual anxiety (risk in a supply decision) rather than the seller's technology.

Sub-headline (≤ 30 words): project-based industrial procurement for heavy industry — equipment sourced internationally, steel sourced from Iranian mills. `[Verified: live About page + steel database]`

CTAs: **Request a Quote** (primary, orange) · **What We Supply** (secondary, ghost)

Scroll indicator: subtle, animated, disappears on first scroll.

### 1.2 Trust bar — immediately below hero, no scroll required on desktop

Four figures, `[Verified: live site statistics]`:

| 10+ | 50+ | 8 | 100% |
|---|---|---|---|
| Years | Manufacturers & suppliers | Product categories | Project-based |

Thin petrol band. Monospace numerals (JetBrains Mono) — technical, precise, deliberately not decorative.

### 1.3 The two business lines — **the most important section on the site**

Two full-bleed panels, 50/50 on desktop, stacked on mobile. Equal visual weight. **Never a single merged "Products" block.**

| | **Industrial Equipment** | **Steel Products** |
|---|---|---|
| Image | Rotating equipment / plant interior | Steel coils / rolling mill |
| Statement | Rotating, static, instrumentation, mechanical, chemicals & catalysts | HR, CR, galvanized, galvalume, PPGI/PPGL, tinplate, stainless |
| Sourcing line | International — Europe, China, UAE `[Verified]` | Iranian mills — Mobarakeh, Oxin, Hormozgan, and others `[Verified]` |
| CTA | Explore Equipment → | Explore Steel → |

Hover: image scales 1.04, overlay lightens, CTA arrow travels 4 px. 300 ms.

### 1.4 How ETA works — the procurement spine

Four steps, horizontal on desktop, vertical timeline on mobile:

**Technical Evaluation → Supplier Selection → Commercial & Documentation → Delivery & Inspection**

Each: outlined icon, title, one sentence. `[Verified: Company Profile page 04 — "سه تعهد اصلی"]`, extended with the documented inspection stage.

Scroll-triggered: steps reveal sequentially, 80 ms stagger, once only.

### 1.5 Trade terms — **ETA's strongest verifiable content**

Currently invisible on the live site. It answers the buyer's real question — *can they actually execute* — with facts rather than adjectives.

Four cards, all `[Verified: ETA Offer_Template.xlsx]`:

| Payment | Delivery | Warranty & Inspection | Documentation |
|---------|----------|----------------------|---------------|
| 30% advance + 70% before shipment, or **LC at sight** | **EXW · FOB · CIF · DDP · DAP** | **12 months** from delivery/commissioning · **FAT** inspection | Commercial Invoice · Packing List · **COO** · **COC** · Test Report |

Plus a highlighted strip: *Performance bonds and prepayment guarantees issued through a first-class SWIFT-enabled international bank.* `[Verified]`

Dark petrol background. Monospace for terms. Restrained, factual, no illustration.

### 1.6 Industries — horizontal scroll

Ten cards, snap-scrolling, keyboard and drag navigable. Each: full-bleed image, industry name, link. Not a grid — a grid of ten dilutes; a rail invites exploration.

### 1.7 Technical capability — the differentiator

Split section. Left: statement. Right: supporting visual.

> **ETA issues an unpriced Technical Offer separately from the Commercial Offer.**
> Technical compliance is agreed before price enters the conversation.

`[Verified: ETA Offer_Template.xlsx — two distinct sheets, TO-2025-0001 format]`

This is the single most credible thing ETA can say to an EPC engineer. It is documented practice, it is unusual to publish, and no competitor messaging currently uses it.

### 1.8 ETA Platform — restrained

One section, not a product pitch. Dark, technical, understated: the platform as an *extension of how ETA already works*, not as a software product. Links to `/platform`.

Deliberately placed **seventh**. Capability establishes credibility; software is the reason to prefer ETA once credibility exists. Reversing that order reads as a software company that also happens to trade — which contradicts the positioning.

### 1.9 Knowledge — three latest articles

Standard card grid. Links to `/knowledge`.

### 1.10 Conversion band — full width, before footer

Petrol → deeper petrol gradient, orange accent rule.

> **Send us your requirement.**
> Datasheets, drawings, specifications, or a bill of quantities. Our engineers review every enquiry.

**Request a Quote** (primary) · **Contact Us** (secondary)

### ⚠️ Deliberately absent from Home

- **Client logo bar** — no client references exist. A logo bar with placeholder or unauthorised logos is a legal and credibility risk.
- **Testimonials** — none exist.
- **Certification badges** — none documented.

Each becomes a specified section the moment the content exists. See `IMPLEMENTATION_ROADMAP.md` §5.

---

## 2. `business-line` — Industrial Equipment & Steel Products

Two instances, one template, **different content models**.

### 2.1 Common structure

1. **Hero** — 70 vh, full-bleed image (video optional), line name, one-sentence positioning, breadcrumb
2. **Positioning statement** — 2–3 sentences on how ETA operates *this specific line*
3. **Category grid** — 5 (equipment) or 6 (steel) cards, each with image, name, sub-types, link
4. **Sourcing model** — the section that differentiates the two lines
5. **How to enquire** — what to send, what happens next
6. **Conversion band** — line-specific RFQ CTA, pre-filled

### 2.2 Industrial Equipment — §4 content

**Sourcing:** international — Europe, China, UAE. Project-based, no warehouse inventory. `[Verified: live About page]`

Emphasise: technical evaluation, manufacturer matching, FAT, international logistics, documentation.
`[Content Required: named equipment OEMs]` — ⚠️ the largest content gap on the site.

### 2.3 Steel Products — §4 content

**Sourcing:** domestic Iranian mills. Named, `[Verified: Iran_Steel_Comprehensive_V2.xlsx, 19 worksheets]`:

Mobarakeh · Oxin · Hormozgan · Haft Almas · Taraz · Amir Kabir Kashan · Shahrekord · Khorasan

Rendered as a mill index with, per mill, the products and dimensional ranges available — verified data that exists today and is genuinely useful to a steel buyer.

Emphasise: grade and standard coverage, dimensional range, coating types, mill certification, domestic logistics and lead times.

---

## 3. `category` — equipment categories

1. Hero — 50 vh, category image, name, one-line scope
2. **Sub-types** — an honest list of what falls under this category
3. **Typical applications** — mapped to industries, cross-linked
4. **Standards & specifications** — the standards ETA works to. Monospace. This is where technical credibility is demonstrated.
5. **What to send with an enquiry** — datasheet, tag number, service conditions, quantity. Reduces RFQ friction *and* demonstrates competence.
6. **Related industries** — cross-links
7. Conversion band — pre-filled with this category

`[Content Required: sub-type lists and applicable standards per category]` — this is **technical content that must come from ETA's engineers**, not from a copywriter and not from a model. Getting a standard wrong on a public page is worse than omitting it.

---

## 4. `steel-category` — a genuinely different template

Steel is bought by **specification**, not by browsing. This template is a specification table first and a marketing page second.

1. Hero — 50 vh, product image, name
2. **Specification matrix** — the core of the page:

| Attribute | Range |
|-----------|-------|
| Thickness | `[from mill data]` |
| Width | `[from mill data]` |
| Length / coil | `[from mill data]` |
| Grades | `[from mill data]` |
| Standards | `[from mill data]` |
| Coating (where applicable) | `[from mill data]` |

Monospace, Latin numerals in both languages, horizontally scrollable on mobile in its own container — the page body never scrolls sideways.

3. **Available mills** — which of the eight supply this product `[Verified]`
4. **Applications** — cross-linked to industries
5. **Certification & testing** — mill test certificates, COC
6. **How steel enquiries work** — tonnage, dimensions, grade, destination
7. Conversion band → **Steel RFQ** (the steel branch, not the generic form)

The underlying data exists in `Iran_Steel_Comprehensive_V2.xlsx` and needs extraction and structuring — a data task, not a writing task.

---

## 5. `industry`

1. Hero — 60 vh, industry-specific imagery
2. **Understanding of the industry** — its procurement realities: turnaround windows, criticality, spares strategy
3. **What ETA supplies to this industry** — cross-linked to both business lines
4. **Typical procurement scenarios** — 3–4 concrete situations
5. **Relevant capabilities** — cross-linked
6. `[Content Required: projects in this industry]` — ⚠️ blocked
7. Conversion band — pre-filled with industry

Industry pages carry substantial SEO weight (`steel procurement`, `oil and gas procurement`). They must be genuinely written, not templated with a swapped noun — templated industry pages are transparent to both buyers and search engines.

---

## 6. `capability`

Shared by Procurement Services, Engineering & Technical Evaluation, Logistics, Quality & Inspection.

1. Hero — 50 vh
2. Capability statement
3. **What this means in practice** — process steps or numbered stages
4. **Verifiable specifics** — the trade-terms data, the technical-offer practice, the documentation set. `[Verified]`
5. Related capabilities
6. Conversion band

**Logistics** additionally renders the full Incoterms set with a short plain-language explanation of each — genuinely useful, SEO-valuable, and entirely verified.

**Quality & Inspection** renders the documentation set and FAT regime. `[Content Required: named third-party inspection partners]`

---

## 7. `manufacturers` ⚠️ BLOCKED

**Do not build until content exists.**

Planned: filterable grid by category, country, industry; per-brand detail pages with an RFQ CTA.

`[Content Required: the entire manufacturer list]` — an exhaustive search across the repository and knowledge base returned zero equipment OEM names. `03-PRODUCTS`, `04-SUPPLIERS`, `04_Products`, `05_Suppliers` are all empty.

**Interim:** omit from navigation entirely. A Manufacturers page listing no manufacturers actively damages the trust it exists to build.

**Note:** the eight steel mills *are* verified and are surfaced on the Steel Products line (§2.3) — that content is not blocked.

---

## 8. `projects` ⚠️ BLOCKED

**Do not build until content exists.**

Planned: filterable case-study grid; per-project detail with challenge, scope, execution, outcome.

`[Content Required: all project content]` — zero case studies exist.

Even three anonymised entries (*"Petrochemical complex, Khuzestan — 2024 — rotating equipment package"*) would materially close the credibility gap identified in `USER_JOURNEY.md` §5. Anonymisation is normal and expected in industrial procurement; absence is not.

---

## 9. `platform`

1. Hero — dark, technical, restrained. **No AI imagery, no neural-network motifs, no glowing brains.**
2. **What the platform is** — the customer's procurement workspace: RFQs, quotations, orders, invoices, documents, projects, in one place
3. **Customer workspace** — feature detail
4. **Supplier workspace** — feature detail
5. **How it connects** — extends ETA's existing systems, single source of record. ⚠️ Present as *capability*, never as a technical architecture diagram on a public page.
6. **AI assistance** — **one section, placed last, factual**. What it does for the user. No claims about being "AI-native", no adjectives.
7. CTA — Portal login for existing users; Request a Quote for everyone else

**Voice constraint.** The brand voice is explicitly *not buzzword driven*. The platform section must read as an operations tool built by a procurement company, not as a startup pitch. If a sentence would fit in a SaaS launch post, rewrite it.

⚠️ **Do not state a launch date or imply the platform is live** unless confirmed. Odoo does not yet have Purchase or CRM-equivalent apps installed (ADR-0015), and the portal it would replace is explicitly temporary.

---

## 10. `rfq` — **the most important interactive surface on the site**

### 10.1 Principles

1. Requirement before identity, without exception
2. No account, ever
3. Progress always visible
4. Upload is first-class
5. Recoverable — partial submissions still submit
6. Every submission returns a reference number

### 10.2 Step 1 — Scope

Three large cards: **Industrial Equipment** · **Steel Products** · **Mixed / not sure**

Pre-selected and skipped when arriving from a category page with a pre-fill parameter.

### 10.3 Step 2A — Equipment specification

| Field | Type | Required |
|-------|------|----------|
| Category | Select (5 categories) | ✅ |
| Sub-type | Select, dependent | — |
| Equipment tag / item number | Text | — |
| Service / application | Text | — |
| Quantity | Number | ✅ |
| Technical requirements | Textarea | — |
| Preferred manufacturer | Text | — |

### 10.4 Step 2B — Steel specification

A genuinely different form. Getting this right signals competence to a steel buyer more than any copy on the site.

| Field | Type | Required |
|-------|------|----------|
| Product type | Select (6 types) | ✅ |
| Grade | Text + autocomplete | ✅ |
| Standard | Select + free text (EN, ASTM, DIN, JIS, GB) | — |
| Thickness (mm) | Number, decimal | ✅ |
| Width (mm) | Number | ✅ |
| Length (mm) / coil | Number + unit toggle | — |
| Coating & weight | Conditional on type | — |
| Tonnage | Number | ✅ |
| Preferred mill | Select (8 mills) + "no preference" | — |

### 10.5 Step 3 — Documents

| Property | Specification |
|----------|--------------|
| Method | Drag-and-drop **and** file picker |
| Formats | PDF, XLSX/XLS/CSV, DWG/DXF, DOC/DOCX, JPG/PNG/TIFF, ZIP/RAR |
| Limits | 50 MB per file · 200 MB per submission · 20 files |
| Feedback | Per-file progress bar, name, size, type icon, remove control |
| Validation | Client-side type/size, **server-side content-type verification and virus scan** |
| Failure | Named, per file, with retry — never a generic "upload failed" |
| Resilience | Chunked upload with resume. Assume unreliable connections. |

Helper text states plainly: *"Datasheets, drawings, specifications, or a bill of quantities. Send what you have — our engineers will work with it."*

### 10.6 Step 4 — Commercial context

Delivery destination (country/city) · Preferred Incoterm (EXW/FOB/CIF/DDP/DAP `[Verified]`) · Required delivery date · Project name · Tender reference · Additional notes

Project name and tender reference are structured fields, not free text — they route the enquiry correctly and signal that ETA understands tender work.

### 10.7 Step 5 — Identity *(last)*

Company name ✅ · Contact name ✅ · Position · Email ✅ · Phone ✅ · Country ✅ · How you found us

Consent checkbox, unticked by default, plain language, linked to the privacy policy.

### 10.8 Submission & confirmation

**On submit:** validate → persist → generate `ETA-RFQ-YYYY-NNNN` → attach files → notify internally → email the submitter → render confirmation.

**Confirmation page** (`noindex`) shows: reference number (large, monospace, copyable), summary of what was submitted, list of attached files, stated response commitment `[Content Required: SLA]`, contact route for urgent matters, and a note that a copy has been emailed.

### 10.9 ⚠️ Backend integration — decisions required

Per ADR-0016/0017, Odoo is the single source of truth and the ETA Platform extends it. The RFQ must therefore land in Odoo. Three things are unresolved and **block implementation**:

| # | Question | Blocks |
|---|----------|--------|
| **B1** | Which Odoo model receives an inbound RFQ — `crm.lead`, a draft `sale.order`, or a custom model? Attachments to `ir.attachment`. | Backend build |
| **B2** | **Odoo has no Purchase, Sales, or CRM app installed** (ADR-0015). The target model does not exist yet. | Any integration |
| **B3** | Custom fields (`x_eta_rfq_ref` and related) must be added, following the `x_eta_*` convention established in ADR-0017. | Any integration |

**Interim, and acceptable for launch:** the RFQ persists to its own store and dispatches email notification, with Odoo integration added behind the same interface once B1–B3 are resolved. The port/adapter seam from ADR-0017 makes this swap a single adapter change — the form does not get rebuilt.

Fallback is mandatory regardless: **if the downstream system is unavailable, the RFQ must still be captured and the user must still receive a reference number.** Losing an enquiry because a backend was down is not an acceptable failure mode.

---

## 11. `contact`

Split layout. Left: contact routes. Right: short form.

`[Verified]`: No. 70, Unit 5, Zafar St, Tehran, Iran · CEO Ali Hejazi

⚠️ **Email conflict, must be resolved before launch:** operational documents use `info@exiratlas.com`; the live website uses `ai@exiratlas.com`. Publishing both, or the wrong one, costs enquiries. `[Decision Required]`

The form is deliberately short — anyone with a real requirement is routed to the RFQ. A prominent panel does exactly that: *"Have a requirement? Send it directly →"*

Map: optional, self-hosted tiles or a static image. **No Google Maps embed** — unreliable for the primary audience and a third-party dependency (IA §12).

---

## 12. `about`

1. Hero — 60 vh
2. **Who ETA is** — the sourcing-company identity, plainly stated. Not a technology company, not a manufacturer, not an EPC. `[Verified: mandate + live About page]`
3. **How ETA operates** — project-based, no warehouse inventory, two distinct business lines with opposite sourcing directions `[Verified]`
4. **Mission** — risk reduction in every supply decision `[Verified: Company Profile page 04]`
5. `[Content Required: founding year, timeline]`
6. **Leadership** — CEO Ali Hejazi `[Verified]`; `[Content Required: further leadership, engineering team]`
7. `[Content Required: certifications, registration]` ⚠️
8. Conversion band

**Voice constraint.** The approved `Company-Profile.md` (ETA-CP-001) opens by describing ETA as "an industrial procurement, engineering, and technology company" and makes its Vision an AI statement. This **conflicts with the standing positioning mandate** (sourcing company; not a technology company; AI last and minimal). The mandate governs the website copy. ETA-CP-001 is `status: Approved v1.0`, so reconciling it is a version bump and re-approval — flagged, not silently edited.

---

## 13. `why-eta`

Structured directly against the eight buyer questions (IA §2.1). Each section answers one, using only verified content. This page is where the trade terms, the separate technical offer, the mill network, and the project-based model are argued together as a single case.

---

## 14. `knowledge-hub`, `article`, `news`, `blog`, `careers`, `position`

Conventional patterns; no unusual requirements.

- **Article** — max 72 ch measure, sticky table of contents ≥ 1280 px, reading time, author, date, related articles, inline RFQ CTA at the end
- **Careers** — `[Content Required: positions]`; until any exist, a single open-application route rather than an empty listing
- **Knowledge Center** carries the primary SEO weight of the section. Priority topics, all defensible from existing expertise: steel grade selection, Incoterms in industrial procurement, what belongs in an equipment datasheet, FAT explained, LC vs. advance payment.

---

## 15. `search`

Instant results (200 ms debounce), grouped by entity type with counts, keyboard navigable (`↑ ↓ ⏎ Esc`), recent searches, curated empty state.

**Zero-result state must offer Request a Quote.** A buyer who searched for something ETA does not visibly list is still a qualified buyer.

---

## 16. `error-404`

Not a dead end. Search field, primary destinations (both business lines, industries, contact), and an RFQ CTA. Same visual quality as the rest of the site — error pages are seen by real buyers and are a legitimate trust signal.

---

## 17. Cross-cutting requirements

| Requirement | Specification |
|-------------|--------------|
| **Accessibility** | WCAG 2.2 AA. Full keyboard operation, visible focus, semantic landmarks, correct heading order, alt text on every image, `prefers-reduced-motion` honoured everywhere. |
| **Performance** | LCP < 2.5 s · INP < 200 ms · CLS < 0.1 — measured **on a constrained connection**, not on a fast one. |
| **Images** | AVIF with WebP fallback, responsive `srcset`, explicit dimensions, lazy below the fold, hero preloaded. |
| **Video** | Self-hosted. ≤ 3 MB hero loops. Poster always present. Never autoplay on metered or reduced-motion. |
| **Forms** | Server-side validation always. Inline, specific errors. Never lose entered data on error. |
| **RTL** | CSS logical properties throughout. Never mirror logo, technical drawings, product photography, or time-axis charts. |
| **Numerals** | Persian digits in prose; Latin digits always for grades, standards, dimensions, part numbers. |
| **Print** | Product, capability, and specification pages must print cleanly — buyers print specs for tender files. |
| **No third-party CDN** | Fonts, icons, scripts, styles, analytics all self-hosted (IA §12). |

---

*Next: `DESIGN_SYSTEM.md` — tokens, typography, colour, motion, components.*
