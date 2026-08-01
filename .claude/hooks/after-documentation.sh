#!/bin/bash
# PostToolUse (Write|Edit) on docs/**. Advisory reminder to keep the docs
# single-source-of-truth statement (CLAUDE.md) honest.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
file_path=$(hook_file_path)
case "$file_path" in
  */docs/*) ;;
  *) exit 0 ;;
esac

case "$file_path" in
  */docs/decisions/ADR-*.md)
    hook_note "ADR written/edited — confirm it's linked from any other ADR/doc that references its decision area, so docs/ stays the single source of truth"
    ;;
esac
exit 0
