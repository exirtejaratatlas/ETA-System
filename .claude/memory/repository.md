# Repository Memory

**VERIFIED** — Three branches exist with materially different histories: `main` (frozen v3 architecture), `origin/develop`, `origin/feature/system-core`. The latter two carry an earlier, abandoned numbered-doc scheme (`bootstrap/`, `system/`) never merged into `main` ([ADR-0008](../../docs/decisions/ADR-0008-branch-reconciliation.md)).

**VERIFIED** — An older bootstrap taxonomy (`00-System/`, root-level `agents/`, `architecture/`, `packages/`, `releases/`, `roadmap/`, `standards/`, `templates/`, `TREE.txt`) was retired and removed from `main` per ADR-0001, with the audit trail in `docs/decisions/`.

**VERIFIED** — Repository visibility and GitHub process are governed by [ADR-0010](../../docs/decisions/ADR-0010-repository-visibility-and-github-process.md); a prior audit flagged a public-repo-vs-proprietary-license mismatch as a live concern — re-check current visibility before assuming it's resolved.

**UNKNOWN** — Whether the ADR-0010 visibility/license concern has since been resolved. Check `gh repo view` and the LICENSE state directly rather than assuming either way.
