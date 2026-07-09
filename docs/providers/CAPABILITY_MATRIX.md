# Provider Capability Matrix

## Status

Initial reviewed baseline. Last verified: **2026-07-09**.

This matrix is a human-maintained snapshot, not runtime truth. Model inventory,
quota, reset behavior, surfaces, and prices can change independently. Provider
Adapters should replace stale facts with sourced observations.

## Reading Rules

- **Known** means current official documentation supports the claim.
- **Planned** means a reviewed ai-manager roadmap or official provider
  commitment exists.
- **Unknown** means current official evidence was not established; it does not
  mean unsupported.
- **Not native** means the entry relies on another runtime or product for that
  surface.
- Available Models list stable families or discovery behavior, not exhaustive
  volatile aliases.
- Context Window uses conceptual categories and remains model/surface dependent.
- Estimated Cost Model names the billing class, not a price.
- Strengths, weaknesses, and recommendations are initial ai-manager product
  guidance, not benchmark results.

## Summary

| Entry | Registry kind | Primary access | Model source | Quota class | MCP |
| --- | --- | --- | --- | --- | --- |
| ChatGPT | consumer assistant | browser, desktop | OpenAI-managed product catalog | subscription / plan limits | Known, plan and surface dependent |
| Claude | consumer assistant | browser, desktop, related CLI | Anthropic-managed catalog | subscription and API metering | Known |
| Gemini | consumer assistant | browser, API | Google-managed catalog | subscription and API limits | Known, surface dependent |
| Codex | coding agent | desktop, CLI, IDE, web, SDK | Codex-supported and configurable models | subscription credits/limits or API metering | Known |
| GPT-OSS | open-weight family | local or chosen host | downloadable model family | local compute or host metering | Unknown; runtime dependent |
| OpenHands | agent platform | CLI, browser, IDE bridge | configured model providers | platform plus underlying provider | Known |
| OpenCode | agent platform | CLI, desktop, browser | configured model providers | underlying provider or gateway | Known |
| Antigravity | coding agent | desktop, IDE, CLI, SDK | Google-managed agent model catalog | plan limits and optional credits | Known |
| OpenRouter | model gateway | API, browser | dynamic multi-provider catalog | credit, request, and pass-through usage | Unknown |

## ChatGPT

### Purpose

General-purpose hosted assistant for conversation, knowledge work, files,
research, and connected applications.

### Authentication

OpenAI account through supported password, social, or workspace SSO flows.
Workspace policy and plan affect available capabilities.

### Available Models

OpenAI-managed ChatGPT model set. Exact models and selection behavior vary by
plan, workspace, region, and product release; discover from the active product
rather than hard-code aliases.

### Quota Type

Subscription or workspace usage limits, feature-specific allowances, and
provider-managed fair-use controls.

### Reset Policy

Plan and feature dependent. Treat reset details as provider observations; use
`unknown` when the product does not expose a trustworthy time.

### Context Window

Model and product-surface dependent; conceptually medium to very large. Files,
apps, and conversation state can impose additional product constraints.

### Tool Support

Known: product-managed tools, file handling, research, and connected apps;
availability varies by plan and workspace.

### MCP Support

**Known, surface dependent.** Custom MCP-backed apps and full MCP actions are
available only on documented plans/surfaces and may be in beta.

### API Availability

No direct “ChatGPT product API.” OpenAI provides separate developer APIs with
their own models, authentication, billing, retention, and limits.

### CLI Availability

No general ChatGPT-native CLI established in the reviewed sources. Codex is the
separate OpenAI coding-agent CLI.

### Desktop Availability

Known through official ChatGPT desktop applications; availability can vary by
operating system and account.

### Browser Availability

Known through the ChatGPT web application.

### Estimated Cost Model

Subscription or workspace seat; some capabilities may use credits or separate
commercial terms.

### Strengths

Broad human-facing interaction, mixed knowledge work, accessible tools, and
low-friction browser/desktop use.

### Weaknesses

Product-managed model selection and plan entitlements are less deterministic
than a direct API contract; exact quota can be difficult to normalize.

