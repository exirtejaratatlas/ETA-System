# platform/feature-flags

Feature-flag client abstraction for progressive rollout of new procurement workflows and AI features.

**Status: Implemented.** `StaticFeatureFlagClient` supports boolean flags and deterministic percentage rollouts (FNV-1a hash of `flagName:stableKey` — same subject always lands in the same bucket, so rollouts don't flap between requests).
