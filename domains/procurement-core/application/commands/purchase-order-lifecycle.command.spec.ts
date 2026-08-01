import { describe, expect, it } from 'vitest';
import { isErr, isOk } from '@eta/kernel';
import { PurchaseOrder, PurchaseOrderId } from '../../domain/index.js';
import { PurchaseOrderRepositoryPort } from '../../ports/index.js';
import { CreatePurchaseOrderHandler } from './create-purchase-order.command.js';
import { ApprovePurchaseOrderHandler } from './approve-purchase-order.command.js';
import { RecordReceiptHandler } from './record-receipt.command.js';
import { SendPurchaseOrderHandler } from './send-purchase-order.command.js';
import { CancelPurchaseOrderHandler } from './cancel-purchase-order.command.js';

class InMemoryPurchaseOrderRepository implements PurchaseOrderRepositoryPort {
  private readonly store = new Map<string, PurchaseOrder>();

  async save(purchaseOrder: PurchaseOrder): Promise<void> {
    this.store.set(purchaseOrder.id, purchaseOrder);
  }
  async findById(id: PurchaseOrderId): Promise<PurchaseOrder | null> {
    return this.store.get(id) ?? null;
  }
}

async function createDraft(repository: PurchaseOrderRepositoryPort, id: string) {
  const handler = new CreatePurchaseOrderHandler(repository);
  const result = await handler.handle({
    id,
    supplierId: 'supplier-001' as never,
    lineItems: [{ description: 'API 600 Gate Valve 6" CL150 RF', standard: 'API 600', quantity: 1, unitPriceMinorUnits: 100_00, currency: 'USD' }],
  });
  expect(isOk(result)).toBe(true);
}

describe('procurement-core command handlers', () => {
  it('creates a draft purchase order that can be found by id', async () => {
    const repository = new InMemoryPurchaseOrderRepository();
    await createDraft(repository, 'po-cmd-001');

    const saved = await repository.findById('po-cmd-001' as PurchaseOrderId);
    expect(saved?.status).toBe('Draft');
  });

  it('returns an error result instead of throwing for invalid input', async () => {
    const repository = new InMemoryPurchaseOrderRepository();
    const handler = new CreatePurchaseOrderHandler(repository);

    const result = await handler.handle({ id: 'po-cmd-002', supplierId: 'supplier-001' as never, lineItems: [] });

    expect(isErr(result)).toBe(true);
  });

  it('walks Approve -> Send -> RecordReceipt -> Cancel-refusal via the command handlers', async () => {
    const repository = new InMemoryPurchaseOrderRepository();
    await createDraft(repository, 'po-cmd-003');
    const id = 'po-cmd-003' as PurchaseOrderId;

    const approve = new ApprovePurchaseOrderHandler(repository);
    const send = new SendPurchaseOrderHandler(repository);
    const recordReceipt = new RecordReceiptHandler(repository);
    const cancel = new CancelPurchaseOrderHandler(repository);

    // approve() requires PendingApproval, not Draft — expect a domain error surfaced as Result.err.
    const prematureApprove = await approve.handle(id);
    expect(isErr(prematureApprove)).toBe(true);

    const po = await repository.findById(id);
    po!.submitForApproval({ requiresApproval: () => true });
    await repository.save(po!);

    expect(isOk(await approve.handle(id))).toBe(true);
    expect(isOk(await send.handle(id))).toBe(true);
    expect(isOk(await recordReceipt.handle({ purchaseOrderId: id, fullyReceived: true }))).toBe(true);

    const cancelled = await cancel.handle(id);
    expect(isErr(cancelled)).toBe(true);
  });

  it('returns an error for an unknown purchase order id', async () => {
    const repository = new InMemoryPurchaseOrderRepository();
    const result = await new SendPurchaseOrderHandler(repository).handle('does-not-exist' as PurchaseOrderId);
    expect(isErr(result)).toBe(true);
  });
});
