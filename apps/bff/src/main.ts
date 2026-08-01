import Fastify from 'fastify';
import cors from '@fastify/cors';
import { OdooClient } from '@eta/odoo-client';
import { OdooSupplierRepository } from '@eta/domain-suppliers/adapters/outbound';
import { OdooPurchaseOrderRepository } from '@eta/domain-procurement-core/adapters/outbound';
import { config } from './config.js';
import { registerSupplierRoutes } from './supplier-routes.js';
import { registerPurchaseOrderRoutes } from './purchase-order-routes.js';

async function main() {
  // One shared client (ADR-0017: Odoo is the single source of truth — repositories
  // talk to it directly, no local persistence for these domains).
  const odoo = new OdooClient(config.odoo);

  const supplierRepository = new OdooSupplierRepository(odoo);
  const purchaseOrderRepository = new OdooPurchaseOrderRepository(odoo);

  const app = Fastify({ logger: true });
  await app.register(cors, { origin: true });

  app.get('/health', async () => ({ status: 'ok', service: '@eta/apps-bff' }));

  await registerSupplierRoutes(app, supplierRepository);
  await registerPurchaseOrderRoutes(app, purchaseOrderRepository, config.procurement);

  await app.listen({ port: config.port, host: '0.0.0.0' });
  console.log(`apps/bff listening on http://localhost:${config.port}`);
}

main().catch((error) => {
  console.error('apps/bff failed to start', error);
  process.exit(1);
});
