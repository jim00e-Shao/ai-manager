# Provider Selection Guide

## Status

Initial product guidance. This is not a benchmark or automatic routing policy.
Decision Engine must combine current capability facts, resources, knowledge,
cost, risk, execution needs, and user policy. After a plan is approved, AI
Router and its Model Router submodule select the execution path.

## Selection Principles

1. Select the task-appropriate eligible capability, not the most prestigious
   model or product.
2. Confirm the registry `kind`; a consumer assistant, coding agent, open-weight
   family, agent platform, and gateway solve different problems.
3. Treat tool support as a surface capability, not automatically a model
   capability.
4. Require current quota and health evidence.
5. Prefer direct providers when deterministic provenance matters; prefer a
   gateway when provider flexibility is the goal.
6. Prefer local open weights when deployment control outweighs operational cost.
7. Keep consequential coding-agent actions behind explicit permissions and
   review.

## ChatGPT

### Choose When

- a human wants a broad interactive assistant;
- the task mixes drafting, research, files, and general analysis;
- browser or desktop access is more important than a deterministic API;
- connected apps are approved and useful.

### Avoid as the Primary Path When

- the workflow requires a stable programmatic contract;
- exact model identity, quota, or serving behavior must be reconstructed;
- repository changes need coding-agent sandbox and diff workflow.

### Routing Signals

Human-interactive, general knowledge work, mixed content, plan entitlement
available, no strict API requirement.

## Claude

### Choose When

- long-form document or repository understanding is central;
- Claude Code or Claude MCP integration fits the workflow;
- the user wants strong interactive analysis with explicit tool permissions;
- direct Anthropic API access is acceptable.

### Avoid as the Primary Path When

- the required plan, model, connector, or region is unavailable;
- one workflow incorrectly assumes Claude web, Claude Code, and API share quota;
- another eligible model meets the task with materially lower cost or latency.

### Routing Signals

Long-context synthesis, code analysis, MCP-connected task, Anthropic quota
available, permission policy satisfied.

## Gemini

### Choose When

- multimodal or Google-connected context is important;
- Gemini API built-in tools or function calling match the application;
- large-context processing is required;
- the user works primarily in the Google ecosystem.

### Avoid as the Primary Path When

- the needed Connected App or MCP capability is unavailable for the account;
- product/API behavior is being conflated;
- region, preview status, or account policy makes capability uncertain.

### Routing Signals

Multimodal, Google integration, API tool use, eligible account/project quota,
surface capability verified.

## Codex

### Choose When

- the task operates on a software repository;
- implementation, debugging, review, migration, or verification is required;
- local shell, file, browser, skills, plugins, or subagents are useful;
- work must produce an inspectable diff and validation evidence;
- programmatic coding-agent control is needed.

### Avoid as the Primary Path When

- no repository or engineering workflow is involved;
- required tool permissions cannot be safely granted;
- a simple model API call is sufficient;
- the chosen authentication path lacks the required cloud/workspace capability.

### Routing Signals

Repository task, coding-agent tools required, sandbox and approvals configured,
Codex quota available, model/surface verified.

## GPT-OSS

### Choose When

- local or self-controlled deployment is required;
- model customization or open-weight inspection matters;
- data residency or offline operation justifies infrastructure ownership;
- the operator can supply appropriate compute and safety controls.

### Avoid as the Primary Path When

- managed reliability and low operational burden are required;
- hardware capacity is insufficient or unknown;
- the workflow assumes hosted tools, MCP, quota, or safety features are intrinsic
  to the weights.

### Routing Signals

Local deployment policy, compatible runtime, sufficient compute, artifact
verified, operator-owned safety and observability.

## OpenHands

### Choose When

- an open, configurable software-development agent platform is desired;
- CLI, browser, IDE bridge, headless, or self-hosted operation is useful;
- provider flexibility and MCP integration matter;
- the team can manage sandbox and deployment complexity.

### Avoid as the Primary Path When

- the underlying model/provider is not configured or eligible;
- simple inference is sufficient;
- execution isolation and approval policy are not ready.

### Routing Signals

Agentic repository task, OpenHands runtime healthy, provider quota available,
execution environment and MCP permissions approved.

## OpenCode

### Choose When

- local-first coding with provider choice is important;
- CLI, desktop, or local browser surfaces are desired;
- configurable agents, permissions, and MCP tools fit the workflow;
- the user wants to compare or switch providers.

### Avoid as the Primary Path When

- provider/model compatibility is unknown;
- beta desktop or rapidly changing interfaces conflict with stability needs;
- local web exposure cannot be secured.

### Routing Signals

Coding task, configured provider eligible, OpenCode version compatible,
permissions reviewed, desired surface available.

## OpenRouter

### Choose When

- one API must access several model providers;
- provider fallback or routing diversity is required;
- dynamic model/capability/price discovery is useful;
- experiments compare models without separate direct integrations.

### Avoid as the Primary Path When

- direct provider contractual control or lowest dependency count is required;
- actual serving-provider provenance cannot be retained;
- gateway and upstream data policies are not both acceptable;
- a first-party product capability is required instead of inference API access.

### Routing Signals

Gateway policy allowed, credits/quota available, required capability discovered,
serving-provider constraints accepted, fallback policy explicit.

## Antigravity

### Choose When

- the workflow is Google-stack or IDE-centric;
- parallel subagents, visual artifacts, browser integration, or scheduled agent
  tasks are useful;
- Antigravity CLI/SDK/desktop surfaces fit the development process;
- Google plan quota and permissions are available.

### Avoid as the Primary Path When

- broad local tool authority cannot be safely sandboxed;
- plan/model/quota behavior is unknown;
- a lightweight model call is sufficient;
- preview or version-specific behavior conflicts with stability requirements.

### Routing Signals

Agentic coding, Google ecosystem, Antigravity surface healthy, plan quota
available, permissions and review gates configured.

## Decision Record Requirements

A provider-selection explanation records:

- task requirements;
- registry entry and kind;
- selected model family/model when applicable;
- serving surface and actual provider path;
- capability facts and verification time;
- quota and health snapshot;
- cost-model category;
- decisive strengths and accepted weaknesses;
- known limitations and risk controls;
- rejected alternatives and reasons;
- human override where applicable.

## Related Documents

- [Capability Matrix](CAPABILITY_MATRIX.md)
- [Provider Registry](PROVIDERS.md)
- [Model Catalog](MODEL_CATALOG.md)
- [Model Router Research](../research/MODEL_ROUTER.md)
- [Quota Manager Specification](../architecture/QUOTA_MANAGER_SPEC.md)
