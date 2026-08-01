#!/bin/bash
# PreToolUse (Write) on docs/decisions/ADR-*.md. Reminds of the ADR process
# before a brand-new ADR file is created (companion to the existing
# PostToolUse check-adr-sequence.sh, which checks numbering after the fact).
source "$(dirname "$0")/lib/common.sh"
hook_read_input
file_path=$(hook_file_path)
case "$file_path" in
  */docs/decisions/ADR-*.md) ;;
  *) exit 0 ;;
esac

if [ ! -f "$file_path" ]; then
  hook_note "creating a new ADR ($file_path) — confirm it doesn't overlap an existing ADR's scope (check docs/decisions/ first) and follow the repo's ADR template"
fi
exit 0
