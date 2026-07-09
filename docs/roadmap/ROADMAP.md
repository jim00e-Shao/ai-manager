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

## Prototype Track

The prototype track validates learning loops before production capability
stages. It does not replace the N0–N9 roadmap and does not authorize production
features, provider automation, framework selection, or UI implementation.

PR #9 defines the first implementation plan for
[Resource Briefing CLI](../prototypes/RESOURCE_BRIEFING_CLI.md). This is an
implementation-before-code planning document. It defines the smallest prototype
that can validate:

```text
Observe → Think → Advise → Remind
```

The prototype should read a manual AI resource snapshot, generate a daily
briefing, recommend AI usage for a task using deterministic rules, and show
reset, cost, quota, and context reminders.

Prototype stages are tracked in
[PROTOTYPE_ROADMAP.md](../prototypes/PROTOTYPE_ROADMAP.md):

- P0 Documentation plan
- P1 Resource Briefing CLI
- P2 Local JSON persistence
- P3 Rule-based recommendation
- P4 Reminder queue
- P5 Optional interactive prompt
- P6 Mission Control UI later

Prototype outcomes may inform N2 Resource Manager, N3 Decision Governance, and
N4 Mission Control Dashboard, but prototype behavior becomes production
authority only when promoted into the relevant source-of-truth documents.

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

### N2.1 — Resource Manager Specification

#### Goal

Define Resource Manager authority, conceptual entities, normalized states,
relationships, and failure behavior.

#### Scope

- Resource Manager contract and Resource Layer boundaries.
- Quota as a Resource Manager sub-capability.
- Resource data and state models.
- Provider Registry and Model Catalog relationships.
- Source, freshness, confidence, uncertainty, snapshots, and events.

#### Non-Goals

- Storage or API schema.
- Provider automation.
- Final plan selection or execution.

#### Exit Criteria

- Every managed resource has an explicit owner and meaning.
- State transitions and required events are reviewable.
- Quota, credits, rate limits, health, cost, continuity, and compute remain
  distinct.
- Decision Engine and Scheduler inputs do not expand Resource Manager authority.

### N2.2 — Manual Resource Dashboard

#### Goal

Give a solo developer one read-only operating picture of manually maintained
resources.

#### Scope

- Provider, model, and account resource display.
- Manual resource entry and correction.
- Quota, reset, cost estimate, availability, and context owner.
- Source, freshness, confidence, and unknown-state presentation.

#### Non-Goals

- Automatic login, scraping, provider bypass, or automatic web control.
- Dispatch, purchasing, or subscription changes.
- Framework or implementation selection in this roadmap.

#### Exit Criteria

- Manual resource records remain attributable and scoped.
- Read-only views distinguish confirmed, estimated, manual, stale, and unknown.
- No Dashboard action directly controls a provider.
- MVP boundaries in `RESOURCE_MANAGER_MVP.md` are satisfied.

### N2.3 — Resource Snapshot History

#### Goal

Make resource changes and the facts used by decisions reproducible.

#### Scope

- Immutable snapshots and supersession.
- Resource events and state-transition history.
- Decision, schedule, and execution correlation.
- Conflicting observation and correction history.

#### Non-Goals

- Predictive capacity planning.
- Billing-grade accounting.
- Indefinite storage policy.

#### Exit Criteria

- A decision can identify its exact resource snapshot.
- Every state change has a source and reason.
- Corrections preserve prior audit history.
- Expired snapshots cannot be presented as current silently.

### N2.4 — Context Continuity Tracking

#### Goal

Treat task, PR, conversation, and project continuity as a first-class resource.

#### Scope

- Context owner and continuity metadata.
- Preservation, portability, access, freshness, and rebuild requirement.
- PR and task handoff references.
- Knowledge Manager / Hermes relationship.

#### Non-Goals

- Storing every conversation.
- Provider-owned memory as product truth.
- Automatic cross-boundary context transfer.

#### Exit Criteria

- Resource snapshots expose context owner and continuity risk.
- Handoffs identify authoritative sources and open work.
- Rebuild-required and inaccessible context remain explicit.
- Decision Engine can compare continuity value without overriding hard policy.

### N2.5 — Cost and Budget Tracking

#### Goal

Expose the complete cost implications of resource use without claiming false
billing precision.

#### Scope

- API and subscription cost.
- Credit balances, cost ceilings, and budget policy.
- Opportunity, waiting, and context-rebuilding cost.
- Estimates, confidence, thresholds, and observed outcome reconciliation.

#### Non-Goals

- Payment processing or purchasing.
- Enterprise financial accounting.
- Provider-specific routing mandates.

#### Exit Criteria

- Cost facts retain unit, scope, source, and pricing version.
- Estimates are distinguishable from billing observations.
- Hard ceilings and approval thresholds are enforceable as decision inputs.
- Low-cost and high-cost choices can be explained using total tradeoffs.

### N2.6 — Decision Engine Integration

#### Goal

Supply Decision Engine and Scheduler with versioned, demand-sensitive resource
facts.

#### Scope

- Task resource-demand requests.
- Eligibility, constraint, continuity, and cost results.
- Snapshot attachment to decisions.
- Scheduler recovery, reservation, and reevaluation conditions.
- Outcome feedback into resource history.

#### Non-Goals

- Moving plan selection into Resource Manager.
- Autonomous reservation, routing, or provider execution.
- Treating unknown resources as eligible.

#### Exit Criteria

- Decision Engine receives one versioned snapshot per evaluated scope.
- Resource constraints and unknowns appear in decision explanation.
- Scheduler can reevaluate at explicit recovery or state-change conditions.
- Execution outcomes update resources without rewriting historical snapshots.
- Resource Manager never selects or dispatches the final plan.

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
decisions, schedules, and execution state. In this stage the AI Continuity Layer
— Working Memory, Handoff Protocol, Predictive Handoff, and Resume Workflow —
becomes visible and operable through Mission Control.

### Scope

- Mission and project overview.
- Advisor recommendations and conflicts.
- Resource availability, quota, cost, reset, and health.
- Decision explanation and confirmation.
- Wait, reassign, split, preserve, approve, reject, override, pause, retry, and
  cancel controls.
- Freshness and uncertainty.
- **AI Continuity Layer integration:**
  - Active Working Memory state for the current agent task.
  - Handoff event history and incoming/outgoing agent transitions.
  - Predictive Handoff warnings before quota or context limits are hit.
  - Human-confirmation controls for agent reassignment.
  - Resume state confirmation before irreversible actions.

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
- Active agent Working Memory is inspectable.
- Handoff events, package completeness, and resume confirmations are traceable.
- Predictive Handoff signals are surfaced before limits cause failures.

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
