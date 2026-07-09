# ADR-0001: Documentation Is the Single Source of Truth

- **Status:** Accepted
- **Date:** 2026-07-09

## Context

ai-manager will coordinate several concerns whose boundaries and tradeoffs must
remain understandable across human and AI-agent contributions. If implementation
becomes the implicit definition of product behavior or architecture, intent is
difficult to review and decisions become inconsistent.

The project needs one durable source for accepted intent, constraints, and
decisions before implementation begins.

## Decision

Documentation is the single source of truth for ai-manager. Source code is an
implementation of the specification; it is not a substitute for one.

Every human or AI agent must update the relevant product, architecture,
research, roadmap, or decision document before starting implementation. The
documentation change must make the intended behavior, constraints, assumptions,
and unresolved questions reviewable.

This requirement applies to every product and technical surface, including:

- system architecture and component boundaries;
- prompts, prompt composition, and prompt versions;
- agent roles, workflows, state transitions, and review gates;
- model-router inputs, policies, fallbacks, and explanations;
- quota rules and provider constraints.

Implementation may begin only after the relevant documentation is reviewed and
accepted. Code must conform to accepted documentation. When implementation
reveals a missing or incorrect assumption, the document is updated first and
reviewed again.

Architecture and cross-cutting decisions are recorded as ADRs. Later decisions
may supersede an ADR, but they must not silently rewrite its history.

## Consequences

### Positive

- Product intent and technical decisions are reviewable before code exists.
- Humans and AI agents share the same explicit context.
- Implementation and review can be scoped against accepted constraints.
- Decision history remains discoverable.

### Tradeoffs

- Work includes an explicit documentation and review step before implementation.
- Documents must be maintained when knowledge changes.
- Prototypes that may influence the product still require a documented question,
  boundary, and outcome.

## Compliance

Pull requests must identify the authoritative documents they change or follow.
Reviewers must reject implementation that introduces undocumented product or
architecture decisions. The same rejection rule applies to undocumented prompts,
workflows, routing behavior, and quota policy.

[CONTRIBUTING.md](../../CONTRIBUTING.md) defines the collaboration workflow, and
[PROJECT_MAP.md](../../PROJECT_MAP.md) identifies the authoritative documents.
