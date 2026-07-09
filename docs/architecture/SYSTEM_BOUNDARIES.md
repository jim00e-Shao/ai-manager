# System Boundaries

## Status

Draft architecture boundary. This document defines ownership and exclusions to
prevent scope creep. It does not define integration technology.

## Boundary Principle

ai-manager owns coordination, policy, context, memory, explanations, and human
control. External systems retain their native execution responsibilities.
Integration does not transfer ownership.

## Boundary Summary

| Domain | ai-manager owns | External domain owns | ai-manager does not become |
| --- | --- | --- | --- |
| AI Provider | selection policy, quota interpretation, request context, action record | model hosting, inference, provider availability, provider-native billing | a model host or training platform |
| IDE | workflow intent, context requests, governed actions, outcome history | editing experience, workspace behavior, language tooling | an IDE or editor |
| Git | policy around requested operations, workflow state, action provenance | repository objects, refs, commits, transport, hosting behavior | a source-control implementation or Git host |
| MCP | permission, capability registration, lifecycle, observability | protocol behavior and server-provided tools or resources | the MCP protocol or every MCP server |

## Inside ai-manager

ai-manager owns:

- user-defined goals, policies, preferences, and approval boundaries;
- task coordination and correlated operation state;
- provider-neutral quota normalization and scheduling eligibility;
- explainable model-routing policy and decision records;
- prompt definitions, composition decisions, and context references;
- workflow definitions, state transitions, retries, and review gates;
- context selection, authority, provenance, and omission reporting;
- durable manager-owned memory and its correction lifecycle;
- plugin capability, permission, health, and lifecycle state;
- Dashboard presentation of manager state and human controls;
- observability that connects user intent to AI actions and outcomes.

ai-manager may store references to external objects, but a reference does not
transfer ownership of the external object.

## AI Provider Boundary

### Provider Owns

- model infrastructure and inference execution;
- provider-specific model identifiers and capabilities;
- service availability, latency, and provider errors;
- native usage measurement, rate limits, quota, pricing, and billing;
- provider authentication and terms of service;
- provider-native safety behavior.

### ai-manager Owns

- whether a provider or model is eligible under user policy;
- normalized interpretation of provider quota and freshness;
- the task context and prompt package sent to a provider;
- explainable selection and fallback decisions;
- the record of what was requested and what outcome was returned;
- user approval boundaries around provider actions.

### Explicit Exclusions

ai-manager does not train, fine-tune, host, emulate, or guarantee provider
models. It does not redefine provider billing or claim unavailable provider
capacity.

## IDE Boundary

### IDE Owns

- text editing and workspace interaction;
- file buffers, editor navigation, and local editing state;
- language services, diagnostics, and native extensions;
- its own user-interface conventions and lifecycle.

### ai-manager Owns

- deciding which governed workflow or AI capability should be requested;
- supplying approved context and policy;
- recording the request, permission, action, and outcome;
- retaining cross-tool context and memory.

### Explicit Exclusions

ai-manager does not replace the editor, language server, debugger, terminal, or
IDE extension ecosystem. An IDE integration is an adapter to manager
capabilities, not a second orchestration authority.

## Git Boundary

### Git Owns

- repository object and reference semantics;
- commits, branches, tags, merges, and history;
- local transport and command behavior;
- integrity and conflict behavior defined by Git.

Git hosting services own their remote repository, review, issue, and access
features.

### ai-manager Owns

- workflow policy for when a Git action may be requested;
- human approval boundaries for consequential operations;
- task correlation and provenance for requested operations;
- interpretation of Git outcomes within a workflow;
- memory that links decisions to repository history.

### Explicit Exclusions

ai-manager does not implement source control, silently rewrite history, or treat
its workflow record as a replacement for the repository. Git remains
authoritative for Git state.

## MCP Boundary

### MCP Owns

- the protocol through which servers expose tools, resources, and prompts;
- protocol-compatible request and response behavior;
- server-defined capabilities and server-side execution;
- server availability and server-specific errors.

### ai-manager Owns

- which MCP servers are registered and enabled;
- which declared capabilities may be used;
- permission, policy, and human approval before use;
- correlation, provenance, observability, and failure handling;
- whether returned data can enter context or memory.

### Explicit Exclusions

ai-manager does not redefine MCP, automatically trust every MCP server, or grant
an MCP capability authority over manager policy or durable memory. MCP is one
integration mechanism, not the architecture of the entire product.

## Cross-Boundary Rules

- External facts preserve source and freshness.
- External failures remain visible and must not be converted into invented
  success.
- Credentials and permissions are scoped to the integration that requires them.
- External systems cannot bypass AI Manager policy, human-control gates, or
  observability.
- Provider, IDE, Git, and MCP terminology is translated only at documented
  integration boundaries.
- Durable product memory remains manager-owned even when source data originates
  externally.
- The Dashboard communicates through AI Manager rather than directly taking
  control of an external domain.

## Scope-Creep Test

Before adding a capability, ask:

1. Is this coordination or governance across AI systems?
2. Does it require manager-owned policy, context, memory, explanation, or human
   control?
3. Is the capability already native to a provider, IDE, Git, or MCP server?
4. Can ai-manager integrate with that native capability instead of rebuilding
   it?
5. Which component contract owns the manager-side responsibility?

If the capability has no manager-owned responsibility or duplicates an external
system without a coordination need, it is outside scope until the product and
architecture documents explicitly change.

## Related Documents

- [System Overview](SYSTEM_OVERVIEW.md)
- [Component Contracts](COMPONENT_CONTRACTS.md)
- [Data Flow](DATA_FLOW.md)
- [Glossary](GLOSSARY.md)
