# Source of Truth

This document defines which files are authoritative for each major ai-manager
topic. Use it when two documents appear to conflict or when deciding which file
must be updated first.

## Conflict Rule

If two documents conflict:

1. A more recent accepted ADR governs cross-cutting decisions.
2. The topic-specific source-of-truth document governs that topic.
3. Supporting and research documents must be updated to match the source of
   truth.
4. Implementation does not override documentation.

If the correct authority is unclear, stop and update this document or create an
ADR before implementation.

## Authority Table

| Topic | Source of Truth | Supporting Documents |
| --- | --- | --- |
| Product positioning | [AI_EXECUTIVE_OFFICE.md](../product/AI_EXECUTIVE_OFFICE.md) and [PRODUCT.md](../product/PRODUCT.md) | [README.md](../../README.md), [VISION.md](../product/VISION.md) |
| Principles | [PRINCIPLES.md](../product/PRINCIPLES.md) | [ADR-0001](../decisions/ADR-0001-documentation-first.md), [ADR-0002](../decisions/ADR-0002-deterministic-first.md), [CONTRIBUTING.md](../../CONTRIBUTING.md) |
| Architecture layers | [SYSTEM_OVERVIEW.md](../architecture/SYSTEM_OVERVIEW.md) | [DATA_FLOW.md](../architecture/DATA_FLOW.md), [SYSTEM_BOUNDARIES.md](../architecture/SYSTEM_BOUNDARIES.md) |
| Component contracts | [COMPONENT_CONTRACTS.md](../architecture/COMPONENT_CONTRACTS.md) | [COMPONENTS.md](../architecture/COMPONENTS.md), [GLOSSARY.md](../architecture/GLOSSARY.md) |
| Resource Manager | [RESOURCE_MANAGER.md](../architecture/RESOURCE_MANAGER.md) | [RESOURCE_MANAGER_MVP.md](../product/RESOURCE_MANAGER_MVP.md), [RESOURCE_DATA_MODEL.md](../architecture/RESOURCE_DATA_MODEL.md), [RESOURCE_STATE_MODEL.md](../architecture/RESOURCE_STATE_MODEL.md) |
| Context Continuity | [CONTEXT_CONTINUITY.md](../architecture/CONTEXT_CONTINUITY.md) | [RESOURCE_MANAGER.md](../architecture/RESOURCE_MANAGER.md), [RESOURCE_DATA_MODEL.md](../architecture/RESOURCE_DATA_MODEL.md) |
| Cost / Budget | [COST_AND_BUDGET.md](../architecture/COST_AND_BUDGET.md) | [RESOURCE_MANAGER.md](../architecture/RESOURCE_MANAGER.md), [DECISION_GOVERNANCE.md](../architecture/DECISION_GOVERNANCE.md) |
| Provider Registry | [PROVIDERS.md](../providers/PROVIDERS.md) | [PROVIDER_ABSTRACTION.md](../providers/PROVIDER_ABSTRACTION.md), [MODEL_CATALOG.md](../providers/MODEL_CATALOG.md), [CAPABILITY_MATRIX.md](../providers/CAPABILITY_MATRIX.md) |
| Decision Governance | [DECISION_GOVERNANCE.md](../architecture/DECISION_GOVERNANCE.md) | [STRATEGY_COUNCIL.md](../architecture/STRATEGY_COUNCIL.md), [ADVISOR_MODEL.md](../architecture/ADVISOR_MODEL.md), [CONFLICT_RESOLUTION.md](../architecture/CONFLICT_RESOLUTION.md) |
| Roadmap | [ROADMAP.md](../roadmap/ROADMAP.md) | [CHANGELOG.md](../../CHANGELOG.md), PR descriptions |
| Contribution rules | [CONTRIBUTING.md](../../CONTRIBUTING.md) | [AI_AGENT_ONBOARDING.md](AI_AGENT_ONBOARDING.md), [PROJECT_MAP.md](../../PROJECT_MAP.md) |
| Coding Agent Task Protocol | [CODING_AGENT_TASK_PROTOCOL.md](../architecture/CODING_AGENT_TASK_PROTOCOL.md) | [ENGINEERING_TICKET_TEMPLATE.md](../templates/ENGINEERING_TICKET_TEMPLATE.md), [COMPLETION_REPORT_TEMPLATE.md](../templates/COMPLETION_REPORT_TEMPLATE.md), [HANDOFF_PROTOCOL.md](../continuity/HANDOFF_PROTOCOL.md), [PRINCIPLES.md](../product/PRINCIPLES.md) (Deterministic-First, Principle 17) |
| ADR | [docs/decisions/](../decisions/) | Topic-specific source-of-truth documents |

