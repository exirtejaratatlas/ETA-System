# platform/events

Event bus abstraction over NATS/JetStream (ADR-0004), the outbox-relay mechanism, and the event schema registry.

**Status: Implemented.** Traceable to: ADR-0004 (NATS + transactional outbox). `NatsEventBus` implements the `EventBus` interface against `@nats-io/transport-node`. `outbox-relay-loop.ts` wires platform/persistence's generic `OutboxRelay` to a concrete bus — this is the only place the outbox-to-bus connection is made, keeping platform/persistence bus-agnostic.
