# Project Map

This file is the **Repository Navigation Contract** for ai-manager. It defines
how humans and AI agents enter the knowledge base, identify authoritative
documents, follow role-specific reading paths, and avoid changing the repository
from incomplete context.

**Every AI agent must read this file before planning or changing the
repository.**

# Project Map

This file is the **Repository Navigation Contract** for ai-manager. It defines
how humans and AI agents enter the knowledge base, identify authoritative
documents, follow role-specific reading paths, and avoid changing the repository
from incomplete context.

**Every AI agent must read this file before planning or changing the
repository.**

For the fastest orientation, start with [START_HERE.md](START_HERE.md). For
topic authority and conflict resolution, use
[SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md).

## Repository Navigation

```text
START_HERE
  ↓
README
  ↓
PROJECT_MAP
  ↓
KNOWLEDGE_NAVIGATION
  ↓
SOURCE_OF_TRUTH
  ↓
AI_EXECUTIVE_OFFICE
  ↓
PRODUCT
  ↓
PRINCIPLES
  ↓
VISION
  ↓
SYSTEM_OVERVIEW
  ↓
STRATEGY_COUNCIL
  ↓
ADVISOR_MODEL
  ↓
DECISION_GOVERNANCE
  ↓
CONFLICT_RESOLUTION
  ↓
ROADMAP
  ↓
PROTOTYPES
  ↓
CONTINUITY_ARCHITECTURE
  ↓
WORKING_MEMORY + HANDOFF_PROTOCOL + PREDICTIVE_HANDOFF + RESUME_WORKFLOW
  ↓
PROVIDERS
  ↓
RESOURCE_MANAGER
  ↓
RESOURCE DATA + STATE
  ↓
CONTEXT CONTINUITY + COST
  ↓
QUOTA SUB-CAPABILITY
  ↓
ADRs
  ↓
CONTRIBUTING
```

This path moves from entry orientation to document authority, product identity,
Every affected authoritative document must be identified before work begins.

## Required Reading Order

1. [START_HERE.md](START_HERE.md) — orient humans and AI agents.
2. [README.md](README.md) — understand the project at a glance.
3. [PROJECT_MAP.md](PROJECT_MAP.md) — locate authoritative context.
4. [KNOWLEDGE_NAVIGATION.md](docs/knowledge/KNOWLEDGE_NAVIGATION.md) —
   understand the repository as a knowledge base.
5. [SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md) — identify topic
   authority and conflict rules.
6. [READING_PATHS.md](docs/knowledge/READING_PATHS.md) — choose a role-specific
   reading path when the task has a clear role.
7. [AI_AGENT_ONBOARDING.md](docs/knowledge/AI_AGENT_ONBOARDING.md) — required for
   AI agents before planning or changing files.
8. [AI_EXECUTIVE_OFFICE.md](docs/product/AI_EXECUTIVE_OFFICE.md) — understand the
   AI Executive Office, AI Chief of Staff, and AI Operating System positioning.
9. [PRODUCT.md](docs/product/PRODUCT.md) — understand users, problems, MVP, and
   product boundaries.
10. [PRINCIPLES.md](docs/product/PRINCIPLES.md) — understand durable product
   decision rules.
11. [VISION.md](docs/product/VISION.md) — understand the long-term direction.
12. [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) — understand the
   seven architecture layers and authority flow.
13. [STRATEGY_COUNCIL.md](docs/architecture/STRATEGY_COUNCIL.md) — understand how
   advisors produce recommendations.
14. [ADVISOR_MODEL.md](docs/architecture/ADVISOR_MODEL.md) — understand each
   advisor contract, lens, KPI, and failure mode.
15. [DECISION_GOVERNANCE.md](docs/architecture/DECISION_GOVERNANCE.md) —
    understand goal alignment, weights, overrides, and human authority.
16. [CONFLICT_RESOLUTION.md](docs/architecture/CONFLICT_RESOLUTION.md) —
    understand how Decision Engine reconciles advisor conflicts.
