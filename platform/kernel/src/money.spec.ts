import { describe, expect, it } from 'vitest';
import { Currency } from './currency';
import { Money } from './money';
import { isOk, isErr, unwrap } from './result';

describe('Money', () => {
  const usd = unwrap(Currency.of('usd'));
  const eur = unwrap(Currency.of('EUR'));

  it('adds two amounts in the same currency', () => {
    const a = Money.of(10_00n, usd);
    const b = Money.of(5_00n, usd);
    const result = a.add(b);
    expect(isOk(result)).toBe(true);
    if (isOk(result)) {
      expect(result.value.toMinorUnits()).toBe(15_00n);
    }
  });

  it('refuses to add different currencies', () => {
    const a = Money.of(10_00n, usd);
    const b = Money.of(5_00n, eur);
    const result = a.add(b);
    expect(isErr(result)).toBe(true);
  });

  it('multiplies by a factor', () => {
    const a = Money.of(100n, usd);
    expect(a.multiply(1.5).toMinorUnits()).toBe(150n);
  });

  it('treats zero as zero regardless of currency', () => {
    expect(Money.zero(usd).isZero()).toBe(true);
  });

  it('detects negative amounts after subtraction', () => {
    const a = Money.of(5_00n, usd);
    const b = Money.of(10_00n, usd);
    const result = unwrap(a.subtract(b));
    expect(result.isNegative()).toBe(true);
  });
});

describe('Currency', () => {
  it('normalizes to uppercase', () => {
    const currency = unwrap(Currency.of('usd'));
    expect(currency.toString()).toBe('USD');
  });

  it('rejects invalid ISO 4217 codes', () => {
    const result = Currency.of('US');
    expect(isErr(result)).toBe(true);
  });
});
