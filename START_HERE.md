# Start Here

This is the first entry point for humans and AI agents working on ai-manager.

ai-manager is a documentation-first project. Before implementation begins, the
repository must explain what the product is, what it is not, how the system is
organized, and which documents are authoritative.

## What This Project Is

ai-manager is an **AI Executive Office** and emerging **AI Operating System** for
AI-assisted software development.

It is not another chat application. It is the management layer around AI work:
strategy, resources, knowledge, decision governance, scheduling, routing,
execution, observability, and human control.

The first operational user is an AI agent that must understand the repository
and continue work safely. The first human user is the developer who defines
intent, reviews decisions, and remains in control.

## Current Positioning

ai-manager is currently positioned as:

- **AI Executive Office** — coordinates advisors, resources, decisions, and
  execution.
- **AI Operating System** — preserves project knowledge, resource state, and
  workflow continuity across AI tools.
- **AI Development Control Plane** — makes AI work observable, explainable, and
  governed.

## 30-Second Version

ai-manager helps developers manage AI-assisted software work without losing
control of context, cost, quota, provider choice, decision history, or execution
state.

Its core idea is:

> Documentation is the Product Specification.

The repository is the knowledge base. Documents define product behavior,
architecture contracts, resource models, provider capabilities, decision
governance, and roadmap order before implementation begins.

## 5-Minute Reading Path

1. [README.md](README.md) — project introduction and philosophy.
2. [PROJECT_MAP.md](PROJECT_MAP.md) — repository navigation contract.
3. [PRODUCT.md](docs/product/PRODUCT.md) — product definition and boundaries.
4. [PRINCIPLES.md](docs/product/PRINCIPLES.md) — durable product principles.
5. [AI_EXECUTIVE_OFFICE.md](docs/product/AI_EXECUTIVE_OFFICE.md) — current
   product positioning.
6. [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) — architecture
   layers and authority flow.
7. [ROADMAP.md](docs/roadmap/ROADMAP.md) — capability sequence.

## Read by Purpose

### I Want to Understand the Product

Start with:

- [README.md](README.md)
- [PRODUCT.md](docs/product/PRODUCT.md)
- [AI_EXECUTIVE_OFFICE.md](docs/product/AI_EXECUTIVE_OFFICE.md)
- [PRINCIPLES.md](docs/product/PRINCIPLES.md)
- [VISION.md](docs/product/VISION.md)

### I Want to Understand the Architecture

Start with:

- [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md)
- [COMPONENT_CONTRACTS.md](docs/architecture/COMPONENT_CONTRACTS.md)
- [SYSTEM_BOUNDARIES.md](docs/architecture/SYSTEM_BOUNDARIES.md)
- [DATA_FLOW.md](docs/architecture/DATA_FLOW.md)
- [GLOSSARY.md](docs/architecture/GLOSSARY.md)

### I Want to Understand Resource Manager

Start with:

- [RESOURCE_MANAGER.md](docs/architecture/RESOURCE_MANAGER.md)
- [RESOURCE_MANAGER_MVP.md](docs/product/RESOURCE_MANAGER_MVP.md)
- [RESOURCE_DATA_MODEL.md](docs/architecture/RESOURCE_DATA_MODEL.md)
- [RESOURCE_STATE_MODEL.md](docs/architecture/RESOURCE_STATE_MODEL.md)
- [CONTEXT_CONTINUITY.md](docs/architecture/CONTEXT_CONTINUITY.md)
- [COST_AND_BUDGET.md](docs/architecture/COST_AND_BUDGET.md)

### I Want to Understand Decision / Strategy Council

Start with:

- [STRATEGY_COUNCIL.md](docs/architecture/STRATEGY_COUNCIL.md)
- [ADVISOR_MODEL.md](docs/architecture/ADVISOR_MODEL.md)
- [DECISION_GOVERNANCE.md](docs/architecture/DECISION_GOVERNANCE.md)
- [CONFLICT_RESOLUTION.md](docs/architecture/CONFLICT_RESOLUTION.md)

### I Want to Understand Provider Registry

Start with:

- [PROVIDERS.md](docs/providers/PROVIDERS.md)
- [PROVIDER_ABSTRACTION.md](docs/providers/PROVIDER_ABSTRACTION.md)
- [MODEL_CATALOG.md](docs/providers/MODEL_CATALOG.md)
- [CAPABILITY_MATRIX.md](docs/providers/CAPABILITY_MATRIX.md)
- [PROVIDER_SELECTION_GUIDE.md](docs/providers/PROVIDER_SELECTION_GUIDE.md)

### I Want to Start Developing

Start with:

- [PROJECT_MAP.md](PROJECT_MAP.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md)
- [ROADMAP.md](docs/roadmap/ROADMAP.md)

Then update the authoritative documentation before implementation.

### I Am a New AI Agent Taking Over Work

Read these first, in order:

1. [START_HERE.md](START_HERE.md)
2. [PROJECT_MAP.md](PROJECT_MAP.md)
3. [AI_AGENT_ONBOARDING.md](docs/knowledge/AI_AGENT_ONBOARDING.md)
4. [SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md)
5. The authoritative documents for the requested task.

Do not rely on prior conversation history as the source of truth. Use the
repository documents.

## What Not to Do Right Now

- Do not directly start writing UI.
- Do not add `package.json`.
- Do not add React, Node, Vite, or any framework.
- Do not skip documentation.
- Do not treat Router as the Decision Engine.
- Do not treat Quota Manager as the Resource Manager.
- Do not add speculative implementation details to documentation-only PRs.
- Do not merge without review approval.
