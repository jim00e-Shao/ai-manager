# Resource Briefing CLI

Resource Briefing CLI is the first proposed implementation prototype for
ai-manager. This document defines the prototype scope before any code is
created.

This is a prototype plan, not a production feature specification. It exists to
validate the smallest useful loop of the AI Executive Office without selecting
frameworks, package structure, storage engines, UI libraries, or provider
integrations.

## Prototype Purpose

Resource Briefing CLI validates the first operational loop:

```text
Observe
  ↓
Think
  ↓
Advise
  ↓
Remind
```

The prototype reads a manually maintained AI resource snapshot, summarizes the
current operating picture, recommends which AI resource to use for a task, and
surfaces reminders about reset windows, quota, cost, and context continuity.

## Why CLI First, Not Dashboard First

CLI comes before Dashboard because the first risk is not visual design. The
first risk is whether ai-manager can produce useful, explainable guidance from a
small resource snapshot.

CLI first allows the project to validate:

- resource snapshot shape;
- status normalization;
- rule-based recommendation behavior;
- daily briefing usefulness;
- reminder thresholds;
- context continuity value;
- human-readable explanations;
- manual testing without provider automation.

Mission Control UI remains important, but UI should not lead before the
underlying operating loop is understandable.

## What This Prototype Validates

- Whether a local snapshot can represent provider, model, quota, reset, cost,
  context owner, and confidence facts.
- Whether rule-based recommendations are good enough for a first closed loop.
- Whether reset, quota, cost, and context reminders help a developer decide what
  to do next.
- Whether Resource Manager can provide useful advice without automation,
  scraping, or provider control.
- Whether the first AI Executive Office loop can remain observable and
  explainable.

## Non-Goals

- No Dashboard.
- No web UI.
- No provider login.
- No scraping.
- No automatic browser control.
- No provider bypass.
- No automatic API calls to AI providers.
- No LLM-based recommendation.
- No persistent database.
- No package manifest in this PR.
- No production CLI implementation in this PR.
- No framework or third-party dependency selection.

## User Workflow

1. User manually records current AI resource state in a local JSON snapshot.
2. User runs `ai-manager status` to inspect resource availability.
3. User runs `ai-manager brief` to get a daily operating picture.
4. User runs `ai-manager recommend "<task>"` before choosing an AI tool.
5. User runs `ai-manager reminders` to see reset, quota, cost, and context
   reminders.
6. User runs `ai-manager update <resource> ...` after observing a quota,
   cooldown, reset, or cost change.

## Commands

The first CLI design is intentionally small:

```text
ai-manager status
ai-manager brief
ai-manager recommend "<task>"
ai-manager update <resource> --status <status> --quota <number> --reset "<time>"
ai-manager reminders
```

Command names are prototype contracts. They are not implementation commitments
to a specific runtime, package manager, language, or framework.

## Command: `ai-manager status`

### Purpose

Show the current resource snapshot in a compact status view.

### Input

- Local resource snapshot JSON.
- Optional future filters are out of scope for the first version.

### Output Example

```text
AI Resource Status

codex-default
  provider: Codex
  tool: Codex CLI
  model: default
  status: available
  quota: 72
  reset: 2026-07-10T00:00:00+08:00
  cost: low
  context owner: codex
  confidence: manual

claude-web
  provider: Claude
  tool: Claude Web
  model: unknown
  status: warning
  quota: 18
  reset: 2026-07-09T18:00:00+08:00
  cost: medium
  context owner: none
  confidence: user_observed
```

### Failure Cases

- Snapshot file is missing.
- Snapshot JSON is invalid.
- Required resource fields are missing.
- Status value is not recognized.
- Last update is stale and confidence is unknown.

## Command: `ai-manager brief`

### Purpose

Generate a daily resource briefing that summarizes available resources,
constraints, risks, and reminders.

### Input

- Local resource snapshot JSON.
- Current local time.

### Output Example

```text
Daily AI Resource Briefing

Available:
- Codex default: good for coding tasks, quota 72.
- Gemini web: good for research and documentation, quota 64.

Watch:
- Claude web is below quota threshold at 18.
- ChatGPT reset is within 2 hours.

Advice:
- Use Codex for coding while its context is current.
- Prefer Gemini for research-heavy tasks today.
- Wait for ChatGPT reset before large architecture review if timing allows.
```

### Failure Cases

- No resources are available.
- All resource confidence levels are unknown.
- Time-based reminders cannot be evaluated because reset values are invalid.
- Snapshot exists but contains no resource entries.

## Command: `ai-manager recommend "<task>"`

