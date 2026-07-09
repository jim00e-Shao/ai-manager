# Quota Manager Research

## Status

Product and architecture research baseline for N1. Provider-specific behavior
still requires validation before implementation.

## Purpose

Quota Manager turns fragmented provider capacity information into trustworthy,
provider-neutral scheduling facts. It helps a developer answer:

- Which accounts and models can accept work now?
- How trustworthy and fresh is that information?
- When is capacity expected to reset?
- Is usage approaching a limit?
- Should work proceed, be deferred, or require manual review?

Quota Manager reports capacity. It does not select the best model; Model Router
uses quota status as one routing input.

## User Problems

### Fragmented Visibility

Usage limits, subscription allowances, API budgets, and rate windows live in
different provider interfaces and use incompatible terminology.

### Uncertain Capacity

Some providers expose exact API counters, some expose only plan-level messages,
and some expose no machine-readable quota. Users cannot safely treat every
number as equally authoritative.

### Reset Ambiguity

Limits may reset on fixed dates, rolling windows, provider-defined periods, or
unknown schedules. A displayed reset time without its rule and timezone is
misleading.

### Late Warnings

Users often discover exhaustion only when a task fails. Quota should influence
scheduling before execution.

### Account and Model Confusion

One provider may have multiple accounts, subscriptions, models, and independent
limits. A provider-level “available” label can hide an exhausted model or
disabled account.

## MVP Scope

The first MVP is a read-only dashboard backed by user-managed records.

It supports:

- manually recording Provider, Model, Account, and optional Subscription;
- manually setting quota status and source notes;
- optional usage, limit, remaining value, and unit;
- optional reset time and reset rule description;
- warning thresholds;
- visible source, freshness, and confidence;
- the display states `available`, `warning`, `exhausted`, and `unknown`;
- history of manual quota observations;
- no automatic provider action.

The full conceptual status model also defines `limited`, `cooling_down`, and
`disabled` so later stages do not need to redefine the contract.

## Non-Goals

N1 does not:

- choose a model or rank model quality;
- execute AI tasks;
- automatically log in to provider accounts;
- scrape provider websites;
- bypass provider limits, rate controls, or terms;
- automatically operate provider web interfaces;
- purchase quota or change subscriptions;
- guarantee provider-reported accuracy;
- support every provider or quota type;
- provide enterprise billing, chargeback, or financial accounting;
- predict exact future usage in the MVP.

## Provider Types

Provider type describes how capacity is offered, not a vendor identity.

### Subscription Provider

Provides access through a recurring plan. Limits may be message-based, model
specific, rolling, fair-use, or not numerically disclosed.

### API Provider

Provides metered access through keys or accounts. Capacity may include spend
budgets, token usage, request rates, concurrency, or prepaid credits.

### Local Provider

Provides models on user-controlled hardware. Capacity is usually constrained by
availability, concurrency, compute, memory, or local scheduling rather than a
commercial quota.

### Hybrid Provider

Combines subscription and API access, or offers several independently limited
products under one provider identity.

Provider type does not determine source quality. Each observation still carries
its own source and confidence.

## Subscription-Based Quota

Subscription quota may include:

- messages per fixed or rolling window;
- model-specific allowances;
- temporary access restrictions;
- plan-wide fair-use limits;
- reset times shown only in a provider interface;
- limits described qualitatively rather than numerically.

Required handling:

- associate the quota with an Account and Subscription;
- preserve provider wording in source notes when normalization is uncertain;
- never invent a numeric total from a qualitative limit;
- treat an undisclosed limit as `unknown` until manually observed otherwise;
- support manual reset time and status entry;
- keep plan entitlement separate from current availability.

## API-Based Quota

API quota may include:

- requests or tokens per time window;
- concurrent request limits;
- daily or monthly spend budgets;
- prepaid balance or credits;
- account, project, key, region, or model-specific limits.

Required handling:

- preserve the original dimension and unit;
- distinguish usage budget from instantaneous rate limits;
- treat each independent limiting dimension as a QuotaWindow;
- derive aggregate availability from the most restrictive applicable window;
- retain provider timestamps and retrieval time;
- report authorization or API failure separately from exhaustion.

API integration is a future stage. The first MVP may represent API quota through
manual records only.

## Manual Quota Tracking

Manual tracking is authoritative only as a user assertion.

Every manual observation should include:

- target Provider, Account, Model, Subscription, or QuotaWindow;
- entered status;
- observed or entered time;
- optional usage, limit, remaining value, unit, and reset time;
- optional source note;
- optional expiration time;
- actor identity where available.

Rules:

- manual data is labeled `manual`;
- it never claims provider verification;
- newer manual observations supersede older observations for the same scope but
  do not erase history;
