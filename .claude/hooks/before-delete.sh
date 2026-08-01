#!/bin/bash
# PreToolUse (Bash). Blocks unscoped/repo-wide destructive deletes; warns on
# narrower ones. This is the one hook explicitly allowed to exit 2.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
[ -z "$command" ] && exit 0

# Unscoped or root-level rm -rf, git clean -f(d)(x), git reset --hard
if printf '%s' "$command" | grep -Eq 'rm[[:space:]]+-[a-zA-Z]*r[a-zA-Z]*f|rm[[:space:]]+-[a-zA-Z]*f[a-zA-Z]*r'; then
  if printf '%s' "$command" | grep -Eq 'rm[[:space:]]+-[a-zA-Z]+[[:space:]]+(/|~|\.[[:space:]]*$|\*[[:space:]]*$)'; then
    hook_block "unscoped destructive delete ($command) — targets repo root, home, or a bare wildcard; scope it to a specific path or get explicit confirmation"
  fi
  hook_warn "destructive delete detected ($command) — confirm the target path is correct and intentional"
fi

if printf '%s' "$command" | grep -Eq 'git clean[[:space:]]+-[a-zA-Z]*f'; then
  hook_warn "git clean (force) detected ($command) — this permanently deletes untracked files; run 'git status' first"
fi

if printf '%s' "$command" | grep -Eq 'git reset[[:space:]]+--hard'; then
  hook_warn "git reset --hard detected ($command) — this discards uncommitted work; confirm 'git status' is clean first"
fi
exit 0
