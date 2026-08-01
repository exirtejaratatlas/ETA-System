import { OdooClient, extractOdooId } from '@eta/odoo-client';
import { Currency, Money, unwrap } from '@eta/kernel';
import {
  createPurchaseOrderId,
  PurchaseOrder,
  PurchaseOrderId,
  PurchaseOrderLineItem,
  PurchaseOrderStatus,
} from '../../domain/index.js';
import { PurchaseOrderRepositoryPort } from '../../ports/index.js';

/**
 * ETA-only fields expected on `purchase.order` in the real Odoo instance
 * (ADR-0017): `x_eta_id` (char) round-trips ETA's caller-assigned string
 * id against Odoo's own auto-increment integer id; `x_eta_status` (char)
 * carries ETA's richer status enum verbatim, since Odoo's native `state`
 * doesn't distinguish PartiallyReceived/Received the way ETA's domain
 * does. Native `state`/`partner_id`/`order_line` are also written so a
 * human in Odoo's own UI sees a real, usable purchase order — not just
 * custom-field data invisible to Odoo's own screens.
 */
interface OdooPurchaseOrderRecord {
  id: number;
  x_eta_id: string;
  x_eta_status: string;
  partner_id: [number, string];
  currency_id: [number, string];
  order_line: number[];
}

interface OdooPurchaseOrderLineRecord {
  id: number;
  name: string;
  x_eta_standard: string | false;
  product_qty: number;
  price_unit: number;
}

const ODOO_STATE_BY_ETA_STATUS: Record<PurchaseOrderStatus, string> = {
  Draft: 'draft',
  PendingApproval: 'sent',
  Approved: 'to approve',
  Sent: 'purchase',
  PartiallyReceived: 'purchase',
  Received: 'done',
  Cancelled: 'cancel',
};

export class OdooPurchaseOrderRepository implements PurchaseOrderRepositoryPort {
  constructor(private readonly odoo: OdooClient) {}

  private async findOdooId(id: PurchaseOrderId): Promise<number | null> {
    const fromMapping = extractOdooId(id, 'odoo-po-');
    if (fromMapping !== null) return fromMapping;
    const rows = await this.odoo.searchRead<{ id: number }>(
      'purchase.order',
      [['x_eta_id', '=', id]],
      ['id'],
      { limit: 1 },
    );
    return rows[0]?.id ?? null;
  }

  private async resolvePartnerOdooId(supplierId: string): Promise<number> {
    const fromMapping = extractOdooId(supplierId, 'odoo-partner-');
    if (fromMapping !== null) return fromMapping;
    const rows = await this.odoo.searchRead<{ id: number }>(
      'res.partner',
      [['x_eta_id', '=', supplierId]],
      ['id'],
      { limit: 1 },
    );
    const found = rows[0]?.id;
    if (!found) throw new Error(`Cannot resolve supplier "${supplierId}" to an Odoo partner — has it been saved yet?`);
    return found;
  }

  /** Resolves an ISO 4217 code (e.g. "USD") to res.currency's Odoo id — Odoo seeds these by ISO code as `name`. */
  private async resolveCurrencyOdooId(isoCode: string): Promise<number> {
    const rows = await this.odoo.searchRead<{ id: number }>(
      'res.currency',
      [['name', '=', isoCode]],
      ['id'],
      { limit: 1 },
    );
    const found = rows[0]?.id;
    if (!found) throw new Error(`Odoo has no res.currency seeded for "${isoCode}"`);
    return found;
  }

  async findById(id: PurchaseOrderId): Promise<PurchaseOrder | null> {
    const odooId = await this.findOdooId(id);
    if (odooId === null) return null;

    const orders = await this.odoo.searchRead<OdooPurchaseOrderRecord>(
      'purchase.order',
      [['id', '=', odooId]],
      ['id', 'x_eta_id', 'x_eta_status', 'partner_id', 'currency_id', 'order_line'],
      { limit: 1 },
    );
    const order = orders[0];
    if (!order) return null;

    const currency = unwrap(Currency.of(order.currency_id[1]));
    const lines = await this.odoo.searchRead<OdooPurchaseOrderLineRecord>(
      'purchase.order.line',
      [['order_id', '=', odooId]],
      ['id', 'name', 'x_eta_standard', 'product_qty', 'price_unit'],
    );

    const lineItems: PurchaseOrderLineItem[] = lines.map((line) => ({
      description: line.name,
      standard: line.x_eta_standard || undefined,
      quantity: line.product_qty,
      unitPrice: Money.of(Math.round(line.price_unit * 100), currency),
    }));

    return PurchaseOrder.fromProps({
      id: createPurchaseOrderId(order.x_eta_id),
      supplierId: `odoo-partner-${order.partner_id[0]}` as never,
      lineItems,
      status: order.x_eta_status as PurchaseOrderStatus,
    });
  }

  async save(purchaseOrder: PurchaseOrder): Promise<void> {
    const props = purchaseOrder.toProps();
    const partnerOdooId = await this.resolvePartnerOdooId(props.supplierId);
    const currencyOdooId = await this.resolveCurrencyOdooId(props.lineItems[0].unitPrice.currency.toString());
    const odooId = await this.findOdooId(props.id);

    const lineTuples = props.lineItems.map((item) => [
      0,
      0,
      {
        name: item.description,
        x_eta_standard: item.standard ?? false,
        product_qty: item.quantity,
        price_unit: Number(item.unitPrice.toMinorUnits()) / 100,
      },
    ]);

    if (odooId === null) {
      await this.odoo.create('purchase.order', {
        x_eta_id: props.id,
        x_eta_status: props.status,
        partner_id: partnerOdooId,
        currency_id: currencyOdooId,
        state: ODOO_STATE_BY_ETA_STATUS[props.status],
        order_line: lineTuples,
      });
      return;
    }

    const existingLines = await this.odoo.searchRead<{ id: number }>(
      'purchase.order.line',
      [['order_id', '=', odooId]],
      ['id'],
    );
    await this.odoo.unlink(
      'purchase.order.line',
      existingLines.map((l) => l.id),
    );
    await this.odoo.write('purchase.order', odooId, {
      x_eta_status: props.status,
      partner_id: partnerOdooId,
      currency_id: currencyOdooId,
      state: ODOO_STATE_BY_ETA_STATUS[props.status],
      order_line: lineTuples,
    });
  }
}
