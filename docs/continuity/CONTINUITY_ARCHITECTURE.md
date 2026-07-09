# AI Continuity Layer Architecture

## Status

Conceptual specification. The AI Continuity Layer is a new first-class component
of the AI Executive Office, derived from validating AI-to-AI Handoff in
production (2026-07-10, PR #9). It formalizes what was previously implicit in
Context Continuity and Knowledge Manager / Hermes into an explicit, governed
layer.

## Why a Continuity Layer

Prior to this specification, continuity was addressed in two places:

- **Context Continuity** (`docs/architecture/CONTEXT_CONTINUITY.md`): treats
  context as a resource managed by Resource Manager;
- **Knowledge Manager / Hermes**: preserves durable project knowledge.

These cover the before (what to preserve) and after (what to retrieve). What was
missing was the **during**: how an AI agent actively manages its working state
and transfers it safely to another agent mid-task.

The first real AI-to-AI Handoff revealed this gap. Codex reached a usage limit
during PR #9; Antigravity resumed using only repository documents and `git
status`. The handoff succeeded because the repository was documentation-first.
But it succeeded without a protocol — by luck of structure, not by design.

The AI Continuity Layer makes this safe by design.

## Layer Position in the AI Executive Office

```
┌──────────────────────────────────────────────────────────┐
│                   AI Executive Office                    │
├──────────────────────────────────────────────────────────┤
│  Presentation Layer      Mission Control Dashboard       │
├──────────────────────────────────────────────────────────┤
│  Strategy Layer          Strategy Council / Advisors     │
├──────────────────────────────────────────────────────────┤
│  Decision Layer          Decision Engine                 │
├──────────────────────────────────────────────────────────┤
│  Resource Layer          Resource Manager                │
│                          ┌──────────────────────────────┐│
│                          │  AI Continuity Layer   [NEW] ││
│                          │  Working Memory              ││
│                          │  Handoff Protocol            ││
│                          │  Predictive Handoff          ││
│                          │  Resume Workflow             ││
│                          └──────────────────────────────┘│
├──────────────────────────────────────────────────────────┤
│  Knowledge Layer         Knowledge Manager / Hermes      │
├──────────────────────────────────────────────────────────┤
│  Execution Layer         Scheduler / AI Router / Engine  │
├──────────────────────────────────────────────────────────┤
│  External Layer          Providers / Tools / Git         │
└──────────────────────────────────────────────────────────┘
```

The AI Continuity Layer sits within the Resource Layer. It manages agent-scoped
working state as a resource, alongside quota, credits, and context continuity.
Its outputs flow to the Decision Layer (handoff decisions), the Knowledge Layer
(knowledge promotion), and the Execution Layer (resume actions).

## Components

### Working Memory

**Role**: Active, task-scoped, transient state held by the current AI agent.

Working Memory tracks where the agent is in an approved plan, what evidence it
holds, what questions are open, and what must be preserved before the session
ends. It is the live state that gets packaged into a Handoff Package.

See [WORKING_MEMORY.md](WORKING_MEMORY.md) for the full specification.

### Handoff Protocol

**Role**: Governed transition of task ownership from one AI agent to another.

The Handoff Protocol defines how Working Memory is packaged, validated, stored,
and read by an incoming agent. It covers both proactive (planned) and reactive
(forced) handoffs. It includes the minimal repository-native fallback path.

See [HANDOFF_PROTOCOL.md](HANDOFF_PROTOCOL.md) for the full specification.

### Predictive Handoff

**Role**: Detect approaching agent boundaries and initiate handoff before limits
become failures.

Predictive Handoff monitors quota, context, and session signals. When thresholds
are crossed, it coordinates with the Scheduler and Decision Engine to complete
the current atomic step, assemble a validated Handoff Package, and transfer
ownership gracefully.

See [PREDICTIVE_HANDOFF.md](PREDICTIVE_HANDOFF.md) for the full specification.

### Resume Workflow

**Role**: Safe re-entry into a task from a Handoff Package or repository state.

The Resume Workflow defines the ordered steps an incoming agent must follow:
orient from authoritative documents, read the Handoff Package, confirm source
versions, resolve gaps, create Working Memory, confirm resume state, and execute.
It includes the repository-native fallback for packageless resumption.

See [RESUME_WORKFLOW.md](RESUME_WORKFLOW.md) for the full specification.

## Information Flows

```
                    ┌─────────────────────┐
                    │   Resource Manager  │
                    │  (quota/context     │
                    │   signals)          │
                    └──────────┬──────────┘
                               │ threshold events
                               ▼
┌─────────────────────────────────────────────────┐
│              AI Continuity Layer                │
│                                                 │
│  Working Memory ──preserve──► Handoff Package   │
│       ▲                             │           │
│       │ populate                    │ store     │
│  Resume Workflow ◄──read────────────┘           │
│       │                                         │
│  Predictive Handoff ──signals──► Scheduler      │
└─────────────────────────────────────────────────┘
         │                             │
         │ promote                     │ resume decision
         ▼                             ▼
   Knowledge Manager /         Decision Engine
   Hermes                      (agent selection,
   (durable records)            confirmation)
```

## Relationship to Existing Components

### Resource Manager

The AI Continuity Layer extends the Resource Layer. Context continuity metadata
(owner, status, freshness, portability, rebuild cost) continues to be tracked by
Resource Manager. Working Memory is an additional resource type managed by the
Continuity Layer within this layer. Resource Manager supplies quota and context
signals that trigger Predictive Handoff.

### Knowledge Manager / Hermes

Hermes handles durable, cross-session knowledge. The AI Continuity Layer handles
active, within-session state. Handoff Packages flow from the Continuity Layer to
Hermes for storage and retrieval. Hermes supplies authoritative sources that the
Resume Workflow reads during Step 1 (Orient).

Knowledge promoted from Working Memory on task completion is proposed to Hermes,
which applies its authority, provenance, and supersession rules before accepting
it as durable knowledge.

### Decision Engine

Decision Engine uses Continuity Layer outputs for:

- choosing between preserve-and-wait vs. hand-off-now in Predictive Handoff;
- selecting the incoming agent based on capability, continuity cost, and resource
  availability;
- requiring human confirmation for high-risk reassignments.

### Scheduler

Scheduler receives handoff initiation events from the Continuity Layer and
coordinates:

- pausing the outgoing agent's task;
- selecting a wake condition (agent available, quota reset);
- dispatching the Resume Workflow to the incoming agent.

### AI Executive Office

The AI Executive Office enforces human-control boundaries for handoff decisions.
It is notified of all handoff events and must be the single point through which
human confirmation requests flow.

## Origin: Validate First, Specify Second

This layer follows the principle established during its discovery:

> Rather than designing Handoff on a whiteboard, we observed a real handoff
> succeed under real constraints, then formalized what made it work.

The first AI-to-AI Handoff (Codex → Antigravity, PR #9, 2026-07-10) succeeded
because:

1. The repository was documentation-first.
2. The branch state was observable via `git status`.
3. The human provided an explicit, structured instruction.
4. The incoming agent read authoritative sources before acting.

This specification generalizes those four conditions into a repeatable protocol.
Every future Continuity Layer feature should be validated in practice before it
becomes a specification.

## N4 Roadmap Integration

The AI Continuity Layer contributes to N4 — Mission Control Dashboard:

- Working Memory state is surfaced in Mission Control as "current agent task
  state";
- Handoff events appear as traceable transitions in the execution history;
- Predictive Handoff warnings are visible before limits are hit;
- Resume confirmations are an explicit human-control action in Mission Control.

See [ROADMAP.md](../roadmap/ROADMAP.md) for the full N4 scope.

## Governance

Changes to the AI Continuity Layer require:

1. Updates to this document.
2. Updates to affected component contracts in
   [COMPONENT_CONTRACTS.md](../architecture/COMPONENT_CONTRACTS.md).
3. Updates to [ROADMAP.md](../roadmap/ROADMAP.md) if stage scope changes.
4. An ADR if a cross-cutting architectural decision is made.
5. Human review before implementation.

## Related Documents

- [Working Memory](WORKING_MEMORY.md)
- [Handoff Protocol](HANDOFF_PROTOCOL.md)
- [Predictive Handoff](PREDICTIVE_HANDOFF.md)
- [Resume Workflow](RESUME_WORKFLOW.md)
- [Context Continuity](../architecture/CONTEXT_CONTINUITY.md)
- [Component Contracts](../architecture/COMPONENT_CONTRACTS.md)
- [Resource Manager](../architecture/RESOURCE_MANAGER.md)
- [Knowledge Manager / Hermes](../architecture/COMPONENT_CONTRACTS.md)
- [System Overview](../architecture/SYSTEM_OVERVIEW.md)
- [Roadmap](../roadmap/ROADMAP.md)
