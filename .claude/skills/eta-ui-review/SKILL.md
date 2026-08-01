---
name: eta-ui-review
description: Use when reviewing any UI — a running app, a Figma design, or a screenshot — for usability, accessibility, or consistency with the brand/design system. Trigger on "review this UI," "check this design," "does this look right," or "UI/UX audit."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - Browser tools (mcp__Claude_Browser__*) for live review
  - Figma MCP tools for design-file review
related_skills:
  - eta-branding
  - eta-design-handoff
  - eta-testing
---

# ETA UI Review

## Ground truth

`platform/design-system` (brand tokens/components) and `apps/web` (frontend surface) are both currently empty stubs — there is no running ETA UI in this repo yet. A UI review request today is either (a) about a Figma design/mockup, (b) about an external/legacy asset (the old website, an Odoo screen), or (c) premature until something is built.

## Best practices

- Before reviewing, confirm what's actually being reviewed and where it lives — don't assume `apps/web` has content to load in a browser.
- For a live app once one exists: start it, exercise the golden path and edge cases in the Browser tool, and check against `platform/design-system` tokens (once populated) rather than eyeballing consistency.
- For a Figma design: use the Figma MCP tools (`figma-use`, `figma-design-to-code`) per their own skill guidance, cross-checked against any real brand assets found via `eta-branding`.
- Flag accessibility basics (contrast, focus states, alt text, keyboard nav) as a matter of course, not only when asked.

## Limitations

With no running frontend yet, this skill currently has nothing live to review against — it's ready for when `apps/web` or `platform/design-system` gets real content.
