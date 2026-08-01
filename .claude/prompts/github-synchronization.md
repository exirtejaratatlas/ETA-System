# Prompt: GitHub Synchronization

**Use with:** `eta-github`, `eta-knowledge-discovery`

```
Compare [repo state / branch / Drive document] against its GitHub counterpart.

There is no automated sync between Drive and GitHub — report the comparison
as LOCAL_ONLY or DRIVE_ONLY, never IDENTICAL/DIVERGED/GITHUB_NEWER/DRIVE_NEWER
without an actual commit-level diff to back it up.

Before comparing branches, run git branch -a and gh pr list fresh — don't
rely on a prior session's branch list. Flag (don't silently merge) anything
touching origin/develop or origin/feature/system-core, per ADR-0008.
```
