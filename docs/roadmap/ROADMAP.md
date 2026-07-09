# Roadmap

## Status

Draft product roadmap. Stages define capability order and exit conditions, not
fixed dates or implementation technologies.

## Roadmap Rules

- Documentation and review precede implementation in every stage.
- Each stage must produce an independently understandable capability.
- A stage may refine later stages but should not silently implement them.
- Exit criteria describe evidence required to advance; code completion alone is
  insufficient.
- Human control, observability, and explainability apply throughout the roadmap.

## N0 — Foundation

### Goal

Establish the product specification, navigation model, conceptual architecture,
decision process, and contribution rules needed for coherent human and AI-agent
development.

### Scope

- Documentation-first repository structure.
- Product definition, principles, and vision.
- Conceptual system overview and responsibility boundaries.
- N0–N7 roadmap.
- Research areas and ADR process.
- AI-agent collaboration and review rules.

### Non-Goals

- Application code or user interfaces.
- Technology selection.
- Provider integrations.
- Executable quota, routing, prompt, or workflow behavior.

### Exit Criteria

- Product, principles, vision, system overview, and roadmap are reviewed.
- Repository navigation identifies every authoritative foundation document.
- MVP scope and non-goals are explicit.
- No implementation is required to understand intended product direction.

## N1 — Quota Manager

### Goal

Give an individual developer a coherent, trustworthy view of available AI model
capacity and the scheduling constraints that affect planned work.

### Scope

- Documented quota concepts and provider-neutral terminology.
- A limited set of validated quota sources.
- Usage, remaining capacity, reset windows, and freshness.
- Explicit unknown, stale, and unavailable states.
- Scheduling inputs such as priority, reservation, and expected task demand.
- Observable quota updates and source provenance.

### Non-Goals

- Model-quality ranking.
- Full routing decisions.
- Automatic purchasing or plan changes.
- Universal provider coverage.
- Enterprise budgets, billing allocation, or chargeback.

### Exit Criteria

- A user can inspect normalized capacity for the supported sources.
- Every value exposes source and freshness.
- Unknown and stale data cannot be mistaken for available capacity.
- Scheduling eligibility can be evaluated without choosing a model.
- Supported quota assumptions and limitations are documented.

## N2 — Model Router

### Goal

Recommend an eligible model for a documented task and explain the decision.

### Scope

- A documented task-requirement model.
- Provider-neutral model capability facts.
- Eligibility rules based on quota and hard constraints.
- Policy across quality, cost, latency, context capacity, and tool needs.
- Fallback and no-eligible-model outcomes.
- Inspectable candidates, rejections, selection, and explanation.
- Durable routing decision records.

### Non-Goals

- Prompt authoring.
- Workflow execution.
- Automatic task execution.
- Self-modifying routing policy.
- Claims of objectively ranking every model.

### Exit Criteria

- A supported task can receive a recommendation or explicit no-route outcome.
- Every recommendation identifies considered candidates and decisive constraints.
- Routing never treats stale or unknown quota as certain capacity.
- A user can override or reject a recommendation.
- A later human or AI agent can reconstruct why the decision was made.

## N3 — Prompt Builder

### Goal

Build reproducible model inputs from documented instructions and relevant
manager-owned context.

### Scope

- Versioned prompt definitions.
- Required and optional context inputs.
- Context selection and provenance.
- Variable validation and missing-context reporting.
- Model-aware rendering that preserves product intent.
- Records linking prompts, context, selected models, and outcomes.

### Non-Goals

- A general content-writing studio.
- Hidden prompt optimization.
- Long-term memory retrieval.
- Workflow orchestration.
- Automatic promotion based only on model preference.

### Exit Criteria

- The same prompt version and context references can be reconstructed.
- Missing required context blocks execution rather than being silently ignored.
- Model-specific adaptations remain inspectable.
- Prompt changes follow documentation and review rules.
- Routing and prompt records can be linked for an action.

## N4 — Workflow Engine

### Goal

Coordinate documented AI work as observable state transitions with explicit
human-control boundaries.

### Scope

