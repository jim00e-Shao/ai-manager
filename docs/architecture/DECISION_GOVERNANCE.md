# Decision Governance

## Status

Draft governance specification for Strategy Council recommendations and Decision
Engine outcomes.

## Purpose

Decision Governance ensures that recommendations remain goal-aligned,
explainable, auditable, policy-compliant, and subject to human final authority.

## Goal Alignment

Every decision begins with:

- developer goal;
- success and acceptance criteria;
- priority and deadline;
- product and architecture constraints;
- data and permission boundaries;
- reversible versus irreversible actions;
- definition of continuous useful progress.

A recommendation that optimizes a local metric but conflicts with the goal is
rejected or reframed.

## Decision Record

Every consequential decision records:

- decision identifier and time;
- goal and decision question;
- advisor inputs and versions;
- authoritative sources and freshness;
- resource, quota, cost, and health snapshot;
- constraints and policy;
- alternatives considered;
- advisor recommendations, confidence, and conflicts;
- weights and veto conditions applied;
- selected plan and explanation;
- human confirmation, rejection, or override;
- execution references and observed outcome;
- reevaluation trigger.

Decision records are append-oriented. Corrections supersede rather than silently
rewrite history.

## Human Final Authority

Humans retain final authority over:

- product goals and priorities;
- architecture tradeoffs;
- sensitive data release;
- external permissions;
- irreversible or consequential actions;
- budget and premium resource use;
- acceptance of residual risk;
- overrides and merge decisions.

The AI Executive Office may proceed without confirmation only for actions
explicitly allowed by reviewed policy. Silence is not approval.

## Explainable Recommendations

Every recommendation answers:

- What goal does this support?
- Which advisors contributed?
- Which evidence and resources were used?
- Which alternatives were rejected and why?
- Which architecture, cost, risk, knowledge, or execution constraints mattered?
- What uncertainty remains?
- Why act now, wait, reassign, split, or preserve context?
- What requires human confirmation?

## Decision Audit Trail

The audit trail connects:

```text
Goal
→ advisor inputs
→ resource and knowledge snapshots
→ conflicts and weights
→ recommendation
→ human action
→ execution
→ outcome
→ retained knowledge
```

Missing links are observable governance failures.

## Advisor Input Collection

- Request only relevant advisor roles.
- Give advisors the same goal and authoritative baseline.
- Preserve independent analysis where shared conclusions could create group bias.
- Require source provenance, confidence, and missing evidence.
- Reject malformed or stale recommendations.
- Allow an advisor to abstain.
- Never fabricate consensus when an advisor is unavailable.

## Decision Weights

Weights express the importance of lenses for one decision; they are not permanent
advisor rankings.

Rules:

- product principles and hard policy are not outweighed by preferences;
- privacy, permission, and legal constraints can veto a plan;
- architecture quality receives higher weight for durable boundaries and lower
  weight for reversible experiments;
- resource and cost weights increase when capacity or budget is scarce;
- knowledge continuity weight increases when reassignment would lose unresolved
  context;
- execution weight increases under a deadline, but cannot bypass hard controls;
- weights and rationale are recorded.

## Override Rules

A human override includes:

- actor;
- decision and selected alternative;
- reason;
- scope;
- accepted risk;
- effective and expiration time where relevant;
- required follow-up.

Overrides cannot falsify advisor inputs or delete the original recommendation.
An override cannot grant authority the human does not possess.

## When to Wait

Wait when:

- a required provider, quota, approval, or source is temporarily unavailable;
- an advisor holds uniquely valuable unresolved context and delay is acceptable;
- acting now would violate policy or materially increase irreversible risk;
- a reset will make a substantially better resource available;
- critical evidence is expected soon and substitute work is available.

Waiting must include a reason, wake condition, deadline, and alternative work.

## When to Reassign

Reassign when:

- current resource is unavailable beyond the acceptable deadline;
- another eligible advisor or model has sufficient transferred context;
- capability mismatch is more important than context continuity;
- cost or quota policy makes the current path unjustified;
- risk requires a different execution boundary.

Reassignment requires a context-preservation package.

## When to Split a Task

Split when:

- documentation or architecture must precede implementation;
- independent work can continue while a blocker waits;
- one PR would be too large to review;
- different parts require different advisors, resources, or permissions;
- a minimal validated increment meets urgent need;
- risk can be isolated behind a smaller boundary.

Each child task retains goal, dependencies, acceptance criteria, and parent
decision reference.

## When to Preserve Context

Preserve context before:

- changing advisor, model, provider, surface, or session;
- waiting across a reset or approval;
- splitting a task;
- closing an unresolved workflow;
- compressing or summarizing a long interaction;
- executing a decision with important assumptions.

Preserved context includes sources, decisions, open questions, constraints,
attempted actions, and next step. Memory does not replace authoritative
documentation.

## When to Prioritize Cost

Prioritize cost when:

- multiple options satisfy the documented quality floor;
- the task is reversible or low risk;
- premium credits should be preserved for critical work;
- retries are unlikely to erase the savings;
- the deadline permits the lower-cost path;
- data policy is equivalent.

Cost cannot override privacy, required capability, or architecture constraints.

## When to Prioritize Architecture Quality

Prioritize architecture quality when:

- a durable public contract or data model changes;
- the decision affects several downstream components;
- incorrect boundaries would create expensive rework;
- security, privacy, or auditability depends on the design;
- the change is hard to reverse;
- implementation would otherwise become the undocumented specification.

Under deadline pressure, split the task rather than silently abandon the
architecture gate.

## Governance Failure Modes

- hidden weights or vetoes;
- stale advisor or resource inputs;
- human confirmation assumed;
- override history lost;
- decision explanation omits rejected alternatives;
- execution differs from approved plan;
- context lost during reassignment;
- cost or speed silently dominates architecture and risk.

Failure triggers review, pause, or reevaluation according to policy.

## Related Documents

- [Strategy Council](STRATEGY_COUNCIL.md)
- [Advisor Model](ADVISOR_MODEL.md)
- [Conflict Resolution](CONFLICT_RESOLUTION.md)
- [AI Executive Office](../product/AI_EXECUTIVE_OFFICE.md)
