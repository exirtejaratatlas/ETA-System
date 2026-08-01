/**
 * Branded identifier type. `EntityId<'PurchaseOrder'>` and `EntityId<'Supplier'>`
 * are structurally identical strings at runtime but statically incompatible —
 * this exists specifically to stop a supplier ID from being passed where a
 * purchase-order ID is expected, a common and hard-to-spot bug class in
 * systems with many UUID-shaped identifiers.
 */
export type EntityId<Brand extends string> = string & { readonly __brand: Brand };

export function createEntityId<Brand extends string>(value: string): EntityId<Brand> {
  if (!value || value.trim().length === 0) {
    throw new Error('EntityId value must be a non-empty string');
  }
  return value as EntityId<Brand>;
}
