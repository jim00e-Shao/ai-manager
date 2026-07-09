# Components

## Status

Conceptual component map. Responsibilities are aligned with
[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md); interfaces and implementation choices
remain undefined.

## AI Manager

Coordinates product context, policy, quota, routing, prompts, workflows, tools,
observability, and human-control boundaries. It owns the decision sequence and
durable explanations without performing model inference itself.

## Dashboard

Presents authoritative manager state and human controls. It collects goals,
constraints, and approvals without owning orchestration policy or calling
external providers directly.

## Quota Manager

Tracks usage, limits, availability, and policy inputs needed to determine
whether a model can accept work.

Research: [QUOTA_MANAGER.md](../research/QUOTA_MANAGER.md)

## Model Router

Evaluates task requirements and eligible models, then returns an explainable
routing decision.

Research: [MODEL_ROUTER.md](../research/MODEL_ROUTER.md)

## Prompt Builder

Composes versioned prompt inputs from reusable definitions, task context, and
model-specific constraints.

Research: [PROMPT_BUILDER.md](../research/PROMPT_BUILDER.md)

## Workflow Engine

Coordinates agent roles, task state, review boundaries, and workflow outcomes.
Detailed research remains to be created.

## Context Manager

Assembles bounded, authoritative task context with provenance, freshness,
conflicts, and omissions made explicit.

## Memory Manager

Preserves durable project, decision, workflow, and outcome knowledge
independently of any individual model, tool, or session.

## Plugin Manager

Controls capability declaration, permission, lifecycle, and observability for
external providers, IDEs, Git systems, MCP servers, and tools.

## External Capabilities

AI Providers, IDEs, Git, MCP servers, and other tools remain outside
ai-manager. They execute native capabilities through Plugin Manager boundaries
without taking ownership of manager policy or memory.

## Interfaces and Data Ownership

Conceptual interfaces, state, dependencies, and failure semantics are defined in
[COMPONENT_CONTRACTS.md](COMPONENT_CONTRACTS.md). Technology-specific interfaces
and persistence choices remain undefined.

## Open Questions

- Which component owns provider capability metadata?
- How are routing decisions and prompt versions linked?
- Which workflow events require durable storage?
