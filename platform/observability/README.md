# platform/observability

Structured logging, distributed tracing, and metrics client libraries and conventions, including correlation/trace-ID propagation across domain -> event -> agent boundaries.

**Status: Implemented.** Traceable to: architecture gate review finding (correlation-ID propagation gap). `correlation-context.ts` uses `AsyncLocalStorage` so every `Logger` call automatically carries the current correlation ID across async boundaries — this is what makes a single business transaction traceable across the domain → event → agent chain.
