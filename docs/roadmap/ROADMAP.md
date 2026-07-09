# Roadmap

## Status

Draft product roadmap for the AI Executive Office. Stages define capability
order and exit evidence, not dates or implementation technology.

## Roadmap Rules

- Documentation and review precede implementation.
- Each stage produces independently reviewable value.
- Advisor recommendations never grant execution authority.
- Human control, explainability, observability, and context continuity apply to
  every stage.
- Existing Quota Manager and Provider Registry specifications remain reusable
  assets under Resource Manager.
- Exit criteria require evidence; code completion alone is insufficient.

## N0 — Foundation

### Goal

Establish Documentation First governance, product specifications, architecture
contracts, provider facts, and contribution rules.

### Scope

- Repository navigation and document authority.
- Product principles and initial vision.
- Conceptual architecture and component contracts.
- Quota Manager specification.
- Provider Registry and Capability Matrix.
- ADR and review workflow.

### Non-Goals

- Product implementation.
- Framework or infrastructure selection.
- Autonomous external execution.

### Exit Criteria

- Foundation documents are reviewed and merged.
- Product decisions can be traced through PROJECT_MAP.
- Quota and provider facts have explicit provenance and boundaries.
- No implementation is needed to understand the baseline.

## N1 — Product Repositioning

### Goal

Reposition ai-manager as an AI Executive Office, AI Operating System, and AI
Resource Orchestration Platform.

### Scope

- AI Chief of Staff product personality.
- Continuous developer productivity.
- Strategy Council and advisor roles.
- Decision Governance and Conflict Resolution.
- Seven-layer system architecture.
- Revised component contracts and N0–N9 roadmap.

### Non-Goals

- Implementing advisors or Decision Engine.
- Building Mission Control UI.
- Selecting models for advisor roles.
- Changing external provider integrations.

### Exit Criteria

- Canonical AI Executive Office positioning is reviewed.
- Advisors recommend, Decision Engine aggregates, and humans decide.
- Router is documented as an execution subcomponent.
- Quota, providers, context, cost, and tools are defined as resources.
- Roadmap no longer treats Quota → Router → Prompt → Workflow as the product
  spine.

## N2 — Resource Manager

### Goal

Provide a trustworthy operating picture of AI resources for decisions,
scheduling, and continuous work.

### Scope

- Quota Manager states, history, reset, and cooldown.
- Provider Registry and Model Catalog.
- Credits, cost class, capability, adapter health, and tool availability.
- Manual read-only resource records.
- Source, freshness, confidence, and uncertainty.
- Resource snapshots and reservation concepts.

### Non-Goals

- Final plan selection.
- Model quality ranking.
- Automatic provider login, scraping, or web automation.
- Enterprise financial accounting.

### Exit Criteria

- Mission Control can read a provider-neutral resource inventory.
- Every dynamic fact exposes source and freshness.
- Unknown and stale facts cannot become eligible silently.
- Quota, provider health, capability, cost, and reset remain distinct.
- Resource snapshot can be attached to a later decision record.

## N3 — Strategy Council and Decision Governance

### Goal

Produce specialized advisor recommendations and reconcile them into explainable,
human-governed plans.

### Scope

- Architecture, Resource, Knowledge/Hermes, Cost, Risk, and Execution Advisors.
- Shared recommendation contract.
- Decision Engine inputs, weights, vetoes, and alternatives.
- Conflict Resolution.
- Human confirmation and override.
- Decision audit trail.

### Non-Goals

- Advisors executing tools.
- Self-modifying policy.
- Permanent provider or model assignments to advisor roles.
- Fully autonomous decisions.

### Exit Criteria

- Each advisor emits sourced recommendations and confidence.
- Decision Engine explains accepted and rejected advice.
- Hard constraints and preferences are distinguishable.
- Wait, reassign, split, preserve-context, and execute recommendations are
  supported conceptually.
- Human override is attributable and auditable.

## N4 — Mission Control Dashboard

### Goal

Give a solo developer one clear view of goals, advisors, resources, knowledge,
decisions, schedules, and execution state.

### Scope

- Mission and project overview.
- Advisor recommendations and conflicts.
- Resource availability, quota, cost, reset, and health.
- Decision explanation and confirmation.
- Wait, reassign, split, preserve, approve, reject, override, pause, retry, and
  cancel controls.
- Freshness and uncertainty.

### Non-Goals

- Direct provider control from the Dashboard.
- Hidden autonomous actions.
- Full team administration.
- General chat-product replacement.

### Exit Criteria

- Developer can inspect the current operating picture.
- Every consequential recommendation exposes its reason and required action.
- Stale and incomplete state is visible.
- Dashboard commands pass through AI Executive Office.
- Human final authority is usable, not merely documented.

## N5 — Knowledge Manager / Hermes

### Goal

Preserve authoritative project knowledge and context continuity across advisors,
sessions, models, tasks, and decisions.

