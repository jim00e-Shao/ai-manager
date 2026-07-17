# Start Here

This is the first entry point for humans and AI agents working on ai-manager.

ai-manager is a documentation-first project. Before implementation begins, the
repository must explain what the product is, what it is not, how the system is
organized, and which documents are authoritative.

## What This Project Is

ai-manager is an **AI Executive Office** and emerging **AI Operating System** for
AI-assisted software development.

It is not another chat application. It is the management layer around AI work:
strategy, resources, knowledge, decision governance, scheduling, routing,
execution, observability, and human control.

The first operational user is an AI agent that must understand the repository
and continue work safely. The first human user is the developer who defines
intent, reviews decisions, and remains in control.

## Current Positioning

ai-manager is currently positioned as:

- **AI Executive Office** — coordinates advisors, resources, decisions, and
  execution.
- **AI Operating System** — preserves project knowledge, resource state, and
  workflow continuity across AI tools.
- **AI Development Control Plane** — makes AI work observable, explainable, and
  governed.

## 30-Second Version

ai-manager helps developers manage AI-assisted software work without losing
control of context, cost, quota, provider choice, decision history, or execution
state.

Its core idea is:

> Documentation is the Product Specification.

The repository is the knowledge base. Documents define product behavior,
architecture contracts, resource models, provider capabilities, decision
governance, and roadmap order before implementation begins.

## Current Prototype: Resource Briefing CLI

PR #11 implements the first executable prototype for the
[Resource Briefing CLI](docs/prototypes/RESOURCE_BRIEFING_CLI.md).

This prototype validates the first AI Executive Office closed loop:

```text
Observe → Think → Advise → Remind
```

**Requirements**: Node.js ≥ 18. No install needed — zero third-party dependencies.

```sh
node bin/ai-manager.js status
node bin/ai-manager.js brief
node bin/ai-manager.js recommend "我要修 React bug"
node bin/ai-manager.js reminders
```

Edit `data/resources.example.json` to reflect your current AI resource state.
Set `AI_MANAGER_SNAPSHOT` to point to a different file.

## 5-Minute Reading Path

1. [README.md](README.md) — project introduction and philosophy.
2. [PROJECT_MAP.md](PROJECT_MAP.md) — repository navigation contract.
3. [PRODUCT.md](docs/product/PRODUCT.md) — product definition and boundaries.
4. [PRINCIPLES.md](docs/product/PRINCIPLES.md) — durable product principles.
5. [AI_EXECUTIVE_OFFICE.md](docs/product/AI_EXECUTIVE_OFFICE.md) — current
   product positioning.
6. [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md) — architecture
   layers and authority flow.
7. [ROADMAP.md](docs/roadmap/ROADMAP.md) — capability sequence.
8. [RESOURCE_BRIEFING_CLI.md](docs/prototypes/RESOURCE_BRIEFING_CLI.md) — next
   prototype direction.

## Read by Purpose

### I Want to Understand the Product

Start with:

- [README.md](README.md)
- [PRODUCT.md](docs/product/PRODUCT.md)
- [AI_EXECUTIVE_OFFICE.md](docs/product/AI_EXECUTIVE_OFFICE.md)
- [PRINCIPLES.md](docs/product/PRINCIPLES.md)
- [VISION.md](docs/product/VISION.md)

### I Want to Understand the Architecture

Start with:

- [SYSTEM_OVERVIEW.md](docs/architecture/SYSTEM_OVERVIEW.md)
- [COMPONENT_CONTRACTS.md](docs/architecture/COMPONENT_CONTRACTS.md)
- [SYSTEM_BOUNDARIES.md](docs/architecture/SYSTEM_BOUNDARIES.md)
- [DATA_FLOW.md](docs/architecture/DATA_FLOW.md)
- [GLOSSARY.md](docs/architecture/GLOSSARY.md)

### I Want to Understand Resource Manager

Start with:

