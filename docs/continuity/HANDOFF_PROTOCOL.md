# Handoff Protocol

## Status

Conceptual specification. Derived from the first observed AI-to-AI Handoff
(2026-07-10): Codex reached a usage limit mid-task; Antigravity resumed from
repository documents and completed PR #9 without conversation history transfer.

## What a Handoff Is

A Handoff is the governed transition of task ownership from one AI agent to
another — or from an AI agent to a human — such that the receiving party can
resume the next safe action with sufficient, attributable context.

A Handoff is not:

- a raw conversation dump or token replay;
- an implicit continuation that assumes the new agent has prior knowledge;
- a transfer of authority (authority remains in documentation and human approval);
- a guarantee that the receiving agent will reach the same conclusions.

## Why Handoffs Require a Protocol

AI agents are bounded by context windows, quota limits, session lifetimes, and
tool availability. A capable AI that hits a boundary mid-task does not
automatically transfer its working state to the next agent. Without a protocol:

- task progress, open questions, and rejected alternatives are lost;
- the receiving agent repeats work, violates documented constraints, or makes
  inconsistent decisions;
- the human must reconstruct context from memory or raw history.

The Handoff Protocol makes transitions explicit, attributable, and safe.

## Observed Case: PR #9 Handoff (2026-07-10)

| Field | Value |
| --- | --- |
| Outgoing agent | Codex |
| Incoming agent | Antigravity |
| Trigger | Codex usage limit reached mid-task |
| Task | Commit, push, and open Draft PR for staged Markdown files |
| Context transferred | Repository documents (git status, staged files, PR spec) |
| Conversation transferred | None |
| Outcome | PR #9 created successfully |

This case demonstrates that a well-documented repository is itself a Handoff
Package. The new agent reconstructed sufficient context from `git status`,
`PROJECT_MAP.md`, the branch state, and the human instruction.

Key insight: **documentation-first development is a prerequisite for safe
AI-to-AI Handoff.**

## Handoff Package

A Handoff Package is the structured artifact produced by the outgoing agent (or
the system on its behalf) that enables the incoming agent to resume safely.

### Required Fields

| Field | Description |
| --- | --- |
| `handoff_id` | Unique identifier. |
| `task_id` | The task or PR being handed off. |
| `outgoing_agent` | Identity of the agent producing this package. |
| `incoming_agent` | Target agent identity or `any_eligible`. |
| `trigger` | Reason for handoff (quota, timeout, scope, human decision). |
| `created_at` | Timestamp. |
| `goal` | Approved task goal. |
| `acceptance_criteria` | Conditions for task completion. |
| `non_goals` | Explicit out-of-scope items. |
| `current_step` | The step interrupted or the last completed step. |
| `next_action` | The first action the incoming agent should take. |
| `open_questions` | Unresolved questions requiring resolution before proceeding. |
| `authoritative_sources` | Document list with version/commit references. |
| `snapshot_refs` | Resource and knowledge snapshot versions used. |
| `completed_steps` | Steps completed with outcome references. |
| `rejected_alternatives` | Alternatives tried and discarded, with reason. |
| `validation_state` | Which acceptance checks are already satisfied. |
| `known_risks` | Risks the incoming agent must be aware of. |
| `continuity_status` | `portable`, `rebuild_required`, `partial`. |

### Optional Fields

| Field | Description |
| --- | --- |
| `deferred_items` | Items known to be out of scope for this handoff. |
| `human_confirmations` | Human decisions already made in this task session. |
| `tool_state` | Relevant tool or environment state (e.g., branch, staged files). |
| `expires_at` | Time after which this package should be treated as stale. |

## Handoff Trigger Conditions

A Handoff must be initiated when:

- the outgoing agent detects quota exhaustion or imminent session end;
- a human explicitly requests reassignment;
- the Scheduler determines a different agent or resource is required;
- the task enters a scope the current agent cannot execute safely;
- a pause or review gate requires external confirmation before continuation.

