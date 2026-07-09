# Component Contracts

## Status

Draft architecture contract. This document defines conceptual responsibilities
and data boundaries without selecting implementation technologies, protocols,
schemas, process boundaries, or deployment topology.

## Contract Rules

- A component owns only the responsibilities and state named in its contract.
- Inputs and outputs are conceptual information, not finalized API schemas.
- Dependencies may be direct or mediated by AI Manager; no call topology is
  implied.
- Failures must remain explicit and observable. A component must not silently
  invent missing data or expand its authority.
- Future extensions require documentation review before they change a boundary.

## 1. AI Manager

### Purpose

Act as the application control plane that coordinates user intent, policy,
component decisions, human-control boundaries, and observable outcomes.

### Responsibilities

- accept goals, task constraints, and approval boundaries;
- coordinate quota, routing, prompt, workflow, context, memory, plugin, and
  presentation capabilities;
- enforce documented policy and component boundaries;
- maintain correlation across a task's decisions and actions;
- return coherent state and explanations to the Dashboard;
- prevent models and integrations from becoming authoritative over manager
  policy or durable memory.

### Input

- user commands, goals, preferences, and approvals;
- component results, warnings, and failures;
- product policy and configuration;
- provider and integration events;
- context and memory references.

### Output

- coordinated requests to internal components;
- user-visible status, decisions, explanations, and required approvals;
- task lifecycle events and correlation identifiers;
- policy decisions and rejected-operation reasons;
- records proposed for durable memory.

### Internal State

- active task and operation state;
- correlation between user intent, component decisions, and outcomes;
- current policy and approval context;
- component availability and health summary;
- references to authoritative context and durable records.

### External Dependencies

- Dashboard or other approved presentation clients;
- all manager-owned components defined in this document;
- documented configuration and product specifications;
- external capabilities accessed through Plugin Manager.

### Failure Modes

- required component unavailable or returns an invalid result;
- conflicting policy or approval state;
- incomplete task requirements;
- stale component health or configuration;
- loss of correlation between request, decision, and outcome;
- attempted boundary bypass by a component or external integration.

### Observability

- task and operation lifecycle;
- component requests, outcomes, duration, and failure category;
- policy and approval decisions;
- correlation across routing, prompting, workflows, provider actions, and
  memory writes;
- boundary violations and rejected requests.

### Future Extensions

- team-scoped policies and shared control planes;
- delegated approval models;
- planning across multiple workflows;
- additional presentation clients;
- distributed coordination, subject to a future ADR.

## 2. Quota Manager

### Purpose

Represent provider capacity as trustworthy scheduling information before AI work
is assigned.

### Responsibilities

- accept quota observations from approved sources;
- normalize provider-specific usage, limits, reset windows, and availability;
- preserve source, freshness, and uncertainty;
- evaluate reset, cooldown, threshold, and scheduling eligibility;
- maintain explicit availability status and transition history;
- distinguish provider-confirmed, manual, and estimated observations;
- report capacity facts without selecting a model;
- prevent unknown or stale data from appearing certain.

### Input

- provider quota observations and timestamps;
- manual observations and explicit overrides;
- estimated observations with method, confidence, and expiration;
- configured limits and reset rules;
- quota policy, warning thresholds, and freshness limits;
- cooldown, account enabled state, and expected demand;
- model-to-provider capability references;
- requests for capacity eligibility.

### Output

- normalized quota snapshots;
- `available`, `warning`, `limited`, `exhausted`, `cooling_down`,
  `unknown`, or `disabled` status with reason;
- reset and scheduling information;
- uncertainty and provenance;
- status-change and observation events;
- Dashboard read model and historical observation references;
- quota-related warnings and failure reasons.

### Internal State

- latest observations by provider, account, model, and quota dimension;
- observation freshness and source provenance;
- Provider, Model, Account, Subscription, policy, and window references;
- normalized limits, usage, reset windows, cooldowns, and thresholds;
- manual overrides and QuotaEstimates;
- current AvailabilityStatus and transition history;
- source health and synchronization status.

### External Dependencies

- provider quota sources accessed through approved integrations;
- time source for freshness and reset evaluation;
- configuration defining normalization and scheduling policy;
- Plugin Manager for provider-specific quota adapters.
- AI Manager for policy, user control, and correlated operations;
- Dashboard as a read-only consumer through AI Manager;
- Model Router as a future eligibility consumer through the documented boundary.

### Failure Modes

