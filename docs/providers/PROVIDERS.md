# Provider Registry

## Status

Draft shared specification for Resource Manager, Decision Engine, AI Router,
Workflow Engine, and Plugin Manager. Registry facts require source provenance
and review before they become decision or routing inputs.

## Purpose

The Provider Registry gives ai-manager one place to describe external AI
capabilities without coupling core components to product-specific names,
authentication, quota semantics, or interfaces.

It answers:

- What kind of external system is this?
- Which model families or agent capabilities can it expose?
- How can ai-manager access it?
- Which quota, health, tool, and risk facts are known?
- Which facts are verified, dynamic, planned, or unknown?

## Provider

In the core architecture, a **Provider** is an external system that supplies
model inference or related AI capabilities and reports provider-native
availability, usage, quota, errors, and billing facts.

Examples include direct model APIs and model gateways.

The registry also needs to represent consumer assistants, coding agents,
open-weight model families, and agent platforms because Quota Manager, Workflow
Engine, and Plugin Manager may integrate with them. These are called
**Provider Registry Entries**. An entry's `kind` prevents ai-manager from
pretending every product is a direct model provider.

## Model

A **Model** is a specific AI capability that accepts input and produces output.
It belongs to a Model Family and is exposed through one or more Provider
Registry Entries or local runtimes.

A Model:

- declares or is observed to have capabilities;
- has a lifecycle and version identity;
- may differ by endpoint, product plan, or runtime;
- does not own ai-manager policy, context, workflow state, or memory.

Exact model availability is dynamic. The registry stores discovery results and
provenance instead of treating a handwritten list as permanently current.

## Provider and Model Responsibilities

### Provider Responsibilities

- authenticate access according to its own terms;
- expose or document available models and product capabilities;
- execute requests or agent actions;
- report native errors, health, quota, and usage where supported;
- define native pricing, retention, safety, and rate-limit behavior;
- version or communicate material interface changes.

### Model Responsibilities

- process supported input modalities;
- produce supported outputs;
- advertise or document tool and structured-output behavior where possible;
- remain identifiable enough for decisions to be reconstructed.

### ai-manager Responsibilities

- normalize provider facts without erasing provenance;
- discover capabilities through approved adapters;
- keep observed facts separate from policy and recommendations;
- map quota into provider-neutral scheduling status;
- route only from sufficiently current capability and quota facts;
- retain explanations, health, risk, and version context;
- require human control for consequential external actions.

## Registry Entry Kinds

| Kind | Meaning | Examples in the initial matrix |
| --- | --- | --- |
| `consumer_assistant` | Human-facing hosted assistant with provider-managed model selection and plan limits. | ChatGPT, Claude, Gemini |
| `coding_agent` | Coding-focused product that operates on repositories and tools. | Codex, Antigravity |
| `open_weight_family` | Downloadable model family run through user-selected infrastructure. | GPT-OSS |
| `agent_platform` | Agent runtime that delegates inference to configured model providers. | OpenHands, OpenCode |
| `model_gateway` | Unified API and routing layer over multiple model providers. | OpenRouter |

An entry can gain additional kinds only through an explicit registry update.

## Registry Record

Each Provider Registry Entry contains:

- stable registry identifier;
- display name and owning organization or project;
- registry kind;
- official source links;
- authentication modes;
- access surfaces;
- model discovery method;
- capability discovery method;
- quota and reset discovery method;
- tool and MCP status;
- API, CLI, desktop, and browser availability;
- cost-model category;
- health and version facts;
- strengths, weaknesses, recommended tasks, limitations, and risks;
- verification timestamp and source provenance;
- enabled, disabled, deprecated, or unknown registry status.

The record is conceptual. It does not prescribe storage.

## Source Authority

Registry facts use the following precedence:

1. current official product or API documentation;
2. machine-readable official discovery endpoint;
3. approved adapter observation with timestamp and provenance;
4. explicit manual observation;
5. estimate or inference, labeled as such.

Conflicting facts remain visible. A lower-authority source cannot silently
overwrite a higher-authority fact.

## Freshness and Unknown Values

- Every dynamic fact has `verified_at` or `observed_at`.
- Model names, prices, quota, context limits, and surface availability can
  expire independently.
- `Unknown` means official evidence was not established; it does not mean
  unsupported.
- `Planned` is used only for an ai-manager roadmap commitment or an official
  provider commitment with a source.
- Missing data never becomes a favorable routing assumption.

## Registry Consumers

### Quota Manager

Uses entry kind, account scope, quota type, reset policy, source method, and
health. It remains authoritative for normalized availability status.

### Resource Manager

Combines provider/model facts with quota, cost, credits, health, context
capacity, and tool availability.

### Decision Engine

Uses current capability, risk, cost, and recommended-usage facts as one input to
the governed plan. It remains authoritative for the recommendation.

### AI Router

Uses eligible Provider, Model, surface, and adapter facts for an approved
execution step. Model Router ranks models only inside this boundary.

### Workflow Engine

Uses available surfaces, tools, permissions, failure semantics, and human-review
requirements. It does not assume every registry entry supports automation.

### Plugin Manager

Uses adapter identity, capability discovery, authentication requirements,
version compatibility, health, and lifecycle.

## Governance

- Registry updates are documentation-first.
- Dynamic facts are not copied into routing policy without provenance.
- Provider marketing language is not treated as comparative evidence.
- Recommendations identify their assumptions and are reviewed independently.
- Security or privacy risk can disable an entry without deleting its history.
- A Provider Adapter cannot expand the registry entry's authority.

## Initial Registry

The initial registry covers:

- ChatGPT;
- Claude;
- Gemini;
- Codex;
- GPT-OSS;
- OpenHands;
- OpenCode;
- Antigravity;
- OpenRouter.

See [Capability Matrix](CAPABILITY_MATRIX.md) for the reviewed baseline.

## Related Documents

- [Provider Abstraction](PROVIDER_ABSTRACTION.md)
- [Model Catalog](MODEL_CATALOG.md)
- [Provider Selection Guide](PROVIDER_SELECTION_GUIDE.md)
- [Quota Manager Specification](../architecture/QUOTA_MANAGER_SPEC.md)
- [Component Contracts](../architecture/COMPONENT_CONTRACTS.md)
