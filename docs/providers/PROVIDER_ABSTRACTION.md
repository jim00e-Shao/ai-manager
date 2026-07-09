# Provider Abstraction

## Status

Draft conceptual contract. It defines integration responsibilities without
choosing programming interfaces, schemas, frameworks, or plugin packaging.

## Design Goal

Provider-specific behavior should stop at a documented adapter boundary.
Quota Manager, Model Router, Workflow Engine, and Plugin Manager consume
provider-neutral facts with provenance rather than embedding vendor logic.

## Provider Interface

The conceptual Provider Interface exposes six capability groups:

| Capability group | Responsibility |
| --- | --- |
| Identity | Stable entry identity, kind, owner, official sources, and version. |
| Authentication | Supported access modes, required user action, and credential references. |
| Discovery | Models, capabilities, surfaces, and lifecycle facts. |
| Quota | Native limits, usage, reset, cooldown, confidence, and unsupported states. |
| Execution | Supported request or agent-action categories and result semantics. |
| Health | Availability, degradation, authorization, compatibility, and last successful observation. |

The interface returns facts, not routing decisions. Unsupported and unknown are
different results.

## Provider Adapter

A Provider Adapter translates one external product or runtime into the Provider
Interface.

It is responsible for:

- mapping external identity to a registry entry;
- declaring which capability groups it implements;
- authenticating through approved secret references;
- discovering dynamic facts when permitted;
- preserving raw provider identifiers and source timestamps;
- translating errors without disguising their origin;
- redacting credentials and sensitive account data;
- exposing adapter and upstream versions;
- degrading safely when discovery is unavailable.

It is not responsible for:

- choosing a model;
- defining global quota status;
- writing prompts or workflow policy;
- granting itself permissions;
- storing durable product memory;
- scraping or automating a product unless explicitly permitted and documented.

## Capability Discovery

Capability Discovery determines what an entry and its models can currently do.

Discoverable capability categories include:

- input and output modalities;
- reasoning or general interaction category;
- tool or function calling;
- structured output;
- file, browser, shell, repository, or computer interaction;
- MCP client or server role;
- supported access surfaces;
- model lifecycle and deprecation;
- context-size category without requiring a fixed token value.

Each fact includes:

- value;
- source;
- discovery method;
- observed time;
- confidence;
- applicable entry, model family, model, surface, and account scope;
- expiration or refresh policy.

Static documentation may seed the catalog, but runtime discovery supersedes it
when the source is authoritative and compatible.

## Quota Discovery

Quota Discovery reports native facts to Quota Manager.

Possible results:

- exact API usage and limit;
- subscription status or reset message;
- locally observed capacity;
- manual-only tracking required;
- estimate available;
- unsupported;
- authorization required;
- unknown.

An adapter must:

- preserve native unit and scope;
- distinguish plan entitlement from current capacity;
- preserve reset timezone and uncertainty;
- distinguish source failure from exhaustion;
- avoid inferring quota from model response quality;
- never bypass provider access controls or terms.

Quota Manager, not the adapter, derives the normalized availability status.

## Health Status

Provider and adapter health are separate.

| Status | Meaning |
| --- | --- |
| `healthy` | Required discovery or execution capability responded normally. |
| `degraded` | Capability works with known limitations or partial data. |
| `unavailable` | Required capability cannot currently be used. |
| `unauthorized` | Authentication or permission is absent or rejected. |
| `incompatible` | Adapter and upstream contract cannot interoperate safely. |
| `unknown` | No sufficiently current health evidence exists. |
| `disabled` | User or policy has disabled the entry or adapter. |

Health does not equal quota. A healthy provider can have exhausted quota, and an
unavailable discovery endpoint does not prove exhausted quota.

## Versioning

Versioning records:

- registry schema version;
- registry entry revision;
- adapter version;
- upstream API or product version where available;
- model identity and lifecycle status;
- capability observation version;
- compatibility range;
- last verified time.

Rules:

- breaking adapter changes require a compatibility review;
- dynamic model aliases do not replace stable observed identity where available;
- deprecated models remain in history but are not recommended by default;
- unversioned upstream changes can move health to `incompatible` or `unknown`;
- routing records retain the versions used for the decision.

## Failure Contract

| Failure | Provider-neutral result |
| --- | --- |
| Authentication rejected | `unauthorized` with provider reason and no secret data |
| Provider unavailable | `unavailable` or `degraded`; quota remains separately evaluated |
| Discovery unsupported | explicit unsupported capability |
| Discovery stale | prior fact marked stale; no silent refresh assumption |
| Response malformed | rejected observation and adapter failure |
| Capability conflict | retain both facts and require authority resolution |
| Version mismatch | `incompatible` until reviewed |
| Rate limit | native rate/cooldown fact sent to Quota Manager |
| Adapter disabled | no discovery or execution; history retained |

## Future Plugin Architecture

Provider Adapters are expected to become a Plugin Manager extension point.

A future provider plugin should declare:

- registry entry kinds and identifiers it supports;
- capability groups implemented;
- permissions and secret references required;
- supported authentication flows;
- discovery and execution surfaces;
- version and compatibility metadata;
- health checks and failure categories;
- data retention and privacy behavior;
- whether it uses API, CLI, desktop bridge, browser, MCP, or local runtime.

Plugin installation does not imply trust or enablement. Users review permissions,
and AI Manager remains authoritative over policy and human-control gates.

## Extension Sequence

1. Manual registry facts.
2. Read-only official discovery.
3. Quota and health observations.
4. Provider-neutral execution where explicitly allowed.
5. Plugin-distributed adapters with compatibility and permission controls.

Each step requires reviewed scope and must remain useful when later steps are
unavailable.

## Related Documents

- [Provider Registry](PROVIDERS.md)
- [Capability Matrix](CAPABILITY_MATRIX.md)
- [Model Catalog](MODEL_CATALOG.md)
- [Plugin Manager Contract](../architecture/COMPONENT_CONTRACTS.md)
- [System Boundaries](../architecture/SYSTEM_BOUNDARIES.md)
