# Completion Report Template

## Status

Fixed template, v1. Governed by
[CODING_AGENT_TASK_PROTOCOL.md](../architecture/CODING_AGENT_TASK_PROTOCOL.md).
A Coding Agent submits this report (as a GitHub Issue comment, or a pinned
Issue update once write-back automation exists) to move a ticket from
`coding` to `ready-for-review`. Every field is required; do not replace a
field with a vague summary.

This template is provider-neutral: it must be usable unchanged by Claude
Code, Codex, Gemini CLI, or any other Coding Agent.

---

```markdown
## Ticket ID
<!-- Must match the engineering ticket this report completes. -->

## Agent/Provider
<!-- Which Coding Agent/tool/model produced this work, e.g.
     "Claude Code (claude-sonnet-5)" or "Codex". -->

## Branch
<!-- Work branch the commits live on. -->

## Base SHA
<!-- Must match the ticket's declared Base SHA. -->

## Final commit SHA
<!-- The exact commit being submitted for review. -->

## Changed files
<!-- Full list of files added/modified/deleted. -->

## Summary
<!-- What changed and why, in plain language. Not a restatement of the
     ticket goal — describe what was actually done. -->

## Verification commands and results
<!-- For every item in the ticket's Required verification: the exact
     command run (or manual check performed) and its actual result. No
     "should work" — report the real output or outcome. -->

## Scope/security confirmation
<!-- Explicit confirmation that the diff stays within the ticket's Allowed
     changes and does not touch Forbidden changes, secrets, credentials, or
     production/cloud resources. If it does not stay within scope, that
     belongs in Deviations, not here. -->

## Deviations
<!-- Any difference between what the ticket specified and what was actually
     done, including scope touched outside Allowed changes, and why. Empty
     only if there truly are none — do not omit this section. -->

## Known limitations
<!-- What is intentionally left undone, untested, or uncertain. -->

## Final git status
<!-- Output of `git status --short` at submission time, so reviewers can
     confirm no unexpected dirty/untracked files remain. -->

## Recommended next state
<!-- One of: ready-for-review (normal case), blocked (if something outside
     this agent's authority prevents completion). This report itself moves
     the ticket to ready-for-review when submitted in full; use blocked
     instead if the ticket cannot be completed as scoped. -->
```

## Related Documents

- [Coding Agent Task Protocol](../architecture/CODING_AGENT_TASK_PROTOCOL.md)
- [Engineering Ticket Template](ENGINEERING_TICKET_TEMPLATE.md)