17. [ROADMAP.md](docs/roadmap/ROADMAP.md) — understand N0–N9 capability order.
18. [PROTOTYPE_ROADMAP.md](docs/prototypes/PROTOTYPE_ROADMAP.md) — understand
    prototype validation stages separate from production roadmap stages.
19. [RESOURCE_BRIEFING_CLI.md](docs/prototypes/RESOURCE_BRIEFING_CLI.md) —
    understand the next CLI prototype plan before implementation.
20. [CONTINUITY_ARCHITECTURE.md](docs/continuity/CONTINUITY_ARCHITECTURE.md) —
    understand how the AI Continuity Layer integrates with the Executive Office.
21. [WORKING_MEMORY.md](docs/continuity/WORKING_MEMORY.md) — understand active
    agent working state, its data model, lifecycle, and preservation rules.
22. [HANDOFF_PROTOCOL.md](docs/continuity/HANDOFF_PROTOCOL.md) — understand the
    governed AI-to-AI task handoff, Handoff Package format, and records.
23. [PREDICTIVE_HANDOFF.md](docs/continuity/PREDICTIVE_HANDOFF.md) — understand
    how the system anticipates agent limits and initiates handoffs proactively.
24. [RESUME_WORKFLOW.md](docs/continuity/RESUME_WORKFLOW.md) — understand the
    incoming agent’s required steps to safely resume a handed-off task.
25. [PROVIDERS.md](docs/providers/PROVIDERS.md) — understand Provider Registry
    kinds and authority.
26. [PROVIDER_ABSTRACTION.md](docs/providers/PROVIDER_ABSTRACTION.md) —
    understand adapters, discovery, health, and versioning.
27. [MODEL_CATALOG.md](docs/providers/MODEL_CATALOG.md) — understand model and
    capability hierarchy.
28. [CAPABILITY_MATRIX.md](docs/providers/CAPABILITY_MATRIX.md) — inspect the
    sourced provider baseline.
29. [PROVIDER_SELECTION_GUIDE.md](docs/providers/PROVIDER_SELECTION_GUIDE.md) —
    understand initial task-fit guidance.
30. [RESOURCE_MANAGER.md](docs/architecture/RESOURCE_MANAGER.md) — understand
    the primary Resource Layer authority and relationships.
31. [RESOURCE_MANAGER_MVP.md](docs/product/RESOURCE_MANAGER_MVP.md) — understand
    the manual read-only resource boundary.
32. [RESOURCE_DATA_MODEL.md](docs/architecture/RESOURCE_DATA_MODEL.md) —
    understand conceptual resource identities, observations, snapshots, and
    events.
33. [RESOURCE_STATE_MODEL.md](docs/architecture/RESOURCE_STATE_MODEL.md) —
    understand normalized resource states and transitions.
34. [CONTEXT_CONTINUITY.md](docs/architecture/CONTEXT_CONTINUITY.md) — understand
    context ownership, preservation, portability, and rebuild decisions.
35. [COST_AND_BUDGET.md](docs/architecture/COST_AND_BUDGET.md) — understand
    direct cost, opportunity cost, budget policy, and routing constraints.
36. [QUOTA_MANAGER_MVP.md](docs/product/QUOTA_MANAGER_MVP.md) — understand the
    legacy manual quota boundary now contained by Resource Manager MVP.
37. [QUOTA_MANAGER.md](docs/research/QUOTA_MANAGER.md) — understand quota source
    types, constraints, and research.
38. [QUOTA_MANAGER_SPEC.md](docs/architecture/QUOTA_MANAGER_SPEC.md) — understand
    the quota sub-capability, fallback, and observability.
39. [QUOTA_DATA_MODEL.md](docs/architecture/QUOTA_DATA_MODEL.md) — understand
    conceptual quota entities.
40. [QUOTA_STATE_MACHINE.md](docs/architecture/QUOTA_STATE_MACHINE.md) —
    understand quota-state transitions.
