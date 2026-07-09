# Context Continuity

## Status

Conceptual specification. Context continuity is a first-class resource, not an
implementation choice or a synonym for prompt length.

## What Context Continuity Means

Context continuity is the degree to which an AI, agent, person, or workflow can
continue a task with the correct goals, decisions, evidence, constraints,
working state, and unresolved questions.

Continuity includes:

- authoritative project documents and accepted decisions;
- task goal, scope, status, dependencies, and acceptance criteria;
- PR changes, review feedback, checks, and branch state;
- relevant conversation commitments and corrections;
- working hypotheses, rejected alternatives, and open questions;
- artifacts and tool state needed to resume safely;
- ownership, freshness, provenance, completeness, and access.

More tokens do not necessarily create better continuity. Relevant,
authoritative, current, and structured context matters more than raw volume.

## Why the AI with Context May Be Better Than the Smartest AI

A more capable model that lacks project history can repeat rejected work,
violate documented boundaries, misread the current PR, or spend time rebuilding
facts. A less capable model with trustworthy context may execute the next step
more accurately, cheaply, and quickly.

Decision Engine must therefore compare model capability with continuity value.
The “smartest” candidate is not automatically the best resource when switching
would impose high rebuild cost, knowledge loss, review risk, or delay.

Continuity does not override hard capability, safety, or policy requirements.
It is one explicit resource constraint and tradeoff among them.

## Context Owner

The context owner is the current steward capable of continuing or preserving a
defined context package. An owner may be:

- a model session or agent;
- a human developer;
- an active workflow;
- a PR or task record;
- Knowledge Manager / Hermes;
- an inspectable handoff package.

Ownership does not grant authority over product truth. Documentation and
accepted ADRs remain authoritative. An owner must be identifiable, scoped, and
replaceable through a documented handoff.

## PR Context

PR context includes:

- goal and linked specification;
- base, branch, commits, and intended file scope;
- current diff and affected authority;
- review comments and unresolved threads;
- validation already performed;
- known risks, deferred work, and merge status.

PR context should be preserved before reassignment, long waits, branch changes,
or model/session termination.

## Task Context

Task context includes:

- requested outcome and non-goals;
- priority, dependencies, deadline, and owner;
- current state and next safe action;
- evidence collected and decisions made;
- resource assumptions;
- completion and review criteria.

Task context is narrower than project memory and should not copy irrelevant
history.

## Conversation Context

Conversation context captures relevant user intent, clarifications,
commitments, corrections, and approval boundaries. It is transient unless
promoted into an authoritative task, decision, or project artifact.

Conversation history alone must not become durable truth. Important decisions
are written into documentation, an ADR, a task record, or a reviewed handoff.

## Project Memory / Hermes

Hermes preserves durable, sourced knowledge across agents, sessions, and
projects. It can index documents, ADRs, PR outcomes, decision records, workflow
results, and reviewed memory.

Hermes:

- tracks authority, provenance, freshness, and supersession;
- distinguishes specification from observation and inference;
- supplies minimal relevant context packages;
- exposes conflicts and missing evidence;
- never silently overrides repository documentation.

Resource Manager records continuity metadata and availability. Hermes owns
knowledge retrieval, preservation, and content authority behavior.

## When to Preserve Context

Preserve context before:

- provider, model, agent, person, session, or tool reassignment;
- quota exhaustion, cooldown, or expected reset wait;
- workflow pause, cancellation, retry, or task split;
- PR review or handoff;
- context compression or session termination;
- switching from local to hosted execution or the reverse;
- a high-risk decision or irreversible action;
- known loss of an integration or workspace.

The preservation package should be proportional to the task and include
provenance, open questions, next action, and validation state.

## When to Rebuild Context

Rebuild rather than preserve blindly when:

- the current context is stale, corrupted, contradictory, or untrusted;
- product specifications or accepted decisions have changed materially;
- the new owner lacks access to protected sources;
- accumulated conversation is larger than a sourced reconstruction;
- a task changes scope or acceptance criteria;
- the previous owner cannot explain its assumptions;
- security or privacy policy prohibits transfer.

Rebuilding begins from authoritative documents and current repository state,
then adds task-specific evidence. Rebuild cost and remaining uncertainty must be
visible.

## How Decision Engine Uses Context Continuity

Decision Engine should:

1. declare the continuity needed by the task;
2. request current owner, completeness, freshness, portability, and rebuild
   cost from Resource Manager;
3. reject candidates that cannot access mandatory context;
4. compare preserving the current owner with handoff or rebuild options;
5. include continuity loss, delay, cost, and risk in alternatives;
6. require preservation before approved reassignment where needed;
7. explain when context value outweighs model capability, speed, or price;
8. attach the continuity state and selected handoff to the decision record;
9. request reevaluation when the owner, documents, or preservation state
   changes.

Decision Engine does not treat continuity as provider favoritism and cannot use
it to bypass policy, capability, privacy, or human approval.

## Continuity States

Useful conceptual states include:

- `intact`: current owner has sufficient current context;
- `at_risk`: continuity may be lost or become stale;
- `preserving`: a handoff package is being prepared;
- `portable`: an inspectable package is ready for another eligible owner;
- `rebuild_required`: existing context should not be transferred as-is;
- `unavailable`: required context cannot be accessed;
- `unknown`: continuity evidence is incomplete or conflicting.

These states complement, rather than replace, the normalized Resource State
Model.

## Observability

Record:

- context identifier, type, scope, and owner;
- authoritative sources and their versions;
- completeness, freshness, portability, and access;
- preservation, transfer, rebuild, and verification events;
- estimated and observed rebuild effort;
- omitted or inaccessible context;
- decision, schedule, and execution correlations;
- human corrections and supersession.

Sensitive content should remain at its authoritative source when metadata is
sufficient.

## Related Documents

- [Resource Manager](RESOURCE_MANAGER.md)
- [Resource Data Model](RESOURCE_DATA_MODEL.md)
- [Resource State Model](RESOURCE_STATE_MODEL.md)
- [System Overview](SYSTEM_OVERVIEW.md)
- [Decision Governance](DECISION_GOVERNANCE.md)
- [Cost and Budget](COST_AND_BUDGET.md)
