import { Currency } from './currency.js';
import { Result, ok, err } from './result.js';

/**
 * Money value object. Amount is stored in integer minor units (e.g. cents)
 * to avoid floating-point rounding errors in financial calculations —
 * this is a hard requirement for a procurement/invoicing system, not a
 * style preference.
 */
export class Money {
  private constructor(
    private readonly minorUnits: bigint,
    readonly currency: Currency,
  ) {}

  static of(minorUnits: bigint | number, currency: Currency): Money {
    return new Money(BigInt(minorUnits), currency);
  }

  static zero(currency: Currency): Money {
    return new Money(0n, currency);
  }

  add(other: Money): Result<Money, string> {
    if (!this.currency.equals(other.currency)) {
      return err(`Cannot add ${other.currency.toString()} to ${this.currency.toString()}`);
    }
    return ok(new Money(this.minorUnits + other.minorUnits, this.currency));
  }

  subtract(other: Money): Result<Money, string> {
    if (!this.currency.equals(other.currency)) {
      return err(`Cannot subtract ${other.currency.toString()} from ${this.currency.toString()}`);
    }
    return ok(new Money(this.minorUnits - other.minorUnits, this.currency));
  }

  multiply(factor: number): Money {
    return new Money(BigInt(Math.round(Number(this.minorUnits) * factor)), this.currency);
  }

  isNegative(): boolean {
    return this.minorUnits < 0n;
  }

  isZero(): boolean {
    return this.minorUnits === 0n;
  }

  equals(other: Money): boolean {
    return this.currency.equals(other.currency) && this.minorUnits === other.minorUnits;
  }

  toMinorUnits(): bigint {
    return this.minorUnits;
  }

  toString(): string {
    return `${this.minorUnits.toString()} ${this.currency.toString()} (minor units)`;
  }
}
