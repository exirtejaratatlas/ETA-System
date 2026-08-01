/**
 * Deterministic FNV-1a hash mapped to [0, 100). Same (flagName, stableKey)
 * pair always produces the same bucket — this is what makes percentage
 * rollouts sticky per-user instead of flapping between requests.
 */
export function hashToPercentile(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0) % 100;
}
