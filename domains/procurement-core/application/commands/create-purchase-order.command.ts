import { Currency, Money, ok, err, Result } from '@eta/kernel';
import { createPurchaseOrderId, PurchaseOrder, PurchaseOrderValidationError, SupplierRef } from '../../domain/index.js';
import { PurchaseOrderRepositoryPort } from '../../ports/index.js';

export interface CreatePurchaseOrderLineInput {
  description: string;
  standard?: string;
  quantity: number;
  unitPriceMinorUnits: number;
  currency: string;
}

export interface CreatePurchaseOrderCommand {
  id: string;
  supplierId: SupplierRef;
  lineItems: CreatePurchaseOrderLineInput[];
}

export class CreatePurchaseOrderHandler {
  constructor(private readonly repository: PurchaseOrderRepositoryPort) {}

  async handle(command: CreatePurchaseOrderCommand): Promise<Result<void, string>> {
    const lineItems = [];
    for (const line of command.lineItems) {
      const currencyResult = Currency.of(line.currency);
      if (!currencyResult.ok) return err(currencyResult.error);
      lineItems.push({
        description: line.description,
        standard: line.standard,
        quantity: line.quantity,
        unitPrice: Money.of(line.unitPriceMinorUnits, currencyResult.value),
      });
    }

    try {
      const purchaseOrder = PurchaseOrder.create({
        id: createPurchaseOrderId(command.id),
        supplierId: command.supplierId,
        lineItems,
      });
      await this.repository.save(purchaseOrder);
      return ok(undefined);
    } catch (error) {
      if (error instanceof PurchaseOrderValidationError) return err(error.message);
      throw error;
    }
  }
}