- [RESOURCE_MANAGER.md](docs/architecture/RESOURCE_MANAGER.md)
- [RESOURCE_MANAGER_MVP.md](docs/product/RESOURCE_MANAGER_MVP.md)
- [RESOURCE_DATA_MODEL.md](docs/architecture/RESOURCE_DATA_MODEL.md)
- [RESOURCE_STATE_MODEL.md](docs/architecture/RESOURCE_STATE_MODEL.md)
- [CONTEXT_CONTINUITY.md](docs/architecture/CONTEXT_CONTINUITY.md)
- [COST_AND_BUDGET.md](docs/architecture/COST_AND_BUDGET.md)

### I Want to Understand Decision / Strategy Council

Start with:

- [STRATEGY_COUNCIL.md](docs/architecture/STRATEGY_COUNCIL.md)
- [ADVISOR_MODEL.md](docs/architecture/ADVISOR_MODEL.md)
- [DECISION_GOVERNANCE.md](docs/architecture/DECISION_GOVERNANCE.md)
- [CONFLICT_RESOLUTION.md](docs/architecture/CONFLICT_RESOLUTION.md)

### I Want to Understand Provider Registry

Start with:

- [PROVIDERS.md](docs/providers/PROVIDERS.md)
- [PROVIDER_ABSTRACTION.md](docs/providers/PROVIDER_ABSTRACTION.md)
- [MODEL_CATALOG.md](docs/providers/MODEL_CATALOG.md)
- [CAPABILITY_MATRIX.md](docs/providers/CAPABILITY_MATRIX.md)
- [PROVIDER_SELECTION_GUIDE.md](docs/providers/PROVIDER_SELECTION_GUIDE.md)

### I Want to Start Developing

Start with:

- [PROJECT_MAP.md](PROJECT_MAP.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md)
- [ROADMAP.md](docs/roadmap/ROADMAP.md)
- [RESOURCE_BRIEFING_CLI.md](docs/prototypes/RESOURCE_BRIEFING_CLI.md)

Then update the authoritative documentation before implementation.

### I Am a New AI Agent Taking Over Work

Read these first, in order:

1. [START_HERE.md](START_HERE.md)
2. [PROJECT_MAP.md](PROJECT_MAP.md)
3. [AI_AGENT_ONBOARDING.md](docs/knowledge/AI_AGENT_ONBOARDING.md)
4. [SOURCE_OF_TRUTH.md](docs/knowledge/SOURCE_OF_TRUTH.md)
5. The authoritative documents for the requested task.

Do not rely on prior conversation history as the source of truth. Use the
repository documents.

## VPS Hermes 工作流程測試紀錄

本節記錄透過 VPS 上的 Hermes Agent 連線並讀取本專案的測試情況，供後續交接與環境確認參考。

- **測試日期**：2026-07-17
- **連線方式**：透過 LINE Messaging API 連接到架設在 VPS 上的 Hermes Agent（default profile）。
- **已驗證能力**：
  - 由 LINE 傳送指令，Hermes 可讀取並解析 `/root/ai-manager` 倉庫結構。
  - 可列出專案重要檔案（START_HERE.md、PROJECT_MAP.md、docs/ 系列、bin/ 雛形、scripts/ 渲染器等）。
  - 可讀取 `docs/project-status/current-projects.md` 與 `docs/daily-briefs/` 日報，產出專案狀態摘要與下一步建議。
- **溝通語言**：測試中以繁體中文回覆（Hermes 已記錄此偏好）。
- **注意事項**：此為只讀觀測用途，未在本測試中對專案做任何程式碼或文件變更以外的操作；實際開發仍須遵循本檔「What Not to Do Right Now」與各專案的 `do_not_do` 守則。

## What Not to Do Right Now

- Do not directly start writing UI.
- Do not add React, Vite, or any frontend framework.
- Do not add third-party npm packages to the CLI.
- Do not skip documentation.
- Do not treat Router as the Decision Engine.
- Do not treat Quota Manager as the Resource Manager.
- Do not add speculative implementation details to documentation-only PRs.
- Do not merge without review approval.
