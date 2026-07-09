# Quota Manager Research

## Status

Draft research

## Objective

Determine how ai-manager should represent and evaluate model availability,
usage, and limits.

## Questions to Investigate

- Which quota types must be supported?
- How fresh must quota information be?
- How should unknown, stale, or conflicting quota data be handled?
- Which policies reserve capacity or prevent overuse?
- What explanation should accompany an availability decision?

## Candidate Inputs

- Provider limits and usage.
- Organization or project budgets.
- Rate-limit windows.
- Reserved capacity and policy overrides.

## Evaluation Criteria

- Accuracy.
- Freshness.
- Explainability.
- Provider portability.
- Failure behavior.

## Findings

To be researched.

## Decision Dependencies

Findings will inform component contracts, persistence requirements, and routing
policy decisions.
