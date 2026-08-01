---
document_id: ETA-WEB-DS-005
title: Website Design System — Dark Luxury Industrial
version: 0.1
status: Draft — awaiting approval
owner: Exir Tejarat Atlas
classification: Internal
supersedes: ETA-VISUAL-001 (Colors.md) — pending approval, see §2.1
inherits: ETA-VISUAL-002 (Typography.md)
last_updated: 2026-07-27
---

# ETA Digital Headquarters — Design System

**Dark Luxury Industrial.** Deep petrol green, molten orange, cinematic photography, restrained motion, engineering-grade typography.

---

## 1. Design principles

1. **Restraint is the luxury signal.** Rolls-Royce and Stripe are premium because of what they omit. Every gradient, shadow, and animation must justify itself.
2. **Photography carries the emotion; the interface carries the information.** The UI never competes with the image.
3. **Specificity over adjectives.** `LC at sight` in monospace beats "world-class quality" in a display face. The typography system exists to make facts look precise.
4. **Dark by default, but never murky.** Deep petrol, not black. Black is cheap; petrol is engineered.
5. **Motion describes physics, not personality.** Heavy things move slowly and settle. Nothing bounces.
6. **Persian is designed, not translated.** The RTL layout is a first-class composition.

---

## 2. Colour

### 2.1 Source of truth ⚠️

**These tokens are extracted directly from the official `Logo.svg`.** They are not an interpretation.

This **supersedes `Colors.md` (ETA-VISUAL-001, Approved v1.0)**, which specifies Navy `#0F172A` and Copper `#C57B39`. Neither value appears anywhere in the official logo. The most recent approved artifact — the Company Profile of 2026-07-25 — had already abandoned Colors.md and tokenised the logo palette; this system uses the identical values, so the profile and the website will match exactly.

Since ETA-VISUAL-001 is `status: Approved v1.0`, superseding it is a **version bump requiring brand-owner approval** (Decision D4), not a silent edit.

### 2.2 Core palette — from the logo

| Token | Hex | Role |
|-------|-----|------|
| `--eta-ink` | `#021F21` | Deepest ground. Page background, dark sections. |
| `--eta-petrol-900` | `#022022` | Primary dark surface |
| `--eta-petrol-800` | `#023D3C` | Raised surface, cards on dark |
| `--eta-petrol-700` | `#04403F` | **Primary brand green** |
| `--eta-petrol-600` | `#085857` | Hover, borders on dark |
| `--eta-teal` | `#28A09A` | Secondary accent, links on dark, data highlight |
| `--eta-orange` | `#FF7001` | **Primary action.** The RFQ colour. |
| `--eta-orange-mid` | `#FD9802` | Gradient mid-stop only |
| `--eta-amber` | `#FEA808` | Emphasis, active states, focus ring |
| `--eta-rust` | `#932402` | **Orange for text on light surfaces** (see §2.5) |

### 2.3 Extended dark scale

Derived by interpolation for surface layering. Never sampled from anywhere else.

| Token | Hex | Use |
|-------|-----|-----|
| `--surface-0` | `#010E0F` | Deepest — full-bleed video overlay base |
| `--surface-1` | `#021F21` | Page background |
| `--surface-2` | `#02292A` | Section alternation |
| `--surface-3` | `#023D3C` | Cards, panels |
| `--surface-4` | `#04403F` | Raised / hover |
| `--border-subtle` | `rgba(40,160,154,0.14)` | Hairlines on dark |
| `--border-strong` | `rgba(40,160,154,0.28)` | Card borders, dividers |

### 2.4 Light surfaces

Carried forward unchanged from the approved Company Profile tokens.

| Token | Hex | Use |
|-------|-----|-----|
| `--paper` | `#FFFFFF` | Light sections, article bodies |
| `--shell` | `#F6F5F2` | Warm off-white — light section background |
| `--line` | `#E4E2DD` | Borders on light |
| `--line-soft` | `#EFEEEA` | Subtle dividers |
| `--body-ink` | `#4A5654` | Body text on light |
| `--muted-ink` | `#7C8886` | Secondary text on light |

`--shell` is deliberately warm rather than cool grey. It stops light sections reading as generic SaaS and keeps them consistent with the printed Company Profile.

### 2.5 Contrast — verified, not assumed

Computed against WCAG 2.2 relative luminance.

