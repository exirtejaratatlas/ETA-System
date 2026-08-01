---
name: eta-branding
description: Use when a task involves ETA brand assets, logos, color/typography guidelines, or the design-system package. Trigger on "brand assets," "branding review," "our logo," or "design system tokens."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - eta-knowledge-discovery
related_skills:
  - eta-companyprofile
  - eta-ui-review
  - eta-design-handoff
related_adrs:
  - ADR-0001-eta-system-target-architecture
---

# ETA Branding

## Ground truth

`platform/design-system` is the frozen-architecture home for any brand tokens/component library in code (ADR-0001) — currently a stub. Real brand assets (confirmed to exist, `VERIFIED` 2026-07-23) live in the Drive knowledge base under `00-KNOWLEDGE/02-BRANDING` and the Blueprint vault's `20-BRANDING/` — unlike most of the top-level Drive placeholders, these have actual content.

## Best practices

- Before building or referencing design tokens in code, check whether `platform/design-system` already has anything (it currently doesn't) and whether the Drive brand assets have already been indexed in `ai/knowledge/retrieval/inventory.json`.
- Any color/logo/typography claim should cite the specific Drive file (via `eta-evidence`) rather than being asserted from general brand familiarity — brand guidelines are exactly the kind of fact that drifts and gets version-updated.
- Route "generate a new visual using our brand" requests toward the relevant creative tool (Canva/Adobe/etc. connectors) informed by the actual brand assets, not a generic asset built without checking Drive first.

## Limitations

No brand tokens exist in code yet (`platform/design-system` is an empty stub) — a request to "use our design system programmatically" currently has nothing to point at beyond the Drive asset files themselves.
