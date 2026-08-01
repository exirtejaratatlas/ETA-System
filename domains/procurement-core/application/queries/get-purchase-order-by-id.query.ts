import { PurchaseOrder, PurchaseOrderId } from '../../domain/index.js';
import { PurchaseOrderRepositoryPort } from '../../ports/index.js';

export class GetPurchaseOrderByIdHandler {
  constructor(private readonly repository: PurchaseOrderRepositoryPort) {}

  async handle(id: PurchaseOrderId): Promise<PurchaseOrder | null> {
    return this.repository.findById(id);
  }
}
