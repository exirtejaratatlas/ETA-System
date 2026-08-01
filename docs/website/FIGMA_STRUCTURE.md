---
document_id: ETA-WEB-FIG-006
title: Figma Structure & Design Handoff
version: 0.1
status: Draft — awaiting approval
owner: Exir Tejarat Atlas
classification: Internal
last_updated: 2026-07-27
---

# ETA Digital Headquarters — Figma Structure

How the design files are organised, what lives where, and how design reaches development without translation loss.

---

## 1. Organisation

```
ETA (Organisation)
└── ETA Digital Headquarters (Project)
    ├── 📚 ETA Foundations          [LIBRARY — published]
    ├── 📚 ETA Web Components       [LIBRARY — published]
    ├── 🎨 ETA Web — Design         [working file]
    ├── 🧩 ETA Web — Prototypes     [working file]
    └── 🗂 ETA Web — Assets          [working file]
```

**Two published libraries, three working files.** Libraries are consumed, never edited in place. This separation is what keeps the Company Profile, the website, and the future ETA Platform on one visual system instead of three that drift.

---

## 2. 📚 ETA Foundations *(library)*

The token layer. Consumed by every other ETA surface, not just the website.

| Page | Contents |
|------|----------|
| **00 · Cover** | Version, owner, changelog, approval status |
| **01 · Colour** | All variables from `DESIGN_SYSTEM.md` §2, with the contrast matrix (§2.5) rendered as a visible grid |
| **02 · Typography** | Full scale, both languages, Latin + Persian styles side by side |
| **03 · Spacing & Grid** | Spacing scale, six responsive grids |
| **04 · Elevation** | Five surface levels, glass, radius scale |
| **05 · Motion** | Documented durations and easing curves with animated examples |
| **06 · Iconography** | Complete outlined set, 24 px grid |
| **07 · Logo** | All lockups, clear space, minimum sizes, prohibited usage |

### 2.1 Variables

Figma variables map **1:1** to the CSS custom properties in `DESIGN_SYSTEM.md` §12. Identical names, no aliases, no renaming.

```
eta/ink · eta/petrol-900 … eta/petrol-600 · eta/teal
eta/orange · eta/orange-mid · eta/amber · eta/rust
surface/0 … surface/4 · border/subtle · border/strong
paper · shell · line · body-ink · muted-ink
```

**Collections and modes**

| Collection | Modes | Purpose |
|-----------|-------|---------|
| `Theme` | Dark · Light | Drives §10 section strategy |
| `Language` | EN · FA | Swaps the type family and applies the Persian optical correction (`DESIGN_SYSTEM.md` §3.2) |
| `Breakpoint` | xs · sm · md · lg · xl · 2xl | Drives responsive spacing tokens |

The Language mode is what makes RTL reviewable rather than imagined. Toggling a frame from EN to FA must produce the actual Persian layout — same components, mirrored, with Vazirmatn and the size adjustment applied.

### 2.2 Text styles

Named to match the tokens exactly:

```
EN/Hero · EN/Display · EN/H1 … EN/H4
EN/Body-LG · EN/Body · EN/SM · EN/Caption · EN/Label
FA/Hero · FA/Display · FA/H1 … FA/H4
FA/Body-LG · FA/Body · FA/SM · FA/Caption · FA/Label
Mono/Spec · Mono/Reference · Mono/Data
```

FA styles carry Vazirmatn, RTL alignment, and the 1.05 size / 1.15 line-height adjustment baked in.

---

## 3. 📚 ETA Web Components *(library)*

| Page | Components |
|------|-----------|
| **00 · Cover** | Inventory, status, changelog |
| **01 · Buttons** | Primary / Secondary / Tertiary × sm/md/lg × dark/light × default/hover/focus/active/disabled/loading |
| **02 · Forms** | Input, textarea, select, checkbox, radio, toggle, file field, **upload dropzone (all 5 states)** |
| **03 · Navigation** | Header (transparent + solid), mega-menu, mobile overlay, breadcrumb, pagination, sticky RFQ bar |
| **04 · Cards** | Product, category, industry, manufacturer, project, article, capability |
| **05 · Sections** | Hero, trust bar, business-line split, process steps, trade-terms grid, conversion band |
| **06 · Data** | Spec table, mill index, comparison table, stat block |
| **07 · Feedback** | Toast, inline error, empty state, loading skeleton, zero-result state |
| **08 · Overlays** | Modal, drawer, tooltip, language switch, search overlay |
| **09 · Footer** | Full footer, mobile footer |