### Purpose

Recommend an AI resource for a specific task using deterministic rules.

### Input

- Task text.
- Local resource snapshot JSON.
- Rule-based task classification.

### Output Example

```text
Recommendation for: "review the Resource Manager architecture"

Recommended:
1. ChatGPT
   reason: architecture task match, available status, sufficient quota.
2. Claude
   reason: architecture task match, strong fallback, but quota warning.

Not recommended:
- Codex: coding-oriented resource, lower task fit.
- Gemini: useful fallback, but no context owner for this task.

Constraints used:
- status
- quotaLevel
- resetAt
- costLevel
- contextOwner
```

### Failure Cases

- Task text is empty.
- Task cannot be classified.
- No eligible resource exists.
- Only unknown-status resources are available.
- Snapshot data is stale or invalid.

## Command: `ai-manager update <resource> --status <status> --quota <number> --reset "<time>"`

### Purpose

Update a manually observed resource state in the local snapshot.

### Input

- Resource identifier.
- Status.
- Quota level.
- Reset time.

Example:

```text
ai-manager update codex-default --status warning --quota 19 --reset "2026-07-10T00:00:00+08:00"
```

### Output Example

```text
Updated resource: codex-default

status: warning
quotaLevel: 19
resetAt: 2026-07-10T00:00:00+08:00
confidence: manual
lastUpdated: 2026-07-09T22:15:00+08:00
```

### Failure Cases

- Resource does not exist.
- Status is not one of the allowed status values.
- Quota is outside `0` to `100`.
- Reset time cannot be parsed.
- Snapshot cannot be written.

## Command: `ai-manager reminders`

### Purpose

Show resource reminders without generating a full briefing.

### Input

- Local resource snapshot JSON.
- Current local time.

### Output Example

```text
AI Resource Reminders

- ChatGPT resets within 2 hours at 2026-07-09T18:00:00+08:00.
- Claude quota is low at 18. Avoid large tasks.
- Codex owns current PR context. Preserve continuity for coding work.
- Gemini cost level is high. Use only when research value justifies cost.
```

### Failure Cases

- Snapshot file is missing.
- Reset time is invalid.
- Cost level is missing.
- No reminders are currently active.

## Data Input Format

The first prototype uses a manually maintained JSON snapshot. The exact file
path is intentionally deferred until implementation planning.

### Resource Snapshot JSON

```json
{
  "resources": [
    {
      "id": "codex-default",
      "provider": "Codex",
      "tool": "Codex CLI",
      "model": "default",
      "status": "available",
      "quotaLevel": 72,
      "resetAt": "2026-07-10T00:00:00+08:00",
      "costLevel": "low",
      "contextOwner": "codex",
      "confidence": "manual",
      "lastUpdated": "2026-07-09T09:00:00+08:00",
      "notes": "Current PR context is active."
    }
  ]
}
```

### Required Fields

| Field | Meaning |
| --- | --- |
| `id` | Stable local resource identifier. |
| `provider` | Provider or product family, such as Codex, Claude, Gemini, or ChatGPT. |
| `tool` | Surface used by the developer, such as CLI, web, desktop, or API. |
| `model` | Model or model family when known; `unknown` is allowed. |
| `status` | Normalized resource status. |
| `quotaLevel` | Manual quota estimate from `0` to `100`. |
| `resetAt` | ISO-like reset time when known; `unknown` is allowed for manual entry. |
| `costLevel` | Conceptual cost level, such as `low`, `medium`, `high`, or `unknown`. |
| `contextOwner` | Resource currently holding useful task context, or `none`. |
| `confidence` | Source confidence for the snapshot value. |
| `lastUpdated` | Time the resource entry was last updated. |
| `notes` | Human-readable context or caveats. |

### Status Values

- `available`
- `warning`
- `limited`
- `exhausted`
- `cooling_down`
- `unknown`
- `disabled`

### Confidence Values

- `manual`
- `user_observed`
- `estimated`
- `api_observed`
- `unknown`

## Decision Rules

The first version is rule-based and does not use an LLM. The goal is
explainability, not intelligence.

### Eligibility Rules

- `exhausted` resources are not recommended.
- `cooling_down` resources are not recommended.
- `disabled` resources are not recommended.
- `unknown` status resources can only be fallback candidates.
- `quotaLevel < 20` is not recommended for large tasks.

### Timing Rules

- If `resetAt` is near and the task is large or not urgent, suggest waiting.
- If a resource is cooling down, suggest waiting until the cooldown or reset
  window ends.

### Task Fit Rules

