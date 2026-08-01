export const config = {
  port: Number(process.env.PORT ?? 4000),
  odoo: {
    // Matches the real running environment confirmed in ADR-0015 (Odoo 19 / Postgres 17,
    // db "eta_dev", port 8069). Username/password have no default — real Odoo credentials,
    // never hardcoded (ADR-0006).
    url: process.env.ODOO_URL ?? 'http://localhost:8069',
    db: process.env.ODOO_DB ?? 'eta_dev',
    username: process.env.ODOO_USERNAME ?? '',
    password: process.env.ODOO_PASSWORD ?? '',
  },
  keycloak: {
    issuer: process.env.KEYCLOAK_ISSUER ?? 'http://localhost:8080/realms/eta-system',
  },
  procurement: {
    // Financial Approval Matrix threshold (ADR-referenced in domains/procurement-core) —
    // a business/finance configuration value, not an architectural one, so it lives here
    // rather than being hardcoded into the domain.
    approvalThresholdMinorUnits: BigInt(process.env.APPROVAL_THRESHOLD_MINOR_UNITS ?? '500000000'),
    approvalThresholdCurrency: process.env.APPROVAL_THRESHOLD_CURRENCY ?? 'USD',
  },
};
