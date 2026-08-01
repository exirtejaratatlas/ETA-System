# platform/kernel

Shared kernel (ADR-0001) — Money, Currency, EntityId, DomainEvent, Result. Deliberately minimal: every domain depends on this, so changes here are expensive and need a wider review than normal.

**Status: Implemented.** Traceable to: ADR-0001 (defines what belongs here) · ADR-0002 (TypeScript, Nx project structure). No separate business requirement — this is pure supporting infrastructure with no domain-specific behavior, so there is no business-requirement/knowledge-source leg for this particular package beyond the ADRs.

- `result.ts` — `Result<T, E>` for explicit success/failure instead of exceptions for expected domain/business failures.
- `entity-id.ts` — branded `EntityId<Brand>` so e.g. a supplier ID can't be passed where a purchase-order ID is expected.
- `currency.ts` — validated ISO 4217 currency code value object.
- `money.ts` — integer-minor-units money value object with currency-safe arithmetic (`add`/`subtract` return `Result`, refusing cross-currency operations rather than silently producing a wrong number).
- `domain-event.ts` — the event envelope every domain's concrete events extend; payload shapes are domain-specific and defined in each domain's own `domain/` layer, not here.

Every domain package depends on this; this package depends on nothing else in the repository.
