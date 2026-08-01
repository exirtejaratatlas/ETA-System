# ADR-0011: Odoo/Postgres Prototype Prior Art (Knowledge Source Amendment)

Status: Accepted — refines ADR-0003 and informs future Phase 7, does not replace either
Date: 2026-07-23

## Context

Per the standing rule to exhaustively check all knowledge sources before implementing a phase, the `ETA-Platform/config/docker-compose.yml` file in the `ETA-Knowledge-v1` Google Drive folder (flagged as existing in an earlier audit but not read in full at the time) was read in full before starting Phase 2. It contains real prior art from an actual prototyping attempt, not a hypothetical:

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: eta
      POSTGRES_USER: odoo
      POSTGRES_PASSWORD: odoo
    ports: ["5432:5432"]
    volumes: ["./postgres:/var/lib/postgresql/data"]

  odoo:
    image: python:3.12
    working_dir: /opt/odoo
    depends_on: [postgres]
    ports: ["8069:8069"]
    volumes:
      - ./odoo:/opt/odoo
      - ./addons:/opt/odoo/custom_addons
      - ./config:/etc/odoo
      - ./logs:/var/log/odoo
    command: builds Odoo from source (apt build deps, pip install -r requirements.txt) and runs
      odoo-bin -d eta --db_host=postgres --db_user=odoo --db_password=odoo
```

This matches the two vendored Odoo-18 source trees also found in Drive, and the crashed `odoo.log` (database `eta` never initialized with `-i base`) found in the same earlier audit.

## What this confirms

- **Postgres 16** specifically, not just "Postgres" (refines ADR-0003's engine choice with a real version).
- **Database naming convention: `eta`** — already used in real prior art, not invented here.
- **The intended Odoo deployment pattern is from-source with a `custom_addons` mount**, not a fork of Odoo core and not the official Odoo Docker image. This is the correct, standard Odoo practice (customize via addons, never modify vendored core) and directly validates the anti-corruption-layer stance already in ADR-0001: `integrations/odoo` should own the `custom_addons` content, not a copy of Odoo core.

## What this flags as a problem, not a pattern to repeat

- The prototype hardcodes **`odoo`/`odoo` as both the Postgres username and password** — a trivial, insecure default. This is prior art to learn from, not to copy. Any real environment configuration must pull this from `platform/secrets` (ADR-0006), never hardcode it, regardless of what the prototype did.
- The two full vendored Odoo source trees in Drive (hundreds of MB each, duplicated) are almost certainly an artifact of copying the whole `./odoo` bind-mount directory into a backup, not a deliberate design choice — the deliberate design choice is the `custom_addons` folder, which is small and is the part actually worth carrying forward.

## Decision

- Adopt **Postgres 16** and the **`eta`** database name as the concrete parameters under ADR-0003, rather than leaving them unspecified.
- When `integrations/odoo` is implemented (Phase 7), its structure should mirror the proven `custom_addons`-mount pattern — an addons directory, not a vendored Odoo core copy.
- Credentials for any real environment go through `platform/secrets`, never hardcoded, regardless of this prior art's pattern.

## Consequences

- This ADR amends ADR-0003 by adding version/naming specificity; it does not reverse or replace the original decision (Postgres, chosen for Odoo-first ERP integration).
- No file in this repository copies the vendored Odoo source or the weak credentials forward — only the naming convention and the addons-mount deployment pattern are carried forward, deliberately, as documented here.
