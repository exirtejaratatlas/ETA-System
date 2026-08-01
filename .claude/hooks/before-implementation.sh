#!/bin/bash
# PreToolUse (Write|Edit). Fires on writes under the frozen business packages
# (domains/platform/ai/integrations/data/infra) — the ten-step order
# (Understand -> Research -> Validate -> Cross-check -> Design -> ADR ->
# Update Knowledge -> Implement -> Test -> Document) applies here, and this
# is exactly the surface where the "no duplicate concepts" rule matters most.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
file_path=$(hook_file_path)
[ -z "$file_path" ] && exit 0

repo_root=$(hook_repo_root)
[ -z "$repo_root" ] && exit 0
rel=${file_path#"$repo_root"/}

case "$rel" in
  domains/*|platform/*|ai/*|integrations/*|data/*|infra/*)
    # Only worth a note for genuinely new implementation files, not README stubs.
    case "$rel" in
      */README.md|*/.gitkeep) exit 0 ;;
    esac
    hook_note "implementing under $rel — confirm this doesn't duplicate an existing domain/platform/integration capability, and that it traces to an ADR + a knowledge source per the standing implementation order"
    ;;
esac
exit 0
