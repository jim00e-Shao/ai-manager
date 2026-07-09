# System Overview

## Status

Conceptual architecture. This document defines responsibilities and information
flow without selecting implementation technologies, protocols, frameworks,
storage systems, or deployment models.

## System Purpose

ai-manager coordinates AI-assisted software development without becoming the
model, developer tool, or execution environment itself. It owns the policies and
context needed to decide how AI work should proceed and preserves explanations
that make those decisions reviewable.

## Architecture Layers

The conceptual architecture is organized into five responsibility layers. These
layers describe authority and dependency direction, not required packages,
processes, services, or deployment units.

### Presentation

The Presentation layer exposes manager state and human controls.

Includes:

- Dashboard;
- future approved presentation clients.

Responsibilities:

- collect user goals, constraints, preferences, and approvals;
- present state, explanations, uncertainty, failures, and required action;
- provide pause, rejection, override, retry, and cancellation controls.

The Presentation layer does not own orchestration policy or call Providers
directly.

### Application

The Application layer provides the authoritative entry point for product use.

Includes:

- AI Manager.

Responsibilities:

- coordinate user intent and component decisions;
- enforce product policy and human-control boundaries;
- correlate tasks, decisions, actions, and outcomes;
- expose coherent application state to Presentation.

### Orchestration

The Orchestration layer makes and executes manager-owned decisions.

Includes:

- Quota Manager;
- Model Router;
- Prompt Builder;
- Workflow Engine;
- Context Manager;
- Memory Manager.

Responsibilities:

- evaluate capacity and routing;
- assemble prompt and context packages;
- govern workflow transitions and approvals;
- preserve durable manager-owned memory;
- return observable, explainable outcomes to AI Manager.

Each component remains limited by its
[component contract](COMPONENT_CONTRACTS.md).

### Integration

The Integration layer mediates external capabilities.

Includes:

- Plugin Manager;
- provider, IDE, Git, tool, and MCP adapters.

Responsibilities:

- translate manager-owned requests at external boundaries;
- enforce declared capabilities and permissions;
- preserve version, provenance, health, and errors;
- prevent external systems from bypassing manager policy.

### Providers

The Providers layer contains systems not owned by ai-manager.

Includes:

- AI model providers;
- IDEs and developer tools;
- Git and Git hosting services;
- MCP servers;
- other approved external tools and data sources.

Responsibilities remain with each external system. ai-manager integrates with
these systems but does not absorb their native product scope. See
[SYSTEM_BOUNDARIES.md](SYSTEM_BOUNDARIES.md).

## Conceptual Architecture

```text
User
  ↓
Dashboard
  ↓
AI Manager
  ↓
Model Router
  ↕
Quota Manager
  ↓ eligibility and route decision
Prompt Builder
  ↓
Workflow Engine
  ↓
Plugin Manager
  ↓
AI Provider / IDE / Git / MCP / AI Tool
  ↓
Context Manager ↔ Memory Manager
```

This sequence describes the primary planning and execution path, not a required
runtime topology. Information may flow back to earlier components for
explanation, review, or replanning. All stages report observable state to the AI
Manager.

## End-to-End Flow

1. The **User** provides a goal, constraints, and any required approval boundary.
2. **Dashboard** validates user input and presents manager state and controls.
3. **AI Manager** establishes the task context and coordinates the decision
   sequence.
4. **Model Router** evaluates task requirements and asks **Quota Manager** for
   eligible capacity, uncertainty, and scheduling constraints.
5. **Model Router** returns a selected model or no-route result with an
   explanation.
6. **Prompt Builder** assembles documented instructions and relevant context for
   the selected model.
7. **Workflow Engine** governs execution steps, state transitions, human review,
   retries, and completion.
8. **Plugin Manager** mediates approved external capabilities, including AI
   Providers, IDEs, Git, MCP servers, and other AI Tools.
9. **Context Manager** assembles relevant information, while **Memory Manager**
   governs durable records across sessions and models.
10. Results, actions, and explanations flow back through AI Manager and
    Dashboard so the User can inspect the outcome and retain useful context.

## Responsibility Boundaries

### User

The User defines intent and retains authority.

Responsibilities:

- state the desired outcome and relevant constraints;
- define or accept policies and approval boundaries;
- review consequential decisions and actions;
- pause, reject, or override work when necessary.

Boundary:

The User should not need to manually coordinate provider quota, compare every
model, or reconstruct execution history. The User does not delegate product
ownership to an AI model.

### AI Manager

AI Manager is the control plane and policy coordinator.

Responsibilities:

