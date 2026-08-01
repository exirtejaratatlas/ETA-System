# ADR-0009: Knowledge Base Taxonomy Reconciliation

Status: Accepted
Date: 2026-07-23

## Context

The `ETA-Knowledge-v1` Google Drive folder was found to contain two independently-numbered taxonomies: a top-level scheme (`02_Brand`, `07_Procurement`, `08_Odoo`, `09_Blueprint`, `14_Database`, ...) and a second, nested scheme inside `00-KNOWLEDGE/` (`02-BRANDING`, `06-ODOO`, `09-DATABASE`, `15-BLUEPRINT`, ...) that assigns different meanings to the same numbers. This is the same duplicate-taxonomy pattern the repository itself exhibited (`00-System/` vs `bootstrap/`), occurring independently in a second source.

## Decision

The repository's `docs/architecture/` and this ADR sequence are the single source of truth for ETA-System's structure and terminology going forward. The Drive knowledge base is treated as an **asset repository** (real files: brand assets, commercial document templates, vendored Odoo source, business documents) rather than a documentation source of truth, until its own taxonomy is reconciled to mirror the repository's naming.

Reconciling the Drive's two taxonomies into one is out of this repository's scope to execute (it requires Drive edit access and is not a git operation) and is tracked here as a follow-up owned by the user, not executed as part of this ADR.

## Consequences

- Anyone referencing the Drive for architectural terminology should defer to `docs/architecture/` and this ADR sequence when the two disagree.
- Real content worth retaining from the Drive (brand assets, commercial templates) should eventually be migrated into `platform/design-system` and `platform/documents` respectively, once those are implemented — tracked as a later phase item, not part of Phase 0/1.
