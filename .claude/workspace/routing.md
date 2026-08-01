# ETA-System Workspace Intelligence

Which Claude surface a task belongs on, and how to avoid duplicating work across them.

## Decision rule

| Signal | Route to |
|---|---|
| Needs repo file access, runs commands, queries Drive/GitHub connectors | **Claude Code** (this surface) |
| Purely visual/creative output, no code change (a design, a Figma file, a brand asset) | **Claude Design** — generate a handoff via `eta-design-handoff` |
| A specific structured artifact (deck, one-pager) with defined format constraints | **Claude Design (structured)** — `eta-claudedesign-handoff` |
| Open-ended discussion, brainstorming, stakeholder writing, no tool access needed | **Claude Chat** — `eta-claudechat-handoff` |
| Multi-person, long-running, plugin/tool-driven collaborative initiative | **Claude CoWork** — `eta-cowork-handoff` |

If a task is a mix (e.g., "design a new brand asset and wire it into `apps/web`"), split it: the design-generation half hands off, the code-wiring half stays in Claude Code. Say so explicitly rather than handing off the whole thing to one surface.

## Never duplicate work across surfaces

Before generating a handoff, check whether an equivalent one already exists (a prior handoff file, an open PR, a Drive doc already covering the same ask) — the no-duplicate-concepts rule applies across surfaces, not just within a single Claude Code session. If unsure whether prior work exists, check `.claude/memory/` and `ai/knowledge/retrieval/discovery_log.json` first.

## When routing itself is ambiguous

Default to staying in Claude Code and doing the work directly if it's small enough to finish in-session — only generate a handoff package when the task genuinely needs a different surface's capabilities (repo-independent brainstorming, actual design-tool access, multi-person coordination). Generating a handoff for something that could just be answered directly is unnecessary process.
