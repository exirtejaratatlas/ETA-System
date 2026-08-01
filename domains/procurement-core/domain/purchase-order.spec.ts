import { describe, expect, it } from 'vitest';
import { Currency, Money, unwrap } from '@eta/kernel';
import { createPurchaseOrderId, PurchaseOrder, PurchaseOrderValidationError } from './purchase-order';
import { ThresholdApprovalPolicy } from './approval-policy';

const usd = unwrap(Currency.of('USD'));

function buildOrder(unitPriceMinorUnits: bigint, quantity: number) {
  return PurchaseOrder.create({
    id: createPurchaseOrderId('po-001'),
    supplierId: 'supplier-001' as never,
    lineItems: [
      { description: 'API 600 Gate Valve 6" CL150 RF', standard: 'API 600', quantity, unitPrice: Money.of(unitPriceMinorUnits, usd) },
    ],
  });
}

describe('PurchaseOrder', () => {
  it('creates in Draft status', () => {
    const po = buildOrder(125_000n, 12);
    expect(po.status).toBe('Draft');
  });

  it('rejects creation with no line items', () => {
    expect(() =>
      PurchaseOrder.create({ id: createPurchaseOrderId('po-002'), supplierId: 'supplier-001' as never, lineItems: [] }),
    ).toThrow(PurchaseOrderValidationError);
  });

  it('rejects a non-positive quantity', () => {
    expect(() => buildOrder(125_000n, 0)).toThrow(PurchaseOrderValidationError);
  });

  it('computes the total across line items', () => {
    const po = buildOrder(125_000n, 12); // 1,250.00 * 12 = 15,000.00
    expect(po.total().toMinorUnits()).toBe(1_500_000n);
  });

  it('auto-approves when total is below the policy threshold', () => {
    const po = buildOrder(100_00n, 1); // 100.00
    const policy = new ThresholdApprovalPolicy(Money.of(10_000_00n, usd)); // threshold 10,000.00
    po.submitForApproval(policy);
    expect(po.status).toBe('Approved');
  });

  it('requires explicit approval when total is at or above the policy threshold', () => {
    const po = buildOrder(1_500_000n, 1); // 15,000.00
    const policy = new ThresholdApprovalPolicy(Money.of(10_000_00n, usd)); // threshold 10,000.00
    po.submitForApproval(policy);
    expect(po.status).toBe('PendingApproval');
    po.approve();
    expect(po.status).toBe('Approved');
  });

  it('follows Approved -> Sent -> Received lifecycle', () => {
    const po = buildOrder(100_00n, 1);
    const policy = new ThresholdApprovalPolicy(Money.of(10_000_00n, usd));
    po.submitForApproval(policy);
    po.send();
    expect(po.status).toBe('Sent');
    po.recordReceipt(false);
    expect(po.status).toBe('PartiallyReceived');
    po.recordReceipt(true);
    expect(po.status).toBe('Received');
  });

  it('refuses to send a Draft purchase order', () => {
    const po = buildOrder(100_00n, 1);
    expect(() => po.send()).toThrow(PurchaseOrderValidationError);
  });

  it('refuses to cancel a Received purchase order', () => {
    const po = buildOrder(100_00n, 1);
    const policy = new ThresholdApprovalPolicy(Money.of(10_000_00n, usd));
    po.submitForApproval(policy);
    po.send();
    po.recordReceipt(true);
    expect(() => po.cancel()).toThrow(PurchaseOrderValidationError);
  });
});