### Recommended Tasks

Interactive analysis, drafting, research, file-based knowledge work, and
human-reviewed tasks that benefit from a general assistant surface.

### Known Limitations

Plan, workspace, region, feature rollout, and admin policy can change models,
tools, MCP, and usage limits.

### Risk Notes

Do not treat ChatGPT login as OpenAI API authorization. Connected apps can send
context to third parties; permissions and data policy require review.

### Official Sources

- [ChatGPT authentication](https://help.openai.com/en/articles/10468051)
- [Apps in ChatGPT](https://help.openai.com/en/articles/11487775-connectors-in-chatgpt.otf)
- [Developer mode and MCP apps](https://help.openai.com/en/articles/12584461)

## Claude

### Purpose

Anthropic-hosted assistant and model ecosystem for knowledge work, analysis,
coding, and tool-connected workflows.

### Authentication

Claude account for consumer surfaces; Anthropic Console credentials/API keys for
API usage. Claude Code can use Console OAuth, eligible Claude plans, or approved
cloud platforms.

### Available Models

Anthropic-managed Claude families exposed by Claude products and APIs. Discover
current variants from the selected surface.

### Quota Type

Subscription usage capacity for Claude products; metered API usage and rate
limits for developer access.

### Reset Policy

Plan, product, and API-window dependent. Record provider-reported reset or
cooldown facts without assuming one global Claude window.

### Context Window

Model and surface dependent; conceptually large. Do not copy a fixed token value
from one model into the family record.

### Tool Support

Known: API tool use, Claude product connectors, and coding tools through Claude
Code; permissions differ by surface.

### MCP Support

**Known.** Official documentation covers Claude API connectors, Claude Code,
Claude.ai, and Claude Desktop MCP use.

### API Availability

Known through Anthropic developer APIs and supported enterprise platforms.

### CLI Availability

Known through the related Claude Code CLI.

### Desktop Availability

Known through Claude Desktop.

### Browser Availability

Known through Claude.ai.

### Estimated Cost Model

Subscription for consumer/Claude Code access or usage-metered API billing.

### Strengths

Long-form analysis, document and code understanding, strong MCP ecosystem, and
clear coding-agent permission controls.

### Weaknesses

Capabilities and quota differ across Claude, Claude Code, API, and cloud-hosted
paths; one entry must not merge those limits.

### Recommended Tasks

Repository analysis, documentation, code planning/review, long-form synthesis,
and MCP-connected workflows with explicit permission policy.

### Known Limitations

Plan, region, admin policy, provider path, and product surface affect model and
connector availability.

### Risk Notes

Claude Code can run shell and edit operations. Permission modes and external MCP
servers require explicit review; subscription access is not interchangeable
with API billing.

### Official Sources

- [Claude Code setup and authentication](https://docs.anthropic.com/en/docs/claude-code/getting-started)
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/cli-usage)
- [Anthropic MCP overview](https://docs.anthropic.com/en/docs/mcp)
- [Claude Desktop](https://support.anthropic.com/en/articles/10065433-installing-claude-for-desktop)

## Gemini

### Purpose

Google-hosted assistant and developer model ecosystem for multimodal knowledge
work, Google-connected experiences, and API-based AI applications.

### Authentication

Google Account for Gemini Apps; API key, OAuth, or Google Cloud identity for
developer and enterprise access as documented by the selected surface.

### Available Models

Google-managed Gemini families and agents. Exact inventory, preview status, and
surface availability are dynamically discovered.

### Quota Type

Consumer plan limits plus API/project rate, usage, and billing limits.

### Reset Policy

Product, plan, project, model, and rate-window dependent. No single Gemini reset
rule applies to all surfaces.

### Context Window

Model dependent; conceptually large to very large. Cache and product behavior
must remain separate capability facts.

### Tool Support

Known: Gemini API built-in tools and function calling; Gemini Apps Connected
Apps vary by account, region, and surface.

### MCP Support

**Known, surface dependent.** Official Gemini Apps documentation supports custom
MCP apps for eligible Gemini Spark users; other surfaces require separate
verification.

### API Availability

Known through Gemini developer APIs and Google Cloud offerings.

### CLI Availability

Related Google coding CLI availability changes over time; register the active
Google CLI/agent product separately rather than assuming Gemini Apps is a CLI.

### Desktop Availability

No standalone Gemini desktop entry is established here; browser/Chrome and
mobile surfaces are separate product facts.

### Browser Availability

Known through Gemini web and selected Chrome integration.

### Estimated Cost Model

Consumer subscription or usage-metered API/cloud billing.

### Strengths

Multimodal and Google-ecosystem workflows, broad developer API tools, and
large-context use cases.

### Weaknesses

Capabilities vary substantially across Gemini Apps, API, Cloud, account types,
regions, and preview features.

### Recommended Tasks

Multimodal analysis, Google-connected knowledge work, large-context processing,
and applications needing Gemini API tools.

### Known Limitations

Connected Apps, MCP, model access, and data behavior vary by account and region.
Preview APIs and agents can change.

### Risk Notes

Do not infer API capability from Gemini Apps UI, or vice versa. Review Google
account activity, data, admin, and third-party app policies.

### Official Sources

- [Gemini Apps sign-in](https://support.google.com/gemini/answer/13278668?hl=en)
- [Gemini API](https://ai.google.dev/api)
- [Gemini API tools](https://ai.google.dev/gemini-api/docs/tools)
- [Gemini custom MCP apps](https://support.google.com/gemini/answer/17209137)

## Codex

### Purpose

OpenAI coding agent for understanding, changing, reviewing, debugging, and
automating work in software repositories.

### Authentication

ChatGPT sign-in for subscription/workspace access or OpenAI API key for
usage-based local workflows. Cloud requires ChatGPT sign-in.

### Available Models

Codex-supported OpenAI models plus compatible configured providers on supported
local surfaces. Exact recommended models and aliases are dynamic.

### Quota Type

ChatGPT plan limits/credits for subscription access or metered OpenAI API usage
and rate limits for API-key access.

### Reset Policy

Plan, credit, and API-tier dependent. Codex product limits and OpenAI API rate
windows remain separate quota sources.

### Context Window

Model and surface dependent; conceptually large. Repository compaction and tool
context are product behavior separate from raw model context.

### Tool Support

Known: repository files, shell, patching, web/browser, skills, plugins,
connectors, subagents, review, and other capability-dependent tools.

### MCP Support

**Known.** Codex CLI and IDE extension support local STDIO and remote HTTP MCP
servers with documented authentication options.

### API Availability

Known through Codex SDK/app-server and noninteractive interfaces; Codex-capable
models can also be accessed through their documented OpenAI API endpoints.

### CLI Availability

Known through Codex CLI.

### Desktop Availability

Known through the Codex desktop app.

### Browser Availability

Known through Codex web/cloud and in-app browser capabilities, subject to plan
and environment.

### Estimated Cost Model

ChatGPT subscription/credits or metered API token/tool usage.

### Strengths

Repository-native engineering workflow, multi-surface continuity, sandbox and
approval controls, programmatic interfaces, and extensibility.

### Weaknesses

Feature availability differs by app, CLI, IDE, web/cloud, plan, and
authentication method; high tool authority requires careful policy.

### Recommended Tasks

Codebase analysis, scoped implementation, review, debugging, migration,
documentation maintenance, and repeatable engineering automation.

### Known Limitations

Cloud and workspace features may not be available with API-key authentication.
Model aliases and feature maturity change; current manual and runtime discovery
are required.

### Risk Notes

Shell, browser, file, connector, and plugin access can be consequential. Use the
narrowest sandbox, permissions, and approval gates; do not confuse ChatGPT
entitlement with API authorization.

### Official Sources

- [Codex overview](https://developers.openai.com/codex/overview)
- [Codex authentication](https://developers.openai.com/codex/auth)
- [Codex models](https://developers.openai.com/codex/models)
- [Codex MCP](https://developers.openai.com/codex/mcp)

## GPT-OSS

### Purpose

OpenAI open-weight reasoning model family for user-controlled or third-party
hosted inference.

### Authentication

No OpenAI product authentication is required to obtain and run the open weights.
Authentication depends on the selected artifact host, runtime, or hosting
provider.

### Available Models

GPT-OSS model family and related officially released variants. Artifact and
runtime identity must be recorded; do not treat every community deployment as
equivalent.

### Quota Type

Local compute, concurrency, hardware, and scheduler capacity; or metered limits
of the chosen hosting provider.

### Reset Policy

No intrinsic subscription reset. Local capacity follows user scheduling;
hosted reset policy belongs to the selected runtime/provider.

### Context Window

Model and runtime dependent; record discovered runtime capability rather than a
fixed catalog number.

### Tool Support

Model/runtime dependent. Official guidance describes agentic and function/tool
use, but execution comes from the surrounding runtime.

### MCP Support

**Unknown as a model capability.** MCP support belongs to the host application
or agent runtime, not the weights.

### API Availability

No required OpenAI-hosted API. APIs are supplied by self-hosted runtimes or
third-party hosts.

### CLI Availability

Runtime dependent; no single GPT-OSS-native CLI is the authority.

### Desktop Availability

Runtime dependent through local model applications.

### Browser Availability

Runtime/host dependent; official demonstrations do not establish a universal
browser product.

### Estimated Cost Model

Hardware, energy, operations, and maintenance for self-hosting, or third-party
usage metering.

### Strengths

Deployment control, customization, inspectable weights, local/private options,
and independence from one hosted inference surface.

### Weaknesses

Operational burden, hardware requirements, runtime variance, and no uniform
quota, health, tool, or safety envelope.

### Recommended Tasks

Local experimentation, controlled/private deployments, customization research,
and workloads where infrastructure ownership is a requirement.

### Known Limitations

Open weights are not the same as a managed service. Capabilities, performance,
tooling, and costs depend strongly on runtime and hardware.

### Risk Notes

The operator owns deployment security, safety controls, updates, model artifact
integrity, resource isolation, and data handling.

### Official Sources

- [OpenAI open-weight models](https://help.openai.com/en/articles/11870455-openai-open-weight-models-gpt-oss)
- [Open models by OpenAI](https://openai.com/open-models/)
- [Introducing GPT-OSS](https://openai.com/index/introducing-gpt-oss/)

## OpenHands

### Purpose

Open agent platform for software-development tasks using configured model
providers, tools, and execution environments.

### Authentication

OpenHands Cloud login where used; model-provider API keys or provider-specific
credentials for configured inference; self-hosted deployments define their own
access boundary.

### Available Models

Models from configured providers using OpenHands-supported model naming and
runtime configuration. Inventory is dynamic and deployment-specific.

### Quota Type

OpenHands service/deployment limits plus the quota and billing of the configured
model provider.

### Reset Policy

Deployment and upstream provider dependent. Keep OpenHands platform limits
separate from model-provider quota.

### Context Window

Selected model and agent-runtime dependent.

### Tool Support

Known: coding agent actions, terminal, files, IDE integrations, and extensible
tools under the selected execution and approval policy.

### MCP Support

**Known.** Official documentation covers MCP in CLI and SDK, including local and
remote servers.

### API Availability

Known through OpenHands SDK/server surfaces; exact deployment contract is
version dependent.

### CLI Availability

Known through OpenHands CLI and headless operation.

### Desktop Availability

No dedicated native desktop app established in reviewed sources.

### Browser Availability

Known through web terminal and full GUI server/cloud surfaces.

### Estimated Cost Model

OpenHands hosting/deployment plus underlying model-provider usage and execution
infrastructure.

### Strengths

Open agent runtime, multi-provider configuration, CLI/browser/IDE surfaces, and
strong software-task focus.

### Weaknesses

Behavior and cost inherit multiple dependencies: agent version, sandbox,
deployment, model provider, and configured tools.

### Recommended Tasks

Agentic repository work, reproducible software tasks, headless automation, and
self-hosted experimentation.

### Known Limitations

Platform capability does not guarantee a configured model supports every tool.
Native Windows CLI support and deployment details can vary.

### Risk Notes

Agents can edit files and run commands. Review sandboxing, provider credentials,
MCP servers, approval policy, and self-hosted exposure.

### Official Sources

- [OpenHands CLI quick start](https://docs.openhands.dev/openhands/usage/cli/quick-start)
- [OpenHands web interface](https://docs.openhands.dev/openhands/usage/cli/web-interface)
- [OpenHands MCP](https://docs.openhands.dev/overview/model-context-protocol)

## OpenCode

### Purpose

Open-source coding agent platform with configurable providers, tools, agents,
permissions, and multiple local interaction surfaces.

### Authentication

Provider-specific OAuth, subscription, API key, bearer token, environment, or
local unauthenticated runtime; OpenCode stores/configures credentials according
to the selected provider flow.

### Available Models

Dynamic catalog from configured providers and model metadata sources. Custom
OpenAI-compatible providers can be registered.

### Quota Type

Underlying provider subscription/API quota or local runtime capacity. OpenCode
does not create one universal quota.

### Reset Policy

Underlying provider dependent; adapter must preserve the selected provider and
account scope.

### Context Window

Model metadata and provider dependent; runtime catalog may discover limits.

### Tool Support

Known: repository read/write, shell, search, web, language tooling, subagents,
custom tools, and granular permissions.

### MCP Support

**Known.** Local and remote MCP servers become permission-controlled tools.

### API Availability

Known through local server/ACP and related product interfaces; not a hosted model
inference API.

### CLI Availability

Known through OpenCode CLI/TUI.

### Desktop Availability

Known through the beta desktop application.

### Browser Availability

Known through the locally served web interface.

### Estimated Cost Model

Open-source local software plus underlying provider usage or local compute.

### Strengths

Provider flexibility, local-first surfaces, explicit permissions, configurable
agents, MCP, and open-source extensibility.

### Weaknesses

Capability consistency depends on selected provider/model; rapid product changes
and beta surfaces require version-aware adapters.

### Recommended Tasks

Local coding workflows, provider comparison, configurable agent roles,
permission-sensitive repository work, and multi-provider experimentation.

### Known Limitations

Provider setup and model compatibility vary. Local web exposure requires
authentication configuration when used beyond loopback.

### Risk Notes

Default or configured tools can modify files and run shell commands. Audit
permissions, credentials, plugins, MCP servers, and web-server exposure.

### Official Sources

- [OpenCode providers](https://opencode.ai/docs/providers)
- [OpenCode MCP servers](https://opencode.ai/docs/mcp-servers)
- [OpenCode agents and permissions](https://opencode.ai/docs/agents/)
- [OpenCode repository and desktop downloads](https://github.com/anomalyco/opencode)

## Antigravity

### Purpose

Google agentic development platform spanning desktop command center, IDE, CLI,
SDK, and agent workflows.

### Authentication

Google account or approved enterprise identity. CLI uses keyring-backed sessions
and browser/remote authorization flows.

### Available Models

Google-managed Antigravity/Gemini agent model catalog, with additional models
depending on plan and product release. Discover at runtime.

### Quota Type

Plan-based agent limits, weekly limits, optional shorter refresh windows, and
credit overage behavior where eligible.

### Reset Policy

Plan dependent. Official plan documentation describes different refresh and
weekly-limit behavior; record exact user-plan observations rather than one
global reset rule.

### Context Window

Agent-model and surface dependent; conceptually large. Subagent and artifact
context are platform behavior separate from raw model context.

### Tool Support

Known: files, code editing, shell, browser, subagents, scheduled tasks, skills,
hooks, and Google integrations under permissions.

### MCP Support

**Known.** Official IDE/CLI/SDK documentation describes MCP resources and tools.

### API Availability

Known through Antigravity SDK and documented agent/API surfaces; maturity and
availability must be recorded per surface.

### CLI Availability

Known through Antigravity CLI.

### Desktop Availability

Known through Antigravity desktop and IDE products.

### Browser Availability

Known browser tool/integration; this is not the same as a fully browser-hosted
Antigravity product.

### Estimated Cost Model

Google AI plan allowance plus optional credit/enterprise consumption.

### Strengths

Integrated agent command center, IDE/CLI/SDK surfaces, parallel subagents,
artifacts, Google ecosystem, and built-in extensibility.

### Weaknesses

Plan/model availability and quotas can change; broad local tool authority and
multiple surfaces increase configuration complexity.

### Recommended Tasks

Google-stack development, agent-orchestrated coding, IDE-centric work,
parallel-subagent tasks, and workflows needing browser/visual artifacts.

### Known Limitations

Model access, third-party models, quota, overages, and enterprise terms vary by
plan. Some capabilities may be preview or version specific.

### Risk Notes

Agent shell, file, browser, scheduled, hook, and plugin capabilities are
consequential. Require sandbox, narrow permissions, review gates, and verified
official configuration.

### Official Sources

- [Antigravity product surfaces](https://antigravity.google/docs/home)
- [Antigravity plans and quota](https://antigravity.google/docs/plans)
- [Antigravity CLI authentication](https://antigravity.google/docs/cli-install)
- [Antigravity MCP](https://antigravity.google/docs/mcp)

## OpenRouter

### Purpose

Model gateway providing a unified API, dynamic model catalog, provider routing,
fallbacks, and normalized usage/pricing metadata.

### Authentication

Bearer API keys for core APIs, management keys for key management, and
cookie-based authentication for web surfaces; optional BYOK behavior has
separate terms.

### Available Models

Dynamic multi-provider catalog exposed through official model discovery APIs.
Model and serving-provider identity must both be retained.

### Quota Type

Account credits, request/rate limits, model/provider limits, and optional BYOK
provider quota.

### Reset Policy

Account, free/paid tier, model, provider, and BYOK dependent. Discover current
rate-limit facts rather than assume one gateway reset.

### Context Window

Model and selected serving provider dependent; official model metadata exposes
current values for discovery.

### Tool Support

Known: normalized tool/function-calling parameters for supporting models.
Execution of the tool remains the caller's responsibility.

### MCP Support

**Unknown as a native gateway capability.** Tool calling is documented, but
that does not by itself establish an MCP client or server product.

### API Availability

Known through an OpenAI-compatible unified API and model discovery endpoints.

### CLI Availability

No first-party OpenRouter CLI established in the reviewed sources; third-party
clients use the API.

### Desktop Availability

No native desktop product established in the reviewed sources.

### Browser Availability

Known through web catalog, account, and chat surfaces.

### Estimated Cost Model

Prepaid credits and pass-through model/provider usage, with gateway/BYOK fee
rules defined by current official terms.

### Strengths

Large dynamic catalog, one API shape, provider routing/fallback, capability and
pricing metadata, and provider choice.

### Weaknesses

Adds a gateway dependency; behavior, latency, data policy, and capability can
vary by underlying provider route.

### Recommended Tasks

Multi-provider evaluation, fallback routing, cost-aware experiments, dynamic
catalog discovery, and applications needing one gateway interface.

### Known Limitations

Not every model or serving provider supports the same parameters. Gateway model
identity alone is insufficient for deterministic behavior.

### Risk Notes

Retain actual serving-provider provenance, data policy, price snapshot, and
model identity. Review gateway and upstream provider terms, BYOK handling, and
fallback behavior.

### Official Sources

- [OpenRouter quickstart](https://openrouter.ai/docs/quickstart)
- [OpenRouter model discovery](https://openrouter.ai/docs/guides/overview/models)
- [OpenRouter tool calling](https://openrouter.ai/docs/guides/features/tool-calling)
- [OpenRouter authentication and fees](https://openrouter.ai/docs/faq)

## Maintenance

Review entries when:

- an official source changes;
- an adapter observes incompatible behavior;
- a model or surface is added, deprecated, or removed;
- authentication, quota, pricing class, MCP, or tool behavior changes;
- risk or data-handling policy changes;
- a routing decision depends on an `Unknown` field.

Updates preserve the previous verification date in history and identify the
official sources reviewed.
