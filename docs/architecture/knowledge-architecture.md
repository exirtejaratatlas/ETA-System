# Knowledge Architecture

Describes `ai/knowledge/` (ADR-0001): `graph/` for relationship-aware reasoning (supplier ↔ contract ↔ spend-category relationships) and `retrieval/` for RAG/vector search over canonical documents. The two are kept distinct deliberately — `graph/` answers "how are these things related," `retrieval/` answers "what does our documentation say" — conflating them would blur what an agent asserts as fact versus what it retrieves as reference.

The Google Drive `ETA-Knowledge-v1` folder is the current source of raw material (business documents, brand assets, commercial templates) but is not itself the knowledge architecture — see [ADR-0009](../decisions/ADR-0009-knowledge-base-taxonomy-reconciliation.md) for why, and for the plan to migrate real assets into `platform/documents` and `platform/design-system` once implemented.
