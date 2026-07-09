# Product Definition

## Status

Draft product specification for the first product phase. Scope changes require
documentation review before implementation.

## What ai-manager Is

ai-manager is an **AI Executive Office**, an emerging **AI Operating System**,
and an **AI Resource Orchestration Platform** for AI-assisted software
development.

Its product personality is an **AI Chief of Staff**: it helps developers
continuously ship software by coordinating specialized advisors, available AI
resources, project knowledge, governed decisions, scheduling, and execution.

It coordinates the system around AI work:

- which goal and project priority should drive the next action;
- which advisors should analyze the decision;
- which AI resources are available and worth preserving;
- whether work should proceed, wait, be reassigned, or be split;
- which provider and model should handle an approved execution step and why;
- which context and prompt should be supplied;
- which workflow and review gates should govern execution;
- which tools an AI may use;
- which actions, decisions, and outcomes must remain observable;
- which knowledge should persist across models and sessions.

ai-manager does not initially perform all of these functions. The roadmap
introduces them in independently useful stages. The product definition describes
the coherent system those stages are intended to become.

The canonical positioning is:

> AI Manager is an AI Executive Office that helps developers continuously ship
> software by coordinating AI advisors, AI resources, project knowledge, and
> execution workflows.

## What ai-manager Is Not

ai-manager is not:

- another ChatGPT or a general-purpose conversational assistant;
- a new foundation model or model-training platform;
- an IDE replacement;
- a coding agent that owns product decisions;
- an autonomous executive that replaces developer judgment;
- a provider-specific dashboard;
- a thin prompt library;
- a hidden autonomous system that acts without inspectable policy or review;
- an all-purpose project-management or CI/CD product.

It may integrate with chat interfaces, editors, coding agents, providers, and
developer tools, but it owns the coordination and governance layer rather than
replacing those products.

## AI Resources

AI Manager manages AI resources, not only AI agents.

AI resources include quota, credits, reset and cooldown time, monetary cost,
provider and model capability, provider and adapter health, context held by an
advisor or session, context-window capacity, project knowledge, CLI/API/browser/
MCP tools, workflow state, scheduler commitments, and human approval
availability.

Resource Manager turns these facts into a current operating picture. Decision
Engine combines that picture with advisor recommendations and governance.

## Primary Users

### Primary Operational User: AI Agents

AI agents are first-class consumers of repository context, policies, routing
decisions, workflows, and durable memory. Product information must therefore be
structured so that an agent with no prior conversation can resume work safely.

AI agents operate through the system, but they do not own it. They cannot become
the authority for product intent, policy, permissions, or durable memory.

### Primary Human User: Individual Developers Using Multiple AI Systems

The first human user is an individual developer who works across multiple
models, agents, tools, and quota limits. This user needs a local, understandable
way to coordinate AI work without adopting enterprise infrastructure.

### Later Users

Small engineering teams and maintainers may later share policies, capacity,
workflows, and project memory. Enterprise administration is not an MVP target.

## Core Problems

### Fragmented Capacity

Developers use multiple providers and plans, but quota and availability are
scattered across dashboards and reset windows. Work is assigned without a
coherent view of usable capacity.

### Unexplained Model Selection

Tasks are often routed by habit, defaults, or model popularity. The choice is
rarely recorded with the constraints that justified it.

### Disconnected Advice

Architecture, resource, knowledge, cost, risk, and execution concerns are often
collapsed into one prompt. Conflicts remain hidden instead of becoming an
explainable decision.

### Interrupted Productivity

Work stops when one provider is exhausted, context is lost, or an approval is
pending, even when other useful work could proceed. The product must coordinate
waiting, reassignment, task splitting, and context preservation.

### Context Loss

Important product intent, architecture decisions, repository history, and prior
results remain trapped in conversations or individual model sessions. The next
agent starts without the context needed to continue safely.

### Prompt and Workflow Drift

