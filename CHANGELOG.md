# Changelog

All notable changes to this project will be documented in this file.

The format follows chronological project phases while the project is
pre-release.

## Unreleased

### Added

- Documentation-first project foundation.
- Product, architecture, roadmap, research, and decision document structure.
- Repository map and AI-agent contribution workflow.
- Product principles and the N0–N7 capability roadmap.
- Component contracts, system boundaries, conceptual data flows, and an
  architecture glossary.
- Quota Manager product MVP, architecture specification, conceptual data model,
  and availability state machine.
- Provider Registry, capability matrix, provider abstraction, conceptual model
  catalog, and provider-selection guide.
- AI Executive Office positioning, Strategy Council, Advisor Model, Decision
  Governance, and advisor conflict-resolution specifications.
- Resource Manager architecture, conceptual resource data and state models,
  context-continuity specification, cost and budget policy, and manual
  Resource Manager MVP.
- Knowledge navigation entry point, AI-agent onboarding guide, role-based
  reading paths, and source-of-truth authority map.
- Resource Briefing CLI prototype plan, command contract, resource snapshot
  format, deterministic decision rules, reminder rules, and prototype roadmap.
- AI Continuity Layer specification: Working Memory data model and lifecycle,
  AI-to-AI Handoff Protocol (including Handoff Package format, observed PR #9
  case, and repository-native fallback), Predictive Handoff (quota/context/session
  signals, hand-off-vs-wait decision, and pre-handoff checklist), Resume Workflow
  (orient → read → confirm → create → execute), and Continuity Architecture
  (layer position, component interactions, and Executive Office integration).
- Resource Briefing CLI prototype (P1): `bin/ai-manager.js` implementing
  `status`, `brief`, `recommend`, and `reminders` commands; `data/resources.example.json`
  snapshot with ChatGPT, Claude, Codex, Gemini, and Antigravity resources;
  `package.json` with zero third-party dependencies. Validates the first
  AI Executive Office closed loop: Observe → Think → Advise → Remind.
- Coding Agent Task Protocol (v1): Planning Agent ↔ Coding Agent
  engineering-ticket lifecycle, an eight-state task state machine
  (`draft` through `done`) with a human-only `merge-approved` gate, fixed
  Engineering Ticket and Completion Report templates, a Review Report
  format, a human-approval boundary for push/merge/deploy/production/paid
  operations, blocked/timeout/retry/idempotency rules, branch/Base SHA/
  commit/Issue correlation rules, and a minimum audit-trail data contract.
  Explicitly distinguished from the AI Continuity Layer's Handoff Protocol.
  No runner, GitHub API integration, or automation implemented.
- Deterministic-First principle, formalized as an AI Manager architecture
  decision within the Coding Agent Task Protocol: an explicit boundary
  between deterministic-code responsibilities (Issue/label I/O, schema and
  scope validation, state-transition legality, timeout/retry/idempotency
  checks, audit persistence) and AI-invocation responsibilities (ticket
  authoring, ambiguity/conflict judgment, code/doc changes, complex
  diagnosis, semantic review). Adds per-call audit fields (`model`,
  `call_reason`, `usage_cost_metadata`) and constrains Orchestrator/Runner
  context to the minimum needed per call, never a full conversation replay.
  Data contract only — no usage tracker or model-dispatch policy
  implemented.
- Deterministic-First promoted to a repo-wide architecture principle:
  Principle 17 in `docs/product/PRINCIPLES.md` and
  `docs/decisions/ADR-0002-deterministic-first.md`. Records that ordinary
  deterministic code moves state and data by default, and AI is invoked only
  for understanding, judgment, code/document writing, complex diagnosis,
  semantic review, or non-rule-based summarization; every AI call must be
  attributable, named, and minimally scoped; Hermes/any Orchestrator/Runner
  must remain replaceable and not a mandatory inference layer; unknown
  usage/cost metadata is recorded as unknown, not zero.
  `docs/architecture/CODING_AGENT_TASK_PROTOCOL.md` remains the detailed
  operational authority for the Coding Agent task lifecycle. Documentation
  only — no usage tracker, model router, or orchestrator implemented.

### Changed

- Expanded the README into the project's high-level introduction.
- Defined the product, MVP, long-term vision, and conceptual system architecture.
- Organized the system overview into presentation, application, orchestration,
  integration, and provider layers.
- Expanded Quota Manager research, component contract, and N1 roadmap into
  implementation-ready documentation.
- Connected provider capability facts to Quota Manager, Model Router, Workflow
  Engine, and future provider-plugin roadmap dependencies.
- Repositioned ai-manager from a quota/router-centered product to an AI Executive
  Office, AI Operating System, and AI Resource Orchestration Platform.
- Reorganized architecture around Presentation, Strategy, Decision, Resource,
  Knowledge, Execution, and External layers with an N0–N9 roadmap.
- Elevated Resource Manager above quota as the primary Resource Layer component,
  with Quota Manager retained as a specialized sub-capability.
- Expanded N2 into specification, manual dashboard, snapshot history, context
  continuity, cost and budget, and Decision Engine integration stages.
- Strengthened repository navigation from an index into a knowledge-base
  navigation contract for humans and AI agents.
- Added a prototype track that separates implementation-learning loops from
  production roadmap stages.
- Extended N4 Mission Control Dashboard scope to include AI Continuity Layer
  visibility: Working Memory state, Handoff event history, Predictive Handoff
  warnings, agent reassignment confirmation controls, and Resume state
  confirmation.
- Added AI Continuity Layer as Component 13 in COMPONENT_CONTRACTS.md.
