# Component Contracts

## Status

Draft conceptual contracts for the AI Executive Office architecture. Inputs and
outputs are information contracts, not API schemas or implementation topology.

## Contract Rules

- Components own only documented responsibility and state.
- Advisors recommend; Decision Engine aggregates; humans decide; Execution acts.
- Missing or stale facts remain visible.
- External systems cannot acquire manager authority through integration.
- Contract changes require documentation review before implementation.

## 1. AI Executive Office

### Purpose

Act as the AI Chief of Staff and application control plane around developer
goals, advisors, resources, knowledge, decisions, scheduling, and execution.

### Responsibilities

- maintain the current operating picture;
- coordinate Strategy Council, Decision Engine, Resource Manager, Hermes,
  Scheduler, and Execution;
- enforce product policy and human-control boundaries;
- correlate goals, recommendations, decisions, actions, and outcomes;
- expose coherent state through Mission Control.

### Input

- developer goals, priorities, constraints, approvals, and overrides;
- advisor recommendations;
- resource and knowledge snapshots;
- decisions, schedules, execution events, and failures.

### Output

- advisor and decision requests;
- explainable recommendations and confirmation requests;
- approved plan and scheduling intent;
- Mission Control state;
- correlated decision and outcome records.

### Internal State

- active goals and priorities;
- operating-picture version;
- pending decisions and confirmations;
- component health and correlation references;
- current approved plan.

### External Dependencies

- Mission Control Dashboard;
- all manager-owned components;
- authoritative product specifications;
- external capabilities only through Execution Layer.

### Failure Modes

- operating picture inconsistent or stale;
- required component unavailable;
- goal and plan lose correlation;
- human authority or policy bypass attempted;
- execution diverges from approved plan.

### Observability

- goal and plan lifecycle;
- component requests and health;
- recommendations, confirmations, overrides, and dispatch;
- divergence and boundary violations;
- end-to-end outcome correlation.

### Future Extensions

- multi-project portfolio coordination;
- team roles and delegated approvals;
- scenario planning;
- additional presentation clients.

## 2. Strategy Council

### Purpose

Produce specialized, inspectable recommendations before Decision Engine forms a
plan.

### Responsibilities

- select relevant advisor roles;
- provide a shared goal and authoritative baseline;
- collect independent architecture, resource, knowledge, cost, risk, and
  execution recommendations;
- preserve disagreement and confidence;
- prevent advisors from executing directly.

### Input

- goal and decision question;
- product policy and architecture;
- resource and knowledge snapshots;
- advisor availability and role versions.

### Output

- structured advisor recommendations;
- missing-evidence and abstention reports;
- conflicts and shared assumptions;
- reevaluation triggers.

### Internal State

- active council request;
- participating advisors and role versions;
- recommendation completeness;
- source and confidence references.

### External Dependencies

- AI Executive Office;
- Knowledge Manager / Hermes;
- Resource Manager;
- advisor definitions in [ADVISOR_MODEL.md](ADVISOR_MODEL.md).

### Failure Modes

- relevant lens omitted;
- duplicated advice creates false confidence;
- shared stale context biases all advisors;
- recommendation malformed or execution attempted;
- uncertainty hidden.

### Observability

- advisors requested and reasons;
- inputs, sources, confidence, and latency;
- recommendations, abstentions, and conflicts;
- rejected malformed advice.

### Future Extensions

- project-specific advisor roles;
- independent challenge advisor;
- simulation councils;
- advisor-quality feedback.

## 3. Decision Engine

### Purpose

Reconcile goals, advisor recommendations, resources, knowledge, policy, and
constraints into an explainable proposed plan.

### Responsibilities

- validate advisor and source inputs;
- separate hard constraints from preferences;
- apply governance weights, vetoes, and override rules;
- resolve or expose conflicts;
- recommend act, wait, reassign, split, preserve context, or clarify;
- create an execution plan and confirmation boundary;
- record accepted and rejected alternatives.

