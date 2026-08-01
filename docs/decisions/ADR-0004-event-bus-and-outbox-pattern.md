# ADR-0004: Event Bus and Transactional Outbox

Status: Accepted
Date: 2026-07-23

## Context

Event-Driven Architecture is core to the frozen design (ADR-0001), but no broker technology was chosen, and the audit flagged that any domain which both persists state and publishes an event needs a transactional consistency pattern decided before it's built — retrofitting this after the fact is expensive across every domain.

## Decision

- **NATS with JetStream** is the event bus. Chosen over Kafka for a materially lighter operational footprint at current team/traffic scale, while still supporting durable streams, pub/sub, and request/reply — Kafka's operational overhead is not justified yet.
- Every domain write path that both persists and publishes uses the **transactional outbox pattern**: the domain event is written to an outbox table in the same database transaction as the state change, and a separate relay process publishes from the outbox to NATS. No domain publishes an event as a second, unguarded step after its own commit.
- Event schemas are versioned from the first event onward (additive-only changes preferred; breaking changes require a new event type version, not an in-place mutation).

## Consequences

- `platform/events` wraps NATS and owns the outbox-relay mechanism as a shared capability, so individual domains don't reimplement it.
- `platform/persistence` includes the outbox table convention as part of its base repository pattern.
- If scale later demands Kafka's throughput or ecosystem, the migration is isolated behind the `platform/events` interface — this is exactly the kind of change ADR-0002's tooling and ADR-0001's hexagonal seams are meant to make survivable.
