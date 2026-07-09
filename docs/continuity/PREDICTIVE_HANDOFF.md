# Predictive Handoff

## Status

Conceptual specification. Predictive Handoff extends the Handoff Protocol by
anticipating agent boundaries before they become failures, allowing the system
to prepare and transfer gracefully rather than reactively.

## What Predictive Handoff Is

A Predictive Handoff is a handoff initiated before the outgoing agent reaches a
hard limit. Instead of reacting to quota exhaustion, session termination, or
context overflow, the system detects early signals and begins handoff preparation
while the outgoing agent can still produce a complete, validated Handoff Package.

Reactive handoff (cutting off mid-action) is always worse than predictive
handoff (completing a coherent unit then transferring). Predictive Handoff
converts quota-scarcity, context pressure, and boundary proximity from failure
modes into planned transitions.

## Motivation: The Quota-Cliff Problem

Without Predictive Handoff, agents hit usage limits at arbitrary task positions:

- a commit is staged but not pushed;
- a file is partially written;
- a review is requested but the response is cut off;
- the incoming agent has no context about what was attempted.

This forces the human to manually reconstruct state, repeat instructions, or
accept degraded output. Predictive Handoff eliminates this by treating resource
boundaries as first-class planning inputs.

## Predictive Signals

The following signals indicate an approaching agent boundary:

### Quota Signals

| Signal | Description | Action |
| --- | --- | --- |
| `quota_warning_threshold` | Usage approaching a configured warning level. | Begin Handoff Package assembly. |
| `quota_high_water` | Usage above a configured high-water mark. | Complete current step; do not begin new subtasks. |
| `quota_critical` | Usage within a small margin of the limit. | Finalize and store Handoff Package immediately. |
| `quota_reset_imminent` | Reset will occur before the next meaningful work window. | Evaluate whether to wait or hand off. |

### Context Signals

| Signal | Description | Action |
| --- | --- | --- |
| `context_pressure` | Active context nearing model capacity. | Begin compression or selective preservation. |
| `context_overflow_risk` | Adding the next planned input would exceed context limit. | Commit current state and hand off before overflow. |

### Session Signals

| Signal | Description | Action |
| --- | --- | --- |
| `session_timeout_approaching` | Known session or tool TTL expiring. | Initiate handoff before timeout. |
| `tool_availability_loss` | A required tool becoming unavailable. | Preserve state with tool dependencies noted. |

### Task Signals

| Signal | Description | Action |
| --- | --- | --- |
| `subtask_boundary` | Completing a natural subtask boundary before hitting a resource limit. | Produce a clean handoff at the boundary. |
| `review_gate` | Next step requires human confirmation not yet received. | Hand off to wait state rather than blocking. |

## Predictive Handoff Flow

```text
Agent monitors resource signals continuously during task execution
  ↓
Signal crosses threshold
  ↓
Evaluate: complete current atomic step? or stop here?
  ↓
Complete smallest safe unit of work
  ↓
Assemble Handoff Package from current Working Memory
  ↓
Validate package (required fields, open questions, source versions)
  ↓
Store package and notify AI Executive Office / Scheduler
  ↓
Outgoing agent enters read-only mode (no further task writes)
  ↓
Scheduler selects incoming agent based on resource availability and capability
  ↓
Incoming agent reads Handoff Package and authoritative sources
  ↓
Task resumes under incoming agent
```

## Resource Manager Integration

Predictive Handoff depends on Resource Manager providing timely, accurate
resource signals. Resource Manager must:

- track quota consumption and emit threshold events;
- track context usage and emit pressure events;
- expose reset time, cooldown, and next-eligible-window estimates;
- supply this information to the Scheduler and AI Executive Office for handoff
  planning.

Resource Manager does not initiate handoffs. It supplies the signals. The AI
Executive Office and Scheduler decide when and to whom to hand off.

## Decision Engine Role

When a Predictive Handoff is being planned:

1. Decision Engine receives the resource constraint and incoming agent candidates;
2. it evaluates capability, quota availability, continuity cost, and context
   rebuild cost for each candidate;
3. it recommends the candidate that minimizes total transition cost while
   satisfying task requirements;
4. it does not select an agent solely on capability if a lower-capability agent
   with better context is safer for the specific remaining work;
5. human confirmation is required for reassignment above a configured risk
   threshold.

## Handoff vs. Wait Decision

When a resource signal is detected, the system must decide: **hand off now** or
**wait for reset**.

| Factor | Favors Handoff | Favors Wait |
| --- | --- | --- |
| Eligible agent available | Yes | No |
| Task time-sensitive | Yes | No |
| Context rebuild cost (if handing off) | Low | High |
| Reset window | Far (hours) | Imminent (minutes) |
| Partial state danger | High | Low |
| Human preference | Explicit handoff | Explicit wait |

This comparison is presented to the human when confirmation is required. It is
never made silently.

## Pre-Handoff Checklist

Before completing a Predictive Handoff, the outgoing agent must verify:

- [ ] Current atomic step is complete (no partial file writes, no partial commits).
- [ ] Working Memory reflects the current actual state, not an intended state.
- [ ] Open questions are documented with specific phrasing.
- [ ] Rejected alternatives include the reason for rejection.
- [ ] All authoritative source versions are recorded.
- [ ] Known risks for the incoming agent are explicit.
- [ ] The next action is unambiguous and safe.
- [ ] Handoff Package passes validation (all required fields present).

## Observability

Record:

- signal detected, threshold value, and agent response;
- decision to hand off or wait and supporting evidence;
- package assembly start and completion time;
- validation result and any fields missing;
- incoming agent selection rationale;
- resume confirmation and first action taken;
- any deviation from predicted continuation.

## Constraints

- Predictive Handoff does not grant the outgoing agent permission to exceed its
  quota or session boundary while preparing the package.
- Threshold values for quota signals are configured by the human operator, not
  set autonomously by the agent.
- A Predictive Handoff does not change the approved task goal or acceptance
  criteria.
- The outgoing agent cannot select its own incoming agent without Decision Engine
  and, where required, human approval.

## Related Documents

- [Handoff Protocol](HANDOFF_PROTOCOL.md)
- [Working Memory](WORKING_MEMORY.md)
- [Resume Workflow](RESUME_WORKFLOW.md)
- [Continuity Architecture](CONTINUITY_ARCHITECTURE.md)
- [Resource Manager](../architecture/RESOURCE_MANAGER.md)
- [Context Continuity](../architecture/CONTEXT_CONTINUITY.md)
- [Cost and Budget](../architecture/COST_AND_BUDGET.md)
