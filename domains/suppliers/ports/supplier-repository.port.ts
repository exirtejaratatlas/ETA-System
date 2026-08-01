import { Supplier, SupplierId } from '../domain/index.js';

/**
 * Port owned by this domain — adapters/outbound implements this, never
 * the other way around (hexagonal architecture, ADR-0001).
 */
export interface SupplierRepositoryPort {
  save(supplier: Supplier): Promise<void>;
  findById(id: SupplierId): Promise<Supplier | null>;
  findByProductCategory(category: string): Promise<Supplier[]>;
}
