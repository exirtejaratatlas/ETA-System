#!/bin/bash
# PreToolUse. Fires on Google Drive read tools (read_file_content /
# download_file_content). Non-blocking reminder to consult the existing
# semantic index before re-fetching content that may already be cached.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
tool=$(hook_tool_name)
case "$tool" in
  *read_file_content*|*download_file_content*|*get_file_metadata*)
    hook_note "reading a Drive document — check ai/knowledge/retrieval/inventory.json (via InventoryStore.verified_evidence_for) first; if it already has VERIFIED evidence for this document, you may not need to re-fetch it. See the eta-knowledge-discovery skill."
    ;;
  *) exit 0 ;;
esac
exit 0
