# Architecture Glossary

## Status

Normative terminology for product and architecture documentation. Documents
should use these terms consistently or define an explicit, narrower variant.

## Agent

An AI-driven actor that pursues a task through model reasoning and permitted
tools within a documented workflow or manager request.

An Agent is not the same as a Model. The Agent has a role, task state, context,
permissions, and action history; one or more Models may support it.

## Advisor

A non-executing Strategy Council role that evaluates a goal through one declared
lens and returns a sourced recommendation, confidence, risks, and alternatives.

Advisors advise; Decision Engine aggregates; humans decide.

## Decision

A governed, auditable selection among alternatives that records goals, advisor
input, resource and knowledge facts, constraints, weights, policy, human action,
and reevaluation triggers.

## AI Resource

Any capacity or constraint coordinated by Resource Manager, including quota,
credits, cost, reset time, model capability, provider health, context capacity,
knowledge, tools, scheduler availability, and human approval availability.

## Hermes

The product name for Knowledge Manager and the Knowledge Advisor role. Hermes
preserves authoritative project knowledge and context continuity without
replacing documentation.

## Mission Control

The human-facing Dashboard that presents goals, advisors, resources, knowledge,
decisions, schedules, and execution state and exposes human controls.

## AI Router

The execution-layer component that selects an eligible provider, surface,
adapter, tool, and model path inside an approved plan. Model Router is its
model-ranking submodule.

## Model

A specific AI capability that accepts input and produces output, identified by
provider and model identity plus relevant capability metadata.

A Model does not own ai-manager policy, workflow state, context, or durable
memory.

## Provider

An external system that supplies model inference or related AI capabilities and
reports provider-native availability, usage, quota, errors, and billing facts.

ai-manager may normalize Provider facts but does not become the Provider.

## Workflow

A versioned definition of roles, steps, state transitions, permissions, review
gates, failure behavior, and completion conditions for coordinated work.

A Workflow is the accepted specification; a workflow instance is one execution
of that definition.

## Task

A bounded unit of intended work with a goal, requirements, constraints, status,
and outcome.

A Task may be a single manager request or part of a Workflow. It is not
synonymous with a prompt or model invocation.

## Prompt

A versioned instruction structure combined with validated variables and selected
Context to form model-ready input.

A Prompt does not replace product specifications or durable project Context.

## Context

The bounded set of relevant, attributable information assembled for a specific
decision or action.

Context may include product documents, repository state, task requirements,
workflow state, and retrieved Memory. Context is selected for use; it is not
necessarily stored durably.

## Memory

Durable, manager-owned knowledge retained across models, tools, sessions, and
workflows with scope, provenance, authority, freshness, and lifecycle metadata.

Memory can inform Context but does not override authoritative documentation.

## Quota

Observed or configured capacity constraints governing use of a Provider or
Model, including usage, remaining capacity, rate windows, reset behavior, and
uncertainty.

Quota is a scheduling input, not merely a display counter.

## Plugin

An external extension registered with Plugin Manager that declares capabilities,
permissions, version, compatibility, and health.

A Plugin may integrate a Provider, tool, quota source, context source, policy,
or workflow capability. It cannot silently acquire manager authority.

## MCP

Model Context Protocol, an integration protocol through which compatible servers
can expose tools, resources, or prompts to a client.

Within ai-manager, MCP is one possible Plugin integration mechanism. It does not
define the entire product architecture, and an MCP server is not trusted merely
because it is protocol-compatible.

## Related Distinctions

| Terms | Distinction |
| --- | --- |
| Agent vs. Model | An Agent acts within role and workflow state; a Model provides AI computation. |
| Task vs. Workflow | A Task is a unit of intended work; a Workflow defines how one or more tasks progress. |
| Prompt vs. Context | A Prompt structures instructions; Context supplies relevant information. |
| Context vs. Memory | Context is assembled for current use; Memory is durable manager-owned knowledge. |
| Plugin vs. MCP | A Plugin is ai-manager's extension unit; MCP is one protocol a Plugin may use. |
| Provider vs. Model | A Provider operates AI services; a Model is one capability offered through a Provider. |

## Terminology Change Process

Adding a competing term or changing a definition requires updating this
glossary and every affected product, architecture, research, roadmap, or ADR
document in the same pull request.
