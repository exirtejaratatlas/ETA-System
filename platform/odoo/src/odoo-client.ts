import * as xmlrpc from 'xmlrpc';

export interface OdooConfig {
  url: string;
  db: string;
  username: string;
  password: string;
}

/**
 * Odoo external API client (XML-RPC — Odoo's standard integration
 * protocol, per ADR-0011's custom_addons-mount deployment pattern). Under
 * ADR-0017, this is ETA's persistence transport for every domain whose
 * business data Odoo owns — the direct equivalent of what
 * `platform/persistence`'s `PostgresConnection` was before. This package
 * has zero dependency on any `domains/*` package, so domain repositories
 * can depend on it without inverting ADR-0001's layering.
 */
export class OdooClient {
  private uid: number | null = null;
  private readonly commonClient: xmlrpc.Client;
  private readonly objectClient: xmlrpc.Client;

  constructor(private readonly config: OdooConfig) {
    this.commonClient = xmlrpc.createClient({ url: `${config.url}/xmlrpc/2/common` });
    this.objectClient = xmlrpc.createClient({ url: `${config.url}/xmlrpc/2/object` });
  }

  private call<T>(client: xmlrpc.Client, method: string, params: unknown[]): Promise<T> {
    return new Promise((resolve, reject) => {
      client.methodCall(method, params, (error, value) => {
        if (error) reject(error);
        else resolve(value as T);
      });
    });
  }

  /** Authenticates and caches the resulting uid for subsequent execute_kw calls. */
  async authenticate(): Promise<number> {
    if (this.uid !== null) return this.uid;
    const uid = await this.call<number>(this.commonClient, 'authenticate', [
      this.config.db,
      this.config.username,
      this.config.password,
      {},
    ]);
    if (!uid) {
      throw new Error('Odoo authentication failed — check db/username/password/URL');
    }
    this.uid = uid;
    return uid;
  }

  async execute<T>(model: string, method: string, args: unknown[], kwargs: Record<string, unknown> = {}): Promise<T> {
    const uid = await this.authenticate();
    return this.call<T>(this.objectClient, 'execute_kw', [
      this.config.db,
      uid,
      this.config.password,
      model,
      method,
      args,
      kwargs,
    ]);
  }

  async searchRead<T>(
    model: string,
    domain: unknown[],
    fields: string[],
    options: { limit?: number; offset?: number } = {},
  ): Promise<T[]> {
    return this.execute<T[]>(model, 'search_read', [domain], { fields, ...options });
  }

  /** Creates a record, returning Odoo's assigned integer id. `values` may include one2many tuples, e.g. `[[0, 0, {...}], ...]`. */
  async create(model: string, values: Record<string, unknown>): Promise<number> {
    return this.execute<number>(model, 'create', [values]);
  }

  /** Updates an existing record by its Odoo integer id. */
  async write(model: string, id: number, values: Record<string, unknown>): Promise<boolean> {
    return this.execute<boolean>(model, 'write', [[id], values]);
  }

  /** Deletes records by their Odoo integer ids — used to replace one2many lines wholesale on update. */
  async unlink(model: string, ids: number[]): Promise<boolean> {
    if (ids.length === 0) return true;
    return this.execute<boolean>(model, 'unlink', [ids]);
  }
}