A Handoff should be initiated proactively when:

- Working Memory preservation priority is `critical` and a risk condition
  is approaching;
- the outgoing agent completes a major subtask and the next subtask requires
  different capability.

## Handoff Steps

```text
1. Detect trigger
     ↓
2. Freeze Working Memory (no further writes)
     ↓
3. Assemble Handoff Package from Working Memory + authoritative sources
     ↓
4. Validate package completeness (required fields, source versions, open questions)
     ↓
5. Store package in governed location (repository, Hermes, or task record)
     ↓
6. Notify AI Executive Office / Scheduler of handoff event
     ↓
7. Incoming agent reads package and authoritative sources
     ↓
8. Incoming agent confirms resume state or requests clarification
     ↓
9. Incoming agent creates new Working Memory from package
     ↓
10. Task continues under incoming agent ownership
```

## Incoming Agent Obligations

An incoming agent must:

1. read the Handoff Package before planning any action;
2. read all listed authoritative sources at their specified version;
3. confirm it can satisfy the acceptance criteria and non-goals;
4. not assume it has the same tool access or resource state as the outgoing
   agent;
5. treat `open_questions` as unresolved until explicitly answered;
6. not replay `rejected_alternatives` without documented justification;
7. produce its own Working Memory record from the package content.

An incoming agent must not:

- treat the Handoff Package as a conversation history substitute;
- modify the outgoing agent's Handoff Package;
- proceed without acknowledging `known_risks`.

## Minimal Handoff (Repository-Native)

When a full Handoff Package is not available (e.g., quota cut the agent before
package assembly), the receiving agent falls back to a repository-native handoff:

1. read `PROJECT_MAP.md` to orient;
2. run `git status` to identify branch, staged files, and working tree state;
3. read the relevant specification documents for the task;
4. infer `current_step` and `next_action` from repository state;
5. confirm inferred state with the human before acting on irreversible steps.

This is only safe when the repository is documentation-first and the branch
state is observable. It is the mechanism that made the PR #9 handoff successful.

## Handoff Records

Every completed handoff produces a record:

| Field | Description |
| --- | --- |
| `record_id` | Unique record identifier. |
| `handoff_id` | Reference to the Handoff Package. |
| `outgoing_agent` | Identity of outgoing agent. |
| `incoming_agent` | Identity of the agent that accepted. |
| `resume_confirmed_at` | When incoming agent confirmed readiness. |
| `deviations` | Any differences between package intent and incoming agent action. |
| `outcome` | Terminal outcome of the task under incoming agent. |

## Observability

Record:

- handoff trigger and initiating agent;
- package assembly completeness and validation result;
- incoming agent confirmation or rejection;
- resume action and first step taken;
- deviations from package intent and their justification;
- task outcome correlation.

## Constraints

- A Handoff Package does not transfer authority. All authority remains in
  documentation and human-approved decisions.
- An outgoing agent cannot instruct the incoming agent to bypass policy,
  capability, or human-control boundaries.
- A Handoff Package must not contain secrets, credentials, or provider tokens.
- Handoff records are append-only; completed handoffs cannot be retroactively
  amended by the incoming agent.

## Related Documents

- [Working Memory](WORKING_MEMORY.md)
- [Predictive Handoff](PREDICTIVE_HANDOFF.md)
- [Resume Workflow](RESUME_WORKFLOW.md)
- [Continuity Architecture](CONTINUITY_ARCHITECTURE.md)
- [Context Continuity](../architecture/CONTEXT_CONTINUITY.md)
- [Knowledge Manager / Hermes](../architecture/COMPONENT_CONTRACTS.md)
- [Coding Agent Task Protocol](../architecture/CODING_AGENT_TASK_PROTOCOL.md) —
  a distinct protocol governing an engineering ticket's lifecycle across
  Planning Agent, Coding Agent, Review Agent, and Human Approver roles; not a
  replacement for this document's mid-task AI-to-AI continuity handoff.
