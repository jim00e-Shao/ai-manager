# ai-manager

Start here: [START_HERE.md](START_HERE.md).

ai-manager is maintained as a **Knowledge First** repository. The documentation
is not only a project description; it is the navigable knowledge base that human
contributors and AI agents use to understand product intent, architecture
authority, source-of-truth documents, and safe handoff paths.

## Project Introduction

ai-manager is an **AI Executive Office** and emerging **AI Operating System** for
AI-assisted software development. It helps developers continuously ship software
by coordinating AI advisors, AI resources, project knowledge, governed
decisions, scheduling, and execution workflows.

The project is currently in its foundation phase. Documentation defines the
product and architecture before implementation begins.

Its product personality is an **AI Chief of Staff**: advisors recommend,
Decision Engine reconciles tradeoffs, and the developer remains the final
decision maker.

### The Problem

AI agents increasingly participate in software development, but the decisions
that govern their work are fragmented across provider dashboards, prompt files,
local conventions, and human memory. Teams lack one explicit system for
understanding available model capacity, selecting a model, constructing the
right context, coordinating agents, and reviewing why a decision was made.

ai-manager exists to keep development moving by making strategy, resource,
knowledge, scheduling, and execution decisions visible, repeatable, and governed
by versioned product and architecture specifications.

### What ai-manager Is — and Is Not

ai-manager is not another ChatGPT or a general-purpose chat interface. A chat
product focuses on a conversation between a person and a model. ai-manager
focuses on the executive system around AI work: advisor coordination, resources,
knowledge continuity, decision governance, scheduling, routing, execution, and
traceability.

Its first operational user is the AI agent that must understand a repository and
continue work safely. Its first human user is the individual developer who
defines intent, reviews decisions, and governs the system.

## Vision

ai-manager aims to become the specification-driven AI Executive Office for solo
developers and small teams: one coherent system for sustaining progress across
changing goals, providers, quota, cost, context, tools, advisors, and workflows.

See [VISION.md](docs/product/VISION.md) for the long-term direction.

## Executive Office Architecture

- **Mission Control** — presents goals, advisors, resources, decisions,
  schedules, and execution state.
- **Strategy Council** — gathers Architecture, Resource, Knowledge, Cost, Risk,
  and Execution advice.
- **Decision Engine** — reconciles recommendations under governance and human
  authority.
- **Resource Manager** — coordinates quota, credits, reset time, cost,
  capabilities, context capacity, and tool availability.
- **AI Continuity Layer** — governs agent Working Memory, AI-to-AI Handoff
  Protocol, Predictive Handoff, and Resume Workflow.
- **Hermes** — preserves authoritative project knowledge and context continuity.
- **Scheduler and AI Router** — sequence approved work and select governed
  execution paths.
- **Coding Agent Task Protocol** — governs the Planning Agent ↔ Coding Agent
  engineering-ticket lifecycle, state machine, and human-approval boundary
  (distinct from the AI Continuity Layer's mid-task Handoff Protocol). See
  [CODING_AGENT_TASK_PROTOCOL.md](docs/architecture/CODING_AGENT_TASK_PROTOCOL.md).

Start with
[START_HERE.md](START_HERE.md), then
[AI_EXECUTIVE_OFFICE.md](docs/product/AI_EXECUTIVE_OFFICE.md), and then follow
[PROJECT_MAP.md](PROJECT_MAP.md).

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

Knowledge-navigation documents:

- [Knowledge Navigation](docs/knowledge/KNOWLEDGE_NAVIGATION.md)
- [AI Agent Onboarding](docs/knowledge/AI_AGENT_ONBOARDING.md)
- [Reading Paths](docs/knowledge/READING_PATHS.md)
- [Source of Truth](docs/knowledge/SOURCE_OF_TRUTH.md)

## Core Modules

- **Strategy Council** — produces specialized recommendations.
- **Decision Engine** — reconciles goals, policy, resources, cost, risk, and
  execution.
- **Resource Manager** — owns the AI resource operating picture.
- **AI Continuity Layer** — maintains agent Working Memory and governs AI-to-AI
  Handoff Protocol, Predictive Handoff, and Resume Workflow.
- **Knowledge Manager / Hermes** — preserves project knowledge and continuity.
- **Scheduler and AI Router** — coordinate approved work and execution paths.

Module boundaries remain proposals until they are accepted in the architecture
and decision documents.

## Repository Structure

```text
.
├── docs/
│   ├── continuity/     # AI Continuity Layer: Working Memory, Handoff, Resume
│   ├── product/        # Product definition, principles, and vision
│   ├── architecture/   # System boundaries and component design
│   ├── knowledge/      # Navigation, reading paths, and agent onboarding
│   ├── providers/      # Provider registry and capability facts
│   ├── prototypes/     # Prototype plans and validation roadmap
│   ├── roadmap/        # Delivery phases and priorities
│   ├── research/       # Module research and open questions
│   └── decisions/      # Architecture Decision Records (ADRs)
├── CHANGELOG.md        # Notable repository changes
├── CONTRIBUTING.md     # Contribution and AI-agent workflow
├── PROJECT_MAP.md      # Repository documentation entry point
└── README.md           # Project introduction
```

Start with [START_HERE.md](START_HERE.md) and
[PROJECT_MAP.md](PROJECT_MAP.md) to navigate the repository.

## Resource Briefing CLI Prototype

The first executable prototype validates the AI Executive Office closed loop:

```text
Observe → Think → Advise → Remind
```

**Requirements**: Node.js ≥ 18. No `npm install` needed — zero third-party
dependencies.

```sh
# Show current AI resource status
node bin/ai-manager.js status

# Daily resource briefing
node bin/ai-manager.js brief

# Recommend AI for a specific task
node bin/ai-manager.js recommend "我要修 React bug"
node bin/ai-manager.js recommend "review architecture design"

# Show active reminders
node bin/ai-manager.js reminders
```

The snapshot file is `data/resources.example.json`. Copy and edit it to reflect
your current AI resource state. Set `AI_MANAGER_SNAPSHOT` to point to a
different file.

See [RESOURCE_BRIEFING_CLI.md](docs/prototypes/RESOURCE_BRIEFING_CLI.md) for
the full prototype specification.

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
