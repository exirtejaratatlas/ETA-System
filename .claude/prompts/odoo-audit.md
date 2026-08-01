# Prompt: Odoo Audit

**Use with:** `eta-odoo`, `eta-production-safety`

```
Audit the current state of the ETA Odoo environment at /Users/ali/Development/ETA.
Use read-only inspection only (docker ps, docker logs, read-only SQL) —
this is a real running environment, not a sandbox; do not install modules,
change config, or write data without explicit confirmation.

Report: Odoo/Postgres versions, installed apps/modules, whether Purchase/CRM
are configured, and any data present. Compare against the last verified
state in .claude/memory/odoo.md and flag anything that's changed.
```
