import { describe, expect, it } from 'vitest';
import { createSupplierId, Supplier, SupplierValidationError } from './supplier';

describe('Supplier', () => {
  const baseProps = {
    id: createSupplierId('supplier-001'),
    legalName: 'Mobarakeh Steel Complex',
    country: 'IR',
    category: 'Manufacturer' as const,
    productCategories: ['galvanized-sheet', 'hot-rolled-coil'],
    contactEmail: 'sales@example.com',
  };

  it('registers with PendingReview status and no certifications', () => {
    const supplier = Supplier.register(baseProps);
    expect(supplier.status).toBe('PendingReview');
    expect(supplier.certifications).toHaveLength(0);
  });

  it('rejects registration with an empty legal name', () => {
    expect(() => Supplier.register({ ...baseProps, legalName: '  ' })).toThrow(SupplierValidationError);
  });

  it('rejects registration with no product categories', () => {
    expect(() => Supplier.register({ ...baseProps, productCategories: [] })).toThrow(SupplierValidationError);
  });

  it('refuses to activate a supplier with no certifications', () => {
    const supplier = Supplier.register(baseProps);
    expect(() => supplier.activate()).toThrow(SupplierValidationError);
  });

  it('activates once a certification is recorded', () => {
    const supplier = Supplier.register(baseProps);
    supplier.recordCertification({ standard: 'EN 10346', grade: 'DX51D', recordedAt: new Date() });
    supplier.activate();
    expect(supplier.status).toBe('Active');
  });

  it('requires a non-empty reason to suspend', () => {
    const supplier = Supplier.register(baseProps);
    supplier.recordCertification({ standard: 'EN 10346', grade: 'DX51D', recordedAt: new Date() });
    supplier.activate();
    expect(() => supplier.suspend('')).toThrow(SupplierValidationError);
  });

  it('suspends with a valid reason', () => {
    const supplier = Supplier.register(baseProps);
    supplier.recordCertification({ standard: 'EN 10346', grade: 'DX51D', recordedAt: new Date() });
    supplier.activate();
    supplier.suspend('Failed quality audit');
    expect(supplier.status).toBe('Suspended');
  });

  it('refuses to reactivate a suspended supplier directly', () => {
    const supplier = Supplier.register(baseProps);
    supplier.recordCertification({ standard: 'EN 10346', grade: 'DX51D', recordedAt: new Date() });
    supplier.activate();
    supplier.suspend('Failed quality audit');
    expect(() => supplier.activate()).toThrow(SupplierValidationError);
  });
});