### Input

- developer goal and acceptance criteria;
- Strategy Council recommendations;
- Resource Manager and Hermes snapshots;
- policy, deadline, risk, cost, and architecture constraints;
- prior decisions and human overrides.

### Output

- recommendation and alternatives;
- execution plan;
- advisor acceptance/rejection explanation;
- human-confirmation request;
- decision record and reevaluation trigger.

### Internal State

- active decision;
- advisor inputs and evidence versions;
- hard constraints, preferences, weights, and vetoes;
- alternatives and selected recommendation;
- confirmation and override status.

### External Dependencies

- Strategy Council;
- Resource Manager;
- Knowledge Manager / Hermes;
- Decision Governance and Conflict Resolution specifications;
- AI Executive Office.

### Failure Modes

- required evidence missing or stale;
- policy conflict cannot be resolved;
- hidden weight or veto;
- false consensus;
- no eligible plan;
- recommendation cannot be explained.

### Observability

- input versions and confidence;
- weights, constraints, vetoes, and conflicts;
- alternatives considered;
- recommendation rationale;
- confirmation, override, and outcome linkage.

### Future Extensions

- scenario comparison;
- policy simulation;
- decision-outcome learning under explicit governance;
- portfolio-level prioritization.

## 4. Resource Manager

### Purpose

Own the Resource Layer operating picture for every resource that can sustain or
interrupt AI-assisted development.

### Responsibilities

- aggregate quota, credit, rate-limit, reset, cost, availability, provider
  health, model capability, tool, context-continuity, and local-compute facts;
- reference Provider Registry and Model Catalog without duplicating their
  identity or capability authority;
- preserve source, freshness, confidence, scope, unit, and uncertainty;
- evaluate demand-sensitive normalized resource states;
- identify scarcity, exhaustion, degradation, continuity loss, and budget risk;
- provide immutable decision-ready resource snapshots;
- expose recovery and reevaluation conditions to Scheduler;
- provide attributable read-only state to Mission Control.

### Input

- Provider Registry identity, account surface, adapter, and health facts;
- Model Catalog capability references;
- quota observations, usage, policies, windows, resets, and cooldowns;
- credits, rate limits, cost profiles, budgets, and ceilings;
- availability, tool, and local-compute observations;
- context owner, continuity, portability, and rebuild cost;
- task demand from Decision Engine;
- reservations and commitments from Scheduler;
- execution usage and outcome events;
- human corrections and manual overrides.

### Output

- versioned resource inventory and normalized state;
- eligible, constrained, and ineligible resource facts;
- scarcity, health, cost, reset, continuity, and opportunity-cost warnings;
- wait, preserve, reserve, rebuild, or reassign options;
- snapshot and unmet demand for Decision Engine;
- wake and reevaluation conditions for Scheduler;
- sourced status and history for Mission Control;
- attributable resource events.

### Internal State

- conceptual entities defined in
  [RESOURCE_DATA_MODEL.md](RESOURCE_DATA_MODEL.md);
- current state and transitions defined in
  [RESOURCE_STATE_MODEL.md](RESOURCE_STATE_MODEL.md);
- Provider Registry and Model Catalog references;
- raw observations, supersession, freshness, confidence, and overrides;
- quota, credit, rate-limit, reset, cooldown, cost, and budget state;
- availability, provider health, tool, and local-compute state;
- context owner, portability, preservation, and rebuild state;
- reservations, scheduler commitments, snapshots, and event references.

### External Dependencies

- [Provider Registry](../providers/PROVIDERS.md);
- [Model Catalog](../providers/MODEL_CATALOG.md);
- quota capability specifications;
- Plugin Manager and Provider Adapter health facts;
- Knowledge Manager / Hermes for context sources;
- Decision Engine for declared demand;
- Scheduler for commitments and wake conditions;
- trusted time and human-controlled manual records.

### Failure Modes

