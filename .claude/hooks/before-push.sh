#!/bin/bash
# PreToolUse (Bash), fires on any command containing "git push". Blocks
# force-pushes to main/master; warns (non-blocking) on every other push.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
case "$command" in
  *"git push"*) ;;
  *) exit 0 ;;
esac

if printf '%s' "$command" | grep -Eq -- '--force|(^|[[:space:]])-f([[:space:]]|$)'; then
  if printf '%s' "$command" | grep -Eq '(^|[[:space:]])(origin[[:space:]]+)?(main|master)([[:space:]]|$)'; then
    hook_block "force-push to main/master ($command) — this can overwrite remote history; get explicit user confirmation and drop --force if it isn't truly required"
  fi
  hook_warn "force-push detected ($command) — confirm this is intended and the branch isn't shared"
fi

hook_note "pushing to a remote — per ADR-0010 this repo is proprietary; confirm the target remote/visibility is correct before pushing"
exit 0
