/**
 * Secrets client interface (ADR-0006). Every consumer codes against this,
 * never against a specific backend directly — swapping the backend later
 * touches one implementation, not every caller.
 */
export interface SecretsProvider {
  get(key: string): Promise<string>;
  /** Returns null instead of throwing when the key is absent — lets callers decide fallback behavior. */
  tryGet(key: string): Promise<string | null>;
}

export class SecretNotFoundError extends Error {
  constructor(readonly key: string) {
    super(`Secret not found: "${key}"`);
    this.name = 'SecretNotFoundError';
  }
}
