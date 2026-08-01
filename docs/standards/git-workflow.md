# Git Workflow

- Trunk-based: `main` is always deployable.
- Feature branches short-lived, merged via pull request once more than one contributor is active (ADR-0010) — while a single engineer executes the agreed roadmap, direct commits to `main` are acceptable, but this should be revisited the moment a second contributor joins.
- No force-pushes to `main`. No unreviewed merges once PRs are adopted.
- Branches are not a substitute for documentation: if a branch introduces a new concept that should persist, it belongs in an ADR before the branch is merged, not left implicit in commit history (see [ADR-0008](../decisions/ADR-0008-branch-reconciliation.md) for what happens when this isn't followed).
