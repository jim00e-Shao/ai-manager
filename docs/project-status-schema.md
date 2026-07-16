# Project Status Schema

## Status

Draft schema for manually maintained Project Status MVP records.

## Purpose

Project Status records give the AI Executive Office a fixed-format view of
multiple active projects. The MVP is documentation-only and exists so a human or
AI agent can quickly understand:

- what each project is;
- what phase it is in;
- what was most recently completed;
- what is waiting;
- what should happen next;
- what must not be done without explicit approval;
- how to hand off the next task to another agent.

This schema does not define a database, API, CLI, automation, GitHub Actions
workflow, deployment process, or external-service integration.

## Record Format

Each project status record must use this field order:

```yaml
project_name: ""
current_phase: ""
latest_done: ""
latest_pr: ""
latest_commit: ""
waiting_for: []
next_action: ""
blocked: false
do_not_do: []
handoff_prompt: ""
```

## Field Definitions

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `project_name` | string | yes | Human-readable project name. |
| `current_phase` | string | yes | Current phase, milestone, or operating mode. |
| `latest_done` | string | yes | Most recent meaningful completed work known to this record. |
| `latest_pr` | string | yes | Latest known PR reference, or `not verified` when unknown. |
| `latest_commit` | string | yes | Latest known commit short SHA and subject, or `not verified` when unknown. |
| `waiting_for` | list of strings | yes | External decisions, review gates, user input, or missing facts. Use an empty list only when nothing is known to be waiting. |
| `next_action` | string | yes | The next recommended action. It must be specific enough for another agent to start safely. |
| `blocked` | boolean | yes | `true` only when work cannot continue without a listed waiting item. |
| `do_not_do` | list of strings | yes | Explicit prohibitions for the next agent. These are guardrails, not suggestions. |
| `handoff_prompt` | string | yes | Copy-ready prompt for assigning the next action to an AI agent. |

## Update Rules

- Keep one record per active project in `docs/project-status/current-projects.md`.
- Preserve the exact field names and field order.
- Prefer concrete PR and commit references when they have been verified.
- Mark unverified external facts explicitly instead of guessing.
- Keep `next_action` narrow, reviewable, and consistent with `do_not_do`.
- Update `blocked` only from the listed `waiting_for` facts.
- Do not use these records to authorize code changes, deployments, GitHub
  Actions changes, database changes, or external-service operations.

## MVP Boundary

This MVP is a manual documentation surface. It may be read by humans and AI
agents, but it does not grant execution authority. Any consequential action must
still follow the repository's contribution, review, and human-approval rules.
