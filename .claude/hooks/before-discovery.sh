#!/bin/bash
# PreToolUse. Fires on Google Drive search tools (search_files). Reminds to
# check discovery_log.json for prior scope overlap before a fresh crawl.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
tool=$(hook_tool_name)
case "$tool" in
  *search_files*)
    hook_note "starting a Drive search — check ai/knowledge/retrieval/discovery_log.json first; a prior DISC-NNNN record may already cover this scope. Never enumerate the whole ~100k-file vault."
    ;;
  *) exit 0 ;;
esac
exit 0