- incompatible scopes aggregated;
- stale or estimated facts treated as confirmed;
- quota, rate limit, health, and availability conflated;
- Registry or Catalog authority duplicated;
- cost unit, billing scope, or ceiling ambiguous;
- context owner, preservation artifact, or rebuild cost lost;
- reservation conflict or snapshot used after supersession;
- local-compute or tool dependency omitted;
- Resource Manager selects a plan or dispatches execution.

### Observability

- resource identity, scope, source, unit, freshness, and confidence;
- previous and next state with transition reason;
- thresholds, policies, overrides, resets, and cooldowns;
- inventory, reservation, cost, health, and continuity changes;
- demand evaluated, unmet requirements, and alternatives;
- snapshot version used by each decision and schedule;
- rejected, stale, or conflicting facts and their normalization outcome.

### Future Extensions

- predictive capacity planning;
- multi-project allocation;
- budget envelopes and portfolio optimization;
- automated observations through reviewed adapters;
- context portability scoring and preservation automation;
- local accelerator and developer-attention scheduling;
- team resource pools and delegated budgets.

## 5. Quota Manager

### Purpose

Act as Resource Manager's quota-specific capability by converting
provider-native limits and observations into trustworthy resource facts.

### Responsibilities

- validate and normalize provider, API, subscription, manual, and estimated
  quota observations;
- evaluate reset, cooldown, warning, limited, exhausted, unknown, and disabled
  states;
- preserve provenance, freshness, confidence, and history;
- provide demand-aware quota eligibility to Resource Manager without selecting
  a model, plan, or schedule.

### Input

- quota observations and usage records;
- reset rules, thresholds, cooldowns, and policies;
- account and subscription state;
- manual overrides and expected demand.

### Output

- normalized availability status and reason;
- quota windows, reset, freshness, and confidence;
- status events and history;
- eligibility facts for Resource Manager.

### Internal State

- quota entities defined in [QUOTA_DATA_MODEL.md](QUOTA_DATA_MODEL.md);
- current and historical status;
- source health, overrides, estimates, and policy versions.

### External Dependencies

- provider adapters through Plugin Manager;
- trusted time source;
- Resource Manager as the owning Resource Layer component;
- user-controlled manual records.

### Failure Modes

- source unavailable, unauthorized, stale, malformed, or conflicting;
- reset semantics unknown;
- estimate invalid;
- event history unavailable;
- unsupported quota dimension.

### Observability

- observation validation and source health;
- status transitions and policy versions;
- reset/cooldown calculations;
- override actor, reason, and lifetime;
- eligibility reasoning.

### Future Extensions

- provider discovery plugins;
- predictive consumption;
- reservations;
- team and project capacity.

Quota Manager is not a peer resource coordinator. Its public consumer is
Resource Manager, which composes quota with credits, cost, rate limits, health,
capability, tools, context continuity, and local compute.

## 6. Knowledge Manager / Hermes

### Purpose

Maintain authoritative knowledge continuity across advisors, decisions, models,
sessions, workflows, and projects.

### Responsibilities

- find product documents, ADRs, PR history, decision logs, memory, and active
  context;
- classify authority, provenance, freshness, and conflict;
- assemble bounded context packages;
- preserve context before wait, reassignment, split, or compression;
- prevent memory from overriding documentation.

### Input

- goal and context requirements;
- repository documentation and history;
- decision and workflow records;
- active advisor/session context;
- memory records and access policy.

### Output

- authoritative context package;
- source/freshness map;
- conflict and missing-knowledge report;
- context-preservation or handoff package;
- continuity recommendation.

### Internal State

- source index and authority metadata;
- active context requests;
- selected and omitted references;
- memory, supersession, and conflict references;
- handoff state.

### External Dependencies

- repository and approved knowledge integrations;
- Memory Manager behavior;
- AI Executive Office;
- Strategy Council and Decision Engine.

### Failure Modes

