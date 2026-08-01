# ETA-System Hooks

Claude Code only fires two real tool-lifecycle events — `PreToolUse` (before a tool runs, can block by exiting 2) and `PostToolUse` (after a tool runs, advisory only). The bootstrap spec named 20 conceptual hooks (`BeforeWrite`, `BeforeCommit`, `AfterPush`, …); this table is the real mapping — every script below is wired as a `PreToolUse` or `PostToolUse` entry in [`../settings.json`](../settings.json) with a `matcher` that narrows it to the right tool/command.

All scripts source [`lib/common.sh`](lib/common.sh) and are non-blocking (`exit 0` with a warning on stderr) **except** where noted "blocking" — those are reserved for irreversible, high-blast-radius actions, per the project's safety rules in [`../safety/policy.md`](../safety/policy.md).

| Conceptual hook | Real event | Matcher | Script | Blocking? |
|---|---|---|---|---|
| BeforeWrite | PreToolUse | `Write` | `before-write.sh` | no |
| BeforeEdit | PreToolUse | `Edit` | `before-edit.sh` | no |
| BeforeCommit | PreToolUse | `Bash` (command contains `git commit`) | `before-commit.sh` | no (warns on secret-looking files) |
| BeforePush | PreToolUse | `Bash` (command contains `git push`) | `before-push.sh` | **yes**, for `--force`/`-f` to `main`/`master` |
| BeforeDelete | PreToolUse | `Bash` (`rm -rf`, `git clean -f`, etc.) | `before-delete.sh` | **yes**, for repo-root-wide or unscoped deletes |
| BeforeADR | PreToolUse | `Write` on `docs/decisions/ADR-*.md` | `before-adr.sh` | no |
| BeforeOdoo | PreToolUse | `Bash` (touches the real Odoo/Postgres dev env) | `before-odoo.sh` | no |
| BeforeWebsite | PreToolUse | `Bash`/`Write` (touches `apps/web` build/deploy or a live site) | `before-website.sh` | no |
| BeforeCompanyProfile | PreToolUse | `Write`/`Edit` (Company Profile doc paths) | `before-companyprofile.sh` | no |
| BeforeDocker | PreToolUse | `Bash` (`docker ...` beyond read-only) | `before-docker.sh` | no (warns on mutating commands against the dev stack) |
| BeforeGitSync | PreToolUse | `Bash` (`git fetch`/`pull`/`push` with a remote) | `before-git-sync.sh` | no |
| BeforeKnowledgeRead | PreToolUse | Drive MCP read tools | `before-knowledge-read.sh` | no |
| BeforeDiscovery | PreToolUse | Drive MCP search tools | `before-discovery.sh` | no |
| BeforeImplementation | PreToolUse | `Write`/`Edit` under `domains/`,`platform/`,`ai/`,`integrations/` | `before-implementation.sh` | no |
| BeforeBranchCreation | PreToolUse | `Bash` (`git checkout -b`, `git branch`) | `before-branch-creation.sh` | no |
| BeforeMerge | PreToolUse | `Bash` (`git merge`, `git rebase`) | `before-merge.sh` | no |
| AfterCommit | PostToolUse | `Bash` (command contained `git commit`) | `after-commit.sh` | n/a |
| AfterPush | PostToolUse | `Bash` (command contained `git push`) | `after-push.sh` | n/a |
| AfterDocumentation | PostToolUse | `Write`/`Edit` under `docs/` | `after-documentation.sh` | n/a |
| AfterIndexUpdate | PostToolUse | `Write`/`Edit` on `ai/knowledge/retrieval/inventory.json` | `after-index-update.sh` | n/a |
| AfterDiscovery | PostToolUse | Drive MCP read/search tools | `after-discovery.sh` | n/a |
| (existing) | PostToolUse | `Write`/`Edit` on `docs/decisions/ADR-*.md` | `check-adr-sequence.sh` | n/a |

## What hooks can and can't do

Hooks are shell commands triggered by tool events. They can do mechanical, pattern-based checks — a file path matches a protected prefix, a command string contains `--force` — and warn or block on that basis. They **cannot** perform semantic reasoning (deciding whether a change is architecturally sound, whether an ADR is actually needed, whether a Drive document is relevant). That judgment still happens in the normal course of a Claude session; hooks are a safety net under it, not a replacement for it.

## Testing a hook manually

```bash
echo '{"tool_name":"Bash","tool_input":{"command":"git push --force origin main"}}' | bash .claude/hooks/before-push.sh; echo "exit: $?"
```
