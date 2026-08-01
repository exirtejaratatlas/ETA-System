# ADR-0013: CRM Target System — Microsoft Dynamics CRM

Status: Superseded by [ADR-0016](ADR-0016-remove-dynamics-crm-eta-platform-extends-odoo.md)
Date: 2026-07-23

## Context

`integrations/crm` was scaffolded in Phase 1 with no target system chosen — every prior audit flagged this as a fully open decision with zero prior art. The `ETA-Blueprint` knowledge-base vault repeatedly names **Microsoft Dynamics CRM** as the legacy/target CRM system (e.g. in Stakeholders.md and Integration-Architecture.md), described as a read-only migration source. See [Conflict Report CR-002](../architecture/CONFLICT-REPORT.md#cr-002-crm-target-system--previously-open-now-answered-by-the-semantic-index).

## Decision

`integrations/crm` targets **Microsoft Dynamics CRM**. Initial integration direction is **read-only** (migrating/syncing existing CRM data into ETA-System's `domains/suppliers` and any future customer-relationship context), matching the vault's own framing — not a bidirectional sync from day one.

## Consequences

- `integrations/crm`'s anti-corruption layer translates Dynamics' entity model (contacts, accounts, opportunities) into ETA-System's domain language, never leaking Dynamics API shapes into `domains/`.
- Bidirectional sync, if ever needed, is a separate future decision, not assumed here.
- This does not preclude Odoo's own CRM app (referenced in the Blueprint vault's domain-to-Odoo mappings) from being used for anything Odoo already owns — Dynamics is specifically the legacy/external CRM being integrated with, not a replacement for Odoo-native CRM functionality if any exists.
