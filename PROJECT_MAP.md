# Project Map

This file is the navigation contract for the ai-manager repository, not merely
an index. It tells humans and AI agents where authoritative context lives, how
documents depend on one another, and what must be read before work begins.

**Every AI agent must read this file before planning or changing the
repository.**

## Repository Navigation

```text
README
        ↓
PROJECT_MAP
        ↓
PRODUCT
        ↓
PRINCIPLES
        ↓
VISION
        ↓
SYSTEM OVERVIEW
        ↓
COMPONENTS → COMPONENT CONTRACTS
        ↓
SYSTEM BOUNDARIES → DATA FLOW → GLOSSARY
        ↓
ROADMAP
        ↓
RESEARCH
        ↓
ADRs
        ↓
CONTRIBUTING
```

README provides initial orientation, but PROJECT_MAP is the required navigation
step before deeper repository work. The path then moves through product
definition, decision principles, long-term direction, architecture, delivery
sequence, supporting evidence, and accepted decisions. A task may require only
part of the path after initial orientation, but the agent must identify and read
every authoritative document affected by its work.

## Recommended Reading Order

1. [README.md](README.md) — understand the project at a glance.
2. [PROJECT_MAP.md](PROJECT_MAP.md) — identify authoritative context and the
   required navigation path.
3. [PRODUCT.md](docs/product/PRODUCT.md) — understand users, problems, MVP, and
   boundaries.
4. [PRINCIPLES.md](docs/product/PRINCIPLES.md) — understand the rules used to
   evaluate product tradeoffs.
5. [VISION.md](docs/product/VISION.md) — understand the intended future.
6. [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) — understand the
   architecture layers, system boundary, and major flow.
7. [COMPONENTS.md](docs/architecture/COMPONENTS.md) — understand proposed module
   responsibilities.
8. [COMPONENT_CONTRACTS.md](docs/architecture/COMPONENT_CONTRACTS.md) — understand
   component inputs, outputs, state, dependencies, failures, and extension
   boundaries.
9. [SYSTEM_BOUNDARIES.md](docs/architecture/SYSTEM_BOUNDARIES.md) — distinguish
   manager ownership from Provider, IDE, Git, and MCP ownership.
10. [DATA_FLOW.md](docs/architecture/DATA_FLOW.md) — follow conceptual data
    movement through the system.
11. [GLOSSARY.md](docs/architecture/GLOSSARY.md) — use normative architecture
    terminology.
12. [ROADMAP.md](docs/roadmap/ROADMAP.md) — understand N0–N7 delivery stages.
13. Research documents — inspect assumptions and open questions for each core
   module.
14. Decision records — understand accepted, superseded, or rejected decisions.
15. [CONTRIBUTING.md](CONTRIBUTING.md) — follow the collaboration workflow before
   changing the repository.
16. [CHANGELOG.md](CHANGELOG.md) — review notable changes over time.

## Document Directory

### Repository-Level Documents

| Document | Purpose |
| --- | --- |
| [README.md](README.md) | Introduces the project, vision, modules, structure, philosophy, and roadmap. |
| [PROJECT_MAP.md](PROJECT_MAP.md) | Defines repository navigation, document authority, and required reading order. |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Defines contribution rules for humans and AI agents. |
| [CHANGELOG.md](CHANGELOG.md) | Records notable repository changes by release or phase. |

### Product

| Document | Purpose |
| --- | --- |
| [PRODUCT.md](docs/product/PRODUCT.md) | Defines target users, problems, outcomes, scope, and success measures. |
| [PRINCIPLES.md](docs/product/PRINCIPLES.md) | Defines durable principles for product behavior and tradeoffs. |
| [VISION.md](docs/product/VISION.md) | Describes the long-term direction and guiding principles. |

### Architecture

| Document | Purpose |
| --- | --- |
| [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) | Defines system context, boundaries, flows, and constraints. |
| [COMPONENTS.md](docs/architecture/COMPONENTS.md) | Defines component responsibilities, interfaces, and ownership. |
| [COMPONENT_CONTRACTS.md](docs/architecture/COMPONENT_CONTRACTS.md) | Defines conceptual contracts for manager-owned components. |
| [SYSTEM_BOUNDARIES.md](docs/architecture/SYSTEM_BOUNDARIES.md) | Separates ai-manager scope from Provider, IDE, Git, and MCP scope. |
| [DATA_FLOW.md](docs/architecture/DATA_FLOW.md) | Describes conceptual user, decision, provider, response, and memory flows. |
| [GLOSSARY.md](docs/architecture/GLOSSARY.md) | Defines normative product and architecture terminology. |

### Roadmap

| Document | Purpose |
| --- | --- |
| [ROADMAP.md](docs/roadmap/ROADMAP.md) | Organizes delivery into documented phases and milestones. |

### Research

| Document | Purpose |
| --- | --- |
| [QUOTA_MANAGER.md](docs/research/QUOTA_MANAGER.md) | Captures quota-management requirements, options, and open questions. |
| [MODEL_ROUTER.md](docs/research/MODEL_ROUTER.md) | Captures routing inputs, policies, options, and open questions. |
| [PROMPT_BUILDER.md](docs/research/PROMPT_BUILDER.md) | Captures prompt composition, versioning, and evaluation questions. |

### Decisions

| Document | Purpose |
| --- | --- |
| [ADR-0001](docs/decisions/ADR-0001-documentation-first.md) | Establishes documentation as the single source of truth. |

## Document Relationships

The README provides orientation, and PROJECT_MAP locates the authoritative next
document. The product definition establishes the problem, users, MVP, and
boundaries. Product principles govern tradeoffs. The vision describes the future
that product work serves. Architecture defines layers, component contracts,
system boundaries, data flows, and normative language. The roadmap sequences
accepted work. Research supplies evidence and alternatives. ADRs record accepted
decisions. Contributing rules govern how changes move from specification to
implementation. The changelog records what actually changed.

When documents conflict, the most recently accepted ADR governs the decision,
and affected product, architecture, research, or roadmap documents must be
updated in the same change.

Implementation is never an authoritative substitute for missing documentation.
If the required specification cannot be found through this map, the first task
is to create or update that specification.

## Keeping the Map Current

Every pull request that adds, removes, or renames a document must update this
map. Links and document purposes must remain accurate.
