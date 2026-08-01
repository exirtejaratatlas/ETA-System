---
name: eta-design-handoff
description: Use when a task is better suited to Claude Design than Claude Code — generating or iterating on visual designs, Figma files, or brand-driven assets — and needs a handoff package generated. Trigger on "hand this off to Design," "this needs a designer," or when a request is purely visual/creative with no code component.
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - .claude/handoffs/template-claude-design.md
related_skills:
  - eta-branding
  - eta-ui-review
  - eta-cowork-handoff
---

# ETA Claude Design Handoff

## When this applies

A task belongs in Claude Design (not Claude Code) when it's primarily about producing or iterating a visual artifact — a new brand asset, a Figma mockup, a marketing graphic — with no repository code change required. If the task also requires wiring the result into `apps/web` or `platform/design-system`, that implementation half stays in Claude Code; only the design-generation half hands off.

## Generating the package

Fill [`.claude/handoffs/template-claude-design.md`](../../handoffs/template-claude-design.md) with: context (what/why), requirements, constraints (brand guidelines from `eta-branding`, any existing design-system tokens), related ADRs, required source documents (link Drive assets via `eta-knowledge-discovery`), and current implementation status (Proposed/In Progress/Done — never claim Done without confirmation).

## Best practices

- Never fabricate brand constraints — pull them from verified Drive assets (`eta-branding`) or ask the user, don't invent a palette/typography from assumption.
- Keep the handoff self-contained: whoever picks it up (a person or another Claude surface) shouldn't need this conversation's history to act on it.
- State explicitly what's *not* included (e.g., "this does not cover implementing the result in code") to avoid scope creep on either side of the handoff.

## Limitations

This skill produces the handoff document; it doesn't invoke Claude Design directly. Delivering/routing the package to the right surface is a workspace-intelligence decision — see `eta-memory`'s sibling routing doc at `.claude/workspace/routing.md`.
