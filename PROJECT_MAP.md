# Project Map

This file is the navigation contract for ai-manager. It identifies authoritative
context, document relationships, and the order humans and AI agents must use
before changing the repository.

**Every AI agent must read this file before planning or changing the
repository.**

## Repository Navigation

```text
README
  ↓
PROJECT_MAP
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

This path moves from product identity to strategy, governance, execution
sequence, external capability facts, resource details, and accepted decisions.
Every affected authoritative document must be identified before work begins.

## Required Reading Order

1. [README.md](README.md) — understand the project at a glance.
2. [PROJECT_MAP.md](PROJECT_MAP.md) — locate authoritative context.
3. [AI_EXECUTIVE_OFFICE.md](docs/product/AI_EXECUTIVE_OFFICE.md) — understand the
   AI Executive Office, AI Chief of Staff, and AI Operating System positioning.
4. [PRODUCT.md](docs/product/PRODUCT.md) — understand users, problems, MVP, and
   product boundaries.
5. [PRINCIPLES.md](docs/product/PRINCIPLES.md) — understand durable product
   decision rules.
6. [VISION.md](docs/product/VISION.md) — understand the long-term direction.
7. [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) — understand the
   seven architecture layers and authority flow.
8. [STRATEGY_COUNCIL.md](docs/architecture/STRATEGY_COUNCIL.md) — understand how
   advisors produce recommendations.
9. [ADVISOR_MODEL.md](docs/architecture/ADVISOR_MODEL.md) — understand each
   advisor contract, lens, KPI, and failure mode.
10. [DECISION_GOVERNANCE.md](docs/architecture/DECISION_GOVERNANCE.md) —
    understand goal alignment, weights, overrides, and human authority.
11. [CONFLICT_RESOLUTION.md](docs/architecture/CONFLICT_RESOLUTION.md) —
    understand how Decision Engine reconciles advisor conflicts.
12. [ROADMAP.md](docs/roadmap/ROADMAP.md) — understand N0–N9 capability order.
13. [PROVIDERS.md](docs/providers/PROVIDERS.md) — understand Provider Registry
    kinds and authority.
14. [PROVIDER_ABSTRACTION.md](docs/providers/PROVIDER_ABSTRACTION.md) —
    understand adapters, discovery, health, and versioning.
15. [MODEL_CATALOG.md](docs/providers/MODEL_CATALOG.md) — understand model and
    capability hierarchy.
16. [CAPABILITY_MATRIX.md](docs/providers/CAPABILITY_MATRIX.md) — inspect the
    sourced provider baseline.
17. [PROVIDER_SELECTION_GUIDE.md](docs/providers/PROVIDER_SELECTION_GUIDE.md) —
    understand initial task-fit guidance.
18. [RESOURCE_MANAGER.md](docs/architecture/RESOURCE_MANAGER.md) — understand
    the primary Resource Layer authority and relationships.
19. [RESOURCE_MANAGER_MVP.md](docs/product/RESOURCE_MANAGER_MVP.md) — understand
    the manual read-only resource boundary.
20. [RESOURCE_DATA_MODEL.md](docs/architecture/RESOURCE_DATA_MODEL.md) —
    understand conceptual resource identities, observations, snapshots, and
    events.
21. [RESOURCE_STATE_MODEL.md](docs/architecture/RESOURCE_STATE_MODEL.md) —
    understand normalized resource states and transitions.
22. [CONTEXT_CONTINUITY.md](docs/architecture/CONTEXT_CONTINUITY.md) — understand
    context ownership, preservation, portability, and rebuild decisions.
23. [COST_AND_BUDGET.md](docs/architecture/COST_AND_BUDGET.md) — understand
    direct cost, opportunity cost, budget policy, and routing constraints.
24. [QUOTA_MANAGER_MVP.md](docs/product/QUOTA_MANAGER_MVP.md) — understand the
    legacy manual quota boundary now contained by Resource Manager MVP.
25. [QUOTA_MANAGER.md](docs/research/QUOTA_MANAGER.md) — understand quota source
    types, constraints, and research.
26. [QUOTA_MANAGER_SPEC.md](docs/architecture/QUOTA_MANAGER_SPEC.md) — understand
    the quota sub-capability, fallback, and observability.
27. [QUOTA_DATA_MODEL.md](docs/architecture/QUOTA_DATA_MODEL.md) — understand
    conceptual quota entities.
28. [QUOTA_STATE_MACHINE.md](docs/architecture/QUOTA_STATE_MACHINE.md) —
    understand quota-state transitions.
29. [COMPONENTS.md](docs/architecture/COMPONENTS.md) — inspect the component map.
30. [COMPONENT_CONTRACTS.md](docs/architecture/COMPONENT_CONTRACTS.md) —
    understand component ownership and failure contracts.
31. [SYSTEM_BOUNDARIES.md](docs/architecture/SYSTEM_BOUNDARIES.md) — distinguish
    manager scope from external systems.
32. [DATA_FLOW.md](docs/architecture/DATA_FLOW.md) — inspect conceptual data
    movement.
33. [GLOSSARY.md](docs/architecture/GLOSSARY.md) — use normative terms.
34. Research documents — inspect open questions for remaining modules.
35. Decision records — understand accepted, superseded, or rejected decisions.
36. [CONTRIBUTING.md](CONTRIBUTING.md) — follow collaboration and review rules.
37. [CHANGELOG.md](CHANGELOG.md) — review notable changes.

## Document Directory

### Repository-Level Documents

| Document | Purpose |
| --- | --- |
| [README.md](README.md) | Introduces the AI Executive Office and development philosophy. |
| [PROJECT_MAP.md](PROJECT_MAP.md) | Defines repository navigation and document authority. |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Defines human and AI-agent contribution rules. |
| [CHANGELOG.md](CHANGELOG.md) | Records notable repository changes. |

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

### Decisions

| Document | Purpose |
| --- | --- |
| [ADR-0001](docs/decisions/ADR-0001-documentation-first.md) | Establishes documentation as the single source of truth. |

## Document Relationships

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
document must update this map.
