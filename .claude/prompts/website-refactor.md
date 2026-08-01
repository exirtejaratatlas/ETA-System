# Prompt: Website Refactor

**Use with:** `eta-website`, `eta-production-safety`

```
Plan a refactor of [specific website area/component]. Before proposing changes:
1. Confirm which codebase is authoritative (apps/web vs. an external system) —
   see .claude/memory/website.md, currently UNKNOWN until verified.
2. Check for an existing ADR covering this area; if the change is structural,
   write one first rather than refactoring ad hoc.

Website changes are production-facing once a live site exists — get explicit
confirmation before deploying anything, per eta-production-safety. Scope the
refactor narrowly; don't bundle unrelated cleanup into the same change.
```
