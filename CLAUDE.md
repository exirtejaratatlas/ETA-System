# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

ETA-System ("Enterprise Procurement AI Operating System") is in **bootstrap** status. The repository currently consists almost entirely of an empty directory taxonomy: every `.md` file and `docker-compose.yml` is a 0-byte placeholder except `README.md` and `LICENSE`. There is no `package.json`, no source code, no build tooling, no test suite, and no lockfile anywhere in the tree.

**Do not assume build/lint/test commands exist.** Before running or suggesting any command (`npm run ...`, `pytest`, `docker compose up`, etc.), verify the relevant config/manifest file actually exists and is non-empty — most currently do not. If asked to implement something, expect to be creating the first real files in that part of the tree, not editing existing ones.

`.gitignore` hints at the intended stack even though nothing is implemented yet: Node/`node_modules`, Next.js (`.next`), Python (`__pycache__`, `.pytest_cache`), Postgres (`postgres/`), plus generic `dist/`, `build/`, `coverage/`, `logs/`, `backups/`.

## Repository layout (intended architecture)

The folder structure is the closest thing this repo has to an architecture document — it defines where future content is meant to live. Names are self-describing; the notable groupings are:

- **`00-System/`** — root-level system docs (manifest, changelog, project index, agent registry) for the overall AI operating system.
- **`agents/`** — one registry file per AI agent integration (`Claude-Code.md`, `ChatGPT.md`, `Claude-CoWork.md`, `Codex.md`), plus `Agent-Roles.md` defining responsibilities across agents. `Claude-Code`, `ChatGPT`, and `Claude-CoWork` each also have a matching subfolder (`claude-code/`, `chatgpt/`, `claude-cowork/`); `Codex` currently has only its file, no subfolder yet. This suggests the system is designed to be operated by multiple AI agents/tools, not just Claude Code.
- **`architecture/`** and **`docs/architecture/`** — system and knowledge architecture references.
- **`decisions/`** — ADRs (architecture decision records), numbered sequentially (`ADR-001-...`).
- **`docs/`** — setup instructions, folder/repository maps, coding standards/conventions.
- **`governance/`** — AI governance and security policy documents.
- **`packages/`** — intended monorepo packages: `branding`, `database`, `documents`, `procurement`, `prompts`, `workflows`. Each currently has only an empty `README.md` — this is where actual application code is expected to land.
- **`releases/`** and **`roadmap/`** — release planning and the master roadmap.
- **`standards/`** — Git workflow, naming conventions, and repository standards meant to govern contributions.
- **`templates/`** — templates for new project and README files.

When adding real content, place it under the package/folder whose name matches its purpose (e.g., database schema/migrations under `packages/database/`, procurement domain logic under `packages/procurement/`, LLM prompt assets under `packages/prompts/`) rather than inventing new top-level directories.

## License

Proprietary — Copyright (c) Exir Tejarat Atlas, All Rights Reserved. This is not an open-source project.
