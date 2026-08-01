# ADR-0010: Repository Visibility and GitHub Process

Status: Accepted
Date: 2026-07-23

## Context

The repository is currently **public** on GitHub while `LICENSE` declares it proprietary ("All Rights Reserved. This is not an open-source project.") — a direct mismatch. Separately, the repository has zero issues, zero pull requests, and disabled discussions — no GitHub-native process has ever been used; all work has happened through direct commits and external conversation.

## Decision

- Recommend switching repository visibility to **private**, consistent with the proprietary license. This is an account-level setting change and is left to explicit user action, not executed by this ADR.
- Adopt GitHub Issues for tracking implementation work once real code exists (not needed while the roadmap is a single agreed sequence executed by one engineer).
- Adopt Pull Requests as the standard change process once a second contributor joins the project — not required before then, but the convention should already be documented (this ADR) so it isn't reinvented later.

## Consequences

- Until visibility is changed, treat the repository as public for any sensitivity judgment — nothing sensitive should be added under this file tree in the meantime.
- This ADR does not change GitHub settings itself; it records the recommendation for the user to act on.
