import { OdooClient, extractOdooId } from '@eta/odoo-client';
import {
  Certification,
  createSupplierId,
  Supplier,
  SupplierCategory,
  SupplierId,
  SupplierStatus,
} from '../../domain/index.js';
import { SupplierRepositoryPort } from '../../ports/index.js';

/**
 * `res.partner` is Odoo's single Contacts model (ADR-0016/0017 — Odoo owns
 * Contacts). `x_eta_id` round-trips ETA's string id; `x_eta_category` and
 * `x_eta_certifications` (JSON) and `x_eta_status` cover ETA-specific
 * concepts `res.partner` has no native field for — kept as custom fields
 * on the same record rather than a separate ETA-owned table, so the
 * aggregate is never split across two systems. `category_id` (Odoo's own
 * partner tags) is reused for `productCategories`, and `supplier_rank` is
 * set so real Odoo purchase screens recognize this contact as a vendor —
 * both match the read-side convention already established in the (now
 * retired) integrations/odoo sync code.
 */
interface OdooPartnerRecord {
  id: number;
  x_eta_id: string;
  name: string;
  country_id: [number, string] | false;
  category_id: [number, string][];
  email: string | false;
  x_eta_category: string;
  x_eta_certifications: string;
  x_eta_status: string;
}

export class OdooSupplierRepository implements SupplierRepositoryPort {
  constructor(private readonly odoo: OdooClient) {}

  private async findOdooId(id: SupplierId): Promise<number | null> {
    const fromMapping = extractOdooId(id, 'odoo-partner-');
    if (fromMapping !== null) return fromMapping;
    const rows = await this.odoo.searchRead<{ id: number }>(
      'res.partner',
      [['x_eta_id', '=', id]],
      ['id'],
      { limit: 1 },
    );
    return rows[0]?.id ?? null;
  }

  private async resolveCountryOdooId(isoCode: string): Promise<number | false> {
    const rows = await this.odoo.searchRead<{ id: number }>('res.country', [['code', '=', isoCode]], ['id'], { limit: 1 });
    return rows[0]?.id ?? false;
  }

  private async resolveCategoryOdooIds(names: string[]): Promise<number[]> {
    const ids: number[] = [];
    for (const name of names) {
      const existing = await this.odoo.searchRead<{ id: number }>('res.partner.category', [['name', '=', name]], ['id'], { limit: 1 });
      if (existing[0]) {
        ids.push(existing[0].id);
      } else {
        ids.push(await this.odoo.create('res.partner.category', { name }));
      }
    }
    return ids;
  }

  private toEntity(row: OdooPartnerRecord): Supplier {
    return Supplier.fromProps({
      id: createSupplierId(row.x_eta_id),
      legalName: row.name,
      country: row.country_id ? row.country_id[1] : 'Unknown',
      category: row.x_eta_category as SupplierCategory,
      productCategories: row.category_id.map(([, name]) => name),
      certifications: (JSON.parse(row.x_eta_certifications || '[]') as Certification[]).map((c) => ({
        ...c,
        recordedAt: new Date(c.recordedAt),
      })),
      status: row.x_eta_status as SupplierStatus,
      contactEmail: row.email || 'unknown@unknown.invalid',
    });
  }

  async findById(id: SupplierId): Promise<Supplier | null> {
    const odooId = await this.findOdooId(id);
    if (odooId === null) return null;
    const rows = await this.odoo.searchRead<OdooPartnerRecord>(
      'res.partner',
      [['id', '=', odooId]],
      ['id', 'x_eta_id', 'name', 'country_id', 'category_id', 'email', 'x_eta_category', 'x_eta_certifications', 'x_eta_status'],
      { limit: 1 },
    );
    const row = rows[0];
    return row ? this.toEntity(row) : null;
  }

  async findByProductCategory(category: string): Promise<Supplier[]> {
    const categoryRows = await this.odoo.searchRead<{ id: number }>('res.partner.category', [['name', '=', category]], ['id'], { limit: 1 });
    if (!categoryRows[0]) return [];
    const rows = await this.odoo.searchRead<OdooPartnerRecord>(
      'res.partner',
      [['category_id', 'in', [categoryRows[0].id]]],
      ['id', 'x_eta_id', 'name', 'country_id', 'category_id', 'email', 'x_eta_category', 'x_eta_certifications', 'x_eta_status'],
      {},
    );
    return rows.map((row) => this.toEntity(row)).sort((a, b) => a.toProps().legalName.localeCompare(b.toProps().legalName));
  }

  async save(supplier: Supplier): Promise<void> {
    const props = supplier.toProps();
    const odooId = await this.findOdooId(props.id);
    const countryOdooId = await this.resolveCountryOdooId(props.country);
    const categoryOdooIds = await this.resolveCategoryOdooIds(props.productCategories);

    const values = {
      name: props.legalName,
      country_id: countryOdooId,
      category_id: [[6, 0, categoryOdooIds]],
      email: props.contactEmail,
      supplier_rank: 1,
      x_eta_category: props.category,
      x_eta_certifications: JSON.stringify(props.certifications),
      x_eta_status: props.status,
    };

    if (odooId === null) {
      await this.odoo.create('res.partner', { ...values, x_eta_id: props.id });
      return;
    }
    await this.odoo.write('res.partner', odooId, values);
  }
}
