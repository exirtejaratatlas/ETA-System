import { Supplier, SupplierId } from '../../domain/index.js';
import { SupplierRepositoryPort } from '../../ports/index.js';

export class GetSupplierByIdHandler {
  constructor(private readonly repository: SupplierRepositoryPort) {}

  async handle(supplierId: SupplierId): Promise<Supplier | null> {
    return this.repository.findById(supplierId);
  }
}
