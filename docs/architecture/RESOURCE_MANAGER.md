# Resource Manager

## Status

Draft conceptual specification. This document defines product and architecture
behavior without selecting storage, framework, API, or deployment technology.

## Purpose

Resource Manager maintains the decision-ready operating picture of every
resource that can keep AI-assisted development moving or cause it to stop. It
normalizes heterogeneous observations without hiding their source, freshness,
confidence, account scope, or provider-specific meaning.

Resource Manager answers:

- what resources are usable now;
- what is constrained, degraded, exhausted, or unknown;
- when a constrained resource may recover;
- what a task is expected to consume;
- what continuity, cost, and opportunity may be lost by changing resources;
- which facts and uncertainties a decision or schedule must consider.

It reports facts, constraints, and options. It does not choose the final plan,
dispatch work, bypass provider controls, or spend resources autonomously.

## Why Resource Manager Replaces Quota Manager as the Primary Resource Layer

Quota is only one constraint on continuous AI development. A model can have
remaining quota and still be unusable because the provider is unhealthy, a rate
limit is active, required tools are absent, local compute is unavailable, the
cost ceiling has been reached, or essential context belongs to another session.

Quota Manager therefore becomes a specialized capability inside Resource
Manager. Its existing quota policies, windows, estimates, and state transitions
remain authoritative for quota. Resource Manager composes those facts with
credits, cost, health, capability, tools, context continuity, and local compute
into one resource snapshot.

This change prevents three errors:

1. treating remaining quota as complete availability;
2. asking Decision Engine to reconcile raw provider-specific resource facts;
3. losing context or budget value when switching to an apparently available
   model.

## Managed Resources

| Resource | Resource Manager responsibility |
| --- | --- |
| Quota | Preserve allowance, usage, estimate, reset, cooldown, and confidence. |
| API credits | Track known balances, units, scope, expiration, and source. |
| Daily or weekly limits | Represent each limit as an independent scoped window. |
| Reset time | Record the rule, predicted or confirmed time, timezone, and confidence. |
| Rate limits | Expose current restrictions and recovery conditions separately from quota. |
| Cost | Maintain estimates, observed spend, ceilings, and policy references. |
| Availability | State whether a resource can satisfy a declared demand now. |
| Provider health | Preserve provider or adapter health independently from account capacity. |
| Model capability | Reference the Model Catalog rather than duplicating capability truth. |
| Tool availability | Record required tool, permission, adapter, and health conditions. |
| Context continuity | Represent continuity ownership, quality, portability, and rebuild cost. |
| Local compute | Record runtime, capacity, queue, health, and privacy constraints. |

## Inputs

- Provider Registry identity, account surfaces, adapter versions, and health;
- Model Catalog capabilities and recommended usage;
- quota observations, policies, usage, resets, cooldowns, and manual overrides;
- credit balances and billing observations;
- rate-limit observations and recovery hints;
- cost estimates, observed spend, budget policy, and cost ceilings;
- provider, adapter, model, tool, and local-compute health;
- context ownership, continuity quality, handoff artifacts, and rebuild cost;
- task resource demand from Decision Engine;
- reservations, commitments, and wake conditions from Scheduler;
- usage and outcome events from Execution Layer;
- explicit human corrections, disablement, and overrides.

Every input carries a source, observed time, effective scope, freshness policy,
and confidence where the fact is not confirmed.

## Outputs

- versioned `ResourceSnapshot` for a defined task, project, or operating scope;
- normalized resource states with reason, source, freshness, and confidence;
- eligible, constrained, and ineligible resource facts;
- scarcity, threshold, reset, health, continuity, and budget signals;
- resource demand gaps;
- wait, preserve, reserve, rebuild, or reassign options;
- reevaluation and wake conditions for Scheduler;
- Mission Control summaries and alerts;
- resource events for audit and history.

Outputs are evidence for decisions and schedules, not authorization to execute.

## Internal State

- resource identities and their Provider Registry / Model Catalog references;
- current normalized status per resource and scope;
- raw observations and supersession links;
- quota windows, credits, rate limits, resets, and cooldowns;
- cost profiles, budget policies, and observed or estimated spend;
- availability and health states;
- tool and local-compute availability;
- context owner, continuity quality, portability, and preservation artifacts;
- active reservations and scheduler commitments;
- source health, freshness deadlines, confidence, and manual overrides;
- immutable snapshot and event history references.

