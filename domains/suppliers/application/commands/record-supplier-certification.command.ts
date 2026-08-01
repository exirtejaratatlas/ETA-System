import { Result, ok, err } from '@eta/kernel';
import { Certification, SupplierId } from '../../domain/index.js';
import { SupplierRepositoryPort } from '../../ports/index.js';

export interface RecordSupplierCertificationCommand {
  supplierId: SupplierId;
  standard: string;
  grade: string;
}

export class RecordSupplierCertificationHandler {
  constructor(private readonly repository: SupplierRepositoryPort) {}

  async handle(command: RecordSupplierCertificationCommand): Promise<Result<void, string>> {
    const supplier = await this.repository.findById(command.supplierId);
    if (!supplier) return err(`Supplier not found: ${command.supplierId}`);

    const certification: Certification = {
      standard: command.standard,
      grade: command.grade,
      recordedAt: new Date(),
    };
    supplier.recordCertification(certification);
    await this.repository.save(supplier);
    return ok(undefined);
  }
}
