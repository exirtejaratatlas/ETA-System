# ADR-0006: Secrets Management

Status: Accepted
Date: 2026-07-23

## Context

The knowledge-base audit found a live `.env` file exposed in a general-purpose Google Drive folder — direct evidence that no secrets discipline currently exists. GitHub-side secret scanning and push protection are already enabled on the repository, but that protects git only, not Drive or any other shared store.

## Decision

- `platform/secrets` defines a minimal client interface now (`get(key)`, rotation hooks) that every consumer codes against, regardless of backend.
- Backend implementation is deferred, but the default direction is a **cloud-native secrets manager** (the chosen cloud provider's KMS/Secrets Manager, or a lightweight managed service) rather than self-hosting Vault — self-hosted Vault's operational overhead is not justified at current team scale.
- No secret value is ever committed to git or placed in a shared drive/document store, full stop. This is a standing rule, not a per-phase decision.

## Consequences

- Any credential that may exist in the currently-exposed Drive `.env` should be treated as compromised and rotated — that action belongs to the user, tracked separately from this ADR, and is not blocked on the backend vendor decision above.
- The client interface decided here means later swapping the backend vendor touches one implementation, not every consumer.