- Coding tasks prioritize Codex and Claude.
- Architecture tasks prioritize ChatGPT and Claude.
- Documentation tasks prioritize Gemini and ChatGPT.
- Research tasks prioritize Gemini and ChatGPT.
- General tasks prefer available resources with sufficient quota and lower cost.

### Context Rules

- If `contextOwner` matches the current task or PR context, add score.
- If another resource is smarter but lacks task context, explain the tradeoff.
- If context continuity is important, prefer the resource with current context
  unless hard constraints block it.

### Cost Rules

- `costLevel` `high` lowers recommendation score.
- High-cost resources are still valid when task value, quality need, or context
  rebuilding cost justifies the choice.
- Low-cost resources should be preferred for low-risk, repeatable, or exploratory
  work.

## Reminder Rules

- `resetAt` within 2 hours shows an upcoming reset reminder.
- `quotaLevel < 20` shows a low quota warning.
- `costLevel` `high` shows a cost warning.
- Existing `contextOwner` shows a context continuity note.
- Resource status `cooling_down` shows a wait suggestion.
- Resource status `unknown` shows a verification reminder.

## Expected Outputs

The prototype should produce:

- compact status summary;
- daily resource briefing;
- task-specific recommendation;
- rejected-resource explanation;
- reminder list;
- clear failure messages;
- source confidence and staleness signals.

Every output should be explainable without hidden model reasoning.

## Manual Testing Plan

Manual testing should cover:

1. Valid snapshot with multiple resources.
2. Missing snapshot.
3. Invalid JSON.
4. Unknown status resource.
5. Exhausted resource.
6. Cooling-down resource.
7. Low quota resource.
8. High-cost resource.
9. Reset within 2 hours.
10. Coding recommendation.
11. Architecture recommendation.
12. Documentation recommendation.
13. Research recommendation.
14. Context-owner match.
15. No eligible resources.

Testing should verify command output, failure messages, and explanation text.

## Exit Criteria

The prototype plan is ready for implementation when:

- command contracts are reviewed;
- snapshot format is reviewed;
- status and confidence values are accepted;
- rule-based recommendation behavior is explicit;
- reminder thresholds are explicit;
- non-goals prevent Dashboard, provider automation, and framework creep;
- manual testing expectations are documented;
- implementation can begin without redefining product intent.

## Implementation (PR #11)

PR #11 implements the prototype as specified in this document.

### Files Added

| File | Purpose |
| --- | --- |
| `package.json` | Minimal Node.js manifest. No third-party dependencies. |
| `bin/ai-manager.js` | CLI entry point implementing all four commands. |
| `data/resources.example.json` | Example snapshot with ChatGPT, Claude, Codex, Gemini, Antigravity. |

### Usage

**Requirements**: Node.js ≥ 18. No `npm install` needed.

```sh
# Show resource status
node bin/ai-manager.js status

# Daily briefing
node bin/ai-manager.js brief

# Recommend for a task
node bin/ai-manager.js recommend "我要修 React bug"
node bin/ai-manager.js recommend "review architecture design"
node bin/ai-manager.js recommend "write documentation"
node bin/ai-manager.js recommend "research AI providers"

# Show reminders
node bin/ai-manager.js reminders
```

Set `AI_MANAGER_SNAPSHOT` to use a custom snapshot file:

```sh
AI_MANAGER_SNAPSHOT=./my-resources.json node bin/ai-manager.js brief
```

### Implementation Decisions

- **No third-party packages**: all logic uses `fs`, `path`, and `process` only.
- **Rule-based scoring**: each resource receives a numeric score based on status,
  quota, reset timing, task category match, context owner, and cost. No LLM API
  calls.
- **Task classification**: keyword patterns detect coding, architecture,
  documentation, research, and general task types (Chinese and English).
- **Status icons**: `✓` available, `⚠` warning/limited, `✗` exhausted/disabled,
  `⏳` cooling_down, `?` unknown.
- **`AI_MANAGER_SNAPSHOT` env var**: allows pointing to a different snapshot
  without changing source code.

### Validation Results

All four commands executed successfully against `data/resources.example.json`:

- `status` — displayed all 5 resources with correct fields and icons.
- `brief` — generated daily briefing with Available, Watch, Not Available,
  Advice, and Reminders sections.
- `recommend "我要修 React bug"` — classified as `coding`, recommended
  Antigravity (context owner, quota 90) first, correctly disqualified Codex
  (cooling_down).
- `reminders` — surfaced Claude low quota, Codex cooling_down, and both
  context-owner continuity notes.