| Foreground | Background | Ratio | Verdict |
|-----------|-----------|-------|---------|
| `#FFFFFF` | `--surface-1` `#021F21` | **17.0 : 1** | ✅ AAA |
| `--eta-amber` `#FEA808` | `--surface-1` | **8.8 : 1** | ✅ AAA |
| `--eta-orange` `#FF7001` | `--surface-1` | **6.1 : 1** | ✅ AA all sizes |
| `--eta-teal` `#28A09A` | `--surface-1` | **5.3 : 1** | ✅ AA all sizes |
| `--body-ink` `#4A5654` | `--paper` | **7.6 : 1** | ✅ AAA |
| `--eta-rust` `#932402` | `--paper` | **8.4 : 1** | ✅ AAA |
| ⚠️ `--eta-orange` `#FF7001` | `--paper` `#FFFFFF` | **2.8 : 1** | ❌ **FAILS** |

> **Hard rule.** `--eta-orange` is never used as text on a light background. On light surfaces, orange text is `--eta-rust` (`#932402`, 8.4 : 1).
>
> Orange remains correct for **buttons on light surfaces** — white text on an orange fill is the accessible direction, and the fill itself is a non-text UI component meeting the 3:1 requirement.

### 2.6 Semantic colours

Chosen to sit inside the brand rather than importing a generic set.

| Token | Hex | Use |
|-------|-----|-----|
| `--success` | `#2E9E6B` | Upload complete, submitted |
| `--warning` | `#FEA808` | Reuses brand amber |
| `--error` | `#D6431F` | Validation, failure |
| `--info` | `#28A09A` | Reuses brand teal |

### 2.7 Usage ratio

| Proportion | Colour |
|-----------|--------|
| **70 %** | Petrol / ink surfaces and photography |
| **20 %** | White, shell, neutral text |
| **10 %** | Orange, amber, teal accents |

Orange is the RFQ colour. Diluting it across decorative elements diminishes the one action the site exists to drive. **One primary orange button per viewport.**

### 2.8 Gradients

Two only. No others.

```css
--grad-hero: linear-gradient(180deg,
  rgba(2,31,33,0.35) 0%, rgba(2,31,33,0.55) 45%, rgba(2,31,33,0.92) 100%);

--grad-accent: linear-gradient(96deg, #FF7001 0%, #FD9802 55%, #FEA808 100%);
```

`--grad-hero` guarantees text contrast over any photograph. `--grad-accent` is reserved for rules, underlines, and rare emphasis — **never** for button fills or large areas. Flat orange reads as premium; gradient orange reads as a template.

---

## 3. Typography

Inherits `ETA-VISUAL-002` (Approved). Extended for the dark cinematic context.

### 3.1 Families — all self-hosted

| Role | Family | Weights | Notes |
|------|--------|---------|-------|
| Latin | **Inter** | 400, 500, 600, 700 | Variable, subset to Latin + Latin-Ext |
| Persian | **Vazirmatn** | 400, 500, 600, 700 | Variable, subset to Arabic + Arabic-Ext |
| Mono | **JetBrains Mono** | 400, 500, 700 | Specs, grades, dimensions, reference numbers |

`woff2`, `font-display: swap`, self-hosted with same-origin preload. **No Google Fonts** — unreliable for the primary audience (IA §12).