- Versioned workflow definitions.
- Steps, roles, state transitions, and completion conditions.
- Model and prompt requests through manager-owned components.
- Human approval and rejection gates.
- Failure, retry, pause, resume, and cancellation behavior.
- Observable agent and workflow history.

### Non-Goals

- Unbounded autonomous agents.
- A general business-process platform.
- Silent expansion of permissions.
- Tool-specific implementation inside the workflow core.
- Removal of human accountability.

### Exit Criteria

- A documented workflow can progress through success and failure paths.
- Current state and next allowed transitions are inspectable.
- Consequential steps enforce their documented review gates.
- Retries cannot bypass quota, routing, or permission policy.
- A workflow record explains which agents, prompts, models, and approvals were
  involved.

## N5 — Tool Integrations

### Goal

Allow governed workflows to use external AI and development tools through
observable, permission-aware boundaries.

### Scope

- A small set of high-value model and developer-tool integrations.
- Explicit capabilities and permissions.
- Standard action, result, error, and provenance concepts.
- Tool health and availability reporting.
- Audit records for tool requests and outcomes.
- Safe failure and revocation behavior.

### Non-Goals

- Supporting every tool.
- Replacing integrated tools' native functionality.
- Granting broad credentials by default.
- A public plugin marketplace.
- Allowing tools to own manager policy or memory.

### Exit Criteria

- Supported tools declare capabilities and required permissions.
- Users can inspect and revoke access.
- Tool actions and failures are visible in workflow history.
- A tool outage or denial produces an explicit, recoverable outcome.
- Integrations cannot bypass manager-owned policy and review gates.

## N6 — Context / Memory

### Goal

Preserve and retrieve durable, relevant development context independently of
individual models, tools, and sessions.

### Scope

- Manager-owned memory boundaries and provenance.
- Project, decision, workflow, and outcome context.
- Explicit write, review, correction, and deletion behavior.
- Context retrieval based on documented task needs.
- Freshness, confidence, and conflict visibility.
- Links between retained context and its authoritative source.

### Non-Goals

- Recording every interaction forever.
- Treating model-generated summaries as unquestioned truth.
- Provider-owned memory as the canonical store.
- Replacing repository documentation.
- Fully automatic memory writes without policy.

### Exit Criteria

- Context survives model and provider changes.
- Retrieved memory exposes source, scope, and freshness.
- Conflicts with authoritative documentation are visible and resolvable.
- Users can inspect, correct, and remove retained memory.
- A new agent can resume a supported workflow with sufficient relevant context.

## N7 — MCP / Plugin System

### Goal

Create an open extension system for models, quota sources, tools, context
providers, routing policies, and workflows without weakening core governance.

### Scope

- Documented extension boundaries and capability declarations.
- MCP integration where it fits the accepted product model.
- Plugin discovery, configuration, lifecycle, and compatibility concepts.
- Permission isolation and explicit user approval.
- Health, provenance, version, and failure reporting.
- Reference extensions demonstrating supported boundaries.

### Non-Goals

- Executing untrusted extensions without isolation or consent.
- Guaranteeing compatibility with every external plugin ecosystem.
- Allowing extensions to overwrite core policy silently.
- A commercial marketplace.
- Stabilizing extension contracts before core boundaries are validated.

### Exit Criteria

- A third party can build an extension from public documentation.
- Extensions declare capabilities, permissions, and compatibility.
- Users can inspect, enable, disable, and remove extensions.
- Extension actions remain observable and subject to manager policy.
- A failing or incompatible extension cannot corrupt core decision history.

## Sequence and Dependencies

The stages are ordered by product dependency:

```text
N0 Foundation
  ↓
N1 Quota Manager
  ↓
N2 Model Router
  ↓
N3 Prompt Builder
  ↓
N4 Workflow Engine
  ↓
N5 Tool Integrations
  ↓
N6 Context / Memory
  ↓
N7 MCP / Plugin System
```

Research may run ahead of this sequence, but implementation should not depend on
an undefined earlier boundary. A stage can be split into smaller reviewed
increments while preserving its exit criteria.

## Roadmap Change Process

Changes to stage goals, boundaries, order, or exit criteria require updates to
the affected product and architecture documents. Technology choices belong in
separate ADRs after the relevant conceptual boundary is accepted.
