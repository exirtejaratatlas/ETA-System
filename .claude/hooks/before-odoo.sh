#!/bin/bash
# PreToolUse (Bash). Warns before commands that touch the real, running Odoo
# 19 / Postgres 17 dev environment at /Users/ali/Development/ETA — it holds
# no custom addons or real data yet, but it is a live environment, not a
# throwaway; never silently recreate or wipe it.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
[ -z "$command" ] && exit 0

case "$command" in
  *"Development/ETA"*|*odoo*|*Odoo*)
    if printf '%s' "$command" | grep -Eq 'down[[:space:]]+-v|docker[[:space:]]+volume[[:space:]]+rm|dropdb|DROP[[:space:]]+DATABASE'; then
      hook_warn "command may destroy Odoo/Postgres data in the real dev environment ($command) — this env already exists at /Users/ali/Development/ETA, never recreate or wipe it without explicit confirmation"
    else
      hook_note "command touches Odoo ($command) — the dev environment at /Users/ali/Development/ETA is real and already running; prefer read-only inspection unless implementation was explicitly requested"
    fi
    ;;
esac
exit 0