```css
--font-latin: 'Inter', system-ui, sans-serif;
--font-persian: 'Vazirmatn', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### 3.2 Persian optical correction

Vazirmatn renders optically smaller than Inter at an identical `font-size`. Setting both to `16px` makes Persian body text measurably harder to read.

```css
:root[lang="fa"] {
  --font-scale-adjust: 1.05;   /* body */
  --line-height-adjust: 1.15;  /* Persian needs more leading for diacritics + descenders */
}
```

Applied to body and UI text. **Display sizes are not adjusted** — large Persian headlines are already balanced, and scaling them breaks the composition.

### 3.3 Scale — fluid

`clamp()` between mobile minimum and desktop maximum. No breakpoint jumps.

| Token | Min → Max | Line height | Tracking | Weight |
|-------|-----------|-------------|----------|--------|
| `--text-hero` | 44 → 92 px | 1.02 | −0.03em | 700 |
| `--text-display` | 36 → 64 px | 1.06 | −0.025em | 700 |
| `--text-h1` | 30 → 48 px | 1.12 | −0.02em | 600 |
| `--text-h2` | 26 → 36 px | 1.18 | −0.015em | 600 |
| `--text-h3` | 21 → 26 px | 1.28 | −0.01em | 600 |
| `--text-h4` | 18 → 20 px | 1.36 | 0 | 600 |
| `--text-body-lg` | 17 → 19 px | 1.62 | 0 | 400 |
| `--text-body` | 16 → 16 px | 1.65 | 0 | 400 |
| `--text-sm` | 14 → 14 px | 1.55 | 0 | 400 |
| `--text-caption` | 12 → 13 px | 1.45 | +0.02em | 500 |
| `--text-label` | 11 → 12 px | 1.3 | **+0.14em** | 600, uppercase |

`--text-label` — wide-tracked, uppercase, usually teal or amber — is the system's signature detail. It labels sections the way a technical drawing labels a component, and it does more for the industrial character than any decorative element would.

### 3.4 Measure

| Context | Max width |
|---------|-----------|
| Body prose | 72 ch |
| Article body | 68 ch |
| Hero sub-headline | 54 ch |
| Card text | 42 ch |

### 3.5 Numerals

```css
.spec, .reference, .dimension { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
```

**Latin digits always** for grades, standards, dimensions, part numbers, and reference numbers — in both languages. `S235JR`, `12×1500×6000`, and `ETA-RFQ-2026-0001` are never localised into Persian digits. Persian digits are used in body prose only.

---

## 4. Spacing & layout

### 4.1 Scale — 4 px base

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 224`

### 4.2 Grid

| Breakpoint | Width | Columns | Gutter | Margin |
|-----------|-------|---------|--------|--------|
| `xs` < 640 | fluid | 4 | 16 | 20 |
| `sm` ≥ 640 | fluid | 8 | 20 | 32 |
| `md` ≥ 768 | fluid | 12 | 24 | 40 |
| `lg` ≥ 1024 | fluid | 12 | 24 | 56 |
| `xl` ≥ 1280 | 1200 | 12 | 32 | auto |
| `2xl` ≥ 1536 | 1360 | 12 | 32 | auto |

Content max 1360 px. Full-bleed sections escape the container; their *text* never does.

### 4.3 Section rhythm

| Density | Padding block |
|---------|--------------|
| Compact | 64 → 80 px |
| Standard | 96 → 128 px |
| Generous | 128 → 200 px |

Generous spacing is the primary premium signal. When a section feels wrong, it is almost always too tight rather than too loose.

### 4.4 RTL

All layout uses logical properties — `margin-inline-start`, `padding-inline-end`, `border-inline-start`, `inset-inline`. Physical `left`/`right` are prohibited in layout code.

**Never mirrored:** the logo, technical drawings, product photography, charts with a time axis, and code or standard designations.

---

## 5. Elevation & surface

Dark interfaces read depth from **surface lightness first, shadow second**.

| Level | Surface | Border | Shadow |
|-------|---------|--------|--------|
| 0 | `--surface-1` | — | none |
| 1 | `--surface-2` | `--border-subtle` | `0 1px 2px rgba(0,0,0,0.30)` |
| 2 | `--surface-3` | `--border-subtle` | `0 4px 16px rgba(0,0,0,0.36)` |
| 3 | `--surface-3` | `--border-strong` | `0 12px 32px rgba(0,0,0,0.44)` |
| 4 | `--surface-4` | `--border-strong` | `0 24px 64px rgba(0,0,0,0.52)` |

### 5.1 Glass

Used sparingly: the scrolled header, hero-overlay cards, and modal backdrops. Nowhere else.

```css
.glass {
  background: rgba(2,41,42,0.62);
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(40,160,154,0.16);
}
```

Requires a solid `@supports not (backdrop-filter: blur(1px))` fallback — glass must never compromise legibility.

### 5.2 Radius

| Token | Value | Use |
|-------|-------|-----|
| `--r-sm` | 4 px | Inputs, badges, small controls |
| `--r-md` | 8 px | Buttons, cards |
| `--r-lg` | 12 px | Panels, modals |
| `--r-xl` | 20 px | Feature panels |
| `--r-full` | 999 px | Pills, avatars |

Restrained by intent. Heavily rounded corners read as consumer software; industrial buyers read near-square as engineered.

---

## 6. Motion

### 6.1 Physics

Heavy things move slowly and settle. Nothing bounces, nothing overshoots, nothing springs.

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| `--m-instant` | 100 ms | `ease-out` | Hover colour |
| `--m-fast` | 180 ms | `cubic-bezier(0.4,0,0.2,1)` | Buttons, small state |
| `--m-base` | 300 ms | `cubic-bezier(0.4,0,0.2,1)` | Cards, panels |
| `--m-slow` | 480 ms | `cubic-bezier(0.16,1,0.3,1)` | Section reveals |
| `--m-cinematic` | 900 ms | `cubic-bezier(0.16,1,0.3,1)` | Hero, page transitions |
| `--m-ambient` | 20 s | `linear` | Hero background drift |

### 6.2 Patterns

| Pattern | Behaviour |
|---------|-----------|
| **Scroll reveal** | `opacity 0→1`, `translateY 24px→0`, `--m-slow`. Fires once, at 15 % visibility. Never re-animates. |
| **Stagger** | 80 ms between siblings, capped at 6 — beyond that it reads as slow, not choreographed. |
| **Hero drift** | Background scales 1.0 → 1.06 over 20 s. Desktop only. |
| **Parallax** | Maximum 12 % differential. **Disabled below 1024 px and under reduced-motion.** |
| **Card hover** | `translateY(-4px)`, image `scale(1.04)`, border brightens. `--m-base`. |
| **Button hover** | Background lightens 6 %, no movement. Actions do not drift. |
| **Counters** | Animate once on first view, 1200 ms, ease-out. |

### 6.3 Reduced motion — non-negotiable

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  video[autoplay] { display: none; }        /* poster image shown instead */
  .parallax { transform: none !important; }
}
```

Every scroll-revealed element must be **fully visible and readable with JavaScript disabled**. Content that only exists after an animation does not exist.

---

## 7. Photography & video

### 7.1 Photography direction

| | |
|---|---|
| **Subject** | Refineries, steel mills, coil yards, rotating equipment, control rooms, inspection, ports, cranes, containers, warehouses |
| **Time of day** | Blue hour and night. Artificial light against a deep sky — this is where the petrol palette lives naturally. |
| **Colour** | Cool ambient, warm point sources. Orange sodium and process lighting are the brand accent occurring in reality. |
| **Composition** | Wide, symmetrical or strongly linear. Large negative space for typography. Clear focal point. |
| **Scale** | Human figures for scale where possible, never posed. |
| **Treatment** | Slight desaturation, lifted shadows toward petrol, protected highlights. Consistent LUT across the library. |

**Never:** posed corporate handshakes, artificial smiles, oversaturated stock, busy compositions, generic "technology" abstracts, glowing-brain AI imagery.

### 7.2 The blue-hour rule

The petrol palette and blue-hour industrial photography share a colour temperature. Shooting or selecting at blue hour means the interface and the imagery become one continuous surface rather than photographs pasted into a layout. This single decision does more for the cinematic quality than any effect.

### 7.3 Video

| Property | Spec |
|----------|------|
| Duration | 12–20 s, seamless loop |
| Encoding | AV1 primary, H.264 fallback, ≤ **3 MB** hero |
| Audio | None — track stripped, not muted |
| Poster | Always present, AVIF, first-frame match |
| Loading | Poster first; video only after LCP, on a connection above ~2 Mbps |
| Hosting | **Self-hosted.** No YouTube or Vimeo (IA §12). |
| Motion | Slow — drifting steam, a turning shaft, a travelling crane. Never fast cuts. |

### 7.4 ⚠️ Asset status

**No industrial photography or video exists in any form.** The Colors, Fonts, Icons, Images, and Videos asset folders are empty; `Brandbook.md` is a 0-byte placeholder. Only the nine-file logo family is produced.

The entire visual concept is blocked on a photography and video commission. See `IMPLEMENTATION_ROADMAP.md` §5 — this is the **single longest-lead item in the project** and must start before development, not after.

---

## 8. Iconography

Outlined, 1.5 px stroke, 24 px grid, rounded caps. Minimal and technical — closer to a P&ID symbol than to a consumer icon set.

Matches the icon language already approved in the Company Profile (page 04). Self-hosted SVG sprite; no icon-font, no CDN.

---

## 9. Components

### 9.1 Buttons

| Variant | Dark surface | Light surface |
|---------|-------------|---------------|
| **Primary** | Fill `--eta-orange`, text `--eta-ink`, no shadow | Fill `--eta-orange`, text `#FFFFFF` |
| **Secondary** | Transparent, 1px `--border-strong`, text white | Transparent, 1px `--line`, text `--eta-petrol-700` |
| **Tertiary** | Text only, teal, underline on hover | Text only, `--eta-rust`, underline on hover |

