#!/bin/bash
# PostToolUse hook (Write|Edit). Reads the hook input JSON from stdin; if the
# edited file is an ADR under docs/decisions/, checks the whole ADR-*.md
# sequence for duplicate or skipped numbers and warns on stderr. Silent
# (exit 0, no output) for any other file or when the sequence is clean.

input=$(cat)
file_path=$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)

case "$file_path" in
  */docs/decisions/ADR-*.md) ;;
  *) exit 0 ;;
esac

repo_root=$(git -C "$(dirname "$file_path")" rev-parse --show-toplevel 2>/dev/null)
if [ -z "$repo_root" ]; then
  exit 0
fi
adr_dir="$repo_root/docs/decisions"

numbers=$(ls "$adr_dir"/ADR-*.md 2>/dev/null | sed -E 's/.*ADR-([0-9]+)-.*/\1/' | sort -n)
[ -z "$numbers" ] && exit 0

duplicates=$(printf '%s\n' "$numbers" | uniq -d)
if [ -n "$duplicates" ]; then
  echo "WARNING: duplicate ADR number(s): $(printf '%s' "$duplicates" | tr '\n' ' ')" >&2
fi

prev=""
gaps=""
for n in $numbers; do
  n_int=$((10#$n))
  if [ -n "$prev" ] && [ $((n_int - prev)) -gt 1 ]; then
    gaps="$gaps $((prev + 1))-$((n_int - 1))"
  fi
  prev=$n_int
done
if [ -n "$gaps" ]; then
  echo "WARNING: gap(s) in ADR numbering:$gaps" >&2
fi

exit 0
