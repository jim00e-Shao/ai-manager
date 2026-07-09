# Advisor Conflict Resolution

## Status

Draft decision examples. These examples define the reasoning pattern, not fixed
provider preferences.

## Resolution Method

Decision Engine resolves advisor conflict by:

1. restating the developer goal and deadline;
2. separating hard constraints from preferences;
3. validating evidence, freshness, and confidence;
4. identifying context and resource opportunity cost;
5. generating wait, reassign, split, and preserve-context alternatives;
6. applying decision weights and veto rules;
7. selecting or proposing the smallest goal-aligned plan;
8. explaining which advice was accepted, modified, or rejected;
9. requesting human confirmation when policy requires;
10. recording the decision and reevaluation trigger.

It does not resolve conflict by majority vote or by choosing the “smartest”
advisor.

## Example 1 — Documentation, Available Codex Quota, and Claude Context

### Inputs

- **Architecture Advisor:** update documentation before implementation because
  the proposed behavior changes a component contract.
- **Resource Advisor:** use Codex now because a valuable quota window is
  available and will reset or expire.
- **Knowledge Advisor / Hermes:** wait for Claude because its session contains
  unresolved project context.

### Conflict

Architecture requires documentation first. Resource timing favors immediate
Codex work. Knowledge continuity favors waiting for Claude.

### Decision Engine Analysis

- Documentation-first is a hard project rule.
- Codex quota is a time-sensitive preference, not permission to bypass that rule.
- Claude context has value only if it contains unresolved authoritative insight.
- Waiting is unnecessary if Hermes can preserve and transfer sufficient context.
- The task can be split into architecture documentation and later
  implementation.

### Integrated Recommendation

1. Ask Hermes to produce a sourced context package from the Claude session or
   identify the exact missing knowledge.
2. Use the current Codex window only for the documentation and repository
   analysis that does not violate the architecture gate.
3. Open a small documentation PR.
4. Defer implementation until documentation is reviewed.
5. If Claude's context cannot be transferred and the missing decision is
   material, pause that decision while continuing unrelated documented work.

### Explanation

The recommendation accepts Architecture Advisor's sequencing, Resource
Advisor's opportunity window, and Knowledge Advisor's continuity concern. It
rejects both “implement now” and “wait entirely” because task splitting and
context preservation satisfy the goal better.

### Human Confirmation

Required before consuming scarce premium quota if policy marks it reserved, and
before accepting any unresolved architecture assumption.

## Example 2 — Low-Cost Gemini and Sensitive Data

### Inputs

- **Cost Advisor:** use a lower-cost Gemini option.
- **Risk Advisor:** do not send sensitive project data to an external Provider.

### Conflict

The lowest-cost execution path violates a data-boundary constraint.

### Decision Engine Analysis

- Sensitive-data policy is a hard veto.
- Cost is optimized only among policy-eligible options.
- The task may be redacted, decomposed, or moved to an approved local/private
  resource.
- “Gemini is cheaper” is irrelevant if the required context cannot be sent.

### Integrated Recommendation

1. Classify the minimum context required.
2. If a non-sensitive subtask can be isolated, use Gemini only for that subtask.
3. Keep sensitive analysis on an approved local or private provider.
4. Preserve a decision record linking the split outputs without copying
   sensitive content across the boundary.
5. Ask the human to approve residual disclosure if redaction is uncertain.

### Explanation

Risk Advisor's hard constraint limits the candidate set. Cost Advisor still
optimizes the eligible non-sensitive portion. The system does not present a
policy-ineligible cheap option as a valid recommendation.

### Human Confirmation

Required for any exception to the data policy or release of ambiguous content.

## Example 3 — Urgent Deadline and Architecture Delay

### Inputs

- **Architecture Advisor:** delay implementation until the larger design is
  resolved.
- **Execution Advisor:** split the work into a small PR to meet the urgent
  deadline.

### Conflict

The durable design is incomplete, but waiting may miss a time-critical need.

### Decision Engine Analysis

- Determine whether the urgent change crosses a durable boundary.
- Identify a reversible, isolated increment that does not establish the disputed
  architecture.
- Require documentation of temporary scope and explicit non-goals.
- Defer unrelated refactoring and broad abstractions.
- Add a follow-up decision trigger rather than hiding debt.

### Integrated Recommendation

1. Create a small documentation update defining the temporary contract,
   constraints, and expiration/follow-up.
2. If an isolated implementation can satisfy that contract without locking the
   larger architecture, propose it as a separate small PR.
3. Require targeted validation and human review.
4. Block broader implementation until Architecture Advisor's open questions are
   resolved.

### Explanation

The plan accepts Execution Advisor's split while preserving Architecture
Advisor's hard boundary. Deadline pressure changes sequence and scope, not the
Documentation First rule.

### Human Confirmation

Required to accept temporary architecture debt, deadline tradeoff, and follow-up
ownership.

## Conflict Record

Every conflict record includes:

- conflicting recommendations;
- shared goal;
- hard constraints and preferences;
- evidence and freshness;
- weights and vetoes;
- integrated alternatives;
- chosen recommendation;
- human decision;
- reevaluation trigger;
- observed outcome.

## Related Documents

- [Decision Governance](DECISION_GOVERNANCE.md)
- [Strategy Council](STRATEGY_COUNCIL.md)
- [Advisor Model](ADVISOR_MODEL.md)
