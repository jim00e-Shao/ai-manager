# Data Flow

## Status

Conceptual AI Executive Office flow. Arrows describe information and authority,
not APIs, process boundaries, or deployment topology.

## Strategy-to-Execution Flow

```mermaid
flowchart TD
    Developer["Developer"]
    Mission["Mission Control"]
    Office["AI Executive Office"]
    Council["Strategy Council"]
    Resources["Resource Manager"]
    Hermes["Knowledge Manager / Hermes"]
    Decision["Decision Engine"]
    Confirm{"Human confirmation required?"}
    Scheduler["Scheduler"]
    Router["AI Router<br/>Model Router submodule"]
    Prompt["Prompt Builder"]
    Workflow["Workflow Engine"]
    Plugins["Plugin Manager / Provider Adapters"]
    External["External Provider / Tool"]
    Outcome["Outcome"]

    Developer --> Mission
    Mission --> Office
    Office --> Council
    Office --> Resources
    Office --> Hermes
    Council --> Decision
    Resources --> Decision
    Hermes --> Decision
    Decision --> Confirm
    Confirm -->|Yes| Developer
    Developer -->|Approve / override| Office
    Confirm -->|No| Scheduler
    Office --> Scheduler
    Scheduler --> Router
    Router --> Prompt
    Prompt --> Workflow
    Workflow --> Plugins
    Plugins --> External
    External --> Outcome
    Outcome --> Resources
    Outcome --> Hermes
    Outcome --> Mission
```

## Decision Detail

```mermaid
sequenceDiagram
    actor Developer
    participant Mission as Mission Control
    participant Office as AI Executive Office
    participant Council as Strategy Council
    participant Resource as Resource Manager
    participant Hermes
    participant Decision as Decision Engine
    participant Scheduler
    participant Router as AI Router
    participant Execution as Workflow / Adapters

    Developer->>Mission: Goal, priority, constraints
    Mission->>Office: Validated mission
    Office->>Council: Request relevant advisor lenses
    Office->>Resource: Request resource snapshot
    Office->>Hermes: Request authoritative context
    Council-->>Decision: Advisor recommendations and conflicts
    Resource-->>Decision: Quota, cost, reset, capability, health
    Hermes-->>Decision: Knowledge, continuity, missing evidence
    Decision-->>Office: Plan, alternatives, explanation
    alt Confirmation required
        Office-->>Mission: Request confirmation
        Mission-->>Developer: Explain recommendation
        Developer->>Mission: Approve, reject, or override
        Mission->>Office: Human decision
    end
    Office->>Scheduler: Approved plan
    Scheduler->>Hermes: Preserve context before wait or handoff
    Scheduler->>Router: Dispatch-ready execution step
    Router->>Execution: Selected provider/model/tool path
    Execution-->>Office: Observable result or failure
    Execution-->>Resource: Usage and health update
    Execution-->>Hermes: Outcome and decision references
    Office-->>Mission: Updated operating picture
```

## Data Categories

| Category | Authority | Consumers | Required properties |
| --- | --- | --- | --- |
| Goal and priority | Developer | Office, advisors, Decision Engine | attributable, bounded, current |
| Advisor recommendation | Strategy Council role | Decision Engine, Mission Control | lens, evidence, confidence, alternatives |
| Resource snapshot | Resource Manager | Decision Engine, Scheduler, AI Router | source, scope, freshness, uncertainty |
| Knowledge package | Hermes | Advisors, Decision Engine, Execution | provenance, authority, omissions, access |
| Decision record | Decision Engine plus human action | Office, Scheduler, audit | conflicts, weights, rationale, override |
| Schedule | Scheduler | Mission Control, Execution | dependency, wake, resource, approval |
| Route | AI Router | Workflow, adapters, audit | provider, surface, model, fallback, reason |
| Execution result | External system through adapters | Office, Resource, Hermes | provenance, success/failure, usage, artifacts |

## Failure Flow

- Missing advisor evidence can trigger clarification or waiting.
- Unknown resource facts cannot become eligible silently.
- Knowledge conflict blocks or qualifies the recommendation.
- Human rejection returns the decision for revision.
- Missed wake or reservation conflict remains visible in Mission Control.
- No eligible route returns a safe no-route outcome.
- Provider failure updates resource health and can trigger governed replanning.
- Knowledge-write failure does not erase the execution outcome.

## Related Documents

- [System Overview](SYSTEM_OVERVIEW.md)
- [Strategy Council](STRATEGY_COUNCIL.md)
- [Decision Governance](DECISION_GOVERNANCE.md)
- [Component Contracts](COMPONENT_CONTRACTS.md)
- [AI Executive Office](../product/AI_EXECUTIVE_OFFICE.md)
