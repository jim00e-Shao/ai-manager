# Strategy Council

## Status

Draft conceptual architecture. The Council defines recommendation roles and
information flow, not model assignments, implementation processes, or autonomous
authority.

## Purpose

Strategy Council gives Decision Engine several specialized, inspectable views of
a developer goal before execution begins.

Its purpose is not to produce consensus at any cost. It makes tradeoffs visible
so Decision Engine can propose a governed plan and the human can decide.

## Why Multiple AI Advisors Are Needed

Software decisions combine concerns that one generic agent can collapse or
overlook:

- architecture quality;
- scarce AI capacity and scheduling;
- existing project knowledge and context continuity;
- cost and credit use;
- privacy, safety, and operational risk;
- execution feasibility and delivery sequence.

Specialized advisors reduce hidden assumptions. Each advisor states its lens,
evidence, confidence, risks, and recommendation. Disagreement becomes input to
governance rather than accidental prompt behavior.

## Advisor Roles

### Architecture Advisor

Protects product specifications, system boundaries, component contracts,
maintainability, and long-term design quality.

Typical questions:

- Is the requested behavior documented?
- Which architecture contract changes?
- Should documentation or an ADR come first?
- Does the proposal create scope creep or hidden coupling?

### Resource Advisor / AI Chief of Staff

Builds the current resource picture and proposes when and where work should
happen.

Typical questions:

- Which quota, credits, reset windows, providers, models, and tools are usable?
- Is existing context more valuable than a nominally stronger model?
- Should work wait, be reassigned, or be split?
- Which scarce resource should be preserved?

The Resource Advisor informs the AI Chief of Staff personality but does not own
the final decision.

### Knowledge Advisor / Hermes

Maintains knowledge continuity and finds authoritative project context.

Typical questions:

- Which specification, ADR, PR, decision log, or memory applies?
- Which advisor or session already holds useful context?
- What must be preserved before reassignment?
- Which sources conflict or are stale?

“Hermes” is the product name for this knowledge-coordination role.

### Cost Advisor

Evaluates monetary cost, credits, opportunity cost, and expected resource
consumption.

Typical questions:

- What is the expected cost class?
- Is a lower-cost eligible resource sufficient?
- Should premium quota be reserved?
- Does waiting reduce cost without harming the goal?

### Risk Advisor

Evaluates privacy, security, permission, provider, compliance, reversibility,
and operational risk.

Typical questions:

- Can this context leave the local boundary?
- Which action requires confirmation?
- Is the tool permission broader than the task?
- What is the failure blast radius?

### Execution Advisor

Evaluates feasibility, sequence, task boundaries, validation, and delivery path.

Typical questions:

- Can the work be completed as a small PR?
- Which dependencies or checks are required?
- Can the task be split to preserve momentum?
- What is the safest next executable increment?

## Recommendation Contract

Every advisor recommendation includes:

- advisor identity and role version;
- goal and task scope considered;
- authoritative inputs and freshness;
- assumptions and missing information;
- recommendation;
- alternatives considered;
- constraints and risks;
- confidence;
- proposed wait, reassign, split, preserve-context, or execute action;
- metrics affected;
- expiration or reevaluation trigger.

Recommendations are immutable inputs to the decision record. A corrected
recommendation supersedes rather than silently rewrites prior advice.

## How Advisors Provide Recommendations

1. AI Executive Office establishes the goal and decision question.
2. Decision Engine requests only the advisor lenses relevant to the decision.
3. Knowledge Manager supplies shared authoritative context.
4. Resource Manager supplies current capacity and scheduling facts.
5. Advisors evaluate independently where independence reduces group bias.
6. Each advisor returns a structured recommendation.
7. Decision Engine checks completeness, conflicts, policy, and confidence.
8. Missing evidence can trigger research, waiting, or human clarification.

Advisors may reference one another's facts, but they should not overwrite
another advisor's lens.

## Why Advisors Do Not Directly Execute

Recommendation and execution have different authority.

Advisors do not directly execute because:

- advice may conflict;
- evidence may be incomplete or stale;
- human confirmation may be required;
- resource and risk policy must be applied consistently;
- execution permissions exceed analysis permissions;
- direct action would bypass Decision Governance and audit history;
- the same advice may support several possible plans.

Only the governed execution layer dispatches approved work.

## Decision Engine Aggregation

Decision Engine:

- validates recommendation contracts;
- separates hard constraints from preferences;
- applies goal alignment and policy;
- resolves or exposes conflicts;
- weights advice according to decision type and evidence, not advisor prestige;
- identifies veto conditions such as privacy or missing authority;
- constructs alternatives;
- proposes wait, reassign, split, preserve context, or execute;
- records why advice was accepted, modified, or rejected;
- requests human confirmation when policy requires.

Aggregation rules are defined in
[DECISION_GOVERNANCE.md](DECISION_GOVERNANCE.md) and examples in
[CONFLICT_RESOLUTION.md](CONFLICT_RESOLUTION.md).

## Council Failure Modes

- relevant advisor omitted;
- duplicate advisors create false confidence;
- shared bad context biases all recommendations;
- stale resource facts distort scheduling;
- advisors hide uncertainty;
- one advisor becomes an undocumented veto;
- recommendations trigger execution directly;
- weights are changed without a decision record.

Failures remain observable and may force a wait or human decision.

## Related Documents

- [Advisor Model](ADVISOR_MODEL.md)
- [Decision Governance](DECISION_GOVERNANCE.md)
- [Conflict Resolution](CONFLICT_RESOLUTION.md)
- [AI Executive Office](../product/AI_EXECUTIVE_OFFICE.md)
