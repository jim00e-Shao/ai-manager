# Components

## Status

Conceptual component map aligned with
[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md). Detailed contracts are in
[COMPONENT_CONTRACTS.md](COMPONENT_CONTRACTS.md).

## AI Executive Office

Coordinates developer goals, Strategy Council, Decision Engine, resources,
knowledge, scheduling, execution, and Mission Control. It expresses the AI Chief
of Staff product personality while preserving human authority.

## Strategy Council

Collects specialized Architecture, Resource, Knowledge/Hermes, Cost, Risk, and
Execution advisor recommendations. Advisors do not execute.

## Decision Engine

Reconciles advisor input, resource facts, knowledge, policy, deadline, and human
constraints into an explainable proposed plan.

## Resource Manager

Maintains the operating picture for quota, credits, reset time, cost, provider
and model capability, health, context capacity, and tool availability.

### Quota Manager

Normalizes quota observations and scheduling status. Its existing product and
architecture specifications remain authoritative.

### Provider Registry and Model Catalog

Supply sourced external capability, model, surface, health, and cost-class facts.
They do not choose the plan.

## Knowledge Manager / Hermes

Finds authoritative project knowledge, assembles context, preserves continuity,
and governs manager-owned memory across advisors, sessions, and workflows.

## Scheduler

Sequences approved work across dependencies, resource windows, waits,
reassignments, task splits, and human approvals.

## AI Router

Selects an eligible execution path inside an approved plan. Model Router is its
model-ranking submodule, not the product's decision core.

## Prompt Builder

Builds reproducible model-ready input from an approved execution step and
Hermes-provided context.

## Workflow Engine

Executes accepted multi-step workflows as observable state transitions under
Scheduler and review-gate control.

## Plugin Manager

Controls Provider Adapters, MCP servers, and external-tool capability,
permission, lifecycle, compatibility, and health.

## Mission Control Dashboard

Presents goals, advisors, resources, knowledge, decisions, schedules, and
execution state. It exposes human confirmation and control without owning
policy.

## External Capabilities

OpenAI, Anthropic, Google, OpenRouter, Ollama, Codex, Claude Code, Gemini
developer tools, OpenHands, IDEs, Git, MCP, and other tools remain external.

## Open Questions

- Which initial read-only Resource Manager views deliver the first useful
  Mission Control?
- Which decisions require all six advisors versus a smaller council?
- Which scheduler state must persist before execution exists?
- How should Hermes quantify context-continuity value without overstating it?
