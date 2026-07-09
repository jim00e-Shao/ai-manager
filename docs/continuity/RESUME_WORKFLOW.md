# Resume Workflow

## Status

Conceptual specification. The Resume Workflow defines the steps an incoming AI
agent must follow to safely resume a task from a Handoff Package or from a
repository-native state.

## What Resume Means

Resuming a task is not the same as starting a new task. The incoming agent
inherits an in-progress goal with completed steps, established decisions, open
questions, and known constraints. Treating a resume as a fresh start causes
repeated work, inconsistent decisions, and loss of the outgoing agent's evidence.

Resume is a first-class operation in the AI Continuity Layer. It has an explicit
workflow, clear entry conditions, validation requirements, and observable
outcomes.

## Resume Entry Conditions

The Resume Workflow is entered when:

- a Handoff Package is available and addresses the current task;
- an AI agent is reassigned to a task after interruption;
- a human instructs an AI agent to continue work that another agent began;
- a Predictive Handoff has been completed and a new agent is assigned;
- an agent session is restarted after quota reset and must continue a paused
  task.

## Resume Workflow Steps

### Step 1: Orient

The incoming agent reads orientation documents before reading the Handoff
Package. This prevents the package from introducing bias before the agent
understands the repository's authoritative context.

Required reading:

1. `PROJECT_MAP.md` — identify the repository navigation contract.
2. `START_HERE.md` — establish the knowledge base entry point.
3. The relevant specification documents for the task domain.

The agent must not plan or act before completing this orientation.

### Step 2: Read the Handoff Package

The agent reads the Handoff Package in full, noting:

- the approved goal and acceptance criteria;
- completed steps and their outcomes;
- the current step and next action;
- open questions and their resolution status;
- rejected alternatives and their reasons;
- known risks.

If a formal Handoff Package is not available, the agent falls back to
repository-native state (see Repository-Native Resume below).

### Step 3: Confirm Source Versions

The agent must verify that the authoritative sources listed in the Handoff
Package are still current. If a source has changed since the package was
created:

- note the version difference;
- assess whether the change is material to the task;
- if material: do not proceed until the human confirms whether to resume from
  the original version or restart with updated sources.

### Step 4: Identify Gaps

The agent identifies anything in the Handoff Package that is:

- ambiguous (cannot determine the intended next action);
- contradictory (package field conflicts with authoritative source);
- incomplete (required field missing or unresolved open question);
- stale (resource snapshot or document version no longer current).

Gaps must be resolved before proceeding. Resolution options:

- read the referenced authoritative source and apply current authority;
- ask the human for clarification;
- document the gap and mark the blocked field in the new Working Memory.

### Step 5: Create Working Memory

The agent creates a new Working Memory record populated from the Handoff Package
and confirmed source state. This is the agent's authoritative task state going
forward.

The new Working Memory must not copy unresolved `open_questions` as if they
were resolved facts.

### Step 6: Confirm Resume State

Before taking any action, the agent declares:

- the goal it intends to pursue;
- the next action it intends to take;
- any open questions that must be resolved before that action;
- any known risks it acknowledges.

For tasks with irreversible next actions, the agent must receive explicit human
confirmation before proceeding.

### Step 7: Execute

The agent executes the next action as specified in its Working Memory. It
updates Working Memory continuously as steps complete.

### Step 8: Produce a Completion Record or New Handoff

On task completion, the agent produces a completion record that includes:

- the outcome, relative to acceptance criteria;
- deviations from the Handoff Package plan and their justification;
- knowledge that should be promoted to durable records by Hermes.

If the agent reaches a boundary before task completion, it initiates a new
Handoff using the Handoff Protocol.

## Repository-Native Resume

When no formal Handoff Package exists, the agent performs a repository-native
resume. This is a lower-fidelity fallback and must be used cautiously.

```text
1. Read PROJECT_MAP.md
     ↓
2. Run git status to identify branch, staged files, working tree state
     ↓
3. Read task-relevant specification documents
     ↓
4. Infer: completed steps, current step, next action
     ↓
5. Confirm inferred state with human before any irreversible action
     ↓
6. Create Working Memory from inferred state
     ↓
7. Proceed under Step 7 of the Resume Workflow
```

Repository-native resume is only safe when:

- the repository is documentation-first;
- the branch state is observable and unambiguous;
- the human can confirm the inferred state.

## Deviations from Handoff Intent

The incoming agent may deviate from the Handoff Package's intended plan when:

- an authoritative source has changed and the prior plan is no longer valid;
- the human explicitly instructs a different approach;
- the planned next action would violate a product principle or architecture
  boundary;
- new information from an authoritative source makes a rejected alternative
  the correct choice.

All deviations must be documented in Working Memory and referenced in the
completion record. Deviations are not errors — they are evidence that the
Continuity Layer is working as intended by surfacing conflicts with current
authority.

## Completion Record

| Field | Description |
| --- | --- |
| `record_id` | Unique identifier. |
| `task_id` | The task completed. |
| `agent_id` | The completing agent. |
| `handoff_id` | Reference to the Handoff Package used, if any. |
| `outcome` | `completed`, `partially_completed`, `blocked`, `cancelled`. |
| `acceptance_criteria_met` | Which criteria were satisfied. |
| `deviations` | Deviations from package intent, with justification. |
| `knowledge_to_promote` | Learnings to be promoted to durable records. |
| `next_task_handoff` | Handoff Package reference if a new task follows. |

## Observability

Record:

- resume entry condition and source;
- orientation steps completed;
- Handoff Package version read;
- gaps identified and resolution;
- Working Memory created at resume;
- confirmation events and human approvals;
- execution steps and outcomes;
- completion record or new handoff reference.

## Constraints

- An incoming agent may not skip the orientation step.
- An incoming agent may not modify the outgoing agent's Handoff Package.
- An incoming agent must not treat `rejected_alternatives` as viable without
  new evidence or explicit human approval.
- Unresolved `open_questions` must not be treated as resolved by assumption.
- Completion records are append-only.

## Related Documents

- [Handoff Protocol](HANDOFF_PROTOCOL.md)
- [Working Memory](WORKING_MEMORY.md)
- [Predictive Handoff](PREDICTIVE_HANDOFF.md)
- [Continuity Architecture](CONTINUITY_ARCHITECTURE.md)
- [Context Continuity](../architecture/CONTEXT_CONTINUITY.md)
- [AI Agent Onboarding](../knowledge/AI_AGENT_ONBOARDING.md)
