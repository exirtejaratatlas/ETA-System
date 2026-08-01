---
document_id: ETA-WEB-MAP-002
title: Website Sitemap — URL Structure & Page Inventory
version: 0.1
status: Draft — awaiting approval
owner: Exir Tejarat Atlas
classification: Internal
supersedes: ETA-SITEMAP-001 (pending approval — see IA §9)
last_updated: 2026-07-27
---

# ETA Digital Headquarters — Sitemap

Companion to `WEBSITE_INFORMATION_ARCHITECTURE.md`. This document fixes **URLs, page count, templates, rendering strategy, and indexing rules**.

---

## 1. URL conventions

| Rule | Detail |
|------|--------|
| Language prefix | Every page carries one: `/en/...` or `/fa/...`. `/` redirects (302) via `Accept-Language`, then persists the choice. |
| Case | Lowercase, hyphen-separated. Never underscores, never camelCase. |
| Trailing slash | Omitted. `/en/steel-products` — enforced by a single 301 rule. |
| Persian slugs | **Latin transliteration, not Persian script.** `/fa/steel-products`, not `/fa/محصولات-فولادی`. Percent-encoded URLs break in tender documents, email clients, and print — and industrial buyers paste URLs into all three. |
| Depth | Maximum three segments after the language prefix. |
| Stability | Product and industry URLs are permanent. Any change ships with a 301. |
| Query params | Never used for primary navigation. Filters and search only. |

---

## 2. Complete page inventory

Rendering: **SSG** = static, **ISR** = static with revalidation, **SSR** = server-rendered per request, **CSR** = client-rendered behind auth.

### 2.1 Home

| URL | Template | Render | Index | Priority |
|-----|----------|--------|-------|----------|
| `/en` · `/fa` | `home` | ISR 1 h | ✅ | 1.0 |

### 2.2 What We Supply

| URL | Template | Render | Index | Priority |
|-----|----------|--------|-------|----------|
| `/{lang}/what-we-supply` | `supply-hub` | SSG | ✅ | 0.9 |
| `/{lang}/industrial-equipment` | `business-line` | SSG | ✅ | **1.0** |
| `/{lang}/industrial-equipment/rotating-equipment` | `category` | SSG | ✅ | 0.9 |
| `/{lang}/industrial-equipment/static-equipment` | `category` | SSG | ✅ | 0.9 |
| `/{lang}/industrial-equipment/instrumentation-control` | `category` | SSG | ✅ | 0.9 |
| `/{lang}/industrial-equipment/mechanical-spare-parts` | `category` | SSG | ✅ | 0.9 |
| `/{lang}/industrial-equipment/chemicals-catalysts` | `category` | SSG | ✅ | 0.9 |
| `/{lang}/steel-products` | `business-line` | SSG | ✅ | **1.0** |
| `/{lang}/steel-products/hot-rolled` | `steel-category` | SSG | ✅ | 0.9 |
| `/{lang}/steel-products/cold-rolled` | `steel-category` | SSG | ✅ | 0.9 |
| `/{lang}/steel-products/galvanized` | `steel-category` | SSG | ✅ | 0.9 |
| `/{lang}/steel-products/pre-painted` | `steel-category` | SSG | ✅ | 0.9 |
| `/{lang}/steel-products/tinplate` | `steel-category` | SSG | ✅ | 0.9 |
| `/{lang}/steel-products/stainless` | `steel-category` | SSG | ✅ | 0.9 |

**14 pages × 2 languages = 28**

> `category` and `steel-category` are **different templates**, not variants. Equipment categories are organised by *function and service*; steel categories by *dimension, grade, coating and standard*. See IA §3.

### 2.3 Industries

| URL | Template | Render | Index | Priority |
|-----|----------|--------|-------|----------|
| `/{lang}/industries` | `industries-hub` | SSG | ✅ | 0.9 |
| `/{lang}/industries/steel` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/oil-and-gas` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/petrochemical` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/refining` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/power-generation` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/mining` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/cement` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/water-wastewater` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/heavy-manufacturing` | `industry` | SSG | ✅ | 0.8 |
| `/{lang}/industries/epc-projects` | `industry` | SSG | ✅ | 0.8 |

**11 × 2 = 22**

### 2.4 Capabilities

