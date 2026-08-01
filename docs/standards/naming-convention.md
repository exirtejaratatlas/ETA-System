# Naming Convention

- Directories: kebab-case (`platform/workflow-engine`).
- TypeScript files: kebab-case (`create-purchase-order.command.ts`), suffixed by role where useful (`.command.ts`, `.query.ts`, `.port.ts`, `.adapter.ts`).
- Python files: snake_case, per PEP 8.
- Domain events: `PastTenseVerb` naming (`PurchaseOrderApproved`, not `ApprovePurchaseOrder`) — an event describes something that already happened.
- ADRs: `ADR-NNNN-short-kebab-title.md`, sequential, in `docs/decisions/`.