- provider data unavailable, delayed, contradictory, or malformed;
- manual observations stale, conflicting, or missing provenance;
- estimate expired, invalidated, or too uncertain;
- unknown reset semantics;
- authorization failure for a quota source;
- normalization rule missing or incompatible;
- unsupported or incompatible quota dimensions;
- status event cannot be recorded consistently;
- clock or freshness uncertainty.

### Observability

- source synchronization attempts and outcomes;
- freshness, provenance, and confidence for every quota value;
- accepted and rejected observations;
- normalization, conflict, stale-data, reset, and cooldown warnings;
- previous and next status with transition event and policy version;
- manual override actor, reason, scope, and expiration;
- scheduling eligibility decisions and rejected reasons.

### Future Extensions

- **Provider adapter extension point:** permitted API or plugin sources can
  contribute typed observations without owning normalized status.
- **Policy extension point:** additional thresholds, aggregation rules, and
  scheduling policies can be introduced through versioned policy.
- **Estimation extension point:** predictive consumption and time-to-exhaustion
  can contribute labeled estimates.
- **Scheduling extension point:** reservations and cross-task capacity planning
  can use existing eligibility outputs.
- **Scope extension point:** team, project, local-compute, cost-budget, and
  rate-limit dimensions can extend the conceptual model.

Detailed behavior is defined in
[QUOTA_MANAGER_SPEC.md](QUOTA_MANAGER_SPEC.md).

## 3. Model Router

### Purpose

Select or recommend an eligible model for a task and provide a reconstructable
explanation.

### Responsibilities

- evaluate documented task requirements;
- request current capacity eligibility from Quota Manager;
- compare candidate capabilities and constraints;
- apply routing policy, preferences, and fallback rules;
- return a selection or explicit no-route outcome;
- explain why each relevant candidate was selected, rejected, or deferred.

### Input

- task requirements and hard constraints;
- candidate model capability information;
- quota eligibility and uncertainty;
- routing policy and user preferences;
- workflow and tool requirements.

### Output

- selected or recommended model;
- ranked or evaluated candidate set where policy permits;
- applied constraints and decisive factors;
- rejected-candidate reasons;
- fallback or no-route result;
- decision record suitable for later inspection.

### Internal State

- active routing evaluation;
- candidate facts used for the decision;
- policy and preference version;
- references to quota snapshots;
- decision explanation and outcome.

### External Dependencies

- Quota Manager;
- model capability sources through Plugin Manager;
- AI Manager for task, policy, and user-control context;
- documented routing research and policy.

### Failure Modes

- no eligible model;
- incomplete or contradictory task requirements;
- missing or stale capability information;
- quota state unavailable or uncertain;
- routing policy conflict;
- inability to explain a result using retained inputs.

### Observability

- candidate set and evaluation sequence;
- hard constraints, preferences, and policy version;
- referenced quota snapshot;
- selected, rejected, and deferred reasons;
- user overrides and fallback activation;
- routing latency and failure category.

### Future Extensions

- multi-model routing within one workflow;
- learned recommendations constrained by explicit policy;
- quality and outcome feedback;
- policy simulation;
- routing across local and remote models.

## 4. Prompt Builder

### Purpose

Construct reproducible model input from an accepted prompt definition and
authoritative context without changing product intent.

### Responsibilities

- resolve a versioned prompt definition;
- request relevant context from Context Manager;
- validate required variables and context;
- adapt representation to selected model constraints;
- expose missing, truncated, or conflicting context;
- preserve references needed to reconstruct the model input.

### Input

- prompt definition and version;
- task requirements and workflow step;
- selected model and input constraints;
- context request and returned context package;
- user-supplied variables and policy constraints.

### Output

- model-ready prompt package;
- prompt, variable, and context references;
- validation result;
- truncation, omission, conflict, and uncertainty warnings;
- reproducibility metadata.

### Internal State

- prompt definitions and version references;
- active composition state;
- validated variable values;
- context references and ordering;
- model-specific adaptation decisions.

### External Dependencies

- Context Manager;
- Model Router output;
- documented prompt definitions;
- model capability information through approved integrations.

### Failure Modes

- prompt definition or version not found;
- required variable or context missing;
- incompatible model input constraints;
- context exceeds allowed capacity;
- conflicting authoritative context;
- non-reproducible composition.

### Observability

- prompt definition and version selected;
- context sources included, omitted, or truncated;
- variable validation without exposing protected values;
- model-specific adaptations;
- composition duration and failure category;
- link from prompt package to resulting provider action.

### Future Extensions

- prompt evaluation and promotion workflows;
- reusable composition policies;
- multimodal context;
- policy-controlled compression;
- provider-neutral prompt portability analysis.

