import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

/**
 * Correlation/trace-ID propagation across async boundaries (the gap
 * flagged in the architecture gate review: without this, a single
 * business transaction can't be traced across the domain -> event ->
 * AI-agent chain). Uses AsyncLocalStorage so the ID is implicitly
 * available to every logger call within the same request/event handling
 * context, without threading it through every function signature.
 */
interface CorrelationContext {
  correlationId: string;
}

const storage = new AsyncLocalStorage<CorrelationContext>();

/** Runs `fn` with a correlation ID bound to the async context — call this once per inbound request or event handled. */
export function withCorrelationId<T>(fn: () => T, correlationId: string = randomUUID()): T {
  return storage.run({ correlationId }, fn);
}

/** Returns the current correlation ID, or undefined if called outside a withCorrelationId scope. */
export function getCorrelationId(): string | undefined {
  return storage.getStore()?.correlationId;
}
