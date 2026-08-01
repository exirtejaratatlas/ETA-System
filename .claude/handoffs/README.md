# ETA-System Handoff Packages

Templates for handing a task off from Claude Code to another Claude surface — Design, Chat, or CoWork — when the work no longer needs repo access or tooling this session has. See `.claude/workspace/routing.md` for the decision rule on which surface a task belongs on; the skills `eta-design-handoff`, `eta-claudechat-handoff`, `eta-cowork-handoff` (and `eta-claudedesign-handoff` for structured-output design work) explain when and how to fill each one.

Every package shares the same six sections: Context, Requirements, Constraints, Related ADRs, Required Documents, Implementation Status. Fill all six — a handoff missing "Constraints" or "Implementation Status" forces the receiving surface to re-derive them, defeating the point of handing off in the first place.

**Implementation Status must be honest**: `Proposed`, `In Progress`, or `Done` — never `Done` without explicit user or ADR confirmation, per the standing project rule against marking things implemented on Claude's own authority.