## 5. Workflow Engine

### Purpose

Execute documented AI workflows as observable state transitions with explicit
permissions, failure paths, and human review gates.

### Responsibilities

- load an accepted workflow definition;
- manage steps, roles, state transitions, and completion conditions;
- request routing, prompting, provider, context, and memory capabilities through
  manager-owned boundaries;
- enforce approval, permission, retry, pause, resume, and cancellation rules;
- record workflow history and outcomes;
- refuse undocumented transitions.

### Input

- workflow definition and version;
- task, policy, and approval context;
- component decisions and action results;
- user approvals, rejections, pauses, and cancellations;
- retry and failure policy.

### Output

- current workflow state and allowed next transitions;
- component and plugin requests;
- approval requests;
- step results, warnings, and failure state;
- terminal outcome and workflow history.

### Internal State

- workflow instance and definition version;
- current step and transition history;
- pending approvals and permissions;
- retry counters and failure context;
- references to component decisions, provider actions, and produced artifacts.

### External Dependencies

- AI Manager;
- Model Router, Prompt Builder, Context Manager, and Memory Manager;
- Plugin Manager for external actions;
- Dashboard for human review and control.

### Failure Modes

- invalid or undocumented transition;
- required approval missing or expired;
- component or external action failure;
- retry limit exceeded;
- workflow definition incompatible with current policy;
- orphaned, duplicated, or contradictory execution state.

### Observability

- workflow definition and version;
- current and historical state;
- transition reason and actor;
- approvals, permissions, retries, and cancellations;
- component and external action correlation;
- terminal outcome and unresolved failure.

### Future Extensions

- reusable workflow composition;
- parallel and dependent task execution;
- team approval policies;
- long-running workflow recovery;
- simulation and dry-run modes.

## 6. Context Manager

### Purpose

Assemble task-relevant, authoritative context for components without becoming
the durable store of all knowledge.

### Responsibilities

- interpret a component's context requirements;
- locate relevant documentation, task, workflow, and memory sources;
- rank and package context while preserving provenance;
- expose freshness, authority, conflict, omission, and capacity constraints;
- enforce access policy;
- keep context selection distinct from prompt wording.

### Input

- context request and intended consumer;
- task and workflow scope;
- authoritative repository documents;
- current operation state;
- memory query results;
- access, relevance, and capacity policy.

### Output

- bounded context package;
- source references and authority classification;
- freshness and confidence indicators;
- conflict, omission, and truncation warnings;
- access-denied or insufficient-context result.

### Internal State

- active context request;
- discovered candidate sources;
- relevance and authority evaluation;
- selected source references and ordering;
- package budget and omission record.

### External Dependencies

- repository and documentation sources through approved integrations;
- Memory Manager;
- AI Manager task and policy context;
- Plugin Manager for external context providers.

### Failure Modes

- authoritative source unavailable;
- insufficient relevant context;
- conflicting sources with no governing decision;
- capacity budget exceeded;
- stale or unverifiable source;
- access denied or provenance lost.

### Observability

- context request purpose and consumer;
- candidate and selected source references;
- authority, freshness, and relevance signals;
- omitted, truncated, conflicting, and denied sources;
- package size and assembly duration;
- link from context package to prompt or decision that consumed it.

### Future Extensions

- semantic and structured retrieval;
- policy-controlled context compression;
- task-specific context profiles;
- cross-repository context;
- user feedback on relevance and omissions.

## 7. Memory Manager

### Purpose

Own durable, inspectable knowledge across models, tools, sessions, and
workflows while preserving provenance and human control.

### Responsibilities

- accept proposed memory records through policy;
- classify scope, authority, provenance, freshness, and retention;
- store and retrieve durable project, decision, workflow, and outcome memory;
- support correction, supersession, and deletion;
- detect conflicts with authoritative documentation;
- prevent model-generated memory from silently becoming product truth.

### Input

- proposed memory record and provenance;
- task, workflow, routing, prompt, action, and outcome references;
- memory query and scope;
- retention, access, and write policy;
- user corrections and deletion requests.

### Output

- accepted, rejected, or review-required write result;
- memory query results with provenance and confidence;
- conflict and staleness warnings;
- correction, supersession, and deletion result;
- references suitable for Context Manager.

### Internal State

- durable memory records and identifiers;
- source, authority, confidence, and freshness metadata;
- scope and access classification;
- supersession and correction history;
- retention and deletion status.

### External Dependencies

