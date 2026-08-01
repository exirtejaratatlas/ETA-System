---
name: eta-claudedesign-handoff
description: Use specifically for handoffs into Claude's design-generation surface for structured visual outputs (decks, one-pagers, structured design files) as distinct from ad hoc Claude Design creative work — trigger on "generate a deck," "make a one-pager," "structured design handoff."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - .claude/handoffs/template-claude-design.md
related_skills:
  - eta-design-handoff
  - eta-branding
---

# ETA Claude Design (Structured) Handoff

This is the structured-output sibling of `eta-design-handoff`: use it when the deliverable is a specific artifact type (a slide deck, a one-pager, a templated document) with defined constraints, rather than open-ended creative exploration — the distinction matters because structured outputs need explicit dimension/format/branding constraints up front, where open creative work can iterate.

## Generating the package

Same template as `eta-design-handoff` (`.claude/handoffs/template-claude-design.md`), but be exhaustive about: exact artifact type and format, brand constraints (colors, fonts, logo usage — cite via `eta-branding`, don't invent), any existing template/document this should extend rather than recreate, and audience.

## Best practices

- Confirm the exact output format expected (deck size, one-pager dimensions, file type) before generating — reduces round-trips more than any other single check.
- If a template or prior version of this artifact already exists (check Drive via `eta-knowledge-discovery`), extend it rather than starting fresh — same no-duplicate-concepts principle as everywhere else in this project.

## Limitations

Overlaps deliberately with `eta-design-handoff` — if a task doesn't clearly need this level of structured-format precision, default to the simpler skill instead of adding process for its own sake.
