# ai-manager

## Project Introduction

ai-manager is an AI orchestration project for managing model quotas, routing tasks,
building prompts, and coordinating multi-agent development workflows.

The project is currently in its foundation phase. Documentation defines the
product and architecture before implementation begins.

## Vision

ai-manager aims to make AI operations understandable, controllable, and
repeatable. It will provide one coherent system for deciding which model should
handle a task, tracking available capacity, constructing reliable prompts, and
coordinating agent work.

See [VISION.md](docs/product/VISION.md) for the long-term direction.

## Core Modules

- **Quota Manager** — tracks model usage, limits, and availability.
- **Model Router** — selects an appropriate model for each task.
- **Prompt Builder** — creates and manages reusable prompt structures.
- **Agent Workflow Manager** — coordinates multi-agent work and review.

Module boundaries remain proposals until they are accepted in the architecture
and decision documents.

## Repository Structure

```text
.
├── docs/
│   ├── product/        # Product definition and vision
│   ├── architecture/   # System boundaries and component design
│   ├── roadmap/        # Delivery phases and priorities
│   ├── research/       # Module research and open questions
│   └── decisions/      # Architecture Decision Records (ADRs)
├── CHANGELOG.md        # Notable repository changes
├── CONTRIBUTING.md     # Contribution and AI-agent workflow
├── PROJECT_MAP.md      # Repository documentation entry point
└── README.md           # Project introduction
```

Start with [PROJECT_MAP.md](PROJECT_MAP.md) to navigate the repository.

## Development Philosophy

ai-manager is Documentation First:

1. Define intent and constraints in documentation.
2. Review and accept the relevant design or decision.
3. Implement the smallest coherent change.
4. Submit a small pull request for review.
5. Merge only after review; never push directly to `main`.

Documentation is the project’s single source of truth. See
[ADR-0001](docs/decisions/ADR-0001-documentation-first.md) and
[CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap Overview

The initial roadmap progresses from documentation foundation, through validated
module design, to incremental implementation and operational readiness. No
implementation phase starts until its scope and acceptance criteria are
documented.

See [ROADMAP.md](docs/roadmap/ROADMAP.md) for phases and current status.
