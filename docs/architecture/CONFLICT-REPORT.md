# Conflict Report

Living document. Per standing execution rules, conflicts between knowledge sources are recorded here and do not block implementation — implementation continues using (in order) Approved ADRs → latest implementation → latest semantic index.

## CR-001: Backend language/framework — ADR-0002 (TypeScript/Nx) vs. Blueprint vault (FastAPI/Python)

- **Conflicting documents:** [ADR-0002](decisions/ADR-0002-monorepo-tooling-and-runtime-split.md) (approved, TypeScript for `apps/`/`domains/`/`platform/`/`integrations/`/`data/`, Python only for `ai/`) vs. the `ETA-Blueprint` knowledge-base vault's `03-ARCHITECTURE/Technology-Stack.md` (marked "status: Approved" within the vault, specifying a FastAPI/Python 3.12+ backend for everything).
- **Resolution applied:** ADR-0002 governs, because it is an approved ADR in this repository and `platform/kernel` is already implemented against it. The vault's stack document is a knowledge source, not an ADR of this repository, and per the standing priority order does not override an approved ADR + existing implementation.
- **Status:** Unresolved as a discrepancy between the two knowledge sources; resolved as a matter of what this repository implements. If the user wants to switch to FastAPI/Python, that requires an explicit new ADR superseding ADR-0002 — flagged, not applied unilaterally.

## CR-002: CRM target system — previously open, now answered by the semantic index

- **Conflicting documents:** No prior ADR named a target (open decision since the first architecture audit) vs. the Blueprint vault, which repeatedly names **Microsoft Dynamics CRM** as the legacy/target CRM system.
- **Resolution applied:** Adopted as [ADR-0013](decisions/ADR-0013-crm-target-microsoft-dynamics.md). Not a conflict between equally-weighted sources — the vault is simply the first source to answer a previously-open question.

## CR-003: Identity provider — previously unspecified, now answered by the semantic index

- **Conflicting documents:** [ADR-0007](decisions/ADR-0007-identity-and-authorization-model.md) (approved, left the specific OIDC provider unspecified) vs. the Blueprint vault, which specifies **Keycloak**, explicitly preferred over Auth0.
- **Resolution applied:** Adopted as [ADR-0012](decisions/ADR-0012-identity-provider-keycloak.md), refining ADR-0007 rather than replacing it (ADR-0007's RBAC/delegated-authority model stands; only the provider choice was open).

## CR-004: Vector database for AI knowledge retrieval — net-new decision

- **Conflicting documents:** None — `ai/knowledge/retrieval` had no vector-store decision recorded anywhere. The Blueprint vault specifies **Qdrant**.
- **Resolution applied:** Adopted as [ADR-0014](decisions/ADR-0014-vector-database-qdrant.md).

## CR-005: Multi-tenancy — possible conflict, not yet resolved

- **Conflicting documents:** [ADR-0005](decisions/ADR-0005-multi-tenancy-and-domain-data-isolation.md) (single-tenant, explicitly inferred from commercial document templates and flagged "revisit if wrong") vs. the Blueprint vault's Business Model doc, which lists "Enterprise SaaS Platform" as one of four business models — implying multiple tenant organizations eventually.
- **Resolution applied:** None yet. ADR-0005 continues to govern (approved ADR + existing implementation direction takes precedence per the standing rule), but this is flagged as the most likely ADR to require revision as real SaaS-facing work begins. Not blocking current platform-layer implementation, since `platform/kernel` and other cross-cutting code do not yet encode a tenancy assumption.

## CR-006: Possible undisclosed second legal entity

- **Conflicting documents:** None — no repository document mentions this. The Blueprint vault's Enterprise Data Dictionary names "Allison General Trading LLC" once, alongside Exir Tejarat Atlas, as an example organization in Master Data.
- **Resolution applied:** None — flagged for user confirmation, not assumed either way. Does not block implementation since no code currently depends on a specific organization list.

## CR-007: Duplicate/parallel documentation taxonomies (pre-existing, carried forward)

- Already recorded in [ADR-0009](decisions/ADR-0009-knowledge-base-taxonomy-reconciliation.md) — the Drive knowledge base's own two competing numbering schemes, plus the vault existing in duplicate at two Drive paths (`ETA-Blueprint` and `00-KNOWLEDGE/15-BLUEPRINT`). No new action; this repository's `docs/` remains the single source of truth for what gets implemented.

## CR-008: Live public website and operations portal exist, entirely outside this repository — net-new, discovered 2026-07-24

- **Conflicting documents:** [ADR-0001](decisions/ADR-0001-eta-system-target-architecture.md) / `apps/web`'s own README (an internal, auth-gated "Enterprise procurement UI," never deployed, empty stub) vs. two real, live, already-deployed systems found by direct browser verification: `https://exiratlas.com` (a public marketing/lead-gen site — different stack: static HTML/CSS pages, no framework markers observed, unrelated to ADR-0002's TypeScript/Nx monorepo) and `https://portal.exiratlas.com` (a separate "ETA Operations Portal" with its own login, linked from the marketing site's footer as "CRM Portal").
- **Also conflicting:** the Blueprint vault's `20-BRANDING/03-Website/Technical.md` ("Approved v1.0") specifies a planned stack of React/TypeScript/Vite/Tailwind/TanStack + Supabase, hosted on Lovable/Vercel/Cloudflare — this does not match what is actually live today (a simpler static site), and has no relationship recorded to `apps/web` at all.
- **Resolution applied — question 2 answered directly by the user, 2026-07-24 (source: user statement, not a document — treat as VERIFIED at the same weight as a direct read):** `portal.exiratlas.com` is **not** Microsoft Dynamics CRM. It is a **temporary operational portal**. The ETA Platform (this repository's target architecture) is intended to eventually **replace** the temporary portal.
- **Superseded same day by [ADR-0016](decisions/ADR-0016-remove-dynamics-crm-eta-platform-extends-odoo.md):** the original resolution above described Dynamics as an ongoing stage in the chain (Website → Portal → Dynamics → Odoo → ETA Platform). That is now out of date — per ADR-0016, Dynamics is removed from the target architecture entirely. Current target chain: **Website → ETA Platform → Odoo ERP**, with Dynamics data (if any) migrated once into Odoo and then retired. [ADR-0013](decisions/ADR-0013-crm-target-microsoft-dynamics.md) is formally superseded.
- **Still open:** (1) is `apps/web` meant to ever replace `exiratlas.com` itself, or are they permanently different systems (internal app vs. public site)? (2) is the Blueprint's website Technical.md spec still the intended future state, or superseded by whatever actually shipped at exiratlas.com? (3) what actually powers the temporary portal, and does "replace" mean a straight cutover or phased absorption into `apps/web`/`apps/bff`? (4) — new, raised by ADR-0016 — does `domains/procurement-core`'s own Postgres persistence remain authoritative, or does Odoo become the single source of truth with `domains/` as an orchestration layer over it? This is now the highest-priority open question, since it affects code already written.
- **Status:** Does not block current backend/domain implementation in the sense of broken code, but question (4) above means the *design* of the backend work already done this session (procurement-core/suppliers persistence) is now unconfirmed against the target architecture — flagged, not assumed either way.
