---
name: eta-github
description: Use when working with the ETA-System GitHub repository directly — branches, PRs, issues, releases, or repo visibility/process questions. Trigger on "check GitHub," "open a PR," "what branches exist," or "repo visibility."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - gh CLI (already permitted for repo/issue/pr/api/project subcommands in settings.local.json)
related_skills:
  - eta-architecture
  - eta-adr
related_adrs:
  - ADR-0008-branch-reconciliation
  - ADR-0010-repository-visibility-and-github-process
---

# ETA GitHub

## Ground truth

Three branches exist with materially different histories: `main` (current, frozen v3 architecture), `origin/develop`, and `origin/feature/system-core` — the latter two carry an even earlier, abandoned numbered-doc scheme (`bootstrap/`, `system/`) that was **never merged into `main`** (ADR-0008). Do not merge either into `main` without an explicit reconciliation pass.

Repo visibility and process are governed by ADR-0010 — check it before changing visibility, branch protection, or PR process, since a prior audit flagged a public-repo-vs-proprietary-license mismatch as a live concern.

## Best practices

- Always run `git branch -a` / `gh repo view` before assuming which branches exist — don't rely on memory of a prior session's branch list, it can change.
- Use `gh` for all GitHub operations (issues, PRs, checks, releases) rather than scraping the web UI.
- Before creating a new branch or PR, check for an existing one covering the same scope — `before-branch-creation.sh` reminds of this automatically.
- Respect the standing git-safety rules: no `--force` push to `main`, no unrequested `git reset --hard`, new commits over amends.

## Limitations

This skill doesn't have live GitHub Actions/CI status baked in — always fetch current PR/check status via `gh` rather than assuming it from a past report.
