# Working Memory

## Status

Conceptual specification. Working Memory is a first-class AI Continuity Layer
component responsible for maintaining active, task-scoped, transient state that
the current AI agent needs to execute the next safe action.

## What Working Memory Is

Working Memory is the structured, bounded, and governed set of facts an active
AI agent holds while executing a specific task. It is distinct from:

- **Durable project knowledge** — owned by Knowledge Manager / Hermes and
  authoritative documentation;
- **Conversation history** — raw token sequences not yet promoted to durable
  records;
- **Resource snapshots** — immutable decision inputs owned by Resource Manager;
- **Decision records** — governed outputs owned by Decision Engine.

Working Memory is transient by design. It survives only as long as the current
agent session and task remain active. On handoff, termination, pause, or
reassignment, its relevant contents must be promoted into a Handoff Package or
allowed to expire.

## Role in the AI Continuity Layer

Working Memory serves as the active, writable scratchpad of the AI Continuity
Layer. It enables an AI agent to:

- track where it is in an approved plan;
- hold task-local evidence, hypotheses, and open questions;
- record which validation steps have been completed;
- maintain references to the documents and snapshots it is currently using;
- identify what must be preserved before the session ends.

Without Working Memory, agents either re-read all authoritative sources on every
step or accumulate undifferentiated conversation history. Either approach is
slower, less traceable, and harder to hand off safely.

## Data Model

A Working Memory record contains the following conceptual fields:

### Identity

| Field | Description |
| --- | --- |
| `memory_id` | Unique identifier for this Working Memory instance. |
| `task_id` | The task or PR this memory is scoped to. |
| `agent_id` | The active AI agent session holding this memory. |
| `created_at` | When this Working Memory was created. |
| `updated_at` | Last update timestamp. |
| `status` | `active`, `preserving`, `preserved`, `expired`. |

### Goal Anchor

| Field | Description |
| --- | --- |
| `goal` | The approved task goal as stated by the human. |
| `acceptance_criteria` | Conditions that define task completion. |
| `non_goals` | Explicit out-of-scope items. |
| `approved_plan_ref` | Reference to the Decision Engine approved plan. |

### Current Position

| Field | Description |
| --- | --- |
| `current_step` | The step currently being executed. |
| `completed_steps` | Steps completed so far with outcome references. |
| `next_action` | The next specific action the agent intends to take. |
| `blocked_reason` | If blocked: reason, dependency, and recovery option. |

### Active Evidence

| Field | Description |
| --- | --- |
| `document_refs` | Authoritative documents in scope, with version. |
| `snapshot_refs` | Resource and knowledge snapshot versions used. |
| `decision_refs` | Decision records relevant to current work. |
| `hypotheses` | Working assumptions not yet confirmed. |
| `rejected_alternatives` | Alternatives explored and discarded, with reason. |

### Open Questions

| Field | Description |
| --- | --- |
| `open_questions` | Unresolved questions that affect safe continuation. |
| `disambiguation_needed` | Ambiguous requirements requiring human clarification. |
| `deferred_items` | Items intentionally deferred with documented reason. |

### Preservation Signal

| Field | Description |
| --- | --- |
| `preservation_priority` | `critical`, `recommended`, `low`. |
| `handoff_triggers` | Conditions under which a handoff package must be created. |
| `expires_if` | Conditions under which this memory may safely expire. |

## Lifecycle

```text
Created
  ↓
Active           ← agent reads, updates, and references this memory
  ↓
Preserving       ← handoff trigger detected; package being assembled
  ↓
Preserved        ← handoff package complete and readable by next agent
  ↓
Expired          ← session ended or task closed; memory no longer active
```

Working Memory cannot remain `active` across an agent handoff boundary. The
Handoff Protocol must explicitly transition it.

## Preservation Rules

Working Memory must be preserved (not silently expired) when:

- the current agent reaches a quota limit, usage boundary, or session end;
- the task is paused, reassigned, or split;
- a review gate requires human confirmation before the next step;
- context continuity risk is classified as `at_risk` or higher;
- the agent detects that the next step would be irreversible.

Working Memory may expire without preservation when:

- the task has reached an accepted terminal outcome;
- a rebuild from authoritative sources is explicitly cheaper and safer;
- the human owner approves expiry;
- the content is duplicated in durable records already accepted by Hermes.

## Observability

Record:

- memory creation, update, and status transitions;
- which authoritative sources are in scope at each step;
- open questions and their resolution or deferral;
- preservation trigger and handoff package reference;
- expiry reason and durable promotion decisions.

## Constraints

- Working Memory does not override authoritative documentation.
- Working Memory entries are not automatically promoted to durable knowledge.
- An agent cannot write to Working Memory outside its own task scope.
- Working Memory freshness must be declared; stale memory must not be presented
  as current to subsequent agents.

## Related Documents

- [Handoff Protocol](HANDOFF_PROTOCOL.md)
- [Continuity Architecture](CONTINUITY_ARCHITECTURE.md)
- [Resume Workflow](RESUME_WORKFLOW.md)
- [Context Continuity](../architecture/CONTEXT_CONTINUITY.md)
- [Knowledge Manager / Hermes](../architecture/COMPONENT_CONTRACTS.md)