- authoritative source missing;
- stale memory treated as truth;
- provenance lost;
- protected knowledge exposed;
- irrelevant context overwhelms decision;
- handoff incomplete.

### Observability

- sources considered, selected, omitted, or denied;
- authority, freshness, and conflict;
- context-package consumers;
- preservation and handoff outcomes;
- memory writes and corrections.

### Future Extensions

- multi-project knowledge;
- semantic retrieval;
- knowledge quality review;
- portable context packages.

## 7. Scheduler

### Purpose

Sequence approved work across time, resource windows, dependencies, approvals,
and context continuity.

### Responsibilities

- schedule, pause, wake, reassign, and cancel approved tasks;
- track reset, cooldown, deadline, dependency, and approval conditions;
- preserve context before delayed or reassigned work;
- coordinate Resource Manager reservations and Workflow Engine state;
- prevent scheduling from changing the approved goal.

### Input

- approved execution plan;
- task dependencies and priority;
- resource eligibility, reset, cooldown, and reservation;
- approval and deadline conditions;
- context-preservation requirements.

### Output

- task sequence and wake conditions;
- wait, reassign, or split scheduling action;
- reservation requests and releases;
- dispatch-ready work;
- schedule events for Mission Control.

### Internal State

- scheduled tasks and dependencies;
- wake conditions and deadlines;
- reservations and ownership;
- pause/resume/cancel state;
- context-handoff references.

### External Dependencies

- Decision Engine approved plan;
- Resource Manager;
- Knowledge Manager / Hermes;
- Workflow Engine;
- AI Router.

### Failure Modes

- wake condition missed;
- resource double-booked;
- task dispatched without approval;
- dependency cycle;
- context lost during reassignment;
- stale plan scheduled.

### Observability

- schedule and priority changes;
- wait reasons and wake conditions;
- reservations and releases;
- reassignment and handoff;
- missed deadlines and blocked tasks.

### Future Extensions

- cross-project scheduling;
- predictive reset planning;
- background and recurring work;
- team capacity.

## 8. AI Router

### Purpose

Select an eligible execution path inside an approved plan. Model Router is a
submodule that ranks candidate models; it is not Decision Engine.

### Responsibilities

- receive a dispatch-ready step and required capability;
- filter eligible provider, surface, adapter, tool, and model paths;
- invoke Model Router for model-level ranking where needed;
- preserve serving-path and model provenance;
- return a route or explicit no-route result;
- never alter the approved goal or policy.

### Input

- approved execution step;
- required capabilities and permissions;
- Resource Manager eligibility;
- Provider Registry and Model Catalog facts;
- routing policy and adapter health.

### Output

- selected provider/surface/adapter/model path;
- rejected candidates and reasons;
- fallback order;
- no-route result;
- route record for execution and audit.

### Internal State

- active route evaluation;
- candidate paths and facts;
- Model Router subdecision;
- policy and resource snapshot references;
- selected/fallback route.

### External Dependencies

- Scheduler;
- Resource Manager;
- Provider Registry and Model Catalog;
- Plugin Manager and Provider Adapters;
- Model Router policy.

### Failure Modes

- no eligible route;
- capability unknown;
- resource snapshot stale;
- adapter unhealthy;
- provider and model identity lost;
- route cannot be explained.

### Observability

- candidate and rejected paths;
- Model Router ranking;
- resource and policy versions;
- selected serving provenance;
- fallback activation and failure.

### Future Extensions

- multi-route execution;
- local/remote hybrid paths;
- outcome-informed ranking under governance;
- route simulation.

## 9. Prompt Builder

### Purpose

Build reproducible model input for a selected execution path from approved
instructions and Hermes-provided context.

### Responsibilities

- resolve versioned prompt definitions;
- validate variables and required context;
- adapt representation without changing intent;
- expose omission, conflict, truncation, and uncertainty;
- preserve reproducibility references.

### Input

- approved execution step;
- selected route and model constraints;
- prompt definition;
- context package;
- policy and variables.

