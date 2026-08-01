# ETA-System Shared Memory

This is git-committed, repository-local memory — visible to any collaborator or Claude session working on ETA-System. It is **distinct** from Claude's personal per-user auto-memory (`~/.claude/projects/-Users-ali-Projects-ETA-System/memory/`), which is not committed here and not visible to other collaborators. Don't conflate the two — see the `eta-memory` skill for when to use which.

## Categories

| File | Scope |
|---|---|
| `business.md` | Business model, stakeholders, entities, procurement domain purpose |
| `technical.md` | Language/runtime/tooling decisions that cut across the whole stack |
| `architecture.md` | The frozen v3 target architecture and its rationale |
| `knowledge.md` | Facts about the knowledge base itself (Drive structure, taxonomy conflicts) |
| `repository.md` | Facts about this git repository (branches, history, retired schemes) |
| `odoo.md` | The real Odoo/Postgres dev environment and integration plans |
| `website.md` | The ETA public website and its (unverified) relationship to `apps/web` |
| `company-profile.md` | The Company Profile document and business-identity facts |
| `brand.md` | Brand assets, guidelines, and the design-system package |
| `prompt.md` | The prompt library and how it's meant to be used/extended |

## Confidence discipline

Every entry in every file is labeled `VERIFIED`, `PARTIALLY VERIFIED`, or `UNKNOWN` (see `eta-evidence`). `VERIFIED` means read directly this session or a clearly-cited past one; `PARTIALLY VERIFIED` means reported but not independently re-checked; `UNKNOWN` is a legitimate, expected entry — it marks a known gap, not a failure to look hard enough.

## Maintenance

Update in place when a fact changes or gets re-verified; don't create parallel near-duplicate entries. When a fact is superseded, say so explicitly rather than silently deleting the old claim — future readers should be able to tell what changed and why.
