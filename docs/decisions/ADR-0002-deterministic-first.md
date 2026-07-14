# ADR-0002: Deterministic-First — Ordinary Code Moves State and Data by Default

- **Status:** Accepted
- **Date:** 2026-07-14

## Context

The Coding Agent Task Protocol (`docs/architecture/CODING_AGENT_TASK_PROTOCOL.md`,
merged in PR #12) introduced a "Deterministic-First: Code vs. AI Boundary"
section scoped to the Coding Agent task lifecycle: ordinary code should
handle mechanical state and data movement, and AI should be invoked only for
work that requires understanding or generation.

That rule is not specific to one protocol. It applies to any current or
future manager-owned orchestration surface — Resource Manager scheduling, AI
Router, a future Orchestrator/Runner, Hermes — and to any Agent that reads or
moves data on the manager's behalf. Without a repo-wide decision, each new
component could reinvent or drift from this boundary, and the rule could be
read as narrow to one protocol rather than a constraint on how ai-manager as
a whole is built.

## Decision

Deterministic-First is accepted as a repo-wide architecture principle,
recorded as
[Principle 17](../product/PRINCIPLES.md#17-deterministic-first-ordinary-code-moves-state-by-default)
in `docs/product/PRINCIPLES.md`.

**Ordinary deterministic code must handle:**

- GitHub Issue / label read-write;
- schema and required-field validation;
- state-transition legality checks;
- branch, Base SHA, and commit comparisons;
- timeout, retry, and idempotency checks;
- mechanical allowed/forbidden path checks;
- audit-event persistence;
- fixed-format notifications;
- data movement and reformatting when the data is already structured.

**AI may be invoked only for:**

- ticket authoring from an ambiguous goal;
- ambiguity or architectural-conflict judgment;
- code or documentation changes;
- complex failure diagnosis;
- semantic review;
- summaries or recommendations that fixed rules cannot produce.

**Every AI call must be:**

- attributable to a specific ticket or explicit decision record;
- made for a named reason;
- given the minimum necessary context — never a full conversation replay,
  unless a specific case explicitly justifies it.

**Any orchestrator, runner, or knowledge layer (including Hermes) must
remain:**

- replaceable;
- not a mandatory AI-inference layer;
- not invoked on every state transition.

**Unknown usage or cost metadata must be recorded as unknown**, never
silently treated as zero.

This decision does not replace
[CODING_AGENT_TASK_PROTOCOL.md](../architecture/CODING_AGENT_TASK_PROTOCOL.md),
which remains the detailed operational authority for the Coding Agent task
lifecycle, its state machine, ticket/report formats, and audit fields. This
ADR and Principle 17 record the general rule that protocol already
implements; future components adopting a similar boundary should reference
this ADR rather than duplicate it.

## Consequences

### Positive

- One durable, discoverable rule instead of a boundary implicit in a single
  protocol document.
- Future components (Resource Manager scheduling, AI Router, a future
  Orchestrator/Runner, Hermes integration) inherit this boundary by default
  instead of needing to redecide it.
- Protects quota, cost, privacy/safety, reproducibility, auditability, and
  human-approval boundaries by keeping AI invocation deliberate and
  attributable.

### Tradeoffs

- Component designers must explicitly justify any AI call that resembles a
  deterministic operation, adding a small amount of design friction.
- A component that appears to need "quick AI convenience" for mechanical
  work must instead build the deterministic path.

## Non-Goals

This decision does not:

- implement usage tracking;
- implement model routing;
- implement an orchestrator or runner;
- authorize automatic push, merge, deployment, cloud actions, migrations,
  secrets access, paid actions, or production-data operations.

## Compliance

Any new manager-owned component or workflow proposal must state which of its
operations are deterministic and which require an AI call, using this ADR's
categories. Reviewers should reject a design that invokes AI for work listed
under "Ordinary deterministic code must handle" above.

[PRINCIPLES.md](../product/PRINCIPLES.md) records the durable rule.
[CODING_AGENT_TASK_PROTOCOL.md](../architecture/CODING_AGENT_TASK_PROTOCOL.md)
records its first operational application.
