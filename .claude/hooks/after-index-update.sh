#!/bin/bash
# PostToolUse (Write|Edit) on ai/knowledge/retrieval/inventory.json.
# Advisory: an inventory update should usually come with a discovery_log
# entry — this just checks the log's mtime isn't stale relative to the index.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
file_path=$(hook_file_path)
case "$file_path" in
  */ai/knowledge/retrieval/inventory.json) ;;
  *) exit 0 ;;
esac

repo_root=$(hook_repo_root)
[ -z "$repo_root" ] && exit 0
log_file="$repo_root/ai/knowledge/retrieval/discovery_log.json"
if [ -f "$log_file" ] && [ "$file_path" -nt "$log_file" ]; then
  hook_note "inventory.json was just updated but discovery_log.json looks older — if this was a new finding (not a routine edit), append a DISC-NNNN record via DiscoveryLog.append so it's traceable"
fi
exit 0
