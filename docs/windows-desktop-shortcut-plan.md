# Windows Desktop Shortcut Plan

## Status

H4.2 implemented the first two Windows `.bat` wrappers planned here:

- `scripts/windows/preview-daily-brief.bat`
- `scripts/windows/validate-renderer.bat`

The generate-snapshot shortcut remains unimplemented and requires separate
approval. This document does not change the renderer, add npm scripts, add
CLI/bin entries, create schedules, send notifications, change Project Status
records, create Daily Brief snapshots, change app code, change databases,
change deployments, change GitHub Actions, or integrate external services.

## Goal

Make the manual Daily Brief workflow easier for a non-engineering user who does
not want to type Node commands in a terminal. The shortcut layer should remain a
manual convenience over the existing renderer, not a new automation system.

## Recommended File Location

Future Windows helper files should live under:

```text
scripts/windows/
```

Reasons:

- keeps platform-specific wrappers separate from cross-platform Node scripts;
- avoids treating `.bat` files as package-level CLI/bin entries;
- makes the wrappers discoverable without changing `package.json`;
- keeps the H4 boundary clear: desktop convenience, not automation.

## Batch Files

### Preview Daily Brief

Implemented path:

```text
scripts/windows/preview-daily-brief.bat
```

Purpose:

- run the current stdout-only preview command;
- keep the window open so a non-engineering user can read errors or output;
- avoid writing any files.

Command behavior:

```bat
@echo off
cd /d "%~dp0..\.."
node scripts/render-daily-brief.mjs
pause
```

This is the safest first shortcut because it cannot create a snapshot unless
the renderer behavior changes in a separate approved task.

### Validate Renderer

Implemented path:

```text
scripts/windows/validate-renderer.bat
```

Purpose:

- run the existing manual validation suite;
- show success or failure in a persistent window;
- confirm validation cleanup does not leave generated snapshots behind.

Command behavior:

```bat
@echo off
cd /d "%~dp0..\.."
node scripts/validate-render-daily-brief.mjs
pause
```

This wrapper is available before any snapshot-generation shortcut because
validation is the basic safety check for the renderer workflow.

### Generate Snapshot

A generate-snapshot `.bat` file is not implemented in H4.2. It should not be
added unless the user explicitly approves snapshot creation from a shortcut.

If approved later, recommended future path:

```text
scripts/windows/generate-daily-brief-snapshot.bat
```

Purpose:

- ask the user for an explicit `YYYY-MM-DD` date;
- reject empty input before running Node;
- call the existing controlled write command;
- rely on the renderer's existing no-overwrite behavior;
- keep the window open so the user can see success or failure.

Planned command behavior:

```bat
@echo off
cd /d "%~dp0..\.."
set /p WRITE_DATE=Enter snapshot date (YYYY-MM-DD):
if "%WRITE_DATE%"=="" (
  echo Missing snapshot date.
  pause
  exit /b 1
)
node scripts/render-daily-brief.mjs --write-date %WRITE_DATE%
pause
```

The first implementation should avoid auto-filling today's date. Requiring a
typed date keeps snapshot creation intentional and reduces accidental writes.

## Snapshot Overwrite Protection

The renderer already protects snapshots by:

- requiring explicit `--write-date YYYY-MM-DD`;
- validating the date format and calendar date;
- deriving the output path as `docs/daily-briefs/YYYY-MM-DD.md`;
- failing when the target file already exists;
- not supporting `--output`;
- not supporting `--overwrite`.

Any future `.bat` wrapper must preserve those protections:

- do not add an overwrite flag;
- do not delete an existing snapshot;
- do not rename old snapshots;
- do not accept arbitrary output paths;
- do not redirect stdout into `docs/daily-briefs/`;
- show the renderer error when the target snapshot already exists.

An optional pre-check may print a friendlier message when
`docs\daily-briefs\YYYY-MM-DD.md` already exists, but the renderer must remain
the final authority. The batch file should not attempt to work around renderer
validation.

## Desktop Shortcut Creation

Desktop shortcuts should point to the `.bat` files, not directly to Node
commands. This keeps the shortcut target short and makes future wrapper updates
possible without changing every desktop shortcut.

Manual creation flow:

1. Right-click the Windows desktop.
2. Choose `New` > `Shortcut`.
3. Set the target to the planned `.bat` path, for example:

```text
C:\Users\jim00\dev\ai-manager\scripts\windows\preview-daily-brief.bat
```

4. Name the shortcut clearly, for example:

```text
AI Manager - Preview Daily Brief
```

5. Repeat for validation:

```text
AI Manager - Validate Renderer
```

The validation shortcut target should point to:

```text
C:\Users\jim00\dev\ai-manager\scripts\windows\validate-renderer.bat
```

If a snapshot shortcut is approved later, name it with an explicit warning:

```text
AI Manager - Generate Daily Brief Snapshot
```

Shortcut properties should not add extra command arguments. All behavior should
remain inside the tracked `.bat` wrapper so changes are reviewable.

## Recommended H4.1 Decision

Implement only two shortcuts first:

1. preview Daily Brief;
2. validate renderer.

Do not implement a generate-snapshot shortcut in the first Windows shortcut
task. Snapshot creation writes files, so it should require a separate approval
after the user confirms that desktop shortcut behavior is clear enough and that
non-engineering users understand the date prompt and no-overwrite rule.

## Non-Goals

H4.1 must not:

- modify `scripts/render-daily-brief.mjs`;
- modify `scripts/validate-render-daily-brief.mjs`;
- add npm scripts;
- add CLI/bin entries;
- add scheduling;
- add automatic notifications;
- create or modify Daily Brief snapshots;
- modify Project Status records;
- modify app code;
- change databases, deployments, GitHub Actions, or external services.