Prompts, agent roles, tool permissions, and review steps evolve independently.
There is no shared specification connecting them to intended product behavior.

### Invisible AI Work

AI actions can be difficult to inspect after execution. Developers need to see
what happened, which inputs were used, and where human approval was required.

## Phase-One MVP

The first MVP remains a **local, read-oriented Mission Control for AI resource
visibility and explainable recommendations** for an individual developer.

It must enable the user to:

1. define the models and quota sources they use without assuming one provider;
2. view normalized quota availability and reset information;
3. describe a task using a small, documented set of requirements;
4. receive an explainable recommendation based on goals, eligibility, quota,
   policy, and task constraints;
5. inspect resource inputs, advisor or policy lenses, candidate execution paths,
   and the reason behind the recommendation;
6. preserve enough decision context for a later human or AI agent to understand
   what was recommended and why.

The MVP validates the core product loop:

```text
Available capacity + Task requirements + Policy
                        ↓
              Explainable recommendation
                        ↓
                Inspectable decision record
```

Resource Manager and its Quota Manager, Provider Registry, and Model Catalog
inputs are the primary MVP capabilities. Strategy Council, Decision Engine,
Hermes, Scheduler, AI Router, Provider Adapters, and MCP/Plugin System remain
roadmap stages unless a minimal read-only contract is required to preserve the
conceptual boundary.

## MVP Success Criteria

The MVP is successful when an individual developer can:

- understand current model capacity from one coherent view;
- request a recommendation without manually comparing provider dashboards;
- understand why an action, wait, reassignment, split, provider, or model was
  recommended;
- identify stale, missing, or uncertain input data;
- revisit a decision and recover its task constraints and routing explanation;
- use the system without surrendering routing policy or approval authority to a
  model provider.

Quantitative adoption and reliability targets will be defined after research
validates available quota data and the first supported workflows.

## Explicit Non-Goals

The first MVP will not:

- provide a general-purpose chat experience;
- execute coding tasks autonomously;
- orchestrate multi-agent workflows;
- build a complete prompt-management studio;
- provide long-term semantic memory;
- expose a public plugin marketplace;
- support every model provider;
- train, fine-tune, benchmark, or host models;
- replace IDEs, source control, CI/CD, or issue trackers;
- provide enterprise identity, billing, compliance, or organization management;
- optimize for unattended operation;
- make consequential changes without explicit human control.

These capabilities may be researched later, but none should enter the MVP
without an explicit product and roadmap update.

## Why ai-manager Is an Independent Product

Quota, routing, context, prompts, workflows, tools, and memory cut across every
application that uses AI. Embedding this responsibility inside one chat client,
IDE, coding agent, or provider dashboard would create several problems:

- policy and memory would become coupled to one interface or model;
- routing could not remain neutral across providers and tools;
- observations from one workflow would not help another;
- users would lose a stable control layer when models or applications change;
- each application would reimplement partial, inconsistent coordination.

ai-manager should therefore be independent and integration-oriented. Other
applications can request capacity, routing, context, workflow, or memory
services, while the manager retains durable policy, explanations, and control.

This separation is what allows the product to become an AI Development Control
Plane rather than another feature inside an AI-enabled application.

## Product Boundaries

ai-manager owns goal coordination, advisor recommendations, resource
orchestration, scheduling, durable product knowledge, decision governance,
explanations, and human-control boundaries. Providers own model execution and
provider-specific infrastructure. Integrated tools own their native editing,
source-control, deployment, or communication behavior.

Concrete interfaces and technology choices are deliberately undefined in this
product specification.

## Related Documents

- [AI Executive Office](AI_EXECUTIVE_OFFICE.md)
- [Product Principles](PRINCIPLES.md)
- [Vision](VISION.md)
- [System Overview](../architecture/SYSTEM_OVERVIEW.md)
- [Roadmap](../roadmap/ROADMAP.md)
