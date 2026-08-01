---
name: eta-googledrive
description: Use for the mechanics of querying the Google Drive MCP connector itself (search_files, read_file_content, download_file_content, get_file_metadata, list_recent_files) — as opposed to eta-knowledge-discovery, which covers the ETA-Knowledge-v1 folder map and evidence standard. Trigger on "how do I search Drive," "Drive connector," or when a Drive tool call is erroring.
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - Google Drive MCP connector
related_skills:
  - eta-knowledge-discovery
  - eta-evidence
  - eta-semantic-search
---

# ETA Google Drive (connector mechanics)

This skill is the thin technical layer under `eta-knowledge-discovery` — load that skill for the actual folder map, evidence standard, and business content. This one is just the connector's operating quirks.

## Best practices

- `search_files` supports Drive query syntax: `parentId = '<id>'` to list a folder's children, `title contains '<word>'` for name search. Combine with `excludeContentSnippets: true` for metadata-only passes.
- If a `search_files` call errors on size/token limits, retry with a smaller `pageSize` (10-15) rather than giving up.
- `read_file_content` works for text-native formats; fall back to `download_file_content` for binaries or unsupported mime types.
- `get_file_permissions` and `get_file_metadata` never return a checksum/hash field for this connector — always record content hash as `UNKNOWN`, never compute or guess one.
- `copy_file` and `create_file` are write operations against a real Drive — treat them with the same caution as any other write, and confirm with the user before creating/copying anything non-trivial.

## Limitations

No connector-level way to diff two file versions or get a true content hash. Change detection has to rely on `modifiedTime` comparisons, which is inherently coarser than a hash-based diff.
