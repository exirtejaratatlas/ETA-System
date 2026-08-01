import { createDomainEvent, DomainEvent } from '@eta/kernel';
import { Certification, SupplierId, SupplierStatus } from './supplier.js';

export type SupplierRegistered = DomainEvent<'SupplierRegistered', { legalName: string; country: string }>;
export type SupplierStatusChanged = DomainEvent<
  'SupplierStatusChanged',
  { from: SupplierStatus; to: SupplierStatus; reason?: string }
>;
export type SupplierCertificationRecorded = DomainEvent<'SupplierCertificationRecorded', Certification>;

export function supplierRegistered(id: SupplierId, legalName: string, country: string): SupplierRegistered {
  return createDomainEvent('SupplierRegistered', id, { legalName, country });
}

export function supplierStatusChanged(
  id: SupplierId,
  from: SupplierStatus,
  to: SupplierStatus,
  reason?: string,
): SupplierStatusChanged {
  return createDomainEvent('SupplierStatusChanged', id, { from, to, reason });
}

export function supplierCertificationRecorded(
  id: SupplierId,
  certification: Certification,
): SupplierCertificationRecorded {
  return createDomainEvent('SupplierCertificationRecorded', id, certification);
}
