#!/bin/bash
# PreToolUse (Bash). Fires on git fetch/pull/push involving a remote. Reminds
# that origin/develop and origin/feature/system-core carry an abandoned,
# never-merged taxonomy (ADR-0008) — don't sync/merge them in blind.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
case "$command" in
  *"git fetch"*|*"git pull"*|*"git push"*)
    if printf '%s' "$command" | grep -Eq 'develop|feature/system-core'; then
      hook_warn "syncing with develop or feature/system-core ($command) — these branches carry an abandoned, unmerged bootstrap taxonomy per ADR-0008; do not merge their content into main without reconciling first"
    fi
    ;;
  *) exit 0 ;;
esac
exit 0
