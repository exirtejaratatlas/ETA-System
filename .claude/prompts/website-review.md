# Prompt: Website Review

**Use with:** `eta-website`, `eta-ui-review`

```
Review the ETA website at [URL or apps/web if live locally]. Before starting:
1. Confirm what system is actually live (don't assume apps/web is deployed).
2. Check .claude/memory/website.md and .claude/memory/brand.md for known facts.

Then evaluate: usability (golden path + edge cases), accessibility (contrast,
keyboard nav, alt text), and consistency with any verified brand assets
(eta-branding). Report findings with severity, not just a list of
observations. Do not propose or make any live changes — this is a review,
not a refactor (see website-refactor.md for that).
```
