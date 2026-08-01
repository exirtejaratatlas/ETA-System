import { PurchaseOrder, PurchaseOrderId } from '../domain/index.js';

export interface PurchaseOrderRepositoryPort {
  save(purchaseOrder: PurchaseOrder): Promise<void>;
  findById(id: PurchaseOrderId): Promise<PurchaseOrder | null>;
}
