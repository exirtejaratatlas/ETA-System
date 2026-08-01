import { createDomainEvent, DomainEvent } from '@eta/kernel';
import { PurchaseOrderId, PurchaseOrderStatus } from './purchase-order.js';

export type PurchaseOrderCreated = DomainEvent<'PurchaseOrderCreated', { supplierId: string; lineItemCount: number }>;
export type PurchaseOrderStatusChanged = DomainEvent<
  'PurchaseOrderStatusChanged',
  { from: PurchaseOrderStatus; to: PurchaseOrderStatus }
>;

export function purchaseOrderCreated(id: PurchaseOrderId, supplierId: string, lineItemCount: number): PurchaseOrderCreated {
  return createDomainEvent('PurchaseOrderCreated', id, { supplierId, lineItemCount });
}

export function purchaseOrderStatusChanged(
  id: PurchaseOrderId,
  from: PurchaseOrderStatus,
  to: PurchaseOrderStatus,
): PurchaseOrderStatusChanged {
  return createDomainEvent('PurchaseOrderStatusChanged', id, { from, to });
}
