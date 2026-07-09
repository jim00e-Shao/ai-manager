# Components

## Status

Conceptual component map. Responsibilities are aligned with
[SYSTEM_OVERVIEW.md](SYSTEM_OVERVIEW.md); interfaces and implementation choices
remain undefined.

## AI Manager

Coordinates product context, policy, quota, routing, prompts, workflows, tools,
observability, and human-control boundaries. It owns the decision sequence and
durable explanations without performing model inference itself.

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

## AI Tools

Provide external execution capabilities such as model inference, coding,
source-control, browser, research, and communication actions. Tools operate
within manager-owned permissions and return observable outcomes.

## Context / Memory

Preserves durable project, decision, workflow, and outcome context independently
of any individual model, tool, or session. This is a later roadmap capability,
not an MVP commitment.

## MCP / Plugin System

Extends models, quota sources, tools, policies, workflows, and context providers
through documented capability and permission boundaries. This is a later
roadmap capability.

## Interfaces and Data Ownership

Component interfaces, persistence boundaries, and data ownership are not yet
accepted. They must be documented before implementation.

## Open Questions

- Which component owns provider capability metadata?
- How are routing decisions and prompt versions linked?
- Which workflow events require durable storage?