### 3.1 Component rules

1. **Every interactive component ships all states**, including `focus-visible`. A component without a documented focus state is incomplete — the amber ring (`DESIGN_SYSTEM.md` §9.1) must be visible in the file, not assumed.
2. **Auto-layout everywhere.** No absolute positioning outside deliberate overlays.
3. **Variants over duplicates.** One Button component with properties, never eleven button components.
4. **Component properties** for all swappable content — text, icon, boolean visibility.
5. **Tokens only.** No raw hex, no detached values. A detached colour is a bug.
6. **Named for developers**, matching the code component name exactly — `Button`, not `btn / final / v3`.
7. **RTL-verified.** Every component is checked in FA mode before publication.

---

## 4. 🎨 ETA Web — Design *(working file)*

Where pages are composed. Consumes both libraries; defines nothing new.

| Page | Contents |
|------|----------|
| **00 · Cover** | Status, approval state, open questions |
| **01 · Wireframes** | Low-fidelity structure for all 26 templates — approved before any visual work |
| **02 · Home** | Desktop, tablet, mobile · EN and FA |
| **03 · What We Supply** | Supply hub, both business lines, all 11 category pages |
| **04 · Industries** | Hub + industry template + 2 fully designed examples |
| **05 · Capabilities** | Hub + capability template + Logistics and Quality fully designed |
| **06 · ETA Platform** | Overview + both workspace pages |
| **07 · RFQ** | ⚠️ **Every step, every state, both branches, both languages** — see §4.1 |
| **08 · Company** | About, Why ETA, Contact, Careers |
| **09 · Knowledge** | Hub, article, news, blog |
| **10 · Search** | Overlay, results, empty, zero-result |
| **11 · System pages** | 404, 500, legal |
| **12 · ⚠️ Blocked** | Manufacturers, Projects — structure only, watermarked `CONTENT REQUIRED` |

### 4.1 The RFQ page deserves its own file section

It is the site's conversion mechanism and the most state-heavy surface in the project. It must be designed exhaustively, not sketched:

- Step 1 scope selection — 3 options, plus the pre-filled arrival variant
- Step 2A equipment — empty, partial, complete, error
- Step 2B steel — empty, partial, complete, error
- Step 3 upload — **idle, drag-over, uploading, complete, error, mixed** (some files succeeded, some failed)
- Step 4 commercial context
- Step 5 identity
- Confirmation with reference number
- Every step at mobile, tablet, desktop
- Every step in Persian RTL

That is roughly 60 frames. Under-designing this page is the most likely cause of a weak build.

### 4.2 Frame naming

```
[Section] / [Page] / [Breakpoint] / [Language] / [State]

Home / Landing / Desktop / EN / Default
RFQ / Step-3-Upload / Mobile / FA / Error
Steel / Hot-Rolled / Tablet / EN / Default
```

### 4.3 Breakpoints in file

| Name | Width |
|------|-------|
| Mobile | 390 |
| Tablet | 768 |
| Desktop | 1440 |
| Wide | 1920 *(hero and full-bleed sections only)* |

---

## 5. 🧩 ETA Web — Prototypes

Separated from the design file — prototype wiring makes design files slow and hard to review.

| Flow | Purpose |
|------|---------|
| **P1 · Urgent RFQ** | Home → category → RFQ → confirmation. The primary flow. |
| **P2 · EPC evaluation** | Home → industry → capability → technical evaluation → RFQ with large upload |
| **P3 · Steel enquiry** | Home → steel line → category → steel RFQ, with spec fields |
| **P4 · Supplier** | Home → become a supplier → registration |
| **P5 · Persian journey** | P1 repeated entirely in FA/RTL |
| **P6 · Mobile** | P1 at 390 px, including the sticky RFQ bar |

Each maps to a journey in `USER_JOURNEY.md`. Smart-animate at the documented durations so the prototype communicates the real motion, not Figma defaults.

---

## 6. 🗂 ETA Web — Assets

| Page | Contents |
|------|----------|
| **01 · Photography** | Approved library, categorised by industry and section, with the applied treatment |
| **02 · Video** | Hero loops with poster frames |
| **03 · Illustration** | Technical diagrams, process illustrations |
| **04 · Logo** | Source lockups (mirrors `Logo.svg`, `mark.svg`, `type.svg`) |
| **05 · OG images** | Social cards per template |
| **06 · Export presets** | Documented settings for every asset type |

