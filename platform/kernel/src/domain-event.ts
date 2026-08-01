import { EntityId } from './entity-id.js';

/**
 * Base shape every domain event conforms to. Concrete events (e.g.
 * `PurchaseOrderApproved`) extend this in their owning domain's
 * `domain/` layer — the kernel defines the envelope, never the payloads,
 * since payload shapes are domain-specific by definition.
 *
 * Published via platform/events using the transactional outbox pattern
 * (ADR-0004) — never published as an unguarded side effect of a domain
 * write.
 */
export interface DomainEvent<Name extends string = string, Payload = unknown> {
  readonly eventName: Name;
  readonly aggregateId: EntityId<string>;
  readonly occurredAt: Date;
  readonly payload: Payload;
}

export function createDomainEvent<Name extends string, Payload>(
  eventName: Name,
  aggregateId: EntityId<string>,
  payload: Payload,
): DomainEvent<Name, Payload> {
  return { eventName, aggregateId, occurredAt: new Date(), payload };
}
