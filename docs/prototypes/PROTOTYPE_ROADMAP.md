# Prototype Roadmap

This roadmap defines the experimental path for validating ai-manager's first
usable loop before production architecture or UI implementation.

Prototype stages are not production roadmap stages. They are learning vehicles
that must remain small, manual, observable, and easy to discard or revise.

## Prototype Rules

- Prototype work must not silently redefine product or architecture authority.
- Prototype implementation must follow accepted documentation.
- Prototype code, when later approved, should remain smaller than the concept it
  validates.
- Provider automation, scraping, bypassing limits, and hidden autonomous actions
  remain out of scope.
- Mission Control UI comes later; CLI validates the loop first.

## P0 — Documentation Plan

### Goal

Define the Resource Briefing CLI scope before implementation.

### Scope

- Prototype purpose and non-goals.
- CLI command contracts.
- Resource snapshot format.
- Rule-based decision behavior.
- Reminder behavior.
- Manual testing plan.

### Non-Goals

- Writing CLI code.
- Creating `package.json`.
- Creating `src`, `bin`, or runtime structure.
- Selecting framework, language, package manager, or dependencies.

### Exit Criteria

- [RESOURCE_BRIEFING_CLI.md](RESOURCE_BRIEFING_CLI.md) is reviewed.
- Prototype scope can be implemented without inventing behavior.
- Documentation-only PR is merged.

## P1 — Resource Briefing CLI

### Goal

Implement the smallest CLI capable of reading a local snapshot and producing
status, briefing, recommendation, update, and reminder outputs.

### Scope

- Local command entry.
- Snapshot read and validation.
- Deterministic command output.
- Clear failure messages.
- Manual test cases.

### Non-Goals

- Dashboard.
- Provider integrations.
- LLM-based reasoning.
- Persistent database.
- Background scheduler.

### Exit Criteria

- All planned commands produce documented outputs.
- Invalid input returns explicit failure messages.
- No provider is contacted.
- Manual testing covers planned scenarios.

## P2 — Local JSON Persistence

### Goal

Make manual resource updates durable in a local JSON snapshot.

### Scope

- Read existing snapshot.
- Update one resource.
- Validate status, quota, reset, confidence, and timestamp fields.
- Preserve notes.

### Non-Goals

- Database schema.
- Multi-user storage.
- Sync.
- Secrets storage.

### Exit Criteria

- `ai-manager update` changes the intended resource only.
- Invalid writes are rejected safely.
- Snapshot remains human-readable.
- Existing fields are not silently discarded.

## P3 — Rule-Based Recommendation

### Goal

Validate useful AI resource advice without LLM reasoning.

### Scope

- Task classification by deterministic keywords or explicit task type.
- Eligibility filtering.
- Task-fit scoring.
- Context-owner scoring.
- Cost and quota penalties.
- Explanation output.

### Non-Goals

- Provider-specific model intelligence claims.
- LLM-based ranking.
- Hidden or non-deterministic scoring.
- Autonomous dispatch.

### Exit Criteria

- Recommendations explain why a resource was selected.
- Rejected candidates explain the blocking or scoring reason.
- Unknown resources only appear as fallback.
- Low quota and cooling-down resources behave as documented.

## P4 — Reminder Queue

### Goal

Separate reminders from briefing output so users can inspect actionable resource
warnings directly.

### Scope

- Reset reminders.
- Low quota warnings.
- Cost warnings.
- Context continuity notes.
- Cooling-down wait suggestions.
- Unknown-status verification reminders.

### Non-Goals

- Push notifications.
- Calendar integration.
- Background daemon.
- Automatic provider polling.

### Exit Criteria

- `ai-manager reminders` lists active reminders.
- No active reminders are reported clearly.
- Reminder reasons link back to snapshot fields.
- Time-based reminders are deterministic.

## P5 — Optional Interactive Prompt

### Goal

Explore whether a minimal interactive flow improves manual update and task
recommendation usability.

### Scope

- Prompt for missing task text.
- Prompt for resource update fields.
- Confirm destructive or ambiguous local changes.
- Keep non-interactive command behavior available.

### Non-Goals

- Chat UI.
- Long-running assistant.
- Provider login.
- Natural-language agent execution.

### Exit Criteria

- Interactive mode reduces manual input errors.
- Non-interactive mode remains scriptable.
- Prompts do not hide the underlying rule-based logic.

## P6 — Mission Control UI Later

### Goal

Use prototype learnings to inform a future Mission Control UI.

### Scope

- Identify which CLI outputs deserve UI surfaces.
- Identify Resource Manager dashboard requirements.
- Identify briefing, recommendation, and reminder interaction patterns.

### Non-Goals

- Building UI in the CLI prototype track.
- Selecting React, Vite, Node, or any framework here.
- Replacing the production roadmap.

### Exit Criteria

- UI requirements are derived from observed CLI prototype behavior.
- Dashboard scope remains separate from CLI implementation.
- Future UI work references accepted product and architecture documents.
