import { describe, expect, it } from 'vitest';
import { isErr, isOk } from '@eta/kernel';
import { Supplier, SupplierId } from '../../domain';
import { SupplierRepositoryPort } from '../../ports';
import { RegisterSupplierHandler } from './register-supplier.command';

class InMemorySupplierRepository implements SupplierRepositoryPort {
  private readonly store = new Map<string, Supplier>();

  async save(supplier: Supplier): Promise<void> {
    this.store.set(supplier.id, supplier);
  }
  async findById(id: SupplierId): Promise<Supplier | null> {
    return this.store.get(id) ?? null;
  }
  async findByProductCategory(category: string): Promise<Supplier[]> {
    return [...this.store.values()].filter((s) => s.toProps().productCategories.includes(category));
  }
}

describe('RegisterSupplierHandler', () => {
  it('registers a valid supplier and persists it', async () => {
    const repository = new InMemorySupplierRepository();
    const handler = new RegisterSupplierHandler(repository);

    const result = await handler.handle({
      id: 'supplier-001',
      legalName: 'Kashan Amir Kabir Steel',
      country: 'IR',
      category: 'Manufacturer',
      productCategories: ['galvanized-sheet'],
      contactEmail: 'sales@example.com',
    });

    expect(isOk(result)).toBe(true);
    const saved = await repository.findById('supplier-001' as SupplierId);
    expect(saved).not.toBeNull();
    expect(saved?.status).toBe('PendingReview');
  });

  it('returns an error result instead of throwing for invalid input', async () => {
    const repository = new InMemorySupplierRepository();
    const handler = new RegisterSupplierHandler(repository);

    const result = await handler.handle({
      id: 'supplier-002',
      legalName: '',
      country: 'IR',
      category: 'Manufacturer',
      productCategories: ['galvanized-sheet'],
      contactEmail: 'sales@example.com',
    });

    expect(isErr(result)).toBe(true);
  });
});