| URL | Template | Render | Index | Priority |
|-----|----------|--------|-------|----------|
| `/{lang}/capabilities` | `capabilities-hub` | SSG | ✅ | 0.8 |
| `/{lang}/capabilities/procurement-services` | `capability` | SSG | ✅ | 0.9 |
| `/{lang}/capabilities/engineering-evaluation` | `capability` | SSG | ✅ | 0.9 |
| `/{lang}/capabilities/manufacturers` | `manufacturers` | SSG | ✅ | 0.9 |
| `/{lang}/capabilities/manufacturers/{brand}` | `manufacturer-detail` | SSG | ✅ | 0.7 |
| `/{lang}/capabilities/logistics` | `capability` | SSG | ✅ | 0.8 |
| `/{lang}/capabilities/quality-inspection` | `capability` | SSG | ✅ | 0.8 |
| `/{lang}/capabilities/projects` | `projects` | SSG | ✅ | 0.9 |
| `/{lang}/capabilities/projects/{slug}` | `project-detail` | SSG | ✅ | 0.7 |

**7 fixed × 2 = 14** (+ dynamic — both `{brand}` and `{slug}` are currently **blocked**, IA §10)

### 2.5 ETA Platform

| URL | Template | Render | Index | Priority |
|-----|----------|--------|-------|----------|
| `/{lang}/platform` | `platform` | SSG | ✅ | 0.9 |
| `/{lang}/platform/customer-workspace` | `platform-detail` | SSG | ✅ | 0.7 |
| `/{lang}/platform/supplier-workspace` | `platform-detail` | SSG | ✅ | 0.7 |

**3 × 2 = 6**

### 2.6 Knowledge

| URL | Template | Render | Index | Priority |
|-----|----------|--------|-------|----------|
| `/{lang}/knowledge` | `knowledge-hub` | ISR 1 h | ✅ | 0.8 |
| `/{lang}/knowledge/{slug}` | `article` | ISR 1 h | ✅ | 0.7 |
| `/{lang}/news` | `news-index` | ISR 30 m | ✅ | 0.6 |
| `/{lang}/news/{slug}` | `news-detail` | ISR 1 h | ✅ | 0.5 |
| `/{lang}/blog` | `blog-index` | ISR 1 h | ✅ | 0.6 |
| `/{lang}/blog/{slug}` | `post` | ISR 1 h | ✅ | 0.5 |

**6 × 2 = 12** (+ dynamic)

### 2.7 Company

| URL | Template | Render | Index | Priority |
|-----|----------|--------|-------|----------|
| `/{lang}/about` | `about` | SSG | ✅ | 0.9 |
| `/{lang}/why-eta` | `why-eta` | SSG | ✅ | 0.8 |
| `/{lang}/careers` | `careers` | ISR 1 h | ✅ | 0.5 |
| `/{lang}/careers/{slug}` | `position` | ISR 1 h | ✅ | 0.4 |
| `/{lang}/contact` | `contact` | SSG | ✅ | 0.9 |

**5 × 2 = 10** (+ dynamic)

### 2.8 Conversion

| URL | Template | Render | Index | Priority |
|-----|----------|--------|-------|----------|
| `/{lang}/rfq` | `rfq` | SSR | ✅ | **1.0** |
| `/{lang}/rfq/equipment` | `rfq-equipment` | SSR | ⚠️ canonical → `/rfq` | — |
| `/{lang}/rfq/steel` | `rfq-steel` | SSR | ⚠️ canonical → `/rfq` | — |
| `/{lang}/rfq/confirmation/{ref}` | `rfq-confirmation` | SSR | ❌ noindex | — |
| `/{lang}/become-a-supplier` | `supplier-landing` | SSG | ✅ | 0.7 |
| `/{lang}/become-a-supplier/register` | `supplier-registration` | SSR | ❌ noindex | — |

**6 × 2 = 12**

### 2.9 Search & system

| URL | Template | Render | Index |
|-----|----------|--------|-------|
| `/{lang}/search` | `search` | CSR | ❌ noindex |
| `/{lang}/404` | `error-404` | SSG | ❌ |
| `/{lang}/500` | `error-500` | SSG | ❌ |
| `/{lang}/privacy` · `/terms` · `/cookies` | `legal` | SSG | ✅ (0.2) |

**6 × 2 = 12**

### 2.10 Portal — separate application shell

| URL | Auth | Index |
|-----|------|-------|
| `/portal/login` | — | ❌ noindex |
| `/portal/customer/*` | Required | ❌ noindex |
| `/portal/supplier/*` | Required | ❌ noindex |

**Not language-prefixed** — the portal handles locale internally from the user profile. Excluded from `sitemap.xml` entirely and `Disallow`ed in `robots.txt`. Detailed specification is out of scope for this document and belongs with `apps/web` (IA §6, Decision D1).

---

## 3. Page count summary