## Source-of-Truth Responsibilities

### Product Positioning

[AI_EXECUTIVE_OFFICE.md](../product/AI_EXECUTIVE_OFFICE.md) defines the current
product identity. [PRODUCT.md](../product/PRODUCT.md) defines users, problems,
scope, and non-goals. README can summarize these documents but must not redefine
them.

### Principles

[PRINCIPLES.md](../product/PRINCIPLES.md) defines durable rules that should
survive implementation detail changes. If a proposed feature violates a
principle, the principle must be amended through review before the feature is
implemented.

Deterministic-First (Principle 17) is the general, repo-wide statement of
the rule; it governs any manager-owned orchestration surface, not only the
Coding Agent Task Protocol below. [ADR-0002](../decisions/ADR-0002-deterministic-first.md)
records the architecture decision and its consequences.

### Architecture

[SYSTEM_OVERVIEW.md](../architecture/SYSTEM_OVERVIEW.md) governs layer
structure. [COMPONENT_CONTRACTS.md](../architecture/COMPONENT_CONTRACTS.md)
governs component responsibilities, inputs, outputs, state, dependencies,
failure modes, observability, and extension points.

### Resource Manager

[RESOURCE_MANAGER.md](../architecture/RESOURCE_MANAGER.md) governs Resource
Layer behavior. Quota Manager is a sub-capability and does not override Resource
Manager. Resource data and state documents support implementation but must
remain consistent with the Resource Manager specification.

### Context Continuity

[CONTEXT_CONTINUITY.md](../architecture/CONTEXT_CONTINUITY.md) governs context as
a first-class resource. Provider capability or routing documents may reference
context continuity, but they must not redefine ownership or preservation rules.

### Cost / Budget

[COST_AND_BUDGET.md](../architecture/COST_AND_BUDGET.md) governs cost concepts,
budget policy, and cost-aware routing criteria. Decision Governance applies
these costs when reconciling recommendations.

### Provider Registry

[PROVIDERS.md](../providers/PROVIDERS.md) governs provider and model
responsibility boundaries. The Capability Matrix records useful facts, but
capability values can become stale and should be verified when precision
matters.

### Decision Governance

[DECISION_GOVERNANCE.md](../architecture/DECISION_GOVERNANCE.md) governs how
decisions are made, recorded, explained, and overridden. Strategy Council and
Advisor Model documents describe inputs into governance.

### Roadmap

[ROADMAP.md](../roadmap/ROADMAP.md) governs capability order and exit criteria.
PRs may advance the roadmap only by updating this file.

### Contribution Rules

[CONTRIBUTING.md](../../CONTRIBUTING.md) governs contributor and AI-agent
workflow. Onboarding documents can explain the workflow but must not weaken
contribution rules.

### Coding Agent Task Protocol

[CODING_AGENT_TASK_PROTOCOL.md](../architecture/CODING_AGENT_TASK_PROTOCOL.md)
governs the engineering-ticket state machine, ticket/report formats, and
human-approval boundary for dispatching work to a Coding Agent (Claude Code,
Codex, Gemini CLI, or a successor). It is distinct from
[HANDOFF_PROTOCOL.md](../continuity/HANDOFF_PROTOCOL.md), which governs
mid-task AI-to-AI continuity within the AI Continuity Layer; see the task
protocol's relationship section for the boundary between the two.

Its Deterministic-First section is the first operational application of the
general Principle 17 / ADR-0002 rule above; it does not restate the general
principle as a competing definition.

### ADRs

ADRs govern accepted cross-cutting decisions. If an ADR conflicts with a
topic-specific document, update the topic-specific document in the same PR or
create a follow-up issue that explicitly identifies the inconsistency.
