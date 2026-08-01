import { createEntityId, EntityId, Money } from '@eta/kernel';
import type { EntityId as KernelEntityId } from '@eta/kernel';
import { ApprovalPolicy } from './approval-policy.js';

export type PurchaseOrderId = EntityId<'PurchaseOrder'>;
/** References domains/suppliers by ID only — procurement-core never imports the Supplier entity itself (bounded-context boundary, ADR-0001). */
export type SupplierRef = KernelEntityId<'Supplier'>;

export function createPurchaseOrderId(value: string): PurchaseOrderId {
  return createEntityId<'PurchaseOrder'>(value);
}

export type PurchaseOrderStatus =
  | 'Draft'
  | 'PendingApproval'
  | 'Approved'
  | 'Sent'
  | 'PartiallyReceived'
  | 'Received'
  | 'Cancelled';

/**
 * Line item shape mirrors the real fields present on ETA's own commercial
 * document templates (Offer/Invoice): description, manufacturer/standard,
 * quantity, unit price, and an implied line total.
 */
export interface PurchaseOrderLineItem {
  description: string;
  standard?: string;
  quantity: number;
  unitPrice: Money;
}

export class PurchaseOrderValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PurchaseOrderValidationError';
  }
}

export interface PurchaseOrderProps {
  id: PurchaseOrderId;
  supplierId: SupplierRef;
  lineItems: PurchaseOrderLineItem[];
  status: PurchaseOrderStatus;
}

export class PurchaseOrder {
  private constructor(private props: PurchaseOrderProps) {}

  static create(props: { id: PurchaseOrderId; supplierId: SupplierRef; lineItems: PurchaseOrderLineItem[] }): PurchaseOrder {
    if (props.lineItems.length === 0) {
      throw new PurchaseOrderValidationError('A purchase order must have at least one line item');
    }
    for (const item of props.lineItems) {
      if (item.quantity <= 0) {
        throw new PurchaseOrderValidationError(`Line item "${item.description}" must have a positive quantity`);
      }
    }
    return new PurchaseOrder({ ...props, status: 'Draft' });
  }

  static fromProps(props: PurchaseOrderProps): PurchaseOrder {
    return new PurchaseOrder(props);
  }

  get id(): PurchaseOrderId {
    return this.props.id;
  }

  get status(): PurchaseOrderStatus {
    return this.props.status;
  }

  get lineItems(): readonly PurchaseOrderLineItem[] {
    return this.props.lineItems;
  }

  toProps(): PurchaseOrderProps {
    return { ...this.props, lineItems: [...this.props.lineItems] };
  }

  /** Total across all line items. Throws only if line items somehow mix currencies — should never happen since a PO is single-currency by construction. */
  total(): Money {
    return this.props.lineItems.reduce((sum, item) => {
      const lineTotal = item.unitPrice.multiply(item.quantity);
      const added = sum.add(lineTotal);
      if (!added.ok) {
        throw new PurchaseOrderValidationError(added.error);
      }
      return added.value;
    }, Money.zero(this.props.lineItems[0].unitPrice.currency));
  }

  /**
   * Submits for approval, applying the injected ApprovalPolicy (real
   * business-rule mechanism — the specific threshold is a policy
   * decision, not hardcoded here, since the exact figure is a business
   * configuration matter, not an architectural one).
   */
  submitForApproval(policy: ApprovalPolicy): void {
    if (this.props.status !== 'Draft') {
      throw new PurchaseOrderValidationError('Only a Draft purchase order can be submitted for approval');
    }
    this.props.status = policy.requiresApproval(this.total()) ? 'PendingApproval' : 'Approved';
  }

  approve(): void {
    if (this.props.status !== 'PendingApproval') {
      throw new PurchaseOrderValidationError('Only a PendingApproval purchase order can be approved');
    }
    this.props.status = 'Approved';
  }

  send(): void {
    if (this.props.status !== 'Approved') {
      throw new PurchaseOrderValidationError('Only an Approved purchase order can be sent to the supplier');
    }
    this.props.status = 'Sent';
  }

  recordReceipt(fullyReceived: boolean): void {
    if (this.props.status !== 'Sent' && this.props.status !== 'PartiallyReceived') {
      throw new PurchaseOrderValidationError('Cannot record receipt for a purchase order that has not been sent');
    }
    this.props.status = fullyReceived ? 'Received' : 'PartiallyReceived';
  }

  cancel(): void {
    if (this.props.status === 'Received' || this.props.status === 'Cancelled') {
      throw new PurchaseOrderValidationError(`Cannot cancel a purchase order in status ${this.props.status}`);
    }
    this.props.status = 'Cancelled';
  }
}
