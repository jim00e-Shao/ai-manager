# Resource Manager MVP

## Purpose

The first Resource Manager release gives a solo developer a trustworthy,
read-only view of manually maintained AI resources. It validates resource
identity, state, provenance, and continuity concepts before any automated
provider interaction.

## Primary User

A solo developer coordinating multiple AI providers, models, accounts, tools,
and local resources who needs to know what can support the next task without
opening every provider surface.

## MVP Outcomes

The user can:

- see provider, model, and account resources in one read-only Resource
  Dashboard;
- enter and correct resource observations manually;
- inspect quota status and expected reset time;
- inspect cost estimates and their source or confidence;
- inspect availability status and reason;
- see which model, agent, session, person, or Hermes package owns current
  context;
- distinguish fresh, stale, estimated, manual, and unknown values.

## In Scope

### Read-only Resource Dashboard

Mission Control presents resources and history but does not control provider
websites, purchase capacity, or dispatch work.

### Manual Resource Entry

Users can record provider, model, account, quota, reset, cost estimate,
availability, and context-owner facts. Every entry includes source, observed
time, and optional confidence or expiry.

### Provider / Model / Account Resource Display

Resources retain their separate scopes. The UI must not combine accounts or
models into a misleading provider total.

### Quota Status

Display normalized quota states supported by existing quota specifications,
including available, warning, limited, exhausted, cooling down, unknown, and
disabled where relevant.

### Reset Time

Display confirmed or estimated reset time with rule, timezone, source, and
confidence. Reaching the displayed time causes reevaluation, not assumed
recovery.

### Cost Estimate

Display manual or calculated cost estimates with unit, scope, source, and
confidence. The MVP does not claim billing-grade accuracy.

### Availability Status

Display available, warning, limited, exhausted, cooling down, unavailable,
degraded, unknown, or disabled with visible reasons and freshness.

### Context Owner

Display the current context owner and preservation status for a task or PR.
Content storage and automatic transfer are outside the MVP.

## Explicit Non-Goals

The MVP does not:

- log in to AI providers automatically;
- scrape provider websites or undocumented endpoints;
- bypass quotas, rate limits, billing, safety controls, or provider terms;
- control provider websites automatically;
- purchase credits or change subscriptions;
- dispatch models or tools;
- guarantee provider availability or billing accuracy;
- implement predictive allocation, autonomous routing, or scheduling;
- define a concrete UI framework, API, database, or deployment topology.

## Privacy and Safety Boundaries

- Credentials, session cookies, API keys, and full billing instruments are not
  resource fields.
- Manual records should contain the minimum account identifier needed to
  distinguish scope.
- Context metadata must not expose protected prompt, source, or conversation
  content by default.
- Local-compute observations must avoid collecting unrelated personal data.
- Unknown or stale status must never authorize execution.

## MVP Exit Criteria

- A user can register provider, model, and account resource identities manually.
- The Dashboard can present quota, reset, cost estimate, availability, and
  context owner as read-only state.
- Every dynamic value displays source and freshness.
- Manual, estimated, stale, and unknown states are visually distinguishable.
- No flow requires provider login, scraping, bypass, or automatic web control.
- Resource snapshots can later be consumed by Decision Engine without changing
  the documented authority boundary.

## Related Documents

- [Resource Manager](../architecture/RESOURCE_MANAGER.md)
- [Resource Data Model](../architecture/RESOURCE_DATA_MODEL.md)
- [Resource State Model](../architecture/RESOURCE_STATE_MODEL.md)
- [Context Continuity](../architecture/CONTEXT_CONTINUITY.md)
- [Cost and Budget](../architecture/COST_AND_BUDGET.md)
- [Quota Manager MVP](QUOTA_MANAGER_MVP.md)