### Output

- model-ready prompt package;
- validation result;
- prompt/context/version references;
- warnings and missing-input result.

### Internal State

- active composition;
- prompt and variable versions;
- context ordering;
- adaptation and omission record.

### External Dependencies

- AI Router;
- Knowledge Manager / Hermes;
- Workflow Engine;
- Model Catalog.

### Failure Modes

- missing prompt or context;
- incompatible model constraints;
- context budget exceeded;
- non-reproducible composition;
- intent changed during adaptation.

### Observability

- prompt and context versions;
- included/omitted sources;
- validation and adaptation;
- package-to-action correlation.

### Future Extensions

- evaluation and promotion;
- multimodal context;
- policy-controlled compression;
- reusable composition profiles.

## 10. Workflow Engine

### Purpose

Execute an approved multi-step workflow as observable state transitions under
Scheduler and human-control boundaries.

### Responsibilities

- load accepted workflow definitions;
- enforce steps, permissions, transitions, retries, and review gates;
- request routing, prompts, adapters, and tools;
- return outcomes and newly produced knowledge;
- refuse undocumented transitions.

### Input

- approved plan and workflow version;
- scheduled dispatch;
- route, prompt, context, and permission state;
- action results and human control events.

### Output

- current state and allowed transitions;
- execution and approval requests;
- step results and failures;
- terminal outcome and workflow history.

### Internal State

- workflow instance and version;
- current step and transitions;
- pending approvals;
- retries and failure context;
- action/artifact references.

### External Dependencies

- Scheduler;
- AI Router and Prompt Builder;
- Plugin Manager;
- Hermes;
- Mission Control.

### Failure Modes

- invalid transition;
- approval missing;
- adapter/tool failure;
- retry exhausted;
- duplicated or orphaned state;
- execution diverges from plan.

### Observability

- state and transition actor;
- approvals, retries, pauses, and cancellation;
- route, prompt, adapter, and artifact correlation;
- terminal outcome.

### Future Extensions

- parallel workflows;
- long-running recovery;
- reusable composition;
- simulation and dry run.

## 11. Plugin Manager

### Purpose

Govern capability declaration, permissions, lifecycle, compatibility, and
observability for Provider Adapters, MCP servers, and external tools.

### Responsibilities

- register and validate plugins;
- expose declared capabilities and required permissions;
- mediate enablement, health, version, and removal;
- prevent plugins from acquiring manager authority;
- isolate external failure.

### Input

- manifests and capability declarations;
- user permissions and configuration references;
- external action request;
- health, result, version, and error events.

### Output

- capability catalog;
- permission/compatibility result;
- mediated action result;
- health and lifecycle status;
- external provenance.

### Internal State

- installed/enabled plugins;
- capabilities, versions, and compatibility;
- permissions and configuration references;
- health and failure history.

### External Dependencies

- external providers, IDEs, Git, MCP, CLI, API, browser, and tools;
- AI Executive Office policy;
- Mission Control;
- future isolation mechanism.

### Failure Modes

- invalid manifest;
- permission denied;
- plugin unavailable or deceptive;
- capability/version drift;
- external action exceeds scope;
- failure isolation lost.

### Observability

- install, enable, update, and removal;
- permissions and capability changes;
- action result and latency;
- compatibility and boundary violations.

### Future Extensions

- signed metadata;
- sandboxed plugins;
- community catalogs;
- compatibility negotiation.

## 12. Mission Control Dashboard

### Purpose

Give the developer one operating view for strategy, resources, knowledge,
decisions, schedule, and execution while preserving final authority.

### Responsibilities

- collect goals, constraints, preferences, and confirmations;
- display advisors, conflicts, resources, decisions, schedules, and outcomes;
- expose act, wait, reassign, split, preserve-context, approve, reject, override,
  retry, pause, and cancel controls;
- show freshness, uncertainty, risk, and missing evidence;
- avoid hiding state behind conversational output.

### Input

