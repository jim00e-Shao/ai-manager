# Controlled Snapshot Write Plan

## Status

Draft H3.6 plan. This document is planning-only and does not implement file
writing, change the renderer, add an npm script, create a CLI, create a
schedule, send notifications, change a database, change deployment, change
GitHub Actions, or integrate external services.

## Purpose

The Daily Brief renderer currently prints Daily Brief-shaped Markdown to stdout.
That stdout-only default must remain the baseline behavior.

This plan defines a future controlled snapshot write mode for creating dated
Daily Brief files only when a human explicitly approves that implementation
scope.

## Current Behavior

The current renderer:

- reads `docs/project-status/current-projects.md` by default;
- may read an alternate Project Status file with `--status-file`;
- validates Project Status records before rendering;
- writes rendered Markdown to stdout;
- writes validation errors to stderr;
- does not write to `docs/daily-briefs/`.

No H3.6 change should modify `scripts/render-daily-brief.mjs` or
`scripts/validate-render-daily-brief.mjs`.

## Recommended Parameter

The first controlled snapshot write implementation should use:

```sh
node scripts/render-daily-brief.mjs --write-date YYYY-MM-DD
```

The renderer should derive the output path from the date:

```text
docs/daily-briefs/YYYY-MM-DD.md
```

This is preferred over an arbitrary `--output docs/daily-briefs/YYYY-MM-DD.md`
parameter because a date-only option keeps the write target constrained and
reduces the risk of writing outside the Daily Brief snapshot directory.

The first implementation should not support arbitrary output paths.

## Write Target Rules

Controlled snapshot writes must be limited to `docs/daily-briefs/`.

The renderer must not accept a path that resolves outside that directory. If a
future implementation accepts any path-like argument, it must normalize and
verify the resolved path before writing.

The `--write-date` option should derive a filename exactly matching
`YYYY-MM-DD.md`.

## Existing File Rule

If `docs/daily-briefs/YYYY-MM-DD.md` already exists, the renderer must fail by
default and must not overwrite the file.

The first controlled snapshot write implementation should not support
overwrite.

If overwrite is ever allowed later, it must require a separate explicit
`--overwrite` option, a separate approved scope, and validation that only the
intended snapshot file changed. Overwrite is not recommended for the first
write implementation because old Daily Briefs are historical snapshots.

## Validation Order

The renderer must complete Project Status validation before any file write.

If any Project Status record is missing required fields, has invalid fields, or
cannot be parsed, the renderer must:

- write the validation error to stderr;
- exit with code `1`;
- not create or modify a Daily Brief snapshot.

## Date Validation

`--write-date` must accept only `YYYY-MM-DD`.

Invalid dates must fail before rendering or writing. Examples that should fail:

- missing date;
- `YYYY-M-D`;
- dates with slashes;
- dates with time components;
- impossible calendar dates;
- path traversal input such as `../2026-07-16`.

The renderer should report a clear stderr error and exit with code `1`.

## Interaction With `--status-file`

The first controlled snapshot write implementation may allow:

```sh
node scripts/render-daily-brief.mjs --status-file test-fixtures/project-status/valid-multiple-projects.md --write-date YYYY-MM-DD
```

This must be documented as a testing or controlled-review path only. A snapshot
created from `--status-file` does not prove that
`docs/project-status/current-projects.md` was updated or that current project
state changed.

If `--status-file` is combined with `--write-date`, the renderer output should
make the source clear in the generated snapshot, or the validation flow should
require human review before commit.

## Post-Write Checks

After a controlled snapshot write, the operator must verify:

- exactly one expected `docs/daily-briefs/YYYY-MM-DD.md` file was created;
- no Project Status record changed unless a separate status-update task
  explicitly approved it;
- no renderer, validation, npm script, CLI, app code, database, deployment,
  GitHub Actions, or external-service files changed;
- `git diff --check` passes;
- available renderer validation still passes when relevant.

## Avoiding Old Snapshot Overwrite

Old Daily Briefs are historical snapshots. The write mode must protect them by:

- failing when the target file exists;
- deriving the filename from a strict date instead of accepting arbitrary paths;
- not supporting overwrite in the first implementation;
- requiring a separate explicit correction process for old snapshots, consistent
  with `docs/daily-brief-update-protocol.md`.

## Not Automation

Controlled snapshot write is a manual, explicit command path. It does not mean:

- automatic scheduling;
- automatic notifications;
- recurring reminders;
- GitHub Actions automation;
- deployment hooks;
- database persistence;
- external-service integration;
- execution approval for any Daily Brief recommendation.

Any future write implementation must remain scoped to the approved command
behavior and must not broaden into automation without a separate plan and PR.

## Non-Goals

H3.6 must not:

- modify `scripts/render-daily-brief.mjs`;
- modify `scripts/validate-render-daily-brief.mjs`;
- add file-writing behavior;
- add npm scripts;
- add a CLI or package `bin` entry;
- create scheduling or automatic notifications;
- modify Daily Brief examples;
- modify app code;
- change databases, deployment, GitHub Actions, or external services;
- modify CareTide or Harmony Home status records.
