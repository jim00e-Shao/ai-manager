# Advisor Model

## Status

Draft advisor contracts. Example recommendations illustrate the contract; they
are not standing decisions.

## Shared Advisor Contract

Every advisor:

- analyzes through one declared decision lens;
- uses sourced, fresh inputs;
- distinguishes hard constraints from preferences;
- reports confidence and missing evidence;
- recommends but does not execute;
- emits metrics and reevaluation triggers;
- remains subject to Decision Governance and human authority.

## Architecture Advisor

### Responsibility

Protect documented product intent, architecture boundaries, component contracts,
maintainability, and long-term design coherence.

### Inputs

- product specifications and principles;
- system overview, contracts, boundaries, glossary, and ADRs;
- proposed behavior and affected components;
- repository and PR history;
- delivery deadline and accepted technical debt policy.

### Outputs

- architecture recommendation;
- required document or ADR changes;
- affected boundaries and contracts;
- quality risks and alternatives;
- required validation.

### Decision Lens

“Will this change preserve a coherent, documented system that can be safely
extended?”

### Metrics / KPI

- undocumented decisions detected;
- boundary violations prevented;
- architecture debt accepted versus unresolved;
- rework caused by missing specification;
- contract consistency.

### Failure Modes

- over-design blocks valuable learning;
- treats preferences as hard constraints;
- ignores deadline or resource facts;
- recommends documentation without identifying the decision needed;
- protects an outdated architecture.

### Example Recommendation

“Update the Quota Manager contract and state machine before implementation
because the proposed status changes existing scheduling semantics. Limit the
first PR to documentation and preserve the current MVP boundary.”

## Resource Advisor

### Responsibility

Create the current AI resource picture and recommend allocation, preservation,
waiting, reassignment, or task splitting.

### Inputs

- provider and model capability facts;
- quota, credits, reset time, cooldown, and cost;
- context held by active advisors or sessions;
- tool and adapter availability;
- task demand, priority, and deadline;
- scheduler commitments.

### Outputs

- eligible resource options;
- recommended allocation and timing;
- preservation or reservation recommendation;
- wait, reassign, or split proposal;
- uncertainty and refresh trigger.

### Decision Lens

“How can available AI resources sustain continuous progress toward the goal?”

### Metrics / KPI

- avoidable idle time;
- work completed per constrained resource window;
- premium quota preserved for critical work;
- context reuse rate;
- reassignment and reset-wait effectiveness.

### Failure Modes

- optimizes quota while harming architecture;
- treats stale status as available;
- ignores context-switch cost;
- hoards resources without a goal;
- confuses provider health with quota.

### Example Recommendation

“Use the current Codex window for the bounded repository analysis, preserve its
remaining premium capacity for implementation, and assign documentation
synthesis to the advisor that already holds the product context.”

## Knowledge Advisor / Hermes

### Responsibility

Find, validate, preserve, and transfer authoritative project knowledge and
context across advisors, sessions, and execution steps.

### Inputs

- product and architecture documents;
- ADRs, PR history, decision logs, and workflow outcomes;
- manager-owned memory;
- active session context and provenance;
- goal and task context requirements.

### Outputs

- authoritative context package;
- source and freshness map;
- conflict and missing-context report;
- context-preservation plan;
- recommended advisor/session based on continuity.

### Decision Lens

“What must be known, preserved, or reconciled so work can continue without
losing intent?”

### Metrics / KPI

- authoritative-source coverage;
- context reuse and successful handoff rate;
- stale or conflicting knowledge detected;
- repeated rediscovery avoided;
- decisions traceable to sources.

### Failure Modes

- treats memory as more authoritative than documentation;
- preserves irrelevant context;
- recommends one advisor solely because of conversation history;
- loses provenance during summarization;
- exposes protected knowledge.

### Example Recommendation

“Wait for the Claude session if the decision can tolerate the delay because it
contains unresolved architecture context. If reassignment is necessary, first
persist a sourced context package and the open questions.”

## Cost Advisor

### Responsibility

Evaluate monetary cost, credits, opportunity cost, and consumption efficiency
without reducing quality below the goal.

### Inputs

- provider cost classes and current terms;
- credits, budget, quota, and forecast demand;
- expected task size and retry risk;
- eligible alternatives;
- quality floor and deadline.

### Outputs

- cost comparison and assumptions;
- lower-cost eligible alternative;
- premium-resource preservation recommendation;
- spend warning or budget constraint;
- uncertainty where price is dynamic.

### Decision Lens

“Which eligible plan meets the goal with the lowest justified total cost?”

### Metrics / KPI

- cost per accepted outcome;
- premium credits consumed;
- retries and wasted execution;
- forecast versus observed cost;
- savings without quality-floor violations.

### Failure Modes

- selects the cheapest option below the quality floor;
- ignores migration, review, or retry cost;
- uses stale pricing;
- treats free quota as zero opportunity cost;
- overrides privacy or architecture constraints.

### Example Recommendation

“Use the lower-cost Gemini option for non-sensitive research if its current
capability and quota are verified; reserve premium coding capacity for the
repository change.”

## Risk Advisor

### Responsibility

Identify privacy, security, permission, compliance, reversibility, provider, and
operational risks and define required controls.

### Inputs

- data classification and context package;
- provider and tool risk notes;
- permissions, sandbox, and external boundaries;
- proposed actions and blast radius;
- legal or organizational policy;
- failure and rollback behavior.

### Outputs

- risk assessment and severity;
- hard constraints or veto conditions;
- required redaction, sandbox, approval, or local execution;
- safer alternatives;
- residual risk requiring human acceptance.

### Decision Lens

“Can this plan proceed within acceptable, explicit, and reversible risk?”

### Metrics / KPI

- policy violations prevented;
- sensitive-data exposure;
- permission scope;
- irreversible actions;
- incidents and unmitigated residual risk.

### Failure Modes

- blocks all work without alternatives;
- misses indirect data exposure;
- treats every risk as equal;
- relies on provider marketing instead of policy;
- allows execution before required confirmation.

### Example Recommendation

“Do not send the repository excerpt to an external provider. Use a local
eligible model after redaction, or ask the developer to approve a narrower
context package.”

## Execution Advisor

### Responsibility

Transform an approved direction into the smallest safe, verifiable, and
continuous delivery sequence.

### Inputs

- goal, deadline, and acceptance criteria;
- architecture and risk constraints;
- resource and knowledge recommendations;
- repository state and dependencies;
- required checks and review gates.

### Outputs

- proposed task split and sequence;
- execution dependencies;
- validation and rollback plan;
- required human confirmations;
- dispatch-ready plan for AI Router and Workflow Engine.

### Decision Lens

“What is the smallest executable path that produces reviewed progress without
losing the larger goal?”

### Metrics / KPI

- PR size and reviewability;
- lead time to validated increment;
- failed or rolled-back executions;
- dependency blockers surfaced early;
- acceptance criteria satisfied.

### Failure Modes

- optimizes speed by bypassing documentation;
- creates fragments with no user value;
- ignores context-preservation cost;
- schedules work without resources;
- declares success without validation.

### Example Recommendation

“Split the deadline-critical request into a documentation contract PR and a
separate minimal implementation PR. Merge only after each review gate; defer
nonessential refactoring.”

## Advisor Composition

Decision Engine requests the smallest advisor set needed for the decision.
Architecture and Risk can establish hard constraints. Resource, Cost, Knowledge,
and Execution normally propose preferences and alternatives. Any advisor can
request human clarification when evidence is insufficient.

Weights and vetoes are governed by
[DECISION_GOVERNANCE.md](DECISION_GOVERNANCE.md).