- developer interaction;
- AI Executive Office view state;
- advisor and decision explanations;
- resource, knowledge, schedule, workflow, and health events.

### Output

- validated developer goals and commands;
- confirmations, rejections, overrides, and control actions;
- inspection requests;
- non-authoritative presentation state.

### Internal State

- navigation and presentation state;
- selected mission, project, and filters;
- pending confirmation;
- non-authoritative cache and freshness.

### External Dependencies

- AI Executive Office as the sole authoritative application boundary;
- user environment and accessibility capabilities;
- no direct Provider dependency.

### Failure Modes

- stale state shown as current;
- confirmation ambiguous or duplicated;
- conflict/risk hidden;
- connection lost;
- presentation cache treated as truth;
- inaccessible control.

### Observability

- view-state freshness;
- developer confirmations and overrides;
- control actions and errors;
- displayed-to-authoritative record correlation.

### Future Extensions

- multi-project portfolio view;
- team mission control;
- notifications;
- localization and accessibility expansion.

## 13. AI Continuity Layer

### Purpose

Maintain active agent working state, govern AI-to-AI task handoffs, anticipate
agent boundaries proactively, and define safe resume paths for incoming agents.

### Responsibilities

- maintain Working Memory for the active agent session and task;
- package Working Memory into validated Handoff Packages on trigger;
- monitor resource signals and initiate Predictive Handoff before limits fail;
- define and enforce the Resume Workflow for incoming agents;
- expose continuity state to Mission Control and Decision Engine;
- promote task-completion knowledge to Knowledge Manager / Hermes;
- never transfer authority — only working state and sourced context.

### Input

- Working Memory updates from the active agent (step completion, evidence,
  open questions, hypotheses, rejected alternatives);
- resource signals from Resource Manager (quota thresholds, context pressure,
  session TTL);
- Handoff Package from outgoing agent;
- human confirmation events for reassignment;
- authoritative source versions from Knowledge Manager / Hermes.

### Output

- Working Memory record (active and preserved);
- validated Handoff Package;
- handoff event notification to AI Executive Office and Scheduler;
- Predictive Handoff signal and recommendation (hand off vs. wait);
- Resume Workflow steps and confirmation requests;
- completion record and knowledge promotion candidates.

### Internal State

- active Working Memory per agent session and task;
- Handoff Package store (pending, stored, read);
- Predictive Handoff signal state and threshold configuration;
- resume confirmation status;
- handoff event and completion records.

### External Dependencies

- Resource Manager (quota, context, and session signals);
- Knowledge Manager / Hermes (authoritative source retrieval, knowledge
  promotion, handoff package storage);
- Decision Engine (incoming agent selection, confirmation boundary);
- Scheduler (task pause, wake, and reassignment coordination);
- AI Executive Office (human-control confirmation routing).

### Failure Modes

- Working Memory not preserved before session end;
- Handoff Package incomplete or missing required fields;
- incoming agent skips orientation or reads package without source verification;
- Predictive Handoff triggered too late (reactive, not proactive);
- open questions treated as resolved by assumption;
- rejected alternatives re-attempted without new evidence;
- authority transferred in addition to working state.

### Observability

- Working Memory creation, update, and status transitions;
- handoff trigger, package assembly completeness, and validation result;
- Predictive Handoff signal values and threshold crossings;
- incoming agent confirmation and first action;
- deviations from Handoff Package intent;
- completion record and knowledge promotion decisions;
- all handoff events correlated with task and resource snapshots.

### Future Extensions

- automated Working Memory compression for long-running tasks;
- cross-agent Predictive Handoff chains (A → B → C under one task);
- handoff quality scoring and improvement;
- team-level handoffs (AI to human or human to AI);
- portable context packages for cross-project continuity.

## Contract Change Process

Changes to responsibility, authority, input, output, state, dependency, failure,
or observability require updates here and in System Overview, governance,
roadmap, and affected product specifications before implementation.