41. [COMPONENTS.md](docs/architecture/COMPONENTS.md) — inspect the component map.
42. [COMPONENT_CONTRACTS.md](docs/architecture/COMPONENT_CONTRACTS.md) —
    understand component ownership and failure contracts.
43. [SYSTEM_BOUNDARIES.md](docs/architecture/SYSTEM_BOUNDARIES.md) — distinguish
    manager scope from external systems.
44. [DATA_FLOW.md](docs/architecture/DATA_FLOW.md) — inspect conceptual data
    movement.
45. [GLOSSARY.md](docs/architecture/GLOSSARY.md) — use normative terms.
46. Research documents — inspect open questions for remaining modules.
47. Decision records — understand accepted, superseded, or rejected decisions.
48. [CONTRIBUTING.md](CONTRIBUTING.md) — follow collaboration and review rules.
49. [CHANGELOG.md](CHANGELOG.md) — review notable changes.
50. [CODING_AGENT_TASK_PROTOCOL.md](docs/architecture/CODING_AGENT_TASK_PROTOCOL.md) —
    understand the Planning Agent ↔ Coding Agent ticket lifecycle, state
    machine, and human-approval boundary; distinct from
    [HANDOFF_PROTOCOL.md](docs/continuity/HANDOFF_PROTOCOL.md).
51. [ENGINEERING_TICKET_TEMPLATE.md](docs/templates/ENGINEERING_TICKET_TEMPLATE.md)
    and
    [COMPLETION_REPORT_TEMPLATE.md](docs/templates/COMPLETION_REPORT_TEMPLATE.md)
    — use the fixed ticket and report formats when dispatching work to a
    Coding Agent.

## Role-Based Reading Paths

Use [READING_PATHS.md](docs/knowledge/READING_PATHS.md) when the task has a
specific role. It currently defines paths for:

- Product planner
- Architect
- AI Agent implementer
- Maintainer
- Contributor
- New user
- Resource Manager implementer
- Decision Engine implementer
- Dashboard designer

These paths are shortcuts, not replacements for source-of-truth authority. If a
task changes product, architecture, resource, provider, decision, roadmap, or
contribution behavior, the relevant source-of-truth document must still be read.

## Source-of-Truth Lookup

Use [SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md) to identify the
authority for:

- Product positioning
- Principles
- Architecture layers
- Component contracts
- Resource Manager
- Context Continuity
- Cost / Budget
- Provider Registry
- Decision Governance
- Roadmap
- Contribution rules
- ADRs

## Document Directory

### Repository-Level Documents

| Document | Purpose |
| --- | --- |
| [START_HERE.md](START_HERE.md) | First entry point for humans and AI agents. |
| [README.md](README.md) | Introduces the AI Executive Office and development philosophy. |
| [PROJECT_MAP.md](PROJECT_MAP.md) | Defines the repository navigation contract and document authority. |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Defines human and AI-agent contribution rules. |
| [CHANGELOG.md](CHANGELOG.md) | Records notable repository changes. |

### Knowledge Navigation

| Document | Purpose |
| --- | --- |
| [KNOWLEDGE_NAVIGATION.md](docs/knowledge/KNOWLEDGE_NAVIGATION.md) | Explains repository-as-knowledge-base structure and document layers. |
| [AI_AGENT_ONBOARDING.md](docs/knowledge/AI_AGENT_ONBOARDING.md) | Defines required handoff, validation, and prohibited actions for AI agents. |
| [READING_PATHS.md](docs/knowledge/READING_PATHS.md) | Provides role-based reading paths for common contributors and implementers. |
| [SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md) | Maps topics to authoritative documents and conflict rules. |

### Prototypes

| Document | Purpose |
| --- | --- |
| [RESOURCE_BRIEFING_CLI.md](docs/prototypes/RESOURCE_BRIEFING_CLI.md) | Defines the first CLI prototype plan for Observe → Think → Advise → Remind. |
| [PROTOTYPE_ROADMAP.md](docs/prototypes/PROTOTYPE_ROADMAP.md) | Defines prototype validation stages separate from the production roadmap. |

### AI Continuity Layer

