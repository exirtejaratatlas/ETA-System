#!/bin/bash
# PreToolUse (Bash|Write). This bootstrap's mission explicitly excludes the
# website — warn loudly if a command/write looks like it deploys or mutates
# a live site, since that's out of scope for "build the Claude OS" work.
source "$(dirname "$0")/lib/common.sh"
hook_read_input
tool=$(hook_tool_name)
command=$(hook_command)
file_path=$(hook_file_path)

target="$command $file_path"
case "$target" in
  *"apps/web"*deploy*|*vercel*deploy*|*netlify*deploy*|*"publish_website"*|*"deploy_website"*)
    hook_warn "this looks like a website deploy/publish action — the current mandate is Claude-OS infrastructure only; confirm the user actually asked for a website change before proceeding"
    ;;
esac
exit 0