Heights: `sm 36` · `md 44` · `lg 52` px. Inline padding = 2 × block padding. Minimum touch target 44 × 44 px.

**Focus ring — global, non-negotiable:**
```css
outline: 2px solid var(--eta-amber);
outline-offset: 2px;
```
Amber at 8.8 : 1 on dark is the most visible brand-consistent focus indicator available.

### 9.2 Cards

Surface level 2, radius `--r-md`, image top with `aspect-ratio` locked to prevent layout shift, `--text-label` category, `--text-h4` title, `--text-sm` description, tertiary CTA.

Hover: elevation 2 → 3, `translateY(-4px)`, image `scale(1.04)`.

### 9.3 Forms

| Element | Spec |
|---------|------|
| Input | 48 px, surface level 1, 1px `--border-subtle`, radius `--r-sm` |
| Focus | Border `--eta-teal` + amber focus ring |
| Label | Above the field, always. Never placeholder-only. |
| Error | `--error` border, icon, and **specific** message below |
| Required | Explicit asterisk plus `aria-required` |
| Help | `--text-caption`, `--muted-ink`, below the field |

### 9.4 Upload dropzone — the RFQ's critical component

| State | Appearance |
|-------|-----------|
| Idle | Dashed 2px `--border-strong`, radius `--r-lg`, centred icon + instruction, min 200 px |
| Drag-over | Border `--eta-amber`, background lightens, subtle scale 1.01 |
| Uploading | Per-file row: icon, name, size, progress bar (`--grad-accent`), cancel |
| Complete | `--success` check, file listed, remove control |
| Error | `--error` border, **named** reason, retry — never a generic failure message |

