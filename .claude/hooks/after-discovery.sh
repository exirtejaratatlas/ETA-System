#!/bin/bash
# PostToolUse. Fires after Drive read/search tools return. Advisory reminder
# to persist genuinely new findings rather than letting them live only in
# the current conversation.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
tool=$(hook_tool_name)
case "$tool" in
  *search_files*|*read_file_content*|*download_file_content*)
    hook_note "if this Drive lookup surfaced a new fact, persist it: InventoryStore.upsert (inventory.json) and DiscoveryLog.append (discovery_log.json) — an unlogged finding has to be re-discovered next session"
    ;;
  *) exit 0 ;;
esac
exit 0