- expired manual data becomes stale and may produce `unknown`;
- a manual override is explicit, attributable, reversible, and optionally
  time-bound.

## Estimated Quota Tracking

Estimated quota is a derived observation used when exact data is unavailable.

Possible inputs:

- user-entered starting allowance;
- locally recorded usage;
- historical consumption;
- known reset rules;
- incomplete provider observations.

Every estimate includes:

- estimation method and inputs;
- calculated time;
- confidence;
- uncertainty or error range when meaningful;
- expiration or recalculation condition.

Rules:

- estimates are labeled `estimated`;
- an estimate never replaces the source observations;
- low-confidence or stale estimates cannot silently elevate `unknown` to
  confirmed `available`;
- UI and downstream consumers can distinguish estimated from confirmed status;
- disagreement with newer provider data invalidates or supersedes the estimate.

Estimation is outside the first manual MVP.

## Reset Windows

A reset window defines when a limited capacity dimension renews or releases.

Supported conceptual forms:

- **fixed interval:** daily, weekly, monthly, or provider-defined period;
- **calendar boundary:** a known time in a specified timezone;
- **rolling window:** capacity expires relative to recorded use;
- **one-time reset:** manually supplied next reset time;
- **provider signaled:** returned by a provider source;
- **unknown:** no trustworthy reset information.

Requirements:

- store timezone or explicit offset with a reset time;
- distinguish rule from the next computed reset;
- record whether the time is provider-reported, manually entered, or estimated;
- never show a reset as certain when its rule is unknown;
- `reset_window_reached` triggers reevaluation, not automatic assumption of full
  capacity unless policy and source support it.

## Cooldown Periods

A cooldown is a temporary period during which work should not be scheduled even
if long-term quota remains.

Causes may include:

- rate-limit response;
- provider-requested retry delay;
- repeated transient failures;
- policy-imposed backoff;
- manual pause.

A cooldown includes start, expected end when known, reason, source, and affected
scope. Expiry triggers reevaluation. It does not prove quota availability.

## Warning Thresholds

Thresholds give advance notice before exhaustion.

Conceptual thresholds may be:

- percentage remaining;
- absolute remaining amount;
- consumed amount;
- expected time to exhaustion;
- time until reset with insufficient remaining capacity.

Rules:

- thresholds belong to QuotaPolicy;
- warning and critical/limited thresholds are distinct;
- the most restrictive applicable threshold wins;
- threshold evaluation preserves its input value and policy version;
- missing totals cannot produce percentage-based warnings;
- threshold changes trigger reevaluation and an observable event.

## Failure States

Quota failure is not equivalent to quota exhaustion.

| Failure | Required result |
| --- | --- |
| Source unavailable | retain last observation as stale; use `unknown` if freshness policy is exceeded |
| Authentication denied | report source failure; do not report exhausted |
| Malformed data | reject observation and preserve previous valid state |
| Conflicting observations | expose conflict; prefer policy-defined authority or use `unknown` |
| Unknown reset rule | display reset as unknown; do not invent a date |
| Clock uncertainty | mark reset and freshness calculations uncertain |
| Unsupported quota type | preserve source details and report unsupported |
| Manual data expired | transition to `unknown` unless another valid source exists |
| Estimate invalidated | remove estimate from decision basis and reevaluate |
| Account disabled | transition applicable scope to `disabled` |

## Privacy Constraints

Quota data can reveal account identity, provider usage, spending, working hours,
and commercial plan details.

Requirements:

- collect the minimum data needed for status and scheduling;
- do not store provider passwords or browser sessions;
- do not require automatic login for the MVP;
- treat API credentials as external secrets, not quota records;
- redact credentials and sensitive account identifiers from logs and events;
- make source provenance visible without exposing secrets;
- define retention and deletion for usage history;
- avoid sending quota data to an AI model unless a documented workflow requires
  it and the user permits it;
- keep one account's data isolated from another account and user scope;
- manual notes must warn users not to paste credentials.

## Open Research Questions

- Which providers expose stable, permitted quota APIs?
- Which freshness limits are appropriate for each source type?
- How should multiple independent limits aggregate into one routing signal?
- Which units can be normalized safely, and which must remain provider-specific?
- How should local-provider capacity be represented alongside commercial quota?
- Which history is useful for scheduling without collecting unnecessary data?

## Related Documents

- [Quota Manager MVP](../product/QUOTA_MANAGER_MVP.md)
- [Quota Manager Specification](../architecture/QUOTA_MANAGER_SPEC.md)
- [Quota Data Model](../architecture/QUOTA_DATA_MODEL.md)
- [Quota State Machine](../architecture/QUOTA_STATE_MACHINE.md)
- [Component Contracts](../architecture/COMPONENT_CONTRACTS.md)
