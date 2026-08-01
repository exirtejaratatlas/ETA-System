import { err, ok, Result } from '@eta/kernel';
import { PurchaseOrderId, PurchaseOrderValidationError } from '../../domain/index.js';
import { PurchaseOrderRepositoryPort } from '../../ports/index.js';

export interface RecordReceiptCommand {
  purchaseOrderId: PurchaseOrderId;
  fullyReceived: boolean;
}

export class RecordReceiptHandler {
  constructor(private readonly repository: PurchaseOrderRepositoryPort) {}

  async handle(command: RecordReceiptCommand): Promise<Result<void, string>> {
    const po = await this.repository.findById(command.purchaseOrderId);
    if (!po) return err(`Purchase order not found: ${command.purchaseOrderId}`);
    try {
      po.recordReceipt(command.fullyReceived);
      await this.repository.save(po);
      return ok(undefined);
    } catch (error) {
      if (error instanceof PurchaseOrderValidationError) return err(error.message);
      throw error;
    }
  }
}