| Document | Purpose |
| --- | --- |
| [CONTINUITY_ARCHITECTURE.md](docs/continuity/CONTINUITY_ARCHITECTURE.md) | Defines the AI Continuity Layer, its components, and integration with the Executive Office. |
| [WORKING_MEMORY.md](docs/continuity/WORKING_MEMORY.md) | Defines active agent working state, data model, lifecycle, and preservation rules. |
| [HANDOFF_PROTOCOL.md](docs/continuity/HANDOFF_PROTOCOL.md) | Defines governed AI-to-AI task handoff, Handoff Package format, and records. |
| [PREDICTIVE_HANDOFF.md](docs/continuity/PREDICTIVE_HANDOFF.md) | Defines how the system anticipates agent limits and initiates handoffs proactively. |
| [RESUME_WORKFLOW.md](docs/continuity/RESUME_WORKFLOW.md) | Defines the incoming agent’s required steps to safely resume a handed-off task. |

### Product

| Document | Purpose |
| --- | --- |
| [AI_EXECUTIVE_OFFICE.md](docs/product/AI_EXECUTIVE_OFFICE.md) | Defines repositioning, AI Chief of Staff, resource orchestration, and continuous productivity. |
| [PRODUCT.md](docs/product/PRODUCT.md) | Defines users, problems, MVP, resources, and boundaries. |
| [PRINCIPLES.md](docs/product/PRINCIPLES.md) | Defines durable product principles. |
| [VISION.md](docs/product/VISION.md) | Defines time horizons and long-term positioning. |
| [QUOTA_MANAGER_MVP.md](docs/product/QUOTA_MANAGER_MVP.md) | Defines the manual quota-dashboard boundary. |
| [RESOURCE_MANAGER_MVP.md](docs/product/RESOURCE_MANAGER_MVP.md) | Defines the manual read-only Resource Dashboard boundary. |

### Strategy and Governance Architecture

| Document | Purpose |
| --- | --- |
| [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) | Defines Presentation, Strategy, Decision, Resource, Knowledge, Execution, and External layers. |
| [STRATEGY_COUNCIL.md](docs/architecture/STRATEGY_COUNCIL.md) | Defines advisor coordination and recommendation contracts. |
| [ADVISOR_MODEL.md](docs/architecture/ADVISOR_MODEL.md) | Defines advisor roles, lenses, metrics, failures, and examples. |
| [DECISION_GOVERNANCE.md](docs/architecture/DECISION_GOVERNANCE.md) | Defines goal alignment, records, weights, overrides, and human authority. |
| [CONFLICT_RESOLUTION.md](docs/architecture/CONFLICT_RESOLUTION.md) | Defines conflict-resolution method and examples. |
| [COMPONENT_CONTRACTS.md](docs/architecture/COMPONENT_CONTRACTS.md) | Defines AI Executive Office component contracts. |
| [COMPONENTS.md](docs/architecture/COMPONENTS.md) | Summarizes component responsibilities. |
| [SYSTEM_BOUNDARIES.md](docs/architecture/SYSTEM_BOUNDARIES.md) | Separates manager and external-system ownership. |
| [DATA_FLOW.md](docs/architecture/DATA_FLOW.md) | Describes conceptual information flows. |
| [GLOSSARY.md](docs/architecture/GLOSSARY.md) | Defines normative architecture terminology. |

### Resource Architecture

| Document | Purpose |
| --- | --- |
| [RESOURCE_MANAGER.md](docs/architecture/RESOURCE_MANAGER.md) | Defines the primary Resource Layer component, managed resources, and relationships. |
| [RESOURCE_DATA_MODEL.md](docs/architecture/RESOURCE_DATA_MODEL.md) | Defines conceptual resource entities, snapshots, and events. |
| [RESOURCE_STATE_MODEL.md](docs/architecture/RESOURCE_STATE_MODEL.md) | Defines normalized resource states and event-driven transitions. |
| [CONTEXT_CONTINUITY.md](docs/architecture/CONTEXT_CONTINUITY.md) | Defines context continuity as a first-class resource. |
| [COST_AND_BUDGET.md](docs/architecture/COST_AND_BUDGET.md) | Defines direct, opportunity, waiting, and rebuild cost policy. |
| [QUOTA_MANAGER_SPEC.md](docs/architecture/QUOTA_MANAGER_SPEC.md) | Defines the quota sub-capability behavior and fallback. |
| [QUOTA_DATA_MODEL.md](docs/architecture/QUOTA_DATA_MODEL.md) | Defines conceptual quota entities and relationships. |
| [QUOTA_STATE_MACHINE.md](docs/architecture/QUOTA_STATE_MACHINE.md) | Defines quota status transitions. |

