# Prompt: Claude Chat Handoff

**Use with:** `eta-claudechat-handoff`

```
Generate a Claude Chat handoff package for [topic/task]. Fill
.claude/handoffs/template-claude-chat.md. Since Chat has no repo or Drive
access, inline every fact the conversation will need — don't just reference
a file path or ADR number, explain it in plain language.

Keep confidence labels (VERIFIED/PARTIALLY VERIFIED/UNKNOWN) intact even
though the audience changed — the evidence standard doesn't relax for Chat.
```
