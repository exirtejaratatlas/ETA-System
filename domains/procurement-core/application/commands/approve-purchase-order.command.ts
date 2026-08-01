import { err, ok, Result } from '@eta/kernel';
import { ApprovalPolicy, PurchaseOrderId, PurchaseOrderValidationError } from '../../domain/index.js';
import { PurchaseOrderRepositoryPort } from '../../ports/index.js';

export class SubmitPurchaseOrderForApprovalHandler {
  constructor(
    private readonly repository: PurchaseOrderRepositoryPort,
    private readonly policy: ApprovalPolicy,
  ) {}

  async handle(purchaseOrderId: PurchaseOrderId): Promise<Result<void, string>> {
    const po = await this.repository.findById(purchaseOrderId);
    if (!po) return err(`Purchase order not found: ${purchaseOrderId}`);
    try {
      po.submitForApproval(this.policy);
      await this.repository.save(po);
      return ok(undefined);
    } catch (error) {
      if (error instanceof PurchaseOrderValidationError) return err(error.message);
      throw error;
    }
  }
}

export class ApprovePurchaseOrderHandler {
  constructor(private readonly repository: PurchaseOrderRepositoryPort) {}

  async handle(purchaseOrderId: PurchaseOrderId): Promise<Result<void, string>> {
    const po = await this.repository.findById(purchaseOrderId);
    if (!po) return err(`Purchase order not found: ${purchaseOrderId}`);
    try {
      po.approve();
      await this.repository.save(po);
      return ok(undefined);
    } catch (error) {
      if (error instanceof PurchaseOrderValidationError) return err(error.message);
      throw error;
    }
  }
}
