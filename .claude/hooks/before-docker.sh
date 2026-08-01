#!/bin/bash
# PreToolUse (Bash). Warns on mutating Docker commands (as opposed to
# read-only info/ps/logs) against the local dev stack.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
case "$command" in
  *docker*) ;;
  *) exit 0 ;;
esac

case "$command" in
  *"docker compose down"*"-v"*|*"docker volume rm"*|*"docker volume prune"*|*"docker system prune"*)
    hook_warn "destructive Docker command detected ($command) — this can delete volumes/data for the local dev stack (Postgres included); confirm before running"
    ;;
  *"docker ps"*|*"docker info"*|*"docker version"*|*"docker logs"*|*"docker inspect"*|*"docker port"*)
    ;; # read-only, no warning
  *"docker "*)
    hook_note "Docker command detected ($command) — verify it targets the intended container/compose project"
    ;;
esac
exit 0