### Providers

| Document | Purpose |
| --- | --- |
| [PROVIDERS.md](docs/providers/PROVIDERS.md) | Defines Provider Registry entries and consumers. |
| [PROVIDER_ABSTRACTION.md](docs/providers/PROVIDER_ABSTRACTION.md) | Defines provider interfaces and adapters. |
| [MODEL_CATALOG.md](docs/providers/MODEL_CATALOG.md) | Defines model hierarchy and capabilities. |
| [CAPABILITY_MATRIX.md](docs/providers/CAPABILITY_MATRIX.md) | Records sourced provider capability facts. |
| [PROVIDER_SELECTION_GUIDE.md](docs/providers/PROVIDER_SELECTION_GUIDE.md) | Defines initial selection guidance. |

### Roadmap and Research

| Document | Purpose |
| --- | --- |
| [ROADMAP.md](docs/roadmap/ROADMAP.md) | Organizes N0–N9 delivery stages. |
| [QUOTA_MANAGER.md](docs/research/QUOTA_MANAGER.md) | Defines quota research and constraints. |
| [MODEL_ROUTER.md](docs/research/MODEL_ROUTER.md) | Captures model-routing research as an AI Router subtopic. |
| [PROMPT_BUILDER.md](docs/research/PROMPT_BUILDER.md) | Captures prompt composition research. |

### Coding Agent Task Protocol

| Document | Purpose |
| --- | --- |
| [CODING_AGENT_TASK_PROTOCOL.md](docs/architecture/CODING_AGENT_TASK_PROTOCOL.md) | Defines the Planning Agent ↔ Coding Agent ticket lifecycle, state machine, and human-approval boundary; distinct from the AI Continuity Layer's Handoff Protocol. |
| [ENGINEERING_TICKET_TEMPLATE.md](docs/templates/ENGINEERING_TICKET_TEMPLATE.md) | Fixed, agent-neutral engineering ticket format. |
| [COMPLETION_REPORT_TEMPLATE.md](docs/templates/COMPLETION_REPORT_TEMPLATE.md) | Fixed, agent-neutral completion report format. |

### Decisions

| Document | Purpose |
| --- | --- |
| [ADR-0001](docs/decisions/ADR-0001-documentation-first.md) | Establishes documentation as the single source of truth. |

## Document Relationships

START_HERE provides initial orientation. PROJECT_MAP defines navigation.
Knowledge Navigation explains the repository as a knowledge base. Source of
Truth identifies authority when documents overlap.

AI Executive Office defines product identity. Product and Principles define what
must remain true. Strategy Council supplies specialized advice. Decision
Governance turns advice, resources, and knowledge into a proposed plan.
Resource Manager composes Provider Registry and Model Catalog references with
quota, credits, rate limits, cost, health, tools, context continuity, and local
compute. Quota Manager remains authoritative only for quota-specific
normalization beneath Resource Manager. Scheduler and Execution carry out
approved work. ADRs record accepted cross-cutting decisions.

When documents conflict, the most recently accepted ADR governs, and affected
documents must be updated in the same change. Implementation is never an
authoritative substitute for missing documentation.

## Keeping the Map Current

Every pull request that adds, removes, renames, or changes the authority of a
document must update this map and, when topic authority changes,
[SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md).

Every AI-agent handoff must preserve enough context for the next agent to
resume from repository documents rather than hidden conversation history.
