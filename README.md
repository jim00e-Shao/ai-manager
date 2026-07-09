# ai-manager

## Project Introduction

ai-manager is an **AI-native software engineering platform** for managing model
quotas, routing tasks, building prompts, and coordinating multi-agent
development workflows.

The project is currently in its foundation phase. Documentation defines the
product and architecture before implementation begins.

### The Problem

AI agents increasingly participate in software development, but the decisions
that govern their work are fragmented across provider dashboards, prompt files,
local conventions, and human memory. Teams lack one explicit system for
understanding available model capacity, selecting a model, constructing the
right context, coordinating agents, and reviewing why a decision was made.

ai-manager exists to make those decisions visible, repeatable, and governed by
versioned product and architecture specifications.

### What ai-manager Is — and Is Not

ai-manager is not another ChatGPT or a general-purpose chat interface. A chat
product focuses on a conversation between a person and a model. ai-manager
focuses on the engineering system around AI work: quota, routing, prompts,
workflow, coordination, and traceability.

Its first operational user is the AI agent that must understand a repository and
continue work safely. Its first human user is the individual developer who
defines intent, reviews decisions, and governs the system.

## Vision

ai-manager aims to become the specification-driven control plane for AI-native
software engineering. It will provide one coherent system for deciding which
model should handle a task, tracking available capacity, constructing reliable
prompts, coordinating agent work, and preserving enough context for the next
agent or human reviewer to continue with confidence.

See [VISION.md](docs/product/VISION.md) for the long-term direction.

## Product Principles

ai-manager is governed by explicit product principles covering human control,
observable AI actions, explainable routing, manager-owned context and memory,
quota-aware scheduling, and task-appropriate model selection.

Read the PR #2 product-definition set:

- [Product Definition](docs/product/PRODUCT.md)
- [Product Principles](docs/product/PRINCIPLES.md)
- [Vision](docs/product/VISION.md)
- [System Overview](docs/architecture/SYSTEM_OVERVIEW.md)
- [Roadmap](docs/roadmap/ROADMAP.md)

## Core Modules

- **Quota Manager** — tracks model usage, limits, and availability.
- **Model Router** — selects an appropriate model for each task.
- **Prompt Builder** — creates and manages reusable prompt structures.
- **Workflow Engine** — coordinates multi-agent work and review.

Module boundaries remain proposals until they are accepted in the architecture
and decision documents.

## Repository Structure

```text
.
├── docs/
│   ├── product/        # Product definition, principles, and vision
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

> **Documentation is the Product Specification.**

Documentation is not an explanation added after development. It is the source
of the product specification. Product design, architecture, and decisions are
first made explicit and aligned through documentation; implementation begins
only after that shared understanding is established.

Documents are written for both humans and AI agents. They must preserve enough
intent, constraints, relationships, and unresolved questions for an agent with
no prior conversation context to continue the work safely.

This principle defines ai-manager's development culture. The repository is
Documentation First:

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