### Scope

- Documentation, ADR, PR history, decision log, workflow outcome, and memory
  sources.
- Authority, provenance, freshness, conflict, and access.
- Context packages for advisors and execution.
- Handoff packages for wait, reassignment, split, and compression.
- Memory correction, supersession, and deletion.

### Non-Goals

- Treating all conversation history as durable memory.
- Replacing repository documentation.
- Provider-owned memory as source of truth.
- Unreviewed automatic knowledge promotion.

### Exit Criteria

- A new advisor can resume with sufficient sourced context.
- Documentation remains more authoritative than memory.
- Context conflicts and omissions are visible.
- Reassignment preserves decisions and open questions.
- Users can inspect and correct durable memory.

## N6 — Scheduler and Workflow Coordination

### Goal

Sustain productive work across time, dependencies, resource windows,
confirmations, and failures.

### Scope

- Approved task sequence and dependencies.
- Wait and wake conditions.
- Reset, cooldown, reservation, and deadline awareness.
- Reassignment and task splitting.
- Context preservation before delay or handoff.
- Workflow state, review gates, retry, pause, resume, and cancellation.

### Non-Goals

- Unbounded autonomous operation.
- Changing the approved goal.
- Bypassing quota, permission, or review policy.
- General business-process automation.

### Exit Criteria

- Scheduled tasks have explicit owner, dependency, resource, and wake state.
- Waiting includes useful alternative work where possible.
- Reassignment cannot proceed without context handoff.
- Workflow history links decisions, routes, approvals, and outcomes.
- Missed wake conditions and schedule conflicts are observable.

## N7 — AI Router and Provider Adapters

### Goal

Dispatch approved execution steps through eligible, explainable provider,
surface, tool, and model paths.

### Scope

- AI Router execution-path selection.
- Model Router as a model-ranking submodule.
- Provider Adapter identity, discovery, health, version, and execution.
- Capability, quota, cost, permission, and risk filtering.
- Fallback and no-route outcomes.
- Prompt Builder integration.

### Non-Goals

- Replacing Decision Engine.
- Selecting project strategy.
- Allowing adapters to own policy or memory.
- Universal provider support.

### Exit Criteria

- Route selection references approved plan and resource snapshot.
- Provider, surface, adapter, and model provenance is retained.
- Rejected candidates and fallback reasons are explainable.
- No eligible route returns a safe explicit result.
- Router cannot change architecture, risk, or human-control decisions.

## N8 — MCP / Plugin System

### Goal

Allow reviewed extensions to add advisors, providers, resources, knowledge, and
tools without weakening governance.

### Scope

- Plugin manifests, capabilities, permissions, health, and versions.
- Provider Adapter plugins.
- MCP client/server boundaries.
- Advisor and knowledge-source extension contracts.
- Lifecycle, compatibility, isolation, and provenance.

### Non-Goals

- Trusting plugins by default.
- Executing untrusted code without isolation.
- A commercial marketplace.
- Allowing extensions to overwrite core policy.

### Exit Criteria

- Third parties can build extensions from public contracts.
- Users can inspect, enable, disable, and remove plugins.
- Plugin actions remain governed and observable.
- Failure cannot corrupt decision or knowledge history.
- Permissions and compatibility are explicit.

## N9 — Multi-Project / Team Mode

### Goal

Extend the AI Executive Office from one developer/project to coordinated
portfolios and small teams.

### Scope

- Multiple project goals and resource commitments.
- Shared versus private knowledge boundaries.
- Team roles, approvals, and delegated authority.
- Portfolio scheduling and budget.
- Cross-project advisor and resource visibility.
- Audit and handoff between people.

### Non-Goals

- Enterprise breadth before individual use is coherent.
- Replacing issue trackers or organizational planning systems.
- Silent sharing of project context.
- Removing project-level autonomy.

### Exit Criteria

- Project data and authority remain isolated by policy.
- Shared resources cannot be double-booked silently.
- Team decisions identify human authority and advisor inputs.
- Cross-project scheduling explains tradeoffs.
- A solo developer experience remains first class.

## Sequence and Dependencies

```text
N0 Foundation
  ↓
N1 Product Repositioning
  ↓
N2 Resource Manager
  ↓
N3 Strategy Council + Decision Governance
  ↓
N4 Mission Control Dashboard
  ↓
N5 Knowledge Manager / Hermes
  ↓
N6 Scheduler + Workflow Coordination
  ↓
N7 AI Router + Provider Adapters
  ↓
N8 MCP / Plugin System
  ↓
N9 Multi-project / Team Mode
```

Research may run ahead, but implementation must not rely on an undefined earlier
authority or contract. Each stage can be split into small reviewed increments.

## Roadmap Change Process

Changes to stage goals, authority, order, or exit criteria require updates to
affected product, architecture, advisor, resource, and governance documents.
Technology choices belong in separate ADRs.
