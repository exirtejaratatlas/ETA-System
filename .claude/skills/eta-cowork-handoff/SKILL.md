---
name: eta-cowork-handoff
description: Use when a task is better suited to Claude CoWork (multi-file, long-running, team-collaborative work with plugin/tool access) than a single Claude Code session — and needs a handoff package generated. Trigger on "hand this off to CoWork," "this needs a team workspace," or for large multi-session initiatives.
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - .claude/handoffs/template-claude-cowork.md
related_skills:
  - eta-design-handoff
  - eta-claudechat-handoff
---

# ETA Claude CoWork Handoff

## When this applies

CoWork suits work that's genuinely collaborative and long-running — e.g., building a shared plugin, running a cross-functional initiative that spans multiple people's inputs over time — rather than a single engineer's implementation task, which stays in Claude Code.

## Generating the package

Fill [`.claude/handoffs/template-claude-cowork.md`](../../handoffs/template-claude-cowork.md): context, requirements, constraints, related ADRs, required documents, and implementation status. Be explicit about which parts of the ETA-System frozen architecture (ADR-0001) the CoWork initiative must respect — a collaborative workspace is not exempt from the "no duplicate concepts" rule just because more people are involved.

## Best practices

- State the initiative's boundaries clearly — CoWork sessions can sprawl; a tight handoff (specific goal, specific constraint set) keeps it from re-deriving architecture decisions already made here.
- Reference this repo's standing rules (no duplicate concepts, ADR required for structural change, production-safety boundaries) explicitly in the handoff — don't assume they transfer implicitly.

## Limitations

This produces the handoff content only; it doesn't create or launch a CoWork session. Routing which surface a task belongs on is `eta-memory`'s sibling doc, `.claude/workspace/routing.md`.
