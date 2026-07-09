# Quota Manager Specification

## Status

Draft conceptual architecture specification for N1. It defines implementable
behavior without selecting APIs, storage, frameworks, or deployment topology.

## Responsibility

Quota Manager converts quota observations into provider-neutral availability and
scheduling facts.

It owns:

- quota observation validation and normalization;
- source, freshness, confidence, and uncertainty;
- reset, cooldown, and threshold evaluation;
- current availability status by applicable scope;
- history and events needed to explain status;
- eligibility output consumed by Resource Manager and later by AI Router for an
  approved execution step.

It does not own model-quality ranking, provider execution, credentials, prompt
construction, or task routing.

## Inputs

| Input | Description |
| --- | --- |
| Provider observation | Usage, limit, remaining, reset, status, and source metadata. |
| Manual observation | User-asserted status and optional numeric values. |
| Estimated observation | Derived value with method, confidence, and expiration. |
| Quota policy | Thresholds, freshness, priority, reservation, and aggregation rules. |
| Reset rule | Fixed, calendar, rolling, one-time, provider-signaled, or unknown rule. |
| Usage record | A confirmed or user-recorded consumption event. |
| Provider/account state | Enabled, disabled, authorization, and source-health facts. |
| Manual override | Attributable, reversible, optionally expiring status or policy change. |
| Time | Current time used for freshness, reset, cooldown, and window evaluation. |
| Eligibility request | Scope and expected demand for a future routing decision. |

Every observation includes its target scope, observation time, ingestion time,
source type, and provenance.

## Outputs

- current AvailabilityStatus and reason;
- normalized QuotaWindow snapshots;
- usage, limit, remaining, reset, and cooldown facts where known;
- source, freshness, confidence, and uncertainty;
- warning and threshold evaluation;
- capacity eligibility for a requested scope and demand;
- explicit unknown, disabled, or failure result;
- events describing accepted observations and state transitions;
- read model for Dashboard;
- historical records for inspection.

An output never implies greater certainty than its source.

## Internal State

- registered Provider, Model, Account, and Subscription references;
- active QuotaPolicy by scope;
- current and historical QuotaWindow instances;
- validated UsageRecords;
- active ResetRules and computed next reset;
- QuotaEstimates and invalidation status;
- current AvailabilityStatus with reason and basis;
- active cooldown and manual override;
- source health, last successful observation, and freshness;
- event history and correlation references.

Internal state is conceptual. Persistence and process boundaries require later
design decisions.

## Data Model

Quota Manager uses the conceptual entities defined in
[QUOTA_DATA_MODEL.md](QUOTA_DATA_MODEL.md):

- Provider;
- Model;
- Account;
- Subscription;
- QuotaPolicy;
- QuotaWindow;
- UsageRecord;
- ResetRule;
- QuotaEstimate;
- AvailabilityStatus.

Identity is explicit. Provider, Account, Model, Subscription, and QuotaWindow
must not be collapsed into a single “provider quota” record because each can
carry independent limits.

## Status Model

| Status | Meaning | Schedulable by default |
| --- | --- | --- |
| `available` | Trustworthy capacity is above warning thresholds. | Yes |
| `warning` | Capacity is usable but has crossed a warning threshold. | Yes, with warning |
| `limited` | Some capacity remains, but critical threshold or policy restriction limits eligible demand. | Only within reported limit |
| `exhausted` | Trustworthy applicable capacity is depleted. | No |
| `cooling_down` | Temporary backoff prevents scheduling until reevaluation. | No |
| `unknown` | Current trustworthy availability cannot be established. | No |
| `disabled` | User or policy has excluded the scope from use. | No |

Status includes:

- scope;
- status value;
- reason code and explanation;
- effective time;
- source basis;
- freshness;
- confidence;
- applicable reset or cooldown time;
- policy version;
- superseded status reference where applicable.

The state transition contract is defined in
[QUOTA_STATE_MACHINE.md](QUOTA_STATE_MACHINE.md).

## Event Model

Events describe facts and decisions; they do not replace current state.

| Event | Meaning |
| --- | --- |
| `quota_observation_received` | A source supplied a quota observation. |
| `quota_observation_rejected` | Validation failed; current valid state remains. |
| `usage_recorded` | Consumption was recorded for a quota window. |
| `quota_warning_detected` | Warning policy became true. |
| `quota_limited_detected` | Critical or demand restriction became true. |
| `quota_exhausted_detected` | Applicable capacity reached a known hard limit. |
| `cooldown_started` | Temporary scheduling backoff began. |
| `cooldown_ended` | Cooldown ended and status requires reevaluation. |
| `reset_window_reached` | A reset boundary was reached. |
| `manual_override_applied` | A user or policy override became active. |
| `manual_override_expired` | An override ended and status requires reevaluation. |
| `provider_error` | Provider observation failed without proving exhaustion. |
| `source_became_stale` | Freshness policy was exceeded. |
| `account_disabled` | Account became ineligible by explicit control. |
| `account_enabled` | Account returned to reevaluation. |
| `status_changed` | Effective AvailabilityStatus changed. |
| `estimate_invalidated` | An estimate can no longer participate in evaluation. |

