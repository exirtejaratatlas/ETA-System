---
name: eta-claudechat-handoff
description: Use when a task is better suited to a Claude Chat (claude.ai) conversation than Claude Code — open-ended research, brainstorming, or stakeholder-facing writing with no repo access needed — and needs a handoff package generated. Trigger on "hand this to Chat," "this doesn't need repo access," or for pure discussion/ideation work.
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - .claude/handoffs/template-claude-chat.md
related_skills:
  - eta-design-handoff
  - eta-cowork-handoff
---

# ETA Claude Chat Handoff

## When this applies

Claude Chat suits work that doesn't need this repository's file access or tools at all — drafting stakeholder communication, brainstorming procurement strategy, summarizing a Blueprint concept for a non-technical audience. If the task needs to read/write repo files, run commands, or query the Drive connector, it belongs in Claude Code instead.

## Generating the package

Fill [`.claude/handoffs/template-claude-chat.md`](../../handoffs/template-claude-chat.md): context, requirements, constraints, related ADRs (summarized in plain language, not just linked), required background documents, and current status. Since Chat has no repo access, the handoff must carry every fact the conversation will need — inline it, don't just reference a file path.

## Best practices

- Pre-digest anything Chat would otherwise have to ask about — repo paths, ADR numbers, and jargon mean nothing without repo access, so translate them into plain content in the handoff itself.
- Keep business/knowledge-base facts properly confidence-labeled (`eta-evidence`) even in a Chat-bound handoff — the standard doesn't relax just because the audience changed.

## Limitations

This produces the handoff content only. Routing which surface a task belongs on is `eta-memory`'s sibling doc, `.claude/workspace/routing.md`.
