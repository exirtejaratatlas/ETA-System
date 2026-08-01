import { Supplier } from '../../domain/index.js';
import { SupplierRepositoryPort } from '../../ports/index.js';

export class ListSuppliersByProductCategoryHandler {
  constructor(private readonly repository: SupplierRepositoryPort) {}

  async handle(productCategory: string): Promise<Supplier[]> {
    return this.repository.findByProductCategory(productCategory);
  }
}
