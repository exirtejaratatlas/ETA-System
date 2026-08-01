import { Result, ok, err } from '@eta/kernel';
import { createSupplierId, Supplier, SupplierCategory, SupplierValidationError } from '../../domain/index.js';
import { SupplierRepositoryPort } from '../../ports/index.js';

export interface RegisterSupplierCommand {
  id: string;
  legalName: string;
  country: string;
  category: SupplierCategory;
  productCategories: string[];
  contactEmail: string;
}

export class RegisterSupplierHandler {
  constructor(private readonly repository: SupplierRepositoryPort) {}

  async handle(command: RegisterSupplierCommand): Promise<Result<void, string>> {
    try {
      const supplier = Supplier.register({
        id: createSupplierId(command.id),
        legalName: command.legalName,
        country: command.country,
        category: command.category,
        productCategories: command.productCategories,
        contactEmail: command.contactEmail,
      });
      await this.repository.save(supplier);
      return ok(undefined);
    } catch (error) {
      if (error instanceof SupplierValidationError) {
        return err(error.message);
      }
      throw error;
    }
  }
}
