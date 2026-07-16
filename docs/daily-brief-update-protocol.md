# Daily Brief Update Protocol

## Status

Draft update protocol for H2.5. This protocol governs manual Project Status
updates and Daily Brief snapshot creation.

## Purpose

The Daily Brief flow needs stable rules so humans and AI agents know when to
update current project state, when to create a dated brief, how to preserve old
briefs, and which document wins when records disagree.

This protocol is documentation-only. It does not create a CLI, scheduler,
automation, notification system, database, deployment, GitHub Actions workflow,
or external-service integration.

## Authority

`docs/project-status/current-projects.md` is the current-state source for active
projects.

`docs/daily-briefs/YYYY-MM-DD.md` files are dated snapshots generated from the
Project Status records and Daily Brief template. They preserve what the brief
said at that point in time.

If a Daily Brief and `docs/project-status/current-projects.md` conflict,
`docs/project-status/current-projects.md` governs current state. A Daily Brief
may explain historical context, but it must not override current Project Status
records.

`docs/project-status-schema.md` governs the Project Status record fields.
`docs/daily-brief-template.md` governs the shape of generated Daily Briefs.

## Execution Authority

A Daily Brief does not authorize:

- code changes;
- merges or marking PRs ready for review;
- deployments;
- database changes;
- GitHub Actions changes;
- external-service changes or integrations;
- CLI creation;
- scheduling or automatic notifications.

Any action mentioned in a Daily Brief still requires the normal repository
workflow, human approval where required, and a scoped branch or PR.

## When to Update `current-projects.md`

Update `docs/project-status/current-projects.md` when current project state
changes, including:

- a PR is opened, merged, closed, or materially changes review state;
- the latest meaningful completed work changes;
- the current phase changes;
- a waiting item is added, resolved, or clarified;
- a project becomes blocked or unblocked;
- the next recommended action changes;
- a `do_not_do` guardrail changes;
- a handoff prompt becomes stale or inaccurate;
- an unverified fact is verified or corrected.

Do not update `current-projects.md` only because a Daily Brief was generated.
The status record should change only when the underlying project state changes.

## When to Add `docs/daily-briefs/YYYY-MM-DD.md`

Add a new dated Daily Brief when a human or AI agent needs a point-in-time
summary for:

- the start of a work session;
- a daily or periodic project review;
- a handoff between agents or sessions;
- a milestone transition;
- a before/after comparison around a meaningful project-state change.

Use the local date in `YYYY-MM-DD` format. If more than one brief is needed on
the same date, add a short suffix such as `YYYY-MM-DD-2.md` or
`YYYY-MM-DD-topic.md` rather than overwriting the earlier brief.

## Old Daily Briefs

Keep old Daily Briefs unchanged. They are historical snapshots.

Do not edit an old Daily Brief to match newer Project Status records. Instead:

- update `docs/project-status/current-projects.md` when current state changes;
- create a new dated Daily Brief when a new summary is needed.

Old Daily Briefs may be edited only to fix typos, broken Markdown formatting, or
obvious transcription mistakes. If the correction changes meaning, add an
explicit `Correction` note that states what changed and why.

## Required Reading Before Generating a Daily Brief

Before creating any new Daily Brief, read:

1. `docs/project-status-schema.md`
2. `docs/project-status/current-projects.md`
3. `docs/daily-brief-template.md`
4. the latest relevant file in `docs/daily-briefs/`, if one exists
5. `PROJECT_MAP.md`

If the brief will mention repository workflow, also check the relevant
contribution or handoff document before adding process guidance.

## Required Checks After Generating a Daily Brief

After generating a Daily Brief:

- confirm every active Project Status record was considered;
- confirm every project summary traces to `current-projects.md`;
- confirm every `waiting_for` item is represented or intentionally omitted with
  a reason;
- confirm every `blocked: true` project appears in the blocked section;
- confirm projects with `blocked: false` are not described as blocked;
- confirm every recommended action traces to `next_action`;
- confirm every guardrail traces to `do_not_do` or the Daily Brief source
  boundary;
- confirm every handoff prompt is copied from the Project Status record unless
  a human explicitly approved edits;
- confirm the brief does not authorize code changes, merge, deploy, database
  work, GitHub Actions work, external-service work, CLI creation, scheduling, or
  automatic notifications;
- run available Markdown or repository checks.

If `package.json` has no lint or markdown lint script, report that no lint or
markdown lint script is available and run `git diff --check`.

## Waiting Items

Copy waiting items from each record's `waiting_for` list into the Daily Brief's
waiting section when they affect the next action, priority order, or handoff.

Do not treat a waiting item as resolved unless `current-projects.md` has been
updated or the current task explicitly verifies and updates the Project Status
record.

## Blocked State

Use the `blocked` field from `current-projects.md`.

If `blocked` is `true`, the Daily Brief must explain what is blocked and what
would unblock it using the record's waiting items or available project facts.

If `blocked` is `false`, the Daily Brief may still place the project under
observation or waiting, but it must not call the project blocked.

## `do_not_do` Guardrails

Carry forward each record's `do_not_do` list into the Daily Brief guardrails.

Do not weaken, summarize away, or contradict a `do_not_do` item. Short summaries
are acceptable only when the full guardrail remains available in the project
section or guardrail table.

## `handoff_prompt`

Copy the `handoff_prompt` from each Project Status record into the Daily Brief
handoff section.

Do not invent a new handoff prompt unless a human explicitly requests it. If a
handoff prompt is stale, update `current-projects.md` first, then create a new
Daily Brief from the updated record.

## Conflict Handling

When documents disagree:

1. `docs/project-status/current-projects.md` governs current project state.
2. `docs/project-status-schema.md` governs required Project Status fields.
3. `docs/daily-brief-template.md` governs Daily Brief shape.
4. Dated Daily Briefs preserve historical snapshots and do not govern current
   state.

If the conflict indicates a stale Project Status record, update
`current-projects.md` in a scoped documentation change before generating or
updating a Daily Brief.