- AI Manager for policy and correlation;
- Context Manager as the primary retrieval consumer;
- Workflow Engine and external action records as memory sources;
- user-controlled durable storage boundary, to be selected later.

### Failure Modes

- write lacks provenance or policy authorization;
- conflicting or duplicate memory;
- stale memory presented without warning;
- retrieval scope leaks protected information;
- correction or deletion is incomplete;
- durable store unavailable or corrupted.

### Observability

- proposed, accepted, rejected, corrected, and deleted records;
- actor, source, authority, and policy for each write;
- query purpose and returned references;
- conflict and stale-memory detection;
- retention actions and storage health;
- use of memory in later context packages.

### Future Extensions

- configurable memory types and retention policies;
- shared team memory with explicit ownership;
- cross-project knowledge under access policy;
- memory quality review workflows;
- portable memory export and migration.

## 8. Plugin Manager

### Purpose

Control discovery, capability declaration, permission, lifecycle, and
observability for external integrations, including future MCP-based extensions.

### Responsibilities

- register and describe approved integrations;
- expose declared capabilities and required permissions;
- mediate configuration, enablement, disablement, and health;
- route external requests without granting undeclared authority;
- isolate plugin failures from manager decision history;
- preserve version and provenance for external actions.

### Input

- plugin or MCP capability manifest;
- user enablement and permission decisions;
- manager-owned external action request;
- plugin health, result, and error events;
- compatibility and configuration policy.

### Output

- available capability catalog;
- permission and compatibility result;
- mediated action result or failure;
- plugin health and lifecycle status;
- provenance and version metadata for external actions.

### Internal State

- registered integrations and versions;
- enabled or disabled status;
- granted permissions and configuration references;
- capability and compatibility metadata;
- health, failure, and lifecycle history.

### External Dependencies

- external plugins, MCP servers, providers, IDEs, Git hosts, and tools;
- AI Manager policy and user approvals;
- Dashboard for configuration and control;
- future isolation mechanism defined by ADR.

### Failure Modes

- invalid or incompatible capability declaration;
- required permission denied or revoked;
- plugin unavailable, slow, malformed, or deceptive;
- capability changes without compatible versioning;
- external action exceeds declared scope;
- failure isolation does not preserve manager state.

### Observability

- registration, enablement, update, and removal events;
- declared capabilities, permissions, and version;
- action requests, outcomes, duration, and failure category;
- health and compatibility state;
- permission changes and boundary violations;
- external provenance attached to downstream records.

### Future Extensions

- signed and verified extension metadata;
- sandboxed execution;
- plugin discovery catalogs;
- compatibility negotiation;
- community extension governance.

## 9. Dashboard

### Purpose

Provide the human-facing presentation layer for understanding and controlling
AI Manager without owning orchestration or product policy.

### Responsibilities

- display quota, routing, workflow, provider, context, memory, and plugin state;
- collect goals, constraints, preferences, and explicit approvals;
- present explanations, uncertainty, failures, and required action;
- let users pause, reject, override, retry, or cancel where policy permits;
- preserve accessibility and clarity at consequential control points;
- avoid hiding manager state behind conversational output.

### Input

- user interaction;
- AI Manager view state and events;
- component health and summarized observability;
- approval and control requests;
- explanations and warnings.

### Output

- validated user commands and preferences;
- approvals, rejections, overrides, and cancellations;
- navigation and inspection requests;
- presentation of system state without redefining it.

### Internal State

- presentation and navigation state;
- user input in progress;
- selected views and filters;
- non-authoritative cached display data;
- pending confirmation state.

### External Dependencies

- AI Manager as its authoritative application boundary;
- user environment and accessibility capabilities;
- no direct provider, Git, IDE, or MCP dependency.

### Failure Modes

- stale display state;
- user action submitted twice or without confirmation;
- explanation or warning omitted;
- loss of connection to AI Manager;
- inaccessible or ambiguous control;
- presentation cache mistaken for authoritative state.

### Observability

- user commands and confirmations, subject to privacy policy;
- view-state freshness;
- approval, override, retry, and cancellation events;
- presentation errors and disconnected state;
- correlation between displayed decision and authoritative manager record.

### Future Extensions

- additional local and remote presentation clients;
- team and operational views;
- configurable dashboards;
- notification surfaces;
- accessibility and localization expansion.

## Contract Change Process

Any change to component ownership, inputs, outputs, state, dependencies, or
failure semantics must update this document and related boundaries, flows, and
glossary before implementation. Technology-specific interfaces require separate
design documents or ADRs.