### 9.5 Spec table

For steel dimensions and equipment specifications.

Monospace, `tabular-nums`, zebra striping at 3 % white, sticky header, **wrapped in its own `overflow-x: auto` container** so the page body never scrolls horizontally on mobile. LTR-locked even in Persian layout — dimension tables read left-to-right in both languages.

---

## 10. Dark / light section strategy

The site is dark by default, with light sections used deliberately:

| Content | Surface |
|---------|---------|
| Hero, business lines, trade terms, platform, conversion bands | **Dark** |
| Article bodies, specification tables, forms, legal | **Light** (`--shell` / `--paper`) |

Rationale: dark surfaces carry photography and emotion; light surfaces carry sustained reading and dense data. Long technical tables on a dark background fatigue the eye. Transitions between the two are full-bleed and abrupt — never a gradient fade, which reads as unresolved.

---

## 11. Performance budget

| Metric | Budget |
|--------|--------|
| LCP | **< 2.5 s** on a constrained connection |
| INP | < 200 ms |
| CLS | < 0.1 |
| Total JS (initial) | < 180 KB gzipped |
| Total CSS | < 60 KB gzipped |
| Hero image | < 200 KB AVIF |
| Hero video | < 3 MB |
| Fonts | < 120 KB total, subset, self-hosted, preloaded |
| Third-party requests | **0** |

That last line is a hard constraint, not an aspiration. Every third-party request is a potential total failure for the primary audience (IA §12).

---

## 12. Token implementation

Shipped as CSS custom properties on `:root`, generated from a single source file so the site, the Company Profile, and `platform/design-system` cannot drift.

```css
:root {
  --eta-ink: #021F21;
  --eta-petrol-900: #022022;
  --eta-petrol-800: #023D3C;
  --eta-petrol-700: #04403F;
  --eta-petrol-600: #085857;
  --eta-teal: #28A09A;
  --eta-orange: #FF7001;
  --eta-orange-mid: #FD9802;
  --eta-amber: #FEA808;
  --eta-rust: #932402;
  --paper: #FFFFFF;
  --shell: #F6F5F2;
  --line: #E4E2DD;
  --body-ink: #4A5654;
  --muted-ink: #7C8886;
}
```

`platform/design-system` is the frozen-architecture home for these tokens in code (ADR-0001). It is currently a stub with no `src/`. Populating it from this document is the correct first implementation step and keeps the website, the portal, and future ETA Platform surfaces on one visual system.

---

## 13. Logo usage

| Rule | Detail |
|------|--------|
| Files | `Logo.svg` (full lockup) · `mark.svg` (symbol) · `type.svg` (wordmark) |
| Minimum | 120 px wide (full lockup) · 32 px (mark) |
| Clear space | ≥ ½ the mark's height on all sides |
| On dark | Light lockup over petrol or photography |
| On light | Standard lockup |
| Over photography | Only where local contrast ≥ 4.5:1 — apply a scrim if not |
| **Never** | Distort, rotate, recolour, add effects, alter proportions, reconstruct, or place on a busy background |

The bilingual lockup — `ETA` / `EXIR TEJARAT ATLAS` / `اکسیر تجارت اطلس` — is already established in the approved Company Profile and is used as-is in the site header for the Persian layout.

---

*Next: `FIGMA_STRUCTURE.md` — file organisation, libraries, and design-to-development handoff.*
