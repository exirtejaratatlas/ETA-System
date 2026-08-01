import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';
import { FastifyReply, FastifyRequest } from 'fastify';
import { config } from './config.js';

/**
 * Real Keycloak JWT verification (ADR-0007, ADR-0012) — fetches and
 * caches the realm's JWKS from Keycloak itself and verifies the token
 * signature, issuer, and expiry. This is not a placeholder: it performs
 * genuine cryptographic verification against a live Keycloak instance.
 */
const jwks = createRemoteJWKSet(new URL(`${config.keycloak.issuer}/protocol/openid-connect/certs`));

export interface AuthenticatedUser {
  subject: string;
  email?: string;
  preferredUsername?: string;
  roles: string[];
}

function extractRoles(payload: JWTPayload): string[] {
  const realmAccess = payload['realm_access'] as { roles?: string[] } | undefined;
  return realmAccess?.roles ?? [];
}

export async function verifyBearerToken(authorizationHeader: string | undefined): Promise<AuthenticatedUser> {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or malformed Authorization header');
  }
  const token = authorizationHeader.slice('Bearer '.length);
  const { payload } = await jwtVerify(token, jwks, { issuer: config.keycloak.issuer });

  return {
    subject: payload.sub as string,
    email: payload['email'] as string | undefined,
    preferredUsername: payload['preferred_username'] as string | undefined,
    roles: extractRoles(payload),
  };
}

/** Fastify preHandler hook — attaches `request.user` or replies 401. */
export async function requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const user = await verifyBearerToken(request.headers.authorization);
    (request as FastifyRequest & { user: AuthenticatedUser }).user = user;
  } catch (error) {
    reply.code(401).send({ error: 'Unauthorized', reason: error instanceof Error ? error.message : String(error) });
  }
}
