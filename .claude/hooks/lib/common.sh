#!/bin/bash
# Shared helpers for ETA-System hooks. Source this, don't execute it.
# Every hook reads the same PreToolUse/PostToolUse JSON payload on stdin;
# this centralizes the jq parsing so individual hooks stay one screen long.

hook_read_input() {
  HOOK_INPUT=$(cat)
}

hook_tool_name() {
  printf '%s' "$HOOK_INPUT" | jq -r '.tool_name // empty' 2>/dev/null
}

hook_file_path() {
  printf '%s' "$HOOK_INPUT" | jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null
}

hook_command() {
  printf '%s' "$HOOK_INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null
}

hook_repo_root() {
  git rev-parse --show-toplevel 2>/dev/null
}

# Non-blocking: prints a warning to stderr, always exits 0 from the caller.
hook_warn() {
  echo "[$(basename "$0")] WARNING: $1" >&2
}

# Non-blocking informational note (visible to the user, not styled as a warning).
hook_note() {
  echo "[$(basename "$0")] NOTE: $1" >&2
}

# Blocking: prints a reason to stderr and exits 2, which Claude Code treats
# as "deny this tool call, feed stderr back as context." Only use this for
# genuinely destructive/irreversible actions, never for style or convention.
hook_block() {
  echo "[$(basename "$0")] BLOCKED: $1" >&2
  exit 2
}
