# Prompt: Company Profile Review

**Use with:** `eta-companyprofile`, `eta-evidence`

```
Review the ETA Company Profile document. First locate it via eta-knowledge-discovery
(check ai/knowledge/retrieval/inventory.json before crawling Drive fresh) — as of
the last check, Drive's 01_Company folder is confirmed empty, so the real
document (if it exists) is elsewhere in the vault or not yet authored.

Every factual claim you pull from it (legal name, structure, stakeholders) must
carry the full evidence citation (eta-evidence) and an explicit confidence
level. Do not modify the Company Profile itself — this is read-only review.
```