Every event includes event type, target scope, occurred time, recorded time,
source, correlation reference, and non-secret reason metadata.

## Decision Rules

### Source Authority

1. Valid provider-confirmed observations outrank estimates for the same fact.
2. Explicit manual overrides outrank normal calculation only within their
   documented scope and lifetime.
3. Manual observations are user assertions, not provider-confirmed facts.
4. Estimates remain labeled and cannot erase source observations.
5. Conflicting equally authoritative observations produce `unknown` unless a
   documented policy resolves them.

### Status Precedence

Evaluate in this order:

1. explicit disabled scope → `disabled`;
2. active cooldown → `cooling_down`;
3. missing, stale, invalid, or irreconcilable basis → `unknown`;
4. known hard depletion → `exhausted`;
5. known critical restriction → `limited`;
6. warning threshold crossed → `warning`;
7. trustworthy usable capacity → `available`;
8. otherwise → `unknown`.

### Window Aggregation

- Evaluate every applicable independent QuotaWindow.
- The most restrictive applicable status governs the requested demand.
- A known available window cannot hide another exhausted required window.
- Unknown required capacity produces unknown eligibility unless policy explicitly
  allows a narrower, known scope.
- Units are not combined unless a documented normalization is valid.

### Reset and Cooldown

- Reaching a reset or cooldown end triggers reevaluation.
- A timer alone does not prove replenishment.
- Provider-confirmed reset may create a new window according to its ResetRule.
- Unknown reset remains unknown.

### Manual Override

- Includes actor, reason, scope, applied time, and optional expiration.
- Can be inspected and reversed.
- Cannot falsify source provenance.
- Expiry triggers reevaluation from non-override inputs.

## Fallback Behavior

- Missing current data → return `unknown`, not `available`.
- Source outage with still-fresh last value → retain value with degraded source
  health; show age.
- Source outage after freshness expires → `unknown`.
- Malformed observation → reject it and retain the previous valid observation
  only while freshness policy permits.
- Conflicting data → expose conflict and use policy-defined authority or
  `unknown`.
- Unknown reset → retain status only while observation remains valid; show no
  invented reset time.
- Estimate unavailable → continue with confirmed/manual data or `unknown`.
- Event recording failure → status update is not considered fully committed;
  expose an observability failure.
- Router eligibility request without expected demand → return current status and
  state that demand-specific eligibility was not evaluated.

## Observability

Quota Manager exposes:

- observation source, type, occurred time, ingestion time, and freshness;
- validation and normalization result;
- status before and after reevaluation;
- rule, threshold, and policy version used;
- reset and cooldown calculations;
- rejected and conflicting observations;
- source health and authorization failures;
- manual override actor, reason, scope, and lifetime;
- eligibility requests and reasons;
- event-recording health.

Secrets, provider credentials, and sensitive account identifiers are redacted.

## Failure Modes

| Failure | Behavior |
| --- | --- |
| Provider unavailable | Preserve source error; use fresh prior data or `unknown`. |
| Authorization failure | Report source failure; never map to exhausted. |
| Invalid observation | Reject and emit validation failure. |
| Conflicting sources | Apply authority policy or return `unknown`. |
| Stale data | Mark stale and transition to `unknown` when policy requires. |
| Unknown reset | Keep reset unknown; do not infer a date. |
| Clock uncertainty | Degrade reset, cooldown, and freshness confidence. |
| Unsupported unit | Preserve raw fact; do not normalize or aggregate. |
| Estimate invalid | Remove it from decision basis and reevaluate. |
| Event history unavailable | Report degraded/uncommitted state; do not hide loss. |
| Account disabled | Return `disabled` for applicable scope. |
| Policy invalid | Reject policy and retain last valid policy where safe. |

## Future Extensions

- permitted provider API integrations;
- predictive usage and time-to-exhaustion;
- reservation and cross-task scheduling;
- team and project capacity policies;
- cost budgets and spend forecasting;
- local model compute capacity;
- multiple independent quota dimensions;
- Router demand reservations and release;
- privacy-preserving aggregated analytics;
- plugin-provided quota adapters.

## Related Documents

- [Quota Manager Research](../research/QUOTA_MANAGER.md)
- [Quota Manager MVP](../product/QUOTA_MANAGER_MVP.md)
- [Quota Data Model](QUOTA_DATA_MODEL.md)
- [Quota State Machine](QUOTA_STATE_MACHINE.md)
- [Component Contracts](COMPONENT_CONTRACTS.md)
