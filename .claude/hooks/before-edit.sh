#!/bin/bash
# PreToolUse (Edit). Warns when editing an already-accepted ADR (ADRs are
# append/supersede, not rewrite-in-place) or a frozen architecture doc.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
file_path=$(hook_file_path)
[ -z "$file_path" ] && exit 0

case "$file_path" in
  */docs/decisions/ADR-*.md)
    hook_warn "editing an existing ADR ($file_path) — accepted ADRs should be superseded by a new ADR, not rewritten in place, unless this is a typo/formatting fix"
    ;;
  */docs/architecture/repository-structure.md|*/docs/architecture/context-map.md|*/docs/decisions/ADR-0001-*.md)
    hook_warn "editing frozen target-architecture documentation ($file_path) — structural changes require a new ADR per the ADR-0001 freeze"
    ;;
esac
exit 0
