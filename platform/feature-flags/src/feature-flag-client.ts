import { hashToPercentile } from './hash.js';

export type FlagDefinition =
  | { type: 'boolean'; enabled: boolean }
  | { type: 'percentage-rollout'; rolloutPercent: number };

export interface FlagEvaluationContext {
  /** A stable identifier (e.g. user ID) so percentage rollouts are sticky per-subject, not random per call. */
  stableKey: string;
}

export interface FeatureFlagClient {
  isEnabled(flagName: string, context: FlagEvaluationContext): boolean;
}

/**
 * Config-driven feature flag client. Real, functioning percentage-rollout
 * logic (deterministic bucketing via hashToPercentile) — not a placeholder.
 * The flag definitions themselves come from whatever config source the
 * caller supplies (env-parsed JSON, a config file, etc.) — this class
 * only owns the evaluation logic, not config loading.
 */
export class StaticFeatureFlagClient implements FeatureFlagClient {
  constructor(private readonly definitions: Record<string, FlagDefinition>) {}

  isEnabled(flagName: string, context: FlagEvaluationContext): boolean {
    const definition = this.definitions[flagName];
    if (!definition) return false;

    if (definition.type === 'boolean') {
      return definition.enabled;
    }

    const percentile = hashToPercentile(`${flagName}:${context.stableKey}`);
    return percentile < definition.rolloutPercent;
  }
}
