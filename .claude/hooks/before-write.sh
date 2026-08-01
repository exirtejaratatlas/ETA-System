#!/bin/bash
# PreToolUse (Write). Warns when a write targets a secret-looking file or a
# path outside the ten frozen top-level packages (ADR-0001) plus docs/.claude —
# i.e. a brand-new top-level concept, which per standing project rule needs
# an ADR before it exists, not an ad hoc file.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
file_path=$(hook_file_path)
[ -z "$file_path" ] && exit 0

case "$file_path" in
  *.env|*.env.*|*credentials*.json|*secrets*.json|*id_rsa*|*.pem)
    hook_warn "writing to a secret-looking file ($file_path) — never commit real credentials; use platform/secrets or a local .env excluded by .gitignore"
    ;;
esac

repo_root=$(hook_repo_root)
if [ -n "$repo_root" ]; then
  rel=${file_path#"$repo_root"/}
  case "$rel" in
    apps/*|domains/*|platform/*|ai/*|integrations/*|data/*|infra/*|governance/*|docs/*|.claude/*|node_modules/*|*/node_modules/*|package.json|package-lock.json|nx.json|tsconfig*.json|vitest.config.ts|.gitignore|CLAUDE.md) ;;
    */*)
      top=$(printf '%s' "$rel" | cut -d/ -f1)
      hook_warn "'$top/' is not one of the ADR-0001 top-level packages — creating a new top-level concept needs an ADR first (see docs/decisions/), not an ad hoc directory"
      ;;
  esac
fi
exit 0
