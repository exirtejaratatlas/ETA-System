#!/bin/bash
# PreToolUse (Bash). Fires on git merge/rebase. Warns before merging anything
# into main given the unresolved taxonomy conflicts documented in ADR-0008/0009.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
case "$command" in
  *"git merge"*|*"git rebase"*)
    hook_warn "merge/rebase detected ($command) — check ADR-0008 (branch reconciliation) and ADR-0009 (knowledge-base taxonomy) before merging anything that isn't already reconciled with the frozen architecture"
    ;;
  *) exit 0 ;;
esac
exit 0
