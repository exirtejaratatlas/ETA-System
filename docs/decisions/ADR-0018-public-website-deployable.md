# ADR-0018: Public Website as a Deployable Surface

Status: **Proposed** — drafted 2026-07-27, awaiting approval. Not in effect.
Date: 2026-07-27

## Context

A complete redesign of the public website `www.exiratlas.com` has been commissioned as the "ETA Digital Headquarters" (design documentation: `docs/website/`). The frozen architecture (ADR-0001) has no home for it.

Three facts create the gap:

1. **The live public site is not represented in this repository at all** — no ADR, no code, no deployment configuration. It is a static HTML/CSS site, confirmed live, entirely outside the monorepo (CR-008).
2. **`apps/web` is not the public site.** ADR-0001 defines `apps/` as `web`, `bff`, `gateway`, `workers`, and `apps/web`'s own README describes an internal, auth-gated "Enterprise procurement UI." That is the portal — a different product, for a different audience, with opposite caching and indexing requirements.
3. **The architecture is frozen.** ADR-0001 states that any structural change requires a new ADR. Adding a deployable surface is a structural change.

A further constraint arrived with the brief: the site is hosted on **IranServer**. This independently invalidates the Blueprint's `Technical.md` (`ETA-TECH-001`, Approved) hosting choices — Vercel, Netlify, Cloudflare Pages, and Lovable are not viable deployment targets for the primary market, and Supabase would place an external dependency in the critical rendering path.

## Decision

- **Add `apps/site`** to `apps/` as a new deployable surface: the public, anonymous, indexable marketing website. This extends ADR-0001's `apps/` enumeration from four surfaces to five.
- **`apps/web` is unchanged** and retains its stated purpose: the authenticated internal/portal UI. The two are separate deployables with separate build, caching, and indexing configuration.
- **Stack:** Next.js (App Router) + TypeScript within the existing Nx workspace, per ADR-0002. Nx boundary tags applied at creation, per ADR-0002's standing requirement.
- **Hosting:** self-hosted on IranServer — Node under a process manager behind Nginx, containerised. Not platform-managed.
- **No third-party runtime dependencies.** Fonts, icons, scripts, styles, video, and analytics are self-hosted. This is a hard constraint arising from the primary audience's network conditions, not a preference.
- **Design tokens are consumed from `platform/design-system`**, not redefined locally. That package (currently an empty stub) is populated first, so the website, the portal, and future ETA Platform surfaces share one token set.
- **`apps/site` contains no business logic.** Consistent with ADR-0001, `apps/` holds deployable surfaces only. RFQ submission calls into a port; the adapter behind it is free to change (see Consequences).

## Alternatives considered

- **Repurpose `apps/web` as the public site.** Rejected: it conflates two products with opposite audiences (anonymous vs. authenticated), opposite caching strategies (aggressively static vs. never cached), and opposite indexing rules (fully indexed vs. `noindex`). It also contradicts `apps/web`'s own README, which would have to be rewritten to mean something else.
- **A separate repository outside the monorepo.** Rejected: fastest to start, but permanently forfeits shared design tokens, shared types, and a single CI pipeline. It recreates precisely the drift that the frozen architecture exists to prevent — and the live site's divergence from every planning document is the existing evidence of that failure mode.
- **Keep the static site and redesign it in place.** Rejected: the brief requires a bilingual RTL site with a multi-step file-upload RFQ, enterprise search, and portal integration. That is an application, not a static site.
- **Adopt the Blueprint's React/Vite/Supabase/Lovable stack (`ETA-TECH-001`).** Rejected on two independent grounds: it conflicts with ADR-0002 (TypeScript + Nx governs, per the standing CR-001 resolution), and its hosting choices are not viable under the IranServer constraint.

## Consequences

- **ADR-0001's `apps/` enumeration is extended**, not overridden. The hexagonal and dependency-direction rules are untouched: `apps/site` depends inward on `platform/*`, never on `domains/*` internals, and never the reverse.
- **`ETA-TECH-001` (Blueprint website technical specification, Approved v1.0) is superseded** on stack and hosting. It remains a historical record; ADRs are append-only and the Blueprint document is a knowledge source, not an ADR of this repository.
- **The RFQ backend is not decided here.** Per ADR-0016/0017 Odoo is the single source of truth, so an RFQ should ultimately land in Odoo. Three prerequisites are unresolved: which Odoo model receives an inbound RFQ; that Odoo currently has **no Purchase, Sales, or CRM app installed** (ADR-0015); and that `x_eta_*` custom fields must be added following the ADR-0017 convention. `apps/site` therefore ships with a standalone capture path behind a port, and the Odoo adapter is added later without rebuilding the form — this is exactly the substitution the ADR-0017 port seam was designed to permit.
- **A fallback capture path is mandatory.** If the downstream system is unavailable, the RFQ must still be persisted and the submitter must still receive a reference number. Losing a commercial enquiry to a backend outage is not an acceptable failure mode.
- **Authentication is out of scope for this ADR.** No page in `apps/site` is authenticated. The conflict between the brief's "everything authenticates through Odoo" and ADR-0012 (Keycloak as identity provider) affects the portal only, and requires its own ADR before portal work resumes.
- **`platform/design-system` must be populated before `apps/site` is built**, otherwise tokens get defined locally and the drift this ADR aims to prevent begins immediately.
- **CI gains a static-export and Lighthouse budget check** for the new surface, plus an accessibility harness. A build containing `[Content Required]` placeholders in production output should fail.
- If the ETA Platform later absorbs public-facing functionality, the `apps/site` / `apps/web` boundary is the seam along which that merge would happen — it is deliberately drawn where a future consolidation is cheapest.
