# AI Agent Onboarding

This guide is for AI agents working on ai-manager, including Codex, Claude Code,
Gemini, ChatGPT, OpenHands, and similar tools.

ai-manager is designed so an AI agent can continue work from repository
documents without relying on hidden conversation history.

## Required Reading Before Work

Read these documents before planning or changing the repository:

1. [START_HERE.md](../../START_HERE.md)
2. [PROJECT_MAP.md](../../PROJECT_MAP.md)
3. [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md)
4. [CONTRIBUTING.md](../../CONTRIBUTING.md)
5. The authoritative documents for the requested task.

For implementation work, also read:

- [ROADMAP.md](../roadmap/ROADMAP.md)
- [SYSTEM_OVERVIEW.md](../architecture/SYSTEM_OVERVIEW.md)
- [COMPONENT_CONTRACTS.md](../architecture/COMPONENT_CONTRACTS.md)
- the relevant product, resource, decision, or provider specification.

## How to Determine Current Project State

Before changing files:

1. Confirm the current branch.
2. Confirm whether `main` is current with remote.
3. Confirm the working tree is clean or identify existing user changes.
4. Inspect the requested scope.
5. Identify source-of-truth documents affected by the request.

Recommended local checks:

```text
git status -sb
git log --oneline -1
git branch --show-current
```

If the working tree contains existing changes, do not overwrite, stage, or
delete them unless the user explicitly says they belong to the current task.

## Main, Branch, and Working Tree Rules

- Do not work directly on `main` unless the user explicitly asks for a read-only
  check.
- Create a small task branch for each PR.
- Keep unrelated changes out of the branch.
- Use `git status --short` before and after work.
- Report dirty files if they exist.
- Do not hide permission warnings that affect the repository state.

## Avoiding Scope Creep

Scope creep is especially dangerous in AI-agent work because agents can produce
large speculative diffs quickly.

Avoid it by:

- implementing only the requested PR scope;
- preserving docs-only boundaries when the user says Markdown only;
- not adding frameworks, package manifests, generated files, or tooling unless
  explicitly requested;
- not turning research ideas into implementation without accepted
  documentation;
- splitting unrelated improvements into separate PRs.

## Documentation First Compliance

Every AI agent must treat documentation as the product specification.

Before implementation:

1. Find the authoritative document.
2. Update it if the requested behavior is not already documented.
3. Keep supporting docs consistent.
4. Ask for review when the decision changes product or architecture intent.
5. Implement only after the relevant documentation is accepted.

If no authoritative document exists, stop and create or update the
documentation first.

## Pull Request Workflow

For each PR:

1. Start from updated `main`.
2. Create a branch.
3. Make the smallest coherent change.
4. Verify the diff contains only intended files.
5. Run relevant validation.
6. Commit with a clear message.
7. Push the branch.
8. Open a Draft PR unless the user explicitly asks otherwise.
9. Do not merge until the user approves.

For documentation-only PRs, validation should include:

- Markdown-only scope check;
- no `package.json`;
- no framework or build tooling files;
- local Markdown links;
- Mermaid code fences are readable;
- `git diff --check`;
- clean working tree after commit.

## Reporting Validation Results

A useful handoff report includes:

- branch name;
- commit hash;
- PR URL and Draft/Ready state;
- files changed;
- checks run;
- checks not run and why;
- confirmation that no code, package manifest, framework, or generated tooling
  was added;
- `git status --short` result.

Use exact outputs for failures. Do not summarize an error as "failed" without
the error message.

## Prohibited Actions

AI agents must not:

- merge without explicit user approval;
- push directly to `main`;
- add an unrequested framework;
- add `package.json` unless explicitly requested;
- mix speculative implementation into documentation PRs;
- ignore existing dirty files;
- silently overwrite user changes;
- treat Router as the Decision Engine;
- treat Quota Manager as Resource Manager;
- treat research notes as accepted architecture;
- bypass Documentation First because the implementation seems obvious.
