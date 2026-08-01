# ETA Digital Headquarters — Website Design Documentation

Complete design documentation for the redesign of `www.exiratlas.com`.

**Status: Draft — awaiting approval.** No code is written until the gates in `IMPLEMENTATION_ROADMAP.md` §2 are cleared.

---

## Documents, in reading order

| # | Document | What it decides |
|---|----------|-----------------|
| 1 | [WEBSITE_INFORMATION_ARCHITECTURE.md](WEBSITE_INFORMATION_ARCHITECTURE.md) | Audience, navigation, content hierarchy, RFQ spine, bilingual and hosting constraints |
| 2 | [SITEMAP.md](SITEMAP.md) | URLs, 118 fixed pages, 26 templates, rendering strategy, redirects, indexing |
| 3 | [USER_JOURNEY.md](USER_JOURNEY.md) | Four personas traced from trigger to outcome, with the doubts that stall each |
| 4 | [PAGE_SPECIFICATIONS.md](PAGE_SPECIFICATIONS.md) | Section-by-section build specification per template |
| 5 | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | Tokens, typography, colour with verified contrast, motion, photography, components |
| 6 | [FIGMA_STRUCTURE.md](FIGMA_STRUCTURE.md) | File organisation, libraries, review gates, developer handoff |
| 7 | [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) | Gates, phasing, content critical path, risks |

Related: [ADR-0018](../decisions/ADR-0018-public-website-deployable.md) — public website as a deployable surface (**Proposed**, not accepted).

---

## The three things that matter most

**1 · Content is the critical path, not design or engineering.**
No industrial photography exists. No project case studies exist. No equipment manufacturer list exists. No certifications are documented. Design and engineering can absorb delay; these cannot be compressed. The photography commission is the single longest-lead item and should start before anything else.

**2 · Equipment and Steel are two businesses, never one "Products" section.**
Opposite sourcing directions (international vs. domestic Iranian mills), opposite buying units, opposite risk profiles. They need separate navigation, separate page templates, and separate RFQ forms.

**3 · ETA's strongest content is already verified and currently invisible.**
Payment terms, Incoterms, warranty, documentation set, FAT inspection, bank guarantees, and the practice of issuing an unpriced technical offer separately from the commercial one. All documented, all publishable today, none of it on the live site.

---

## Open decisions

| # | Decision | Needs |
|---|----------|-------|
| A | Where the public site lives — `apps/site` proposed | **ADR** (drafted) |
| B | Odoo-direct auth vs. Keycloak (ADR-0012 conflict) | **ADR** (not drafted — business decision first) |
| C | Stack & hosting — Next.js + Nx on IranServer | Confirmation |
| D | Supersede `ETA-SITEMAP-001` and `ETA-VISUAL-001` | Brand owner |
| E | Photography commission | Approval + budget |

---

## Two conflicts found in the source material

**`Colors.md` (ETA-VISUAL-001, Approved) does not match the official logo.** It specifies Navy `#0F172A` and Copper `#C57B39`; neither value appears in `Logo.svg`, which is deep petrol green `#04403F` and orange `#FF7001`. The most recent approved artifact — the 2026-07-25 Company Profile — had already abandoned Colors.md and tokenised the real logo palette. The design system here uses those same values, so the profile and website will match exactly. Superseding ETA-VISUAL-001 is a version bump requiring brand-owner approval.

**"Everything authenticates through Odoo" conflicts with ADR-0012**, which selects Keycloak as the identity provider implementing ADR-0007's OIDC/RBAC model. This affects the portal only — no marketing page is authenticated — so marketing development is not blocked. It is recorded rather than silently resolved, because the architecture is frozen and one of the two positions has to formally give way.
