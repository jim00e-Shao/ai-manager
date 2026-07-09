# System Overview

## Status

Draft — no implementation has been selected.

## System Context

ai-manager is intended to coordinate model capacity, task routing, prompt
construction, and multi-agent workflows. External actors and provider
integrations remain to be researched.

## System Boundary

### Inside the Boundary

- Quota state and policy.
- Model-routing decisions.
- Prompt definitions and composition.
- Agent-workflow coordination.

### Outside the Boundary

- Model-provider infrastructure.
- Identity, billing, and deployment choices until explicitly accepted.

## Conceptual Flow

1. A task enters the system with requirements and constraints.
2. Quota information identifies available capacity.
3. Routing policy selects an eligible model.
4. Prompt definitions produce the model input.
5. Workflow coordination manages agent execution and review.
6. The system records enough context to explain the result.

## Architectural Constraints

- Documentation is the single source of truth.
- Technology choices require an accepted decision record.
- Provider-specific integrations must remain explicit.
- Operational decisions must be observable and explainable.

## Open Questions

- What is the first supported execution flow?
- What information must persist for auditability?
- Where are human approval boundaries required?
