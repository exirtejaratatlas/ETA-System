# ADR-0007: Identity and Authorization Model

Status: Accepted
Date: 2026-07-23

## Context

Flagged across two gate reviews as the most significant missing decision: procurement approval workflows are, fundamentally, an authorization problem. Nothing in the frozen architecture addressed authentication, authorization, or how an AI agent acting on a user's behalf is authorized versus acting with standing authority of its own.

## Decision

- **Authentication:** OIDC-based SSO for human users. Specific identity provider is not committed in this ADR (a directory-integrated provider is the likely default given typical enterprise tooling, but selecting it is a separate, smaller decision that doesn't need to block this one).
- **Authorization:** RBAC as the baseline — role → permission → domain-action mapping, enforced at `apps/gateway` and re-checked at each domain's `application` layer, never trusted purely at the edge. Individual domains may layer ABAC refinements on top where RBAC is insufficient (e.g. approval authority tied to PO value thresholds) — that's a domain-level extension, not a re-litigation of this ADR.
- **AI agents never hold standing authority of their own.** An agent acting on behalf of a user carries that user's delegated authority as a scoped, time-limited token. Any agent action requiring authority beyond that must be explicitly granted through `ai/mcp-registry` or `platform/plugins`' permission model (see ADR-0001) — not implicitly assumed.

## Consequences

- `apps/gateway` and `apps/bff` must implement this before any procurement approval logic (`domains/procurement-core`) becomes meaningful — this is a real Phase 1/2 prerequisite for Phase 6, not a Phase 6-only concern.
- `ai/mcp-registry` and `platform/plugins` permission models must be designed against this same authorization model, not as separate parallel schemes (avoids the duplicate-authorization-system risk flagged in the prior audit).
