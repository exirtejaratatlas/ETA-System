---
name: eta-deployment
description: Use when discussing how ETA-System would be deployed — CI/CD, containers, environments, or infra-as-code. Trigger on "deploy this," "CI/CD pipeline," "docker-compose," or "what environments do we have."
version: 1.0.0
last_updated: 2026-07-24
dependencies:
  - eta-production-safety
related_skills:
  - eta-testing
  - eta-odoo
related_adrs:
  - ADR-0001-eta-system-target-architecture
  - ADR-0006-secrets-management
---

# ETA Deployment

## Ground truth

`infra/` (`iac`, `k8s`, `messaging`, `observability`, `secrets`, `environments`) is the frozen-architecture home for all infrastructure-as-code — currently stubs. A root `docker-compose.yml` exists and has been actively modified this session (see git status) — check its current content directly rather than assuming it matches any prior description, since it's mid-iteration. The real Odoo/Postgres dev environment (`eta-odoo` skill) is a deployment target, not something this repo's CI deploys to yet.

## Best practices

- No deployment pipeline exists yet — don't reference a CI/CD process as if it's live; check `.github/workflows/` (if present) directly.
- Secrets belong in `platform/secrets` (ADR-0006) or environment-local `.env` files excluded by `.gitignore` — never hardcoded, mirroring the exact mistake found in the prototype `docker-compose.yml` prior art.
- Any deploy-shaped action (starting/stopping the real dev stack, applying infra changes) is production-adjacent — confirm scope and get explicit confirmation before mutating commands, per `eta-production-safety`.

## Limitations

No environments (`infra/environments`) are defined yet beyond the ad hoc local `docker-compose.yml` — "staging" and "production" are architectural placeholders, not real targets, until an ADR and actual IaC exist.
