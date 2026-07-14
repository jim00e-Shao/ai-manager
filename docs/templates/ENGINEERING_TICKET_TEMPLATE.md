# Engineering Ticket Template

## Status

Fixed template, v1. Governed by
[CODING_AGENT_TASK_PROTOCOL.md](../architecture/CODING_AGENT_TASK_PROTOCOL.md).
Copy the block below into a GitHub Issue body (or a pinned comment) to create
a ticket. Do not remove required fields. A ticket cannot leave `draft` until
every required field below is filled with specific, non-vague content —
especially `Base SHA`, `Allowed changes`, `Forbidden changes`, and `Required
verification`.

This template is provider-neutral: it must be usable unchanged by Claude
Code, Codex, Gemini CLI, or any other Coding Agent, and by a human performing
the work manually.

---

```markdown
## Ticket ID
<!-- Unique ID, e.g. AIM-042. Must match the GitHub Issue it lives in. -->

## Title
<!-- One-line summary of the work. -->

## Repository
<!-- e.g. jim00e-Shao/ai-manager -->

## Base branch
<!-- The branch the work branch is created from, e.g. main -->

## Base SHA
<!-- REQUIRED. The exact commit hash the work branch is created from.
     Not a branch name. Not "latest". Must resolve with `git rev-parse`. -->

## Work branch
<!-- The branch name the Coding Agent will commit to, e.g. docs/aim-042-x -->

## Goal
<!-- What outcome this ticket produces, in plain language. -->

## Context
<!-- Background the Coding Agent needs: why this ticket exists, links to
     related Issues/PRs/docs, prior attempts, and anything a Coding Agent
     with no prior conversation history must know to act safely. -->

## Allowed changes
<!-- REQUIRED. Specific file paths, directories, or explicit categories of
     change. No placeholders like "TBD". No vague phrases like "reasonable
     changes". Example: "Only files under docs/architecture/ and
     docs/templates/. No code, no package.json, no CI config." -->

## Forbidden changes
<!-- REQUIRED. Explicitly out-of-scope files, directories, or actions.
     Example: "Do not modify docs/continuity/**. Do not touch main. Do not
     push or open a PR." -->

## Required verification
<!-- REQUIRED. Concrete, runnable commands or explicit manual checks the
     Coding Agent must run and report results for. No vague completion
     phrases like "make sure it works".
     Example:
       - `git diff --check`
       - Confirm all new relative Markdown links resolve
       - `git status --short` shows only intended files -->

## Approval requirements
<!-- Which actions on this ticket require Human Approver sign-off beyond the
     v1 default (push, merge, deploy, cloud resources, migrations, secrets/
     production/real data, paid operations, remote deletion, scope
     expansion). State any ticket-specific approvals in addition to the
     protocol defaults. -->

## Completion report
<!-- Left as a placeholder until the Coding Agent submits a completion
     report using COMPLETION_REPORT_TEMPLATE.md. Do not fill this in when
     creating the ticket. -->

## Timeout/retry policy
<!-- State the stall/timeout condition and the maximum attempts before this
     ticket must be escalated to `blocked` for human decision instead of
     re-dispatched. Example: "Stalled if no activity for 4 hours. Max 2
     attempts before escalation." -->

## Current status
<!-- One of: draft, ready-for-agent, coding, blocked, ready-for-review,
     changes-requested, merge-approved, done.
     Exactly one state at a time. -->
```

## Related Documents

- [Coding Agent Task Protocol](../architecture/CODING_AGENT_TASK_PROTOCOL.md)
- [Completion Report Template](COMPLETION_REPORT_TEMPLATE.md)
