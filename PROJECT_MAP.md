# Project Map

This file is the navigation contract for the ai-manager repository, not merely
an index. It tells humans and AI agents where authoritative context lives, how
documents depend on one another, and what must be read before work begins.

**Every AI agent must read this file before planning or changing the
repository.**

## Repository Navigation

```text
PROJECT_MAP (start here)
        ↓
README
        ↓
PRODUCT
        ↓
VISION
        ↓
SYSTEM OVERVIEW → COMPONENTS
        ↓
ROADMAP
        ↓
RESEARCH
        ↓
ADRs
        ↓
CONTRIBUTING
```

This path moves from orientation, through product intent and architecture, to
delivery sequence, supporting evidence, accepted decisions, and contribution
rules. A task may require only part of the path after initial orientation, but
the agent must identify and read every authoritative document affected by its
work.

## Recommended Reading Order

1. [README.md](README.md) — understand the project at a glance.
2. [PRODUCT.md](docs/product/PRODUCT.md) — understand users, problems, and scope.
3. [VISION.md](docs/product/VISION.md) — understand the intended future.
4. [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) — understand the
   system boundary and major flows.
5. [COMPONENTS.md](docs/architecture/COMPONENTS.md) — understand proposed module
   responsibilities.
6. [ROADMAP.md](docs/roadmap/ROADMAP.md) — understand delivery phases.
7. Research documents — inspect assumptions and open questions for each core
   module.
8. Decision records — understand accepted, superseded, or rejected decisions.
9. [CONTRIBUTING.md](CONTRIBUTING.md) — follow the collaboration workflow before
   changing the repository.
10. [CHANGELOG.md](CHANGELOG.md) — review notable changes over time.

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
| [VISION.md](docs/product/VISION.md) | Describes the long-term direction and guiding principles. |

### Architecture

| Document | Purpose |
| --- | --- |
| [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) | Defines system context, boundaries, flows, and constraints. |
| [COMPONENTS.md](docs/architecture/COMPONENTS.md) | Defines component responsibilities, interfaces, and ownership. |

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

The README provides orientation. The product definition establishes the problem,
users, scope, and outcomes. The vision describes the future that product work
serves. Architecture defines system boundaries and component responsibilities.
The roadmap sequences accepted work. Research supplies evidence and alternatives.
ADRs record accepted decisions. Contributing rules govern how changes move from
specification to implementation. The changelog records what actually changed.

When documents conflict, the most recently accepted ADR governs the decision,
and affected product, architecture, research, or roadmap documents must be
updated in the same change.

Implementation is never an authoritative substitute for missing documentation.
If the required specification cannot be found through this map, the first task
is to create or update that specification.

## Keeping the Map Current

Every pull request that adds, removes, or renames a document must update this
map. Links and document purposes must remain accurate.
