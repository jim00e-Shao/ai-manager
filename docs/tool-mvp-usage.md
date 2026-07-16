# Tool MVP Usage

## Status

Draft usage note for the H3.2 read-only Daily Brief renderer.

## Command

Run the renderer manually from the repository root:

```sh
node scripts/render-daily-brief.mjs
```

This default mode is stdout-only. It does not create or update files.

To render a controlled fixture or alternate Project Status file:

```sh
node scripts/render-daily-brief.mjs --status-file test-fixtures/project-status/valid-multiple-projects.md
```

To create a dated Daily Brief snapshot under explicit scope:

```sh
node scripts/render-daily-brief.mjs --write-date YYYY-MM-DD
```

This writes only to:

```text
docs/daily-briefs/YYYY-MM-DD.md
```

To render an alternate Project Status file into a dated snapshot for testing or
controlled review:

```sh
node scripts/render-daily-brief.mjs --status-file test-fixtures/project-status/valid-multiple-projects.md --write-date YYYY-MM-DD
```

Using `--status-file` with `--write-date` is a controlled testing/review path.
It does not prove that `docs/project-status/current-projects.md` was updated or
that current project state changed.

## Behavior

The renderer:

- reads `docs/project-status/current-projects.md`;
- may read a controlled alternate file with `--status-file`;
- parses each fenced `yaml` Project Status record;
- validates required Project Status fields;
- writes Daily Brief-shaped Markdown to stdout by default;
- writes a dated snapshot only when `--write-date YYYY-MM-DD` is provided;
- writes validation errors to stderr;
- exits with code `1` on invalid records.

The renderer does not:

- write to `docs/daily-briefs/` by default;
- modify `docs/project-status/current-projects.md`;
- modify `PROJECT_MAP.md`;
- add or require an npm script;
- create a CLI or `bin` entry;
- schedule notifications;
- call databases, deployments, GitHub Actions, or external services.

`--write-date` must use a valid `YYYY-MM-DD` calendar date. Dates with slashes,
times, missing parts, impossible calendar dates, or path traversal input fail.

If the target snapshot already exists, the renderer fails and does not
overwrite it.

The renderer does not support:

- arbitrary `--output` paths;
- `--overwrite`;
- writing outside `docs/daily-briefs/`.

## Output Handling

The renderer remains stdout-only unless `--write-date YYYY-MM-DD` is provided.

Manual shell redirection is outside the renderer's controlled snapshot behavior.
Do not use shell redirection as authorization to create or update a Daily Brief
snapshot when a scoped `--write-date` flow is expected.

Creating a snapshot does not authorize code changes, merge, deploy, database
work, GitHub Actions work, external-service work, scheduling, or automatic
notifications.

## Manual Validation

Run the validation fixtures from the repository root:

```sh
node scripts/validate-render-daily-brief.mjs
```

The validation script checks:

- valid multiple-project records render successfully;
- missing required fields fail with stderr;
- malformed list fields fail with stderr;
- blocked projects appear in the blocked section;
- default renderer execution does not create files in `docs/daily-briefs/`;
- `--write-date` can create the expected dated snapshot;
- duplicate `--write-date` fails without overwrite;
- invalid dates fail;
- unsupported `--output` fails;
- invalid Project Status records fail before writing;
- validation cleanup leaves no generated snapshot behind.
