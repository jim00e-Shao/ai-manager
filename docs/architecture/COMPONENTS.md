# Components

## Status

Draft — responsibilities are proposals, not implementation commitments.

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

## Agent Workflow Manager

Coordinates agent roles, task state, review boundaries, and workflow outcomes.
Detailed research remains to be created.

## Interfaces and Data Ownership

Component interfaces, persistence boundaries, and data ownership are not yet
accepted. They must be documented before implementation.

## Open Questions

- Which component owns provider capability metadata?
- How are routing decisions and prompt versions linked?
- Which workflow events require durable storage?
