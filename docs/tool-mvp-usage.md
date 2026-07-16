# Tool MVP Usage

## Status

Draft usage note for the H3.2 read-only Daily Brief renderer.

## Command

Run the renderer manually from the repository root:

```sh
node scripts/render-daily-brief.mjs
```

## Behavior

The renderer:

- reads `docs/project-status/current-projects.md`;
- parses each fenced `yaml` Project Status record;
- validates required Project Status fields;
- writes Daily Brief-shaped Markdown to stdout;
- writes validation errors to stderr;
- exits with code `1` on invalid records.

The renderer does not:

- write to `docs/daily-briefs/`;
- modify `docs/project-status/current-projects.md`;
- modify `PROJECT_MAP.md`;
- add or require an npm script;
- create a CLI or `bin` entry;
- schedule notifications;
- call databases, deployments, GitHub Actions, or external services.

## Output Handling

The first renderer version is stdout-only. If a human wants to preserve a Daily
Brief snapshot, that should be planned and approved in a later PR before any
tool writes to `docs/daily-briefs/YYYY-MM-DD.md`.

Manual shell redirection is outside the renderer's behavior. Do not treat this
script as authorization to create or update a Daily Brief snapshot.
