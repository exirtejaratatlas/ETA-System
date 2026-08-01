#!/bin/bash
# PreToolUse (Bash), fires on any command containing "git commit". Warns
# (does not block) if likely-secret files are staged — mirrors the git-commit
# safety guidance already in CLAUDE-level instructions, enforced mechanically.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
command=$(hook_command)
case "$command" in
  *"git commit"*) ;;
  *) exit 0 ;;
esac

repo_root=$(hook_repo_root)
[ -z "$repo_root" ] && exit 0

staged=$(git -C "$repo_root" diff --cached --name-only 2>/dev/null)
risky=$(printf '%s\n' "$staged" | grep -Ei '\.env($|\.)|credential|secret|\.pem$|id_rsa' || true)
if [ -n "$risky" ]; then
  hook_warn "staged files look secret-related, double-check before committing: $(printf '%s' "$risky" | tr '\n' ' ')"
fi
exit 0
