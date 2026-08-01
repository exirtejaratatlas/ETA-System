import { Result, ok, err } from '@eta/kernel';
import { SupplierId, SupplierValidationError } from '../../domain/index.js';
import { SupplierRepositoryPort } from '../../ports/index.js';

export interface ActivateSupplierCommand {
  supplierId: SupplierId;
}

export interface SuspendSupplierCommand {
  supplierId: SupplierId;
  reason: string;
}

export class ActivateSupplierHandler {
  constructor(private readonly repository: SupplierRepositoryPort) {}

  async handle(command: ActivateSupplierCommand): Promise<Result<void, string>> {
    const supplier = await this.repository.findById(command.supplierId);
    if (!supplier) return err(`Supplier not found: ${command.supplierId}`);
    try {
      supplier.activate();
      await this.repository.save(supplier);
      return ok(undefined);
    } catch (error) {
      if (error instanceof SupplierValidationError) return err(error.message);
      throw error;
    }
  }
}

export class SuspendSupplierHandler {
  constructor(private readonly repository: SupplierRepositoryPort) {}

  async handle(command: SuspendSupplierCommand): Promise<Result<void, string>> {
    const supplier = await this.repository.findById(command.supplierId);
    if (!supplier) return err(`Supplier not found: ${command.supplierId}`);
    try {
      supplier.suspend(command.reason);
      await this.repository.save(supplier);
      return ok(undefined);
    } catch (error) {
      if (error instanceof SupplierValidationError) return err(error.message);
      throw error;
    }
  }
}