Dynamic facts must never overwrite registry or catalog identity. Estimates must
never silently replace confirmed observations.

## Relationship with Provider Registry

Provider Registry owns stable provider, surface, account-kind, adapter, and
integration identity. Resource Manager references those identities and owns
their time-varying resource observations.

Provider Registry answers “what provider or surface is this?” Resource Manager
answers “what can this scoped provider resource support now, and how certain is
that answer?”

## Relationship with Model Catalog

Model Catalog owns model-family identity and documented capabilities. Resource
Manager references catalog entries when evaluating demand and records dynamic
availability, cost, health, tool access, and account-specific constraints.

Resource Manager cannot invent a capability to make a resource eligible. A
catalog change and a dynamic resource change remain separately attributable.

## Relationship with Decision Engine

Decision Engine declares task demand and requests a resource snapshot. Resource
Manager returns facts, constraints, alternatives, uncertainty, and continuity
or cost implications. Decision Engine applies strategy, governance, risk, and
human policy to choose or reject a plan.

Resource Manager must not rank plans by overall desirability. It may report
resource fitness and constraint violations, but Decision Engine owns the
decision and explanation.

## Relationship with Scheduler

Scheduler owns approved sequence, reservations, dependencies, and wake
conditions. Resource Manager supplies recovery times and resource state, then
records scheduler commitments as constraints on future snapshots.

Resource Manager cannot reserve or release capacity without a scheduler or
human command. Scheduler cannot treat an expired snapshot as current.

## Relationship with Mission Control Dashboard

Mission Control presents current resource state, provenance, freshness,
uncertainty, history, and alerts. It accepts manual entries and override
requests through the AI Executive Office.

The Dashboard is not a source of inferred truth. User-entered facts are stored
as manual observations or explicit overrides, remain attributable, and do not
erase conflicting provider observations.

## Failure Modes

- a source is unavailable, unauthorized, stale, malformed, or contradictory;
- provider, model, account, subscription, or project scopes are combined;
- quota, rate limit, health, and availability are treated as interchangeable;
- an estimate is presented as a confirmed balance or reset;
- an expired override remains active;
- a context owner or preservation artifact is lost;
- catalog capability and observed availability disagree;
- cost unit, currency, billing scope, or time window is ambiguous;
- local-compute telemetry is incomplete or privacy-sensitive;
- a reservation is double-counted or a snapshot is used after supersession;
- Resource Manager makes a decision or dispatches execution outside its
  authority.

When safe normalization is impossible, the affected state becomes `unknown` or
`unavailable`; uncertainty remains visible and downstream reevaluation is
requested.

## Observability

For every resource and snapshot, record:

- stable resource and scope identifiers;
- source, observation time, effective time, freshness, and confidence;
- previous and next state with transition reason;
- threshold, policy, and override versions;
- reset, cooldown, and reevaluation conditions;
- task demand evaluated and unmet requirements;
- cost and continuity implications;
- conflicting facts and normalization outcome;
- snapshot consumers and decision or schedule correlation;
- manual actor and reason for every correction or override.

Mission Control must distinguish observed, calculated, estimated, manual,
stale, and unknown values.

## Future Extensions

- predictive depletion and reset forecasting;
- resource reservations and multi-project allocation;
- budget envelopes and portfolio optimization;
- automated provider observations through reviewed adapters;
- local accelerator scheduling and energy-aware policies;
- context portability scoring and preservation automation;
- team resource pools and delegated budgets;
- policy simulation before resource or provider changes.

## Related Documents

- [Resource Data Model](RESOURCE_DATA_MODEL.md)
- [Resource State Model](RESOURCE_STATE_MODEL.md)
- [Context Continuity](CONTEXT_CONTINUITY.md)
- [Cost and Budget](COST_AND_BUDGET.md)
- [Resource Manager MVP](../product/RESOURCE_MANAGER_MVP.md)
- [Quota Manager Specification](QUOTA_MANAGER_SPEC.md)
- [Provider Registry](../providers/PROVIDERS.md)
- [Model Catalog](../providers/MODEL_CATALOG.md)
- [Component Contracts](COMPONENT_CONTRACTS.md)
