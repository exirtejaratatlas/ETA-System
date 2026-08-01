#!/bin/bash
# PostToolUse (Bash). Fires after any command containing "git push".
# Advisory only.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
case "$command" in
  *"git push"*)
    hook_note "pushed to remote — if this was meant to open/update a PR, confirm that happened; gh pr status is a quick check"
    ;;
  *) exit 0 ;;
esac
exit 0
