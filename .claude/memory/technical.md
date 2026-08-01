# Technical Memory

**VERIFIED** — Language split ([ADR-0002](../../docs/decisions/ADR-0002-monorepo-tooling-and-runtime-split.md)): TypeScript for `apps/`, `domains/`, `platform/`, `integrations/`, `data/`; Python for `ai/`. Monorepo tooling: Nx (`nx.json` present at root).

**VERIFIED** — Database engine decided in [ADR-0003](../../docs/decisions/ADR-0003-database-engine.md); event bus/outbox pattern in [ADR-0004](../../docs/decisions/ADR-0004-event-bus-and-outbox-pattern.md); secrets management in [ADR-0006](../../docs/decisions/ADR-0006-secrets-management.md); identity/authz in [ADR-0007](../../docs/decisions/ADR-0007-identity-and-authorization-model.md) and [ADR-0012](../../docs/decisions/ADR-0012-identity-provider-keycloak.md) (Keycloak); vector database in [ADR-0014](../../docs/decisions/ADR-0014-vector-database-qdrant.md) (Qdrant).

**VERIFIED** (as of this build) — `package.json`, `package-lock.json`, `nx.json`, `tsconfig.base.json`, `vitest.config.ts` all exist at repo root — this is past the "no manifest exists" bootstrap stage `CLAUDE.md` originally described. Re-verify against the file tree directly rather than trusting `CLAUDE.md`'s bootstrap-stage framing as it ages.

**UNKNOWN** — Whether `npm run <script>` / `npx nx <target>` commands actually succeed end-to-end — presence of config files is not proof a pipeline runs clean; verify by executing, not by inspecting config.
