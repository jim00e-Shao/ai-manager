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

## Deterministic-First

The principle that ordinary deterministic code handles work that does not
require semantic understanding or content generation, and that AI is invoked
only when it is actually required.

Recorded as a repo-wide architecture principle in
[Principle 17](../product/PRINCIPLES.md#17-deterministic-first-ordinary-code-moves-state-by-default)
and [ADR-0002](../decisions/ADR-0002-deterministic-first.md).
[Coding Agent Task Protocol](CODING_AGENT_TASK_PROTOCOL.md#deterministic-first-code-vs-ai-boundary)
remains the detailed operational authority for its application to the
Coding Agent task lifecycle.

Deterministic-First applies to AI Manager, any Orchestrator/Runner, and
Hermes: none of them may invoke an AI model merely to move data, relabel a
record, evaluate a timestamp, or reformat already-structured data.

## Coding Agent

An external Agent (Claude Code, Codex, Gemini CLI, or a successor) that
accepts an Engineering Ticket and produces changes plus a Completion Report
under the
[Coding Agent Task Protocol](CODING_AGENT_TASK_PROTOCOL.md).

A Coding Agent is interchangeable by contract: the ticket and report formats
never assume a specific tool.

## Engineering Ticket

A fixed-format unit of dispatched work, bound to one GitHub Issue, one base
branch, one Base SHA, and explicit Allowed/Forbidden change boundaries. See
[Coding Agent Task Protocol](CODING_AGENT_TASK_PROTOCOL.md).

An Engineering Ticket is a specific, structured instance of the general Task
term above.

## Completion Report

The fixed-format report a Coding Agent submits against an Engineering
Ticket's Final commit SHA, moving the ticket from `coding` to
`ready-for-review`. See
[Coding Agent Task Protocol](CODING_AGENT_TASK_PROTOCOL.md).

## Review Agent

A non-executing role (AI or human) that inspects a Completion Report and its
diff against an Engineering Ticket's required verification and scope, and
returns a review report recommending `changes-requested` or recommending the
ticket for `merge-approved`. A Review Agent cannot itself set
`merge-approved`.

## Human Approver

The accountable human role that is the sole trigger for `merge-approved` and
for push, merge, deployment, cloud-resource, migration, secrets/production,
paid, and remote-deletion actions under the
[Coding Agent Task Protocol](CODING_AGENT_TASK_PROTOCOL.md).

## Related Distinctions

| Terms | Distinction |
| --- | --- |
| Agent vs. Model | An Agent acts within role and workflow state; a Model provides AI computation. |
| Task vs. Workflow | A Task is a unit of intended work; a Workflow defines how one or more tasks progress. |
| Prompt vs. Context | A Prompt structures instructions; Context supplies relevant information. |
| Context vs. Memory | Context is assembled for current use; Memory is durable manager-owned knowledge. |
| Plugin vs. MCP | A Plugin is ai-manager's extension unit; MCP is one protocol a Plugin may use. |
| Provider vs. Model | A Provider operates AI services; a Model is one capability offered through a Provider. |
| Coding Agent Task Protocol vs. AI Continuity Layer Handoff Protocol | The Task Protocol governs an Engineering Ticket's lifecycle across roles (Planning Agent, Coding Agent, Review Agent, Human Approver); the Continuity Layer's Handoff Protocol governs one in-progress task's working state moving between AI agent sessions. See [CODING_AGENT_TASK_PROTOCOL.md](CODING_AGENT_TASK_PROTOCOL.md#relationship-to-the-ai-continuity-layer-handoff-protocol). |

## Terminology Change Process

Adding a competing term or changing a definition requires updating this
glossary and every affected product, architecture, research, roadmap, or ADR
document in the same pull request.