- receive goals and task constraints;
- assemble the authoritative task and project context;
- coordinate quota, routing, prompt, workflow, and tool capabilities;
- enforce human-control boundaries and documented policy;
- expose observable state and preserve decision records;
- maintain manager-owned context and memory across models and sessions.

Boundary:

AI Manager does not perform model inference, replace integrated developer tools,
or allow an individual model to own durable policy or memory.

### Quota Manager

Quota Manager treats provider capacity as a scheduling input.

Responsibilities:

- collect or accept quota, usage, availability, and reset information;
- normalize provider-specific capacity into explicit manager concepts;
- identify stale, missing, or uncertain data;
- evaluate reservations, priorities, and scheduling constraints;
- report which capacity is eligible for a task.

Boundary:

Quota Manager does not decide which eligible model is best for the task, compose
prompts, or execute work. It reports capacity facts and policy outcomes to the
Model Router and AI Manager.

### Model Router

Model Router makes explainable model-selection decisions.

Responsibilities:

- receive task requirements and eligible capacity;
- compare model capabilities and constraints;
- apply documented routing policy and fallbacks;
- select or recommend an eligible model;
- explain why candidates were selected, rejected, or deferred.

Boundary:

Model Router does not own raw quota collection, prompt content, workflow state,
or model execution. It cannot bypass user policy or conceal uncertainty.

### Prompt Builder

Prompt Builder turns authoritative context and instructions into model-ready
input.

Responsibilities:

- select documented prompt definitions;
- assemble relevant product, repository, task, and workflow context;
- validate required inputs and expose missing context;
- adapt presentation to model constraints without changing product intent;
- identify the prompt and context versions used for an action.

Boundary:

Prompt Builder does not choose the model, invent undocumented requirements,
control workflow state, or become the durable owner of project memory.

### Workflow Engine

Workflow Engine governs how work progresses.

Responsibilities:

- execute documented steps and state transitions;
- coordinate AI agents, tools, retries, and failure paths;
- enforce permissions and human review gates;
- expose current state, actions, and outcomes;
- return results and newly produced context to AI Manager.

Boundary:

Workflow Engine does not redefine product goals, routing policy, or prompts. It
executes accepted workflow specifications and cannot silently expand tool
permissions.

### AI Tools

AI Tools are external execution capabilities used by governed workflows.

They may include:

- model providers;
- coding agents;
- editors and source-control systems;
- command, browser, research, or communication tools;
- MCP servers and future plugins.

Responsibilities:

- perform the requested action within supplied permissions and constraints;
- return results, failures, and relevant execution metadata;
- avoid claiming manager-owned authority over policy or durable memory.

Boundary:

AI Tools do not control AI Manager policy, independently schedule work, or
become the single source of truth for project context.

## Cross-Cutting Product Requirements

### Observability

Every AI action should produce enough structured evidence to understand what was
attempted, which inputs and tools were used, and what happened.

### Explainability

Routing and scheduling outcomes should identify relevant candidates,
constraints, uncertainty, and the reason for the result.

### Human Control

Consequential actions require explicit, documented approval boundaries. The
system must preserve a path to inspect, pause, reject, or override.

### Manager-Owned Context

Durable context and memory remain independent of individual models and tools.
Components consume context according to policy; they do not become its sole
owner.

### Provider Neutrality

Provider-specific facts remain explicit at integration boundaries. Core product
concepts should not silently inherit one provider's terminology or limitations.

## Conceptual Data Passed Between Components

The architecture assumes the following conceptual information, without defining
a storage format or interface:

- user goal and task requirements;
- policy and approval constraints;
- quota observations and freshness;
- model capability and eligibility facts;
- routing decision and explanation;
- prompt definition and assembled context references;
- workflow state and tool permissions;
- action records, outcomes, and retained memory.

## Out of Scope for This Version

This document does not define:

- programming languages or application frameworks;
- process, service, or package boundaries;
- APIs, protocols, schemas, or databases;
- user-interface structure;
- deployment, hosting, or runtime topology;
- authentication or billing implementation;
- provider-specific integrations.

Those decisions require research and separate accepted ADRs.

## Related Documents

- [Product Definition](../product/PRODUCT.md)
- [Product Principles](../product/PRINCIPLES.md)
- [Components](COMPONENTS.md)
- [Component Contracts](COMPONENT_CONTRACTS.md)
- [System Boundaries](SYSTEM_BOUNDARIES.md)
- [Data Flow](DATA_FLOW.md)
- [Glossary](GLOSSARY.md)
- [Roadmap](../roadmap/ROADMAP.md)
