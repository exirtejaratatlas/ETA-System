import { Result, ok, err } from './result.js';

/**
 * ISO 4217 currency code value object. Deliberately just a validated code,
 * not a full currency metadata table (decimal places, symbols) — that
 * belongs in a presentation-layer concern, not the shared kernel.
 */
export class Currency {
  private constructor(readonly code: string) {}

  static of(code: string): Result<Currency, string> {
    const normalized = code.trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(normalized)) {
      return err(`Invalid ISO 4217 currency code: "${code}"`);
    }
    return ok(new Currency(normalized));
  }

  equals(other: Currency): boolean {
    return this.code === other.code;
  }

  toString(): string {
    return this.code;
  }
}
