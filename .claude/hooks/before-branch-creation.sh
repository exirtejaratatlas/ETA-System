#!/bin/bash
# PreToolUse (Bash). Fires on git branch/checkout -b. Reminds to check for an
# existing branch covering the same scope before creating a new one — this
# repo already has two abandoned branches from exactly that failure mode.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
case "$command" in
  *"git checkout -b"*|*"git branch "*|*"git switch -c"*)
    hook_note "creating a new branch ($command) — run 'git branch -a' first; origin/develop and origin/feature/system-core already exist and carry abandoned work (ADR-0008), don't recreate their scope"
    ;;
  *) exit 0 ;;
esac
exit 0
