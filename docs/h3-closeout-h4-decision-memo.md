# H3 Closeout and H4 Decision Memo

## Status

H3 is complete as a manual, controlled Daily Brief workflow. This memo is
documentation-only. It does not change the renderer, validation script, Project
Status records, snapshots, npm scripts, CLI/bin entries, scheduling,
notifications, databases, deployments, GitHub Actions, app code, or external
services.

## H3 Completed Outcomes

H3 established the first usable Project Status to Daily Brief tool path:

- Project Status records remain the current-state source in
  `docs/project-status/current-projects.md`.
- `scripts/render-daily-brief.mjs` can read Project Status records, validate
  required fields, and render Daily Brief-shaped Markdown.
- The renderer is stdout-only by default.
- The renderer can create a dated snapshot only when explicitly run with
  `--write-date YYYY-MM-DD`.
- Snapshot writes are constrained to `docs/daily-briefs/YYYY-MM-DD.md`.
- Existing snapshot files are protected because the renderer fails instead of
  overwriting them.
- `scripts/validate-render-daily-brief.mjs` provides manual validation coverage
  for success output, missing fields, malformed lists, blocked projects,
  multiple projects, controlled snapshot writes, duplicate dates, invalid dates,
  unsupported output paths, and invalid status input before writing.
- The first official Daily Brief snapshot exists at
  `docs/daily-briefs/2026-07-17.md`.

## Current Manual Daily Brief Workflow

The workflow remains manual and reviewable:

1. Read `docs/project-status/current-projects.md` as the current project-state
   source.
2. Confirm the Daily Brief rules in `docs/daily-brief-update-protocol.md`.
3. Render a Daily Brief preview to stdout when a human or AI agent needs a
   current summary.
4. Run validation before relying on the renderer for a snapshot task.
5. Create a dated snapshot only when the scope explicitly approves a
   `--write-date YYYY-MM-DD` write.
6. Review the diff and confirm only the intended `docs/daily-briefs/YYYY-MM-DD.md`
   snapshot changed.
7. Keep old snapshots as historical records unless a typo fix or explicit
   correction is approved.

## Available Commands

Preview a Daily Brief to stdout:

```sh
node scripts/render-daily-brief.mjs
```

Create a controlled dated snapshot:

```sh
node scripts/render-daily-brief.mjs --write-date YYYY-MM-DD
```

Run the manual renderer validation suite:

```sh
node scripts/validate-render-daily-brief.mjs
```

## Current Safety Boundaries

The current workflow intentionally has:

- no npm script;
- no CLI/bin entry;
- no schedule;
- no automatic notification;
- no database integration;
- no deployment integration;
- no GitHub Actions integration;
- no external-service integration.

The Daily Brief output does not authorize code changes, merges, deployments,
database work, GitHub Actions changes, external-service changes, scheduling, or
notifications. Any consequential action still needs separate human approval,
scope, branch, validation, and PR review.

## Official Snapshot

The first official snapshot is:

```text
docs/daily-briefs/2026-07-17.md
```

That file is a dated snapshot. It does not replace
`docs/project-status/current-projects.md` as the current-state source.

## H4 Decision Options

H4 should decide whether the Daily Brief workflow stays manual or moves toward
limited automation boundaries.

1. Maintain manual workflow
   - Keep direct Node commands only.
   - Continue explicit human approval before snapshot creation.
   - Avoid adding package scripts, schedules, or notifications.
2. Add an npm script without scheduling
   - Add a named package script for easier manual execution.
   - Keep all execution manual.
   - Do not add automatic writes, schedules, or notifications.
3. Plan scheduling without notifications
   - Define whether and when a schedule should run.
   - Keep notification delivery out of scope.
   - Require explicit guardrails before any implementation.
4. Plan notifications with separate permissions and guardrails
   - Treat notifications as a separate capability.
   - Define recipients, approval rules, failure handling, and do-not-send
     conditions before implementation.
   - Do not combine notification work with unrelated renderer changes.

## Recommended Default

Keep the workflow manual for now. Use the existing commands for a few Daily
Brief cycles, then decide whether repeated use justifies npm script naming,
scheduling policy, or notification planning.

This default keeps H3's safety boundaries intact while providing enough real
usage evidence for H4.

## Suggested Next Step

If the user approves moving beyond the manual workflow, start with:

```text
H4.1 automation boundary plan
```

H4.1 should remain planning-only unless implementation is explicitly approved.
It should decide the boundary between manual commands, npm script naming,
scheduling, notifications, and approval requirements before any automation is
added.
