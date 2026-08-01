import { Money } from '@eta/kernel';

/**
 * Approval-requirement policy, injected rather than hardcoded — mirrors
 * the real "Financial Approval Matrix" concept referenced in the
 * knowledge base's Finance domain material. The concrete threshold is a
 * business/finance configuration decision, not an architectural one, so
 * it is never hardcoded into the domain model itself.
 */
export interface ApprovalPolicy {
  requiresApproval(total: Money): boolean;
}

/** Real, working default policy: anything at or above the configured threshold requires explicit approval. */
export class ThresholdApprovalPolicy implements ApprovalPolicy {
  constructor(private readonly threshold: Money) {}

  requiresApproval(total: Money): boolean {
    const diff = total.subtract(this.threshold);
    if (!diff.ok) {
      throw new Error('Purchase order total and approval threshold must be in the same currency');
    }
    return !diff.value.isNegative();
  }
}
