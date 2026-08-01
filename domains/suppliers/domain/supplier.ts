import { createEntityId, EntityId } from '@eta/kernel';

export type SupplierId = EntityId<'Supplier'>;

export function createSupplierId(value: string): SupplierId {
  return createEntityId<'Supplier'>(value);
}

/**
 * Category reflects how ETA sources from this supplier — mirrors the real
 * distinction seen across the knowledge base between primary manufacturers
 * (e.g. Mobarakeh Steel, Kashan Amir Kabir Steel) and equipment/trading
 * intermediaries (e.g. Tartan crushing/screening equipment).
 */
export type SupplierCategory = 'Manufacturer' | 'Trader' | 'Agent' | 'ServiceProvider';

export type SupplierStatus = 'PendingReview' | 'Active' | 'Suspended';

/**
 * A standard/grade a supplier is certified against for a given product
 * category — e.g. "EN 10346" / "DX51D" for galvanized sheet, matching the
 * standard/grade fields seen in real manufacturer catalogs in the
 * knowledge base and in ETA's own commercial offer templates.
 */
export interface Certification {
  standard: string;
  grade: string;
  recordedAt: Date;
}

export interface SupplierProps {
  id: SupplierId;
  legalName: string;
  country: string;
  category: SupplierCategory;
  productCategories: string[];
  certifications: Certification[];
  status: SupplierStatus;
  contactEmail: string;
}

export class SupplierValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SupplierValidationError';
  }
}

/**
 * Supplier aggregate root. Business rule enforced here, not just at the UI
 * layer: a supplier cannot become Active without at least one recorded
 * certification — every real commercial document in the knowledge base
 * (offers, invoices) carries a Standard/Grade field, meaning ETA does not
 * transact against uncertified sourcing in practice, and the domain model
 * should not allow it either.
 */
export class Supplier {
  private constructor(private props: SupplierProps) {}

  static register(props: Omit<SupplierProps, 'status' | 'certifications'>): Supplier {
    if (props.legalName.trim().length === 0) {
      throw new SupplierValidationError('Supplier legal name is required');
    }
    if (props.productCategories.length === 0) {
      throw new SupplierValidationError('At least one product category is required');
    }
    return new Supplier({
      ...props,
      certifications: [],
      status: 'PendingReview',
    });
  }

  static fromProps(props: SupplierProps): Supplier {
    return new Supplier(props);
  }

  get id(): SupplierId {
    return this.props.id;
  }

  get status(): SupplierStatus {
    return this.props.status;
  }

  get certifications(): readonly Certification[] {
    return this.props.certifications;
  }

  toProps(): SupplierProps {
    return { ...this.props, certifications: [...this.props.certifications] };
  }

  recordCertification(certification: Certification): void {
    this.props.certifications = [...this.props.certifications, certification];
  }

  activate(): void {
    if (this.props.certifications.length === 0) {
      throw new SupplierValidationError(
        'Cannot activate a supplier with no recorded certifications',
      );
    }
    if (this.props.status === 'Suspended') {
      throw new SupplierValidationError('Cannot activate a suspended supplier directly — review first');
    }
    this.props.status = 'Active';
  }

  suspend(reason: string): void {
    if (reason.trim().length === 0) {
      throw new SupplierValidationError('A suspension reason is required');
    }
    this.props.status = 'Suspended';
  }
}