⚠️ **Pages 01–03 are empty.** No industrial photography, video, or illustration exists (`DESIGN_SYSTEM.md` §7.4). This file cannot be populated before the commission lands, and the design file cannot be finished without it.

**Working method until then:** design with clearly watermarked placeholders sized and cropped to final specification. Never design against temporary stock that will not be licensed — compositions built around an image that is later swapped almost always break.

---

## 7. Handoff to development

### 7.1 Token pipeline

```
Figma Variables  →  design tokens (JSON)  →  platform/design-system  →  CSS custom properties
```

`platform/design-system` is the frozen-architecture home for brand tokens in code (ADR-0001) and is currently an empty stub. Populating it from `DESIGN_SYSTEM.md` §12 is the correct first implementation task: the website, the portal, and future ETA Platform surfaces then consume one token set rather than three copies that diverge.

**Figma is the source of truth for token *values*. The repository is the source of truth for token *usage*.**

### 7.2 Definition of ready — per template

A template is ready for development when **all** of these hold:

- [ ] Designed at mobile, tablet, and desktop
- [ ] Designed in **both** EN and FA, with FA verified as a real RTL composition
- [ ] Every interactive element shows default, hover, focus, active, disabled
- [ ] Empty, loading, and error states designed where applicable
- [ ] Every colour, type, and spacing value is a token — **zero detached values**
- [ ] Contrast verified against `DESIGN_SYSTEM.md` §2.5
- [ ] Motion annotated with duration and easing tokens
- [ ] `[Content Required]` placeholders visibly marked, never filled with plausible text
- [ ] Image crop ratios and export specifications stated
- [ ] Accessibility annotations present: heading order, landmarks, alt text intent, focus order

### 7.3 Annotation layer

A dedicated `📋 Annotations` layer per template carrying:

- Semantic HTML intent (`<section>`, `<article>`, `<nav>`, heading levels)
- ARIA requirements for custom components
- Focus order where it differs from DOM order
- Responsive behaviour notes ("this rail becomes a stack below `md`")
- Content constraints (max characters, truncation rules)
- Loading strategy (priority, lazy, preload)

### 7.4 Naming parity with code

| Figma component | Code component |
|----------------|----------------|
| `Button` | `<Button>` |
| `Card / Product` | `<ProductCard>` |
| `Section / Hero` | `<Hero>` |
| `Form / Upload Dropzone` | `<UploadDropzone>` |
| `Table / Spec` | `<SpecTable>` |

A rename in one is a rename in both, in the same change.

---

## 8. Review gates

| Gate | Deliverable | Approver | Blocks |
|------|------------|----------|--------|
| **G1** | Wireframes — all 26 templates | Business owner | Visual design |
| **G2** | Foundations library published | Brand owner | Component library |
| **G3** | Component library published | Design + engineering | Page design |
| **G4** | Home, both languages, three breakpoints | Business owner | Remaining pages |
| **G5** | RFQ — complete, all states | Business + engineering | **Development start** |
| **G6** | All unblocked templates | Business owner | Full build |
| **G7** | Prototype walkthrough, all six flows | Business owner | Launch approval |

**G5 is the critical gate.** The RFQ is the conversion mechanism; development should not begin on it until every state is designed and approved.

---

## 9. Version control

| Practice | Rule |
|----------|------|
| Branching | Figma branches for exploration; `main` is always the approved state |
| Version marks | Named at every gate: `G4 — Home approved 2026-XX-XX` |
| Library publishing | Semantic notes; breaking changes announced before publication |
| Changelog | Maintained on each library's cover page |
| Archive | Superseded designs moved to an `_Archive` page, never deleted — the ADR discipline applies to design too |

---

## 10. Access

| Role | Foundations | Components | Design | Prototypes | Assets |
|------|------------|-----------|--------|-----------|--------|
| Brand owner | Edit | Edit | Edit | Edit | Edit |
| Designer | Edit | Edit | Edit | Edit | Edit |
| Engineering | View + inspect | View + inspect | View + inspect | View | View |
| Business owner | View | View | **Comment** | **Comment** | View |
| External | — | — | Comment (link, expiring) | Comment | — |

Business-owner comment access on the design and prototype files is deliberate — approval gates require a written trail on the artefact itself, not in a separate thread.

---

*Next: `IMPLEMENTATION_ROADMAP.md` — phasing, gates, and what must be resolved before development begins.*
