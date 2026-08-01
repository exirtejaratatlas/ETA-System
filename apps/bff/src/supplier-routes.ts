import { FastifyInstance } from 'fastify';
import {
  ActivateSupplierHandler,
  GetSupplierByIdHandler,
  ListSuppliersByProductCategoryHandler,
  RegisterSupplierHandler,
  SuspendSupplierHandler,
  RecordSupplierCertificationHandler,
  SupplierRepositoryPort,
} from '@eta/domain-suppliers';
import { requireAuth } from './keycloak-auth.js';

export async function registerSupplierRoutes(rootApp: FastifyInstance, repository: SupplierRepositoryPort): Promise<void> {
  const registerSupplier = new RegisterSupplierHandler(repository);
  const activateSupplier = new ActivateSupplierHandler(repository);
  const suspendSupplier = new SuspendSupplierHandler(repository);
  const recordCertification = new RecordSupplierCertificationHandler(repository);
  const getSupplierById = new GetSupplierByIdHandler(repository);
  const listByCategory = new ListSuppliersByProductCategoryHandler(repository);

  // Registered as a scoped plugin so the auth preHandler applies only to
  // these routes, never to routes registered on the shared root app
  // instance (e.g. /health) — Fastify encapsulation, not a global hook.
  await rootApp.register(async (app) => {
  app.addHook('preHandler', requireAuth);

  app.post('/api/suppliers', async (request, reply) => {
    const body = request.body as {
      id: string;
      legalName: string;
      country: string;
      category: 'Manufacturer' | 'Trader' | 'Agent' | 'ServiceProvider';
      productCategories: string[];
      contactEmail: string;
    };
    const result = await registerSupplier.handle(body);
    if (!result.ok) return reply.code(400).send({ error: result.error });
    return reply.code(201).send({ id: body.id });
  });

  app.get('/api/suppliers/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const supplier = await getSupplierById.handle(id as never);
    if (!supplier) return reply.code(404).send({ error: 'Supplier not found' });
    return reply.send(supplier.toProps());
  });

  app.get('/api/suppliers', async (request, reply) => {
    const { productCategory } = request.query as { productCategory?: string };
    if (!productCategory) return reply.code(400).send({ error: 'productCategory query parameter is required' });
    const suppliers = await listByCategory.handle(productCategory);
    return reply.send(suppliers.map((s) => s.toProps()));
  });

  app.patch('/api/suppliers/:id/activate', async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await activateSupplier.handle({ supplierId: id as never });
    if (!result.ok) return reply.code(400).send({ error: result.error });
    return reply.send({ status: 'Active' });
  });

  app.patch('/api/suppliers/:id/suspend', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { reason } = request.body as { reason: string };
    const result = await suspendSupplier.handle({ supplierId: id as never, reason });
    if (!result.ok) return reply.code(400).send({ error: result.error });
    return reply.send({ status: 'Suspended' });
  });

  app.post('/api/suppliers/:id/certifications', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { standard, grade } = request.body as { standard: string; grade: string };
    const result = await recordCertification.handle({ supplierId: id as never, standard, grade });
    if (!result.ok) return reply.code(400).send({ error: result.error });
    return reply.code(201).send({ status: 'certification recorded' });
  });
  });
}
