# platform/secrets

Secrets-manager client abstraction (ADR-0006). No secret value is ever committed here or anywhere in this repository.

**Status: Implemented.** Traceable to: ADR-0006 (client interface now, backend vendor deferred). `EnvSecretsProvider` is a real, functioning implementation (not a placeholder) — appropriate for containerized deployments where secrets arrive as env vars. A cloud-native KMS-backed provider can implement the same `SecretsProvider` interface later without touching any consumer.
