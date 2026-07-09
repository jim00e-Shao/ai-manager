# Cost and Budget

## Status

Conceptual cost and budget specification. It defines decision inputs and policy
boundaries without choosing billing services, currencies, databases, or
implementation technology.

## Purpose

Cost and budget are first-class resources because the cheapest invocation may
create expensive delay or context loss, while the most capable model may waste
scarce capacity on routine work. Resource Manager preserves cost facts;
Decision Engine applies cost-aware policy; humans retain spending authority.

## Cost Dimensions

### API Cost

Marginal provider charges associated with requests, tokens, tools, storage,
compute, or other metered dimensions. Records retain provider-native units,
currency, pricing period, source, and estimate confidence.

### Subscription Cost

Recurring access cost and included capacity. Subscription cost is not assumed
to be zero marginal cost: using limited subscription capacity can consume a
scarce opportunity needed later.

### Opportunity Cost

The value of consuming a constrained model, account, context owner, tool, or
local runtime instead of reserving it for a more suitable task. Opportunity
cost may be qualitative when monetary precision would be false.

### Context Rebuilding Cost

Time, model usage, human attention, risk, and possible knowledge loss required
to reconstruct context after reassignment. This cost can make continuity with a
less capable model the better choice.

### Waiting Cost

Delay imposed by reset windows, cooldowns, queues, unavailable tools,
confirmations, or deferred execution. Waiting cost considers deadlines,
blocked dependencies, developer interruption, and the availability of useful
alternative work.

## Cost Ceiling

A cost ceiling is a hard or soft limit over a defined project, task, provider,
account, model, workflow, or time window.

A ceiling includes:

- scope and policy owner;
- amount, currency, credit, or qualitative limit;
- effective and reset window;
- warning thresholds;
- hard-block or approval-required behavior;
- exceptions and authorized approvers;
- observed and estimated consumption;
- uncertainty handling.

Crossing a hard ceiling makes affected resources exhausted or unavailable for
the demand until reset or approved override. An estimate near a hard ceiling
must remain visible and may require confirmation.

## Budget Policy

Budget policy expresses how cost participates in decisions. It may define:

- task or project envelopes;
- preferred subscription capacity before marginal API spend;
- protected capacity for high-value or urgent work;
- warning and confirmation thresholds;
- acceptable estimate uncertainty;
- rules for context rebuild and waiting cost;
- local versus hosted compute preferences;
- human override and emergency authority;
- review cadence and expiry.

Budget policy does not choose a provider by name unless a separately reviewed
policy explicitly requires it. Policy versions are attached to resource
snapshots and decision records.

## Cost-Aware Routing

Cost-aware routing occurs only inside an approved execution plan. The flow is:

1. Resource Manager supplies current cost profiles, ceilings, credits,
   opportunity cost, waiting cost, and context-rebuild implications.
2. Decision Engine selects a plan and defines acceptable execution constraints.
3. Scheduler accounts for waiting and reservation conditions.
4. AI Router chooses an eligible execution path within those constraints.
5. Execution returns observed usage and cost for reconciliation.

Router cannot trade away quality, safety, architecture, continuity, or human
policy merely to reduce estimated price.

## When Low-Cost AI Should Be Preferred

Prefer a lower-cost eligible resource when:

- task requirements and acceptance criteria are well bounded;
- quality difference is unlikely to affect the outcome;
- context is portable and cheap to rebuild;
- work is repetitive, reversible, or independently verifiable;
- a more scarce resource should be preserved for higher-value work;
- deadline and waiting cost remain acceptable;
- privacy, tool, and local-compute constraints are satisfied;
- fallback and review costs do not erase the savings.

Examples include classification, formatting, bounded transformation, initial
triage, or parallel exploration when outputs will be verified.

## When High-Cost AI Is Justified

A higher-cost resource may be justified when:

- failure or rework cost exceeds the incremental spend;
- architecture, security, safety, or complex reasoning demands it;
- the resource already owns high-value context;
- it avoids a costly handoff or rebuild;
- a deadline makes waiting or repeated attempts more expensive;
- required capabilities or tools exist only on that path;
- human review capacity is scarce;
- one high-quality pass is expected to be cheaper than multiple weak attempts.

The decision record must explain the requirements, alternatives, estimated
incremental cost, and expected value.

## Inputs

- provider and model cost profiles;
- subscription, credit, and API billing observations;
- task demand and expected usage;
- budget policies and ceilings;
- quota, reset, rate-limit, and health facts;
- context continuity and rebuild estimates;
- deadline, dependencies, and waiting conditions;
- scheduler commitments and reservations;
- execution usage and outcome records;
- manual estimates and human overrides.

## Outputs

- scoped observed and estimated cost;
- budget remaining or uncertainty;
- threshold and ceiling events;
- cost constraint and confirmation requirements;
- cost comparison across eligible options;
- opportunity, waiting, and rebuild implications;
- reconciliation gaps between estimate and outcome.

## Failure and Uncertainty

- pricing or billing source is stale or ambiguous;
- currency, credit, subscription, or usage units are mixed;
- subscription allocation is treated as free or unlimited;
- provider-reported spend and local estimate conflict;
- context, waiting, or review cost is omitted;
- a prediction is shown as a bill;
- shared account usage cannot be attributed safely;
- a hard ceiling is evaluated from stale data;
- human override lacks actor, reason, scope, or expiry.

Unknown cost remains unknown. When a ceiling might be exceeded, policy decides
whether to block, warn, or require human confirmation.

## Observability

Record cost source, pricing version, units, currency, scope, estimate method,
confidence, policy, ceiling, threshold, override, decision use, and observed
outcome. Mission Control must distinguish billing facts from estimates and
qualitative tradeoffs.

## Privacy and Authority

- Do not store payment credentials or full billing instruments.
- Minimize account and invoice identifiers.
- Respect provider billing terms and access controls.
- Resource Manager reports cost state.
- Decision Engine proposes tradeoffs.
- Humans authorize budget policy and consequential spend.
- Execution cannot purchase capacity or change subscriptions without explicit
  authority.

## Related Documents

- [Resource Manager](RESOURCE_MANAGER.md)
- [Resource Data Model](RESOURCE_DATA_MODEL.md)
- [Resource State Model](RESOURCE_STATE_MODEL.md)
- [Context Continuity](CONTEXT_CONTINUITY.md)
- [Decision Governance](DECISION_GOVERNANCE.md)
- [Resource Manager MVP](../product/RESOURCE_MANAGER_MVP.md)
