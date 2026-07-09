# Quota Manager MVP

## Status

Draft product specification retained as an N2 Resource Manager increment.

## Product Goal

Give an individual developer one read-only place to record and inspect the
current capacity of the AI providers, models, and accounts they use.

The MVP proves that a provider-neutral quota view is useful before ai-manager
adds automatic provider integrations or routing.

## Primary User

An individual developer using multiple AI subscriptions or API accounts who
currently tracks availability through memory, provider dashboards, or notes.

AI agents may read normalized status later, but the first MVP is maintained and
reviewed by the human user.

## Core User Flow

1. The user records a Provider.
2. The user adds one or more Models and Accounts.
3. The user manually records a quota status.
4. The user optionally records usage, limit, unit, reset time, and a source note.
5. The Dashboard displays current status, freshness, and reset information.
6. The user updates the record when capacity changes.
7. Previous observations remain available as history.

## MVP Capabilities

### Read-Only Dashboard

The Dashboard presents quota state but does not operate a provider account. All
provider-side changes occur outside ai-manager.

The user can inspect:

- Provider, Model, Account, and optional Subscription;
- current status;
- source type and last-updated time;
- optional usage, limit, remaining value, and unit;
- optional reset time and timezone;
- warning information;
- stale or unknown data;
- manual observation history.

“Read-only” describes provider interaction. The user can create and edit local
quota records inside ai-manager.

### Manual Input

The user can manually:

- create Provider, Model, Account, and optional Subscription records;
- set `available`, `warning`, `exhausted`, or `unknown`;
- enter optional numeric quota data;
- enter or clear a reset time;
- add a non-sensitive source note;
- supersede an earlier observation;
- disable local tracking for an account.

Manual entries are always labeled as manual and timestamped.

### Required Display States

| Status | User meaning |
| --- | --- |
| `available` | Manually reported capacity is usable. |
| `warning` | Capacity is usable but approaching a user-defined threshold. |
| `exhausted` | Manually reported usable capacity is gone until reevaluation or reset. |
| `unknown` | No sufficiently current or trustworthy status is available. |

The architecture also reserves `limited`, `cooling_down`, and `disabled` for
later N1 increments.

## Reset-Time Behavior

- Reset time is optional.
- The display includes timezone or offset.
- A reset time is labeled manual unless a later integration provides it.
- Reaching reset time changes the record to require reevaluation; it does not
  silently assert `available`.
- Unknown reset time is shown explicitly rather than omitted as if irrelevant.

## Warning Behavior

- A user may configure a warning threshold for a numeric quota.
- The Dashboard shows the evaluated value and threshold.
- If no total or remaining value exists, the user may set `warning` manually.
- Warnings do not automatically choose a different model or execute a workflow.

## Explicit Non-Goals

The first MVP does not:

- automatically log in to any provider;
- scrape provider websites;
- automate a browser or provider web interface;
- bypass provider quota, rate limits, access controls, or terms;
- store provider passwords, cookies, or browser sessions;
- call provider quota APIs;
- automatically infer quota from AI conversations;
- purchase capacity or change a subscription;
- execute AI tasks;
- route tasks to a model;
- predict future usage;
- provide team or enterprise administration;
- guarantee that a manual record matches provider state.

## Privacy and Safety

- The MVP stores no provider credentials.
- Account labels should support user-chosen aliases.
- Logs and events must not expose sensitive account identifiers or manual notes.
- Manual notes warn against entering secrets.
- Quota records remain local to the user-defined product boundary.
- Provider interaction remains entirely user-controlled and outside ai-manager.

## Acceptance Criteria

- A user can record at least one Provider, Model, and Account.
- A user can create a manual quota observation.
- The Dashboard can display `available`, `warning`, `exhausted`, and `unknown`.
- Every status displays source and last-updated time.
- Optional reset time displays with timezone.
- Expired or stale manual data cannot appear as confirmed current capacity.
- A user can update status without deleting prior observation history.
- No feature logs in, scrapes, bypasses limits, or operates a provider website.
- The feature remains useful without any provider integration.

## Later Increments

- Later N2 increments add permitted provider status sources and richer usage
  history.
- N7 supplies quota eligibility to AI Router and its Model Router submodule.

## Related Documents

- [Quota Manager Research](../research/QUOTA_MANAGER.md)
- [Quota Manager Specification](../architecture/QUOTA_MANAGER_SPEC.md)
- [Quota Data Model](../architecture/QUOTA_DATA_MODEL.md)
- [Quota State Machine](../architecture/QUOTA_STATE_MACHINE.md)
