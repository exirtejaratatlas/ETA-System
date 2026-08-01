# Prompt: Odoo Development

**Use with:** `eta-odoo`, `eta-procurement`, `eta-adr`

```
Implement [specific Odoo customization/module] for ETA. Before writing code:
1. Confirm no existing ADR or integrations/odoo/ code already covers this.
2. Follow the standing implementation order: Understand -> Research ->
   Validate -> Cross-check -> Design -> ADR (if structural) -> Update
   Knowledge -> Implement -> Test -> Document.
3. Confirm whether this targets the real dev environment or a local test
   instance — never experiment destructively against the real one.

Custom-addon code belongs under integrations/odoo/ (the anti-corruption
layer), never directly inside a domains/ package.
```
