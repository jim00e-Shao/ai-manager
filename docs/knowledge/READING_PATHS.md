# Reading Paths

This document defines task-oriented reading paths for humans and AI agents.
Use it when you know your role or goal and need a focused route through the
repository.

## Product Planner

First read:

- [START_HERE.md](../../START_HERE.md)
- [PRODUCT.md](../product/PRODUCT.md)
- [AI_EXECUTIVE_OFFICE.md](../product/AI_EXECUTIVE_OFFICE.md)

Then read:

- [PRINCIPLES.md](../product/PRINCIPLES.md)
- [VISION.md](../product/VISION.md)
- [ROADMAP.md](../roadmap/ROADMAP.md)

Last read:

- [DECISION_GOVERNANCE.md](../architecture/DECISION_GOVERNANCE.md)
- [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md)

Do not need to read first:

- quota state-machine details;
- provider capability matrix details;
- component failure-mode details.

## Architect

First read:

- [PROJECT_MAP.md](../../PROJECT_MAP.md)
- [SYSTEM_OVERVIEW.md](../architecture/SYSTEM_OVERVIEW.md)
- [COMPONENT_CONTRACTS.md](../architecture/COMPONENT_CONTRACTS.md)

Then read:

- [SYSTEM_BOUNDARIES.md](../architecture/SYSTEM_BOUNDARIES.md)
- [DATA_FLOW.md](../architecture/DATA_FLOW.md)
- [RESOURCE_MANAGER.md](../architecture/RESOURCE_MANAGER.md)
- [DECISION_GOVERNANCE.md](../architecture/DECISION_GOVERNANCE.md)

Last read:

- [GLOSSARY.md](../architecture/GLOSSARY.md)
- [ADR-0001](../decisions/ADR-0001-documentation-first.md)

Do not need to read first:

- onboarding workflow details;
- provider selection recommendations.

## AI Agent Implementer

First read:

- [START_HERE.md](../../START_HERE.md)
- [PROJECT_MAP.md](../../PROJECT_MAP.md)
- [AI_AGENT_ONBOARDING.md](AI_AGENT_ONBOARDING.md)

Then read:

- [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
- the authoritative docs for the requested component.

Last read:

- [ROADMAP.md](../roadmap/ROADMAP.md)
- relevant research documents.

Do not need to read first:

- every provider detail unless the task touches provider behavior;
- every resource model unless the task touches resources.

## Maintainer

First read:

- [PROJECT_MAP.md](../../PROJECT_MAP.md)
- [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)

Then read:

- [ROADMAP.md](../roadmap/ROADMAP.md)
- [CHANGELOG.md](../../CHANGELOG.md)
- relevant ADRs.

Last read:

- the changed documents in the PR;
- dependent source-of-truth documents.

Do not need to read first:

- implementation-specific supporting docs outside the PR scope.

## Contributor

First read:

- [START_HERE.md](../../START_HERE.md)
- [README.md](../../README.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)

Then read:

- [PROJECT_MAP.md](../../PROJECT_MAP.md)
- [READING_PATHS.md](READING_PATHS.md)
- documents related to the contribution.

Last read:

- [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md)
- relevant ADRs.

Do not need to read first:

- deep architecture contracts unless the contribution changes architecture.

## New User

First read:

- [START_HERE.md](../../START_HERE.md)
- [README.md](../../README.md)
- [AI_EXECUTIVE_OFFICE.md](../product/AI_EXECUTIVE_OFFICE.md)

Then read:

- [PRODUCT.md](../product/PRODUCT.md)
- [PRINCIPLES.md](../product/PRINCIPLES.md)
- [VISION.md](../product/VISION.md)

Last read:

- [ROADMAP.md](../roadmap/ROADMAP.md)

Do not need to read first:

- component contracts;
- resource data models;
- provider abstraction details.

## Resource Manager Implementer

First read:

- [START_HERE.md](../../START_HERE.md)
- [RESOURCE_MANAGER.md](../architecture/RESOURCE_MANAGER.md)
- [RESOURCE_MANAGER_MVP.md](../product/RESOURCE_MANAGER_MVP.md)

Then read:

- [RESOURCE_DATA_MODEL.md](../architecture/RESOURCE_DATA_MODEL.md)
- [RESOURCE_STATE_MODEL.md](../architecture/RESOURCE_STATE_MODEL.md)
- [CONTEXT_CONTINUITY.md](../architecture/CONTEXT_CONTINUITY.md)
- [COST_AND_BUDGET.md](../architecture/COST_AND_BUDGET.md)

Last read:

- [QUOTA_MANAGER_SPEC.md](../architecture/QUOTA_MANAGER_SPEC.md)
- [PROVIDERS.md](../providers/PROVIDERS.md)
- [MODEL_CATALOG.md](../providers/MODEL_CATALOG.md)

Do not need to read first:

- Strategy Council details unless Resource Manager advice affects decisions.

## Decision Engine Implementer

First read:

- [START_HERE.md](../../START_HERE.md)
- [STRATEGY_COUNCIL.md](../architecture/STRATEGY_COUNCIL.md)
- [DECISION_GOVERNANCE.md](../architecture/DECISION_GOVERNANCE.md)

Then read:

- [ADVISOR_MODEL.md](../architecture/ADVISOR_MODEL.md)
- [CONFLICT_RESOLUTION.md](../architecture/CONFLICT_RESOLUTION.md)
- [RESOURCE_MANAGER.md](../architecture/RESOURCE_MANAGER.md)
- [PROVIDER_SELECTION_GUIDE.md](../providers/PROVIDER_SELECTION_GUIDE.md)

Last read:

- [CAPABILITY_MATRIX.md](../providers/CAPABILITY_MATRIX.md)
- [COST_AND_BUDGET.md](../architecture/COST_AND_BUDGET.md)

Do not need to read first:

- Dashboard implementation details;
- quota legacy research unless routing depends on quota.

## Dashboard Designer

First read:

- [START_HERE.md](../../START_HERE.md)
- [AI_EXECUTIVE_OFFICE.md](../product/AI_EXECUTIVE_OFFICE.md)
- [SYSTEM_OVERVIEW.md](../architecture/SYSTEM_OVERVIEW.md)

Then read:

- [RESOURCE_MANAGER_MVP.md](../product/RESOURCE_MANAGER_MVP.md)
- [RESOURCE_MANAGER.md](../architecture/RESOURCE_MANAGER.md)
- [DECISION_GOVERNANCE.md](../architecture/DECISION_GOVERNANCE.md)
- [CONTEXT_CONTINUITY.md](../architecture/CONTEXT_CONTINUITY.md)

Last read:

- [COMPONENT_CONTRACTS.md](../architecture/COMPONENT_CONTRACTS.md)
- [ROADMAP.md](../roadmap/ROADMAP.md)

Do not need to read first:

- provider abstraction internals;
- detailed quota state-machine transitions.