| Section | Fixed pages (×2 languages) |
|---------|---------------------------|
| Home | 2 |
| What We Supply | 28 |
| Industries | 22 |
| Capabilities | 14 |
| ETA Platform | 6 |
| Knowledge | 12 |
| Company | 10 |
| Conversion | 12 |
| Search & system | 12 |
| **Total fixed** | **118** |
| Templates required | **26** |

Dynamic pages (manufacturers, projects, articles, news, posts, positions) scale with content and are **not** counted — three of those six collections are currently blocked on missing source material.

---

## 4. Build order

Sequenced by commercial value, not by section order.

### Phase 1 — Conversion spine *(nothing ships without this)*
`/rfq` · `/rfq/equipment` · `/rfq/steel` · `/rfq/confirmation` · `/contact` · Home

### Phase 2 — Capability proof
`/industrial-equipment` · `/steel-products` + all 11 category pages · `/capabilities/procurement-services` · `/capabilities/logistics` · `/capabilities/quality-inspection`

### Phase 3 — Context
All 11 industry pages · `/capabilities` hub · `/about` · `/why-eta` · `/platform`

### Phase 4 — Trust *(gated on content, IA §10)*
`/capabilities/manufacturers` · `/capabilities/projects` — **do not build these as empty shells.** A Manufacturers page with no manufacturers and a Projects page with no projects damage trust more than their absence.

### Phase 5 — Content engine
`/knowledge` · `/news` · `/blog` · `/careers` · `/become-a-supplier`

### Phase 6 — Search & polish
`/search` · legal pages · error pages · full SEO pass

---

## 5. Redirect map — legacy → new

The live site currently serves a flat static structure. Every existing URL must 301 to preserve whatever equity exists.

| Legacy (live today) | → | New |
|---------------------|---|-----|
| `/` | 302 | `/en` or `/fa` (negotiated) |
| `/index.html` | 301 | `/en` |
| `/about.html` | 301 | `/en/about` |
| `/products.html` | 301 | `/en/what-we-supply` |
| `/industries.html` | 301 | `/en/industries` |
| `/contact.html` | 301 | `/en/contact` |
| `*.html` (any other) | 301 | nearest equivalent, else `/en` |

**Action required before launch:** crawl the live site and produce the complete legacy URL list. The five above are confirmed from prior verification; the site may contain more. Do not launch with an unaudited redirect map.

The footer link labelled **"CRM Portal"** currently points at `portal.exiratlas.com`. Per ADR-0016 there is no CRM in the target architecture — this label is wrong today and must not be carried forward. It becomes **Portal** in the utility rail.

---

## 6. `sitemap.xml`

Generated at build time, split by section, referenced from a sitemap index.

```
/sitemap.xml                    (index)
├── /sitemap-core.xml           home, company, capabilities, platform
├── /sitemap-products.xml       equipment + steel — highest priority
├── /sitemap-industries.xml
├── /sitemap-knowledge.xml      knowledge, news, blog
└── /sitemap-legal.xml
```

Every entry carries reciprocal `xhtml:link` alternates for `fa-IR`, `en`, and `x-default`. Excluded: portal, RFQ confirmation, supplier registration, search, error pages.

---

## 7. `robots.txt`

```
User-agent: *
Allow: /

Disallow: /portal/
Disallow: /*/rfq/confirmation/
Disallow: /*/become-a-supplier/register
Disallow: /*/search
Disallow: /api/

Sitemap: https://www.exiratlas.com/sitemap.xml
```

**Note.** Several major crawlers and AI agents access sites from infrastructure that may be geo-blocked or degraded relative to IranServer. Verify crawlability from outside Iran before launch — a site that buyers can reach but Googlebot cannot is invisible.

---

## 8. Canonical rules

| Situation | Canonical |
|-----------|-----------|
| Language pair | Self-referential; alternates via `hreflang` |
| `/rfq/equipment`, `/rfq/steel` | → `/{lang}/rfq` |
| Paginated lists | `?page=n` self-canonical, with `rel=prev/next` |
| Filtered search | Never canonical — `noindex` |
| Legacy `.html` | 301 only, never `rel=canonical` alone |

---

## 9. Navigation depth check

| Destination | Clicks from Home |
|-------------|-----------------|
| Request a Quote | **1** (persistent header) |
| Any business line | 1 |
| Any product category | 2 |
| Any industry | 2 |
| Any capability | 2 |
| Portal login | 1 |
| Any article | 2 |
| Any manufacturer | 3 |

No commercially significant page is more than two clicks from Home. The RFQ is always one.

---

*Next: `USER_JOURNEY.md` — how each persona moves through this structure.*
