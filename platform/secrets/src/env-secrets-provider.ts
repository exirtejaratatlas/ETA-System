import { SecretNotFoundError, SecretsProvider } from './secrets-provider.js';

/**
 * Environment-variable-backed secrets provider. A real, functioning
 * implementation of SecretsProvider — appropriate for containerized
 * deployments where secrets are injected as env vars by the orchestrator
 * (e.g. from Kubernetes Secrets or the CI/CD pipeline), not a placeholder
 * for "the real thing later." A cloud-native KMS-backed provider (ADR-0006)
 * can be added as a second implementation of the same interface without
 * touching any consumer.
 *
 * `prefix` lets multiple domains share one process's env without key
 * collisions, e.g. prefix "PROCUREMENT_" turns get("DB_PASSWORD") into a
 * lookup of PROCUREMENT_DB_PASSWORD.
 */
export class EnvSecretsProvider implements SecretsProvider {
  constructor(private readonly prefix = '') {}

  async get(key: string): Promise<string> {
    const value = await this.tryGet(key);
    if (value === null) {
      throw new SecretNotFoundError(key);
    }
    return value;
  }

  async tryGet(key: string): Promise<string | null> {
    const envKey = `${this.prefix}${key}`;
    const value = process.env[envKey];
    return value === undefined ? null : value;
  }
}
