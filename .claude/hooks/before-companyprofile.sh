#!/bin/bash
# PreToolUse (Write|Edit). The Company Profile is explicitly out of scope for
# Claude-OS bootstrap work — warn if a write/edit targets a company-profile
# path so it isn't touched incidentally.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
file_path=$(hook_file_path)
[ -z "$file_path" ] && exit 0

case "$file_path" in
  *[Cc]ompany[-_]?[Pp]rofile*|*governance/company-profile*)
    hook_warn "this write/edit targets a Company Profile path ($file_path) — Company Profile changes are out of scope for Claude-OS infrastructure work; confirm this was explicitly requested"
    ;;
esac
exit 0
