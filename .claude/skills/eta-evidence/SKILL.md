---
name: eta-evidence
description: Use whenever a claim needs to be traceable — citing a Drive document, a repo file, or an ADR as the source for a factual statement. This is the evidence-citation standard used by every other ETA skill. Trigger on "cite your source," "how do you know that," or before writing anything into memory/inventory as VERIFIED.
version: 1.0.0
last_updated: 2026-07-24
dependencies: []
related_skills:
  - eta-knowledge-discovery
  - eta-memory
  - eta-indexing
---

# ETA Evidence Standard

Every factual claim drawn from an external source (Drive, GitHub, a running environment) must carry:

- **File Name** and **File ID / path** — from the API response or filesystem, not typed from memory
- **Folder Path** — reconstructed if the source doesn't natively return one; say so explicitly
- **Heading** and **Section** the claim comes from
- **Quoted excerpt** — read the actual relevant section before quoting; a truncated snippet doesn't cover content past the truncation point
- **SHA256 / content hash** — write `UNKNOWN` if the source has no checksum field (true for the Drive connector); never compute or guess one
- **Last Modified** timestamp
- **Source Type** — Google Drive, GitHub, Local Repository, or Running Environment
- **Confidence Level**:
  - `VERIFIED` — you read the relevant section yourself, this session
  - `PARTIALLY VERIFIED` — a prior session or subagent reported it, but you haven't independently re-read it
  - `UNKNOWN` — not yet established; a valid, expected answer, not a failure

## Best practices

- Never write `VERIFIED` for something you're relying on secondhand (your own past summary, a subagent's report) — that's `PARTIALLY VERIFIED` at best until re-checked.
- Only promote a finding into Claude Memory (personal or repo-local `.claude/memory/`) once it's `VERIFIED` — `INFERRED`/`UNKNOWN` findings belong in the inventory/discovery log, where uncertainty is trackable, not in memory framed as settled fact.
- When a memory or inventory entry's underlying source may have changed since it was recorded, re-verify before relying on it — treat cited facts as time-stamped, not permanent.

## Limitations

This is a documentation/discipline standard, not a technical enforcement mechanism — no hook currently blocks an unlabeled claim. Compliance depends on applying it consistently in every response and every memory/inventory write.
