import { createEntityId } from '@eta/kernel';

/**
 * Deterministic ID mapping between Odoo's internal integer IDs and ETA's
 * own EntityId scheme. Keeping this in one place (rather than improvised
 * per call site) is what makes the mapping reversible and auditable —
 * given an ETA ID you can always recover which Odoo record it came from.
 */
export function odooPartnerToSupplierId(odooPartnerId: number) {
  return createEntityId<'Supplier'>(`odoo-partner-${odooPartnerId}`);
}

export function odooPurchaseOrderToId(odooOrderId: number) {
  return createEntityId<'PurchaseOrder'>(`odoo-po-${odooOrderId}`);
}

/** Returns the original Odoo ID if this EntityId was produced by the mapping functions above, otherwise null. */
export function extractOdooId(entityId: string, prefix: 'odoo-partner-' | 'odoo-po-'): number | null {
  if (!entityId.startsWith(prefix)) return null;
  const raw = entityId.slice(prefix.length);
  const parsed = Number(raw);
  return Number.isInteger(parsed) ? parsed : null;
}
