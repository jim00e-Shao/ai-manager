# Tool MVP Plan

## Status

Draft H3.1 plan. This document is planning-only and does not implement a tool,
CLI, Node script, npm script, automation, database, deployment, GitHub Actions
workflow, or external-service integration.

## Goal

The H3 first tool MVP should prove the smallest read-only path from Project
Status records to Daily Brief output.

The tool's job is to read the existing Project Status documentation, validate
that the records contain the required fields, and produce a Daily Brief-shaped
summary that a human or AI agent can review.

## H3.1 Boundary

H3.1 only plans the tool MVP.

H3.2 may consider implementing a read-only Node script, but only after this plan
is reviewed and the implementation scope is explicitly approved.

This PR must not:

- modify app code;
- create a CLI;
- add an npm script;
- add a Node script;
- create scheduling or automatic notifications;
- create a database;
- change deployment;
- change GitHub Actions;
- add external-service integrations;
- modify CareTide or Harmony Home.

The H3.1 plan and any first tool MVP scope must not modify app code.

## First-Version Inputs

The first implementation should read only:

- `docs/project-status/current-projects.md`
- `docs/project-status-schema.md`
- `docs/daily-brief-template.md`
- `docs/daily-brief-update-protocol.md`

It may read `docs/daily-briefs/` only in a later scope if the user approves
history-aware comparison behavior.

## First-Version Output

The first implementation should produce a Daily Brief-shaped Markdown output
using the sections defined in `docs/daily-brief-template.md`:

- 今日總覽
- 可動工
- 觀察中
- 等待外部資訊
- 卡住 / blocked
- 各專案狀態摘要
- 今日建議優先順序
- Do Not Do guardrails
- Handoff prompt 區塊

The output should be generated from the Project Status records without adding
new project facts.

## Output Destination

The first implementation should print the generated Daily Brief to stdout.

It should not automatically write to `docs/daily-briefs/YYYY-MM-DD.md`.

If a future version should write a dated Daily Brief file, that behavior must be
approved in a separate PR. The write behavior must follow
`docs/daily-brief-update-protocol.md`, including snapshot preservation and
correction rules.

## Script, npm Script, and CLI Direction

H3.1 does not add any script.

H3.2 may consider a read-only Node script invoked directly with `node`, but it
should not automatically become a user-facing CLI or package `bin` entry.

Do not add an npm script until the command shape is reviewed. Do not add a CLI
until the H3 scope explicitly approves CLI behavior.

## Read-Only Behavior

The first implementation should be read-only.

It must not modify:

- `docs/project-status/current-projects.md`;
- `docs/daily-briefs/`;
- `PROJECT_MAP.md`;
- `package.json`;
- app code;
- external systems.

The tool may report that a Project Status record is invalid, incomplete, or
stale, but it must not repair or rewrite the record automatically.

## Avoiding Project Status Changes

The tool should avoid modifying Project Status records by:

- opening input files in read mode only;
- treating parsed records as in-memory data;
- reporting validation issues to stdout or stderr;
- exiting with a non-zero status on invalid required fields;
- requiring a separate human-approved documentation change to update
  `docs/project-status/current-projects.md`.

## Missing Fields and Invalid Records

The first implementation should validate each Project Status record against the
schema fields:

```text
project_name
current_phase
latest_done
latest_pr
latest_commit
waiting_for
next_action
blocked
do_not_do
handoff_prompt
```

If a required field is missing, empty, malformed, or appears out of the expected
record shape, the tool should:

- identify the project if possible;
- identify the missing or invalid field;
- avoid producing a misleading Daily Brief;
- exit with a non-zero status;
- not modify files.

If one record is invalid, the first implementation should fail the whole brief
rather than silently omitting the project.

## Multiple Projects

The first implementation should support multiple Project Status records in one
source file.

It should:

- parse each project independently;
- preserve the project name in every summary, guardrail, and handoff block;
- include every valid project in the per-project summary;
- classify blocked projects from `blocked`;
- classify waiting items from `waiting_for`;
- avoid inventing a priority reason that is not traceable to the records.

## Field Handling Rules

### `waiting_for`

Use `waiting_for` to populate the waiting section and to explain why a project
may be watched instead of advanced immediately.

Do not mark a waiting item resolved unless `current-projects.md` has already
been updated.

### `blocked`

Use `blocked` as the authority for the blocked section.

If `blocked` is `true`, the project must appear in `卡住 / blocked`.

If `blocked` is `false`, the project may appear in `可動工`, `觀察中`, or
`等待外部資訊`, but it must not be described as blocked.

### `do_not_do`

Carry every `do_not_do` item into the guardrails section with project
attribution.

Do not weaken a guardrail. Summaries are acceptable only if the full project
guardrails remain visible elsewhere in the output.

### `handoff_prompt`

Copy `handoff_prompt` into the handoff section.

Do not generate a replacement handoff prompt unless a future scope explicitly
approves that behavior.

## Priority Rules

The first implementation may provide a simple priority order, but every priority
reason must trace to Project Status fields.

The tool should prefer projects whose `blocked` value is `false` and whose
`next_action` is specific, while clearly identifying waiting items that require
human confirmation.

If priority cannot be determined safely, the tool should say so instead of
inventing a ranking.

## Non-Goals

The first tool MVP must not:

- edit Project Status records;
- write Daily Brief files automatically;
- create or update dated brief snapshots;
- implement a CLI;
- add package `bin` entries;
- add npm scripts;
- create scheduling or automatic notifications;
- create reminders;
- call GitHub, deployment providers, databases, or external services;
- modify app code;
- modify CareTide or Harmony Home;
- merge or mark PRs ready;
- deploy anything;
- treat a Daily Brief as execution approval.

## H3.2 Candidate Scope

If H3.1 is accepted, H3.2 may propose a read-only Node script that:

- parses `docs/project-status/current-projects.md`;
- validates required Project Status fields;
- renders a Daily Brief-shaped Markdown document to stdout;
- exits non-zero on invalid records;
- does not write files;
- does not add an npm script or CLI unless separately approved.

H3.2 should remain narrow enough to review independently.
