# Vision

## Status

Draft directional specification. Time horizons express intended outcomes, not
fixed release commitments.

## Long-Term Positioning

ai-manager is intended to become the **AI Development Control Plane**: the
independent coordination layer through which developers and AI agents understand
capacity, route tasks, assemble context, apply prompts, run governed workflows,
use tools, and retain durable project memory.

The control plane does not replace developers, models, editors, or tools. It
connects them through explicit policy, observable actions, explainable decisions,
and human-controlled boundaries.

## Three-Month Vision

Within three months of active product development, ai-manager should have a
validated product foundation and a narrow, usable capacity-to-routing loop for
an individual developer.

Expected outcomes:

- product principles, MVP boundaries, and conceptual architecture are reviewed;
- the first quota sources and normalization assumptions are researched;
- a developer can understand available model capacity in one place;
- a documented task can receive an explainable model recommendation;
- uncertainty, stale data, and unavailable capacity remain visible;
- routing decisions can be revisited with their inputs and explanation.

The purpose of this horizon is product validation, not broad provider coverage
or automation.

## One-Year Vision

Within one year, ai-manager should connect the core development loop across
quota, routing, prompts, workflows, tools, and durable context for individual
developers and small teams.

Expected outcomes:

- routing policies account for capability, cost, latency, quota, and workflow
  requirements;
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

Within three years, ai-manager should be a trusted open control plane for
AI-native software engineering across models, agents, and development tools.

Expected outcomes:

- developers can change models and providers without losing project memory,
  policy, or workflow history;
- AI actions and routing decisions remain inspectable across integrated tools;
- local, team, and self-hosted usage share compatible product concepts;
- an ecosystem of MCP servers and plugins extends providers, tools, policies,
  and workflows;
- open specifications make manager behavior portable and auditable;
- teams can govern increasingly capable automation while humans retain control.

The goal is not maximum autonomy. The goal is dependable leverage with durable
context and explicit control.

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

## Related Documents

- [Product Definition](PRODUCT.md)
- [Product Principles](PRINCIPLES.md)
- [System Overview](../architecture/SYSTEM_OVERVIEW.md)
- [Roadmap](../roadmap/ROADMAP.md)
