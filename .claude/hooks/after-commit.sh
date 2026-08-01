#!/bin/bash
# PostToolUse (Bash). Fires after any command containing "git commit".
# Advisory only — reminds to keep docs/memory in sync when the commit
# touched architecture-relevant paths.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
case "$command" in
  *"git commit"*) ;;
  *) exit 0 ;;
esac

repo_root=$(hook_repo_root)
[ -z "$repo_root" ] && exit 0
changed=$(git -C "$repo_root" diff --name-only HEAD~1 HEAD 2>/dev/null)
if printf '%s\n' "$changed" | grep -q '^docs/decisions/ADR-'; then
  hook_note "commit touched an ADR — confirm docs/architecture/context-map.md or repository-structure.md are still accurate, and record the decision in memory if it's user-confirmed"
fi
exit 0
