# ADR-0014: Vector Database for AI Knowledge Retrieval — Qdrant

Status: Accepted
Date: 2026-07-23

## Context

`ai/knowledge/retrieval` (ADR-0001) had no vector-store technology decided. The `ETA-Blueprint` knowledge-base vault specifies **Qdrant** as part of its named architecture stack. See [Conflict Report CR-004](../architecture/CONFLICT-REPORT.md#cr-004-vector-database-for-ai-knowledge-retrieval--net-new-decision).

## Decision

Adopt **Qdrant** as the vector database backing `ai/knowledge/retrieval`'s RAG/embedding search. Runs self-hosted (Docker), consistent with the project's general preference for self-hosted infrastructure at current scale (ADR-0004, ADR-0006).

## Consequences

- `ai/knowledge/retrieval` (Python, per ADR-0002) integrates via Qdrant's client library.
- `infra/iac` gains a Qdrant service definition alongside Postgres (ADR-0003) and NATS (ADR-0004) when Phase 13 infrastructure work reaches it.
- Embedding model choice is a separate, still-open decision, not addressed here.
