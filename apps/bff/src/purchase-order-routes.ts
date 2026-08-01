import { FastifyInstance } from 'fastify';
import { Currency, Money, unwrap } from '@eta/kernel';
import {
  ApprovePurchaseOrderHandler,
  CancelPurchaseOrderHandler,
  CreatePurchaseOrderHandler,
  GetPurchaseOrderByIdHandler,
  PurchaseOrderRepositoryPort,
  RecordReceiptHandler,
  SendPurchaseOrderHandler,
  SubmitPurchaseOrderForApprovalHandler,
  ThresholdApprovalPolicy,
} from '@eta/domain-procurement-core';
import { requireAuth } from './keycloak-auth.js';

export interface ApprovalThresholdConfig {
  approvalThresholdMinorUnits: bigint;
  approvalThresholdCurrency: string;
}

export async function registerPurchaseOrderRoutes(
  rootApp: FastifyInstance,
  repository: PurchaseOrderRepositoryPort,
  approvalThreshold: ApprovalThresholdConfig,
): Promise<void> {
  const approvalPolicy = new ThresholdApprovalPolicy(
    Money.of(approvalThreshold.approvalThresholdMinorUnits, unwrap(Currency.of(approvalThreshold.approvalThresholdCurrency))),
  );
  const createPurchaseOrder = new CreatePurchaseOrderHandler(repository);
  const submitForApproval = new SubmitPurchaseOrderForApprovalHandler(repository, approvalPolicy);
  const approvePurchaseOrder = new ApprovePurchaseOrderHandler(repository);
  const sendPurchaseOrder = new SendPurchaseOrderHandler(repository);
  const recordReceipt = new RecordReceiptHandler(repository);
  const cancelPurchaseOrder = new CancelPurchaseOrderHandler(repository);
  const getPurchaseOrderById = new GetPurchaseOrderByIdHandler(repository);

  // Scoped plugin (Fastify encapsulation) so requireAuth applies only to these
  // routes, mirroring registerSupplierRoutes — never a global hook on rootApp.
  await rootApp.register(async (app) => {
    app.addHook('preHandler', requireAuth);

    app.post('/api/purchase-orders', async (request, reply) => {
      const body = request.body as {
        id: string;
        supplierId: string;
        lineItems: { description: string; standard?: string; quantity: number; unitPriceMinorUnits: number; currency: string }[];
      };
      const result = await createPurchaseOrder.handle({ id: body.id, supplierId: body.supplierId as never, lineItems: body.lineItems });
      if (!result.ok) return reply.code(400).send({ error: result.error });
      return reply.code(201).send({ id: body.id });
    });

    app.get('/api/purchase-orders/:id', async (request, reply) => {
      const { id } = request.params as { id: string };
      const purchaseOrder = await getPurchaseOrderById.handle(id as never);
      if (!purchaseOrder) return reply.code(404).send({ error: 'Purchase order not found' });
      return reply.send({ ...purchaseOrder.toProps(), total: purchaseOrder.total().toMinorUnits().toString() });
    });

    app.patch('/api/purchase-orders/:id/submit-for-approval', async (request, reply) => {
      const { id } = request.params as { id: string };
      const result = await submitForApproval.handle(id as never);
      if (!result.ok) return reply.code(400).send({ error: result.error });
      return reply.send({ status: 'submitted' });
    });

    app.patch('/api/purchase-orders/:id/approve', async (request, reply) => {
      const { id } = request.params as { id: string };
      const result = await approvePurchaseOrder.handle(id as never);
      if (!result.ok) return reply.code(400).send({ error: result.error });
      return reply.send({ status: 'Approved' });
    });

    app.patch('/api/purchase-orders/:id/send', async (request, reply) => {
      const { id } = request.params as { id: string };
      const result = await sendPurchaseOrder.handle(id as never);
      if (!result.ok) return reply.code(400).send({ error: result.error });
      return reply.send({ status: 'Sent' });
    });

    app.post('/api/purchase-orders/:id/receipts', async (request, reply) => {
      const { id } = request.params as { id: string };
      const { fullyReceived } = request.body as { fullyReceived: boolean };
      const result = await recordReceipt.handle({ purchaseOrderId: id as never, fullyReceived });
      if (!result.ok) return reply.code(400).send({ error: result.error });
      return reply.code(201).send({ status: fullyReceived ? 'Received' : 'PartiallyReceived' });
    });

    app.patch('/api/purchase-orders/:id/cancel', async (request, reply) => {
      const { id } = request.params as { id: string };
      const result = await cancelPurchaseOrder.handle(id as never);
      if (!result.ok) return reply.code(400).send({ error: result.error });
      return reply.send({ status: 'Cancelled' });
    });
  });
}
