---
name: eta-testing
description: Use when writing or planning tests for ETA-System code, or asked about test coverage/strategy. Trigger on "write tests for," "test strategy," "what's our test coverage," or "how should we test this."
version: 1.0.0
last_updated: 2026-07-24
dependencies: []
related_skills:
  - eta-architecture
  - eta-deployment
---

# ETA Testing

## Ground truth

No test suite existed anywhere in the repo as of the last verified check (`CLAUDE.md`) beyond what's been added since. `vitest.config.ts` and a small set of Python `unittest` tests exist for `ai/knowledge/retrieval/` (`test_inventory_store.py`, `test_discovery_log.py`) — verify current state with `find . -name '*.test.*' -o -name 'test_*.py'` rather than trusting this description as it ages.

## Best practices

- Match the language split (ADR-0002): Vitest for TypeScript packages (`apps/`, `domains/`, `platform/`, `integrations/`, `data/`), `unittest`/`pytest` for `ai/`.
- Before writing tests for a new capability, confirm the relevant test runner config actually exists and is wired up (`npx vitest`, `python3 -m unittest`) — don't assume a command works without checking.
- Follow the existing `ai/knowledge/retrieval/` tests as the house style reference for that half of the codebase (Python, `unittest`, one test file per module).
- For anything hexagonal-layered (`domains/*`), test the `domain/` and `application/` layers in isolation from `adapters/` — that's the whole point of the port/adapter boundary.

## Limitations

Coverage is effectively zero outside `ai/knowledge/retrieval/`. Any claim about "our test coverage" for business logic resolves to `UNKNOWN` — there's no business logic yet to have coverage of.
