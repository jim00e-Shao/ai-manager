# Vision

## Status

Draft directional specification. Time horizons express intended outcomes, not
fixed release commitments.

## Long-Term Positioning

ai-manager is intended to become the **AI Executive Office for solo developers
and small teams**, the **AI Operating System for AI-assisted software
development**, and the independent AI Development Control Plane through which
developers coordinate strategy, resources, knowledge, decisions, schedules, and
execution.

The control plane does not replace developers, models, editors, or tools. It
connects them through explicit policy, observable actions, explainable decisions,
and human-controlled boundaries.

Its core moat is AI resource orchestration: understanding not only which model
is capable, but which combination of quota, credits, reset time, context,
knowledge, tools, cost, and timing can sustain continuous progress.

Its differentiator is advisor coordination: specialized architecture, resource,
knowledge, cost, risk, and execution recommendations reconciled by Decision
Engine under human authority.

## Three-Month Vision

Within three months of active product development, ai-manager should have a
validated product foundation and a narrow, usable resource-visibility and
recommendation loop for an individual developer.

Expected outcomes:

- product principles, MVP boundaries, and conceptual architecture are reviewed;
- the first quota sources and normalization assumptions are researched;
- a developer can understand available model capacity in one place;
- a documented task can receive an explainable resource and execution
  recommendation;
- uncertainty, stale data, and unavailable capacity remain visible;
- recommendations can be revisited with their advisor, resource, policy, and
  explanation inputs.

The purpose of this horizon is product validation, not broad provider coverage
or automation.

## One-Year Vision

Within one year, ai-manager should operate as a useful AI Executive Office that
connects Mission Control, Resource Manager, Strategy Council, Decision Engine,
Hermes, scheduling, routing, workflows, tools, and durable context for
individual developers and small teams.

Expected outcomes:

- routing policies account for capability, cost, latency, quota, and workflow
  requirements;
- advisor recommendations expose architecture, resource, knowledge, cost, risk,
  and execution tradeoffs;
- the system can recommend acting, waiting, reassigning, splitting, or
  preserving context;
- prompt construction uses versioned project context rather than isolated text
  templates;
- workflows expose agent actions, tool use, state transitions, and review gates;
- context and memory persist independently of any one model or provider;
- integrations allow existing developer tools to use manager-owned decisions;
- an open extension boundary lets contributors add capabilities without
  weakening core governance.

The product should be useful without requiring a centralized enterprise
deployment.

## Three-Year Vision

Within three years, ai-manager should be a trusted open AI Operating System for
AI-native software engineering across projects, models, agents, advisors, and
development tools.

Expected outcomes:

- developers can change models and providers without losing project memory,
  policy, or workflow history;
- AI actions and routing decisions remain inspectable across integrated tools;
- local, team, and self-hosted usage share compatible product concepts;
- an ecosystem of MCP servers and plugins extends providers, tools, policies,
  and workflows;
- open specifications make manager behavior portable and auditable;
- teams can govern increasingly capable automation while humans retain control.
- developers can maintain continuous productivity across provider outages,
  quota resets, context handoffs, and changing project priorities.

The goal is not maximum autonomy or one-off routing. The goal is dependable,
continuous leverage with coordinated resources, durable context, and explicit
human control.

## Open Source and Individual-Developer-First Strategy

ai-manager will prioritize open development and individual developers before
enterprise breadth.

This means:

- the core product specification, decision history, and extension contracts are
  developed in public;
- a single developer can understand, run, and benefit from the product;
- local and self-controlled operation is treated as a first-class use case;
- provider neutrality is preferred over privileged dependence on one vendor;
- community extensions should use documented boundaries rather than private
  product internals;
- enterprise capabilities must not make the individual-developer experience a
  secondary product.

Starting with individual developers creates a direct feedback loop with the
people experiencing quota fragmentation, routing uncertainty, and context loss.
Open source makes the control plane inspectable, adaptable, and credible as
infrastructure shared across competing AI systems.

## Vision Guardrails

- AI augments developers; it does not replace them.
- Humans retain authority over goals, policies, permissions, and consequential
  actions.
- Observability and explainability are product requirements.
- Durable context belongs to the manager, not to an individual model.
- Growth in automation must not reduce user control.
- Breadth must not come before a coherent, trustworthy core loop.
- Advisor coordination must remain explainable and non-executing.
- Resource optimization must serve developer goals rather than maximize AI use.

## Related Documents

- [AI Executive Office](AI_EXECUTIVE_OFFICE.md)
- [Product Definition](PRODUCT.md)
- [Product Principles](PRINCIPLES.md)
- [System Overview](../architecture/SYSTEM_OVERVIEW.md)
- [Roadmap](../roadmap/ROADMAP.md)
