# ADR-0012: Identity Provider — Keycloak

Status: Accepted — refines ADR-0007, does not replace it
Date: 2026-07-23

## Context

ADR-0007 established the identity/authorization model (OIDC SSO, RBAC, delegated AI-agent authority) but left the specific identity provider unspecified. The `ETA-Blueprint` knowledge-base vault's architecture documentation specifies Keycloak explicitly, preferred over Auth0, as part of its named security stack (OAuth2/OIDC/RBAC/MFA). See [Conflict Report CR-003](../architecture/CONFLICT-REPORT.md#cr-003-identity-provider--previously-unspecified-now-answered-by-the-semantic-index).

## Decision

Adopt **Keycloak** as the identity provider implementing ADR-0007's OIDC/RBAC model. Self-hosted, consistent with the project's general preference (per ADR-0006) for avoiding unnecessary managed-service dependencies at current scale, while still being a mature, audited OSS identity platform rather than a custom-built auth system.

## Consequences

- `apps/gateway` and `apps/bff` integrate against Keycloak's OIDC endpoints.
- `infra/iac` will need a Keycloak realm/client provisioning module when Phase 13 (Deployment) work reaches identity infrastructure.
- ADR-0007's RBAC role model maps onto Keycloak realm roles/client roles; this mapping is an implementation detail of Phase 1/6, not a further architectural decision.
