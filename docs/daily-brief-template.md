# Daily Brief Template

## Status

Draft Daily Brief template for H2.3. This is a manual, human-readable and
AI-readable documentation template.

## Purpose

The Daily Brief turns Project Status records into a compact daily operating
summary across active projects. It helps the AI Executive Office identify what
can move today, what should stay under observation, what is waiting on outside
information, what is blocked, and what guardrails must remain in force.

## Source Boundary

This template only reads Project Status records, starting with
`docs/project-status/current-projects.md` and the schema in
`docs/project-status-schema.md`.

It does not:

- automatically execute tasks;
- create a CLI;
- create scheduling or automatic notifications;
- modify app code;
- touch databases, deployments, GitHub Actions, or external services;
- grant authority to merge, deploy, purchase, notify, or contact third parties.

Any action suggested by a Daily Brief must still follow the repository's review,
approval, and contribution rules.

## Input Records

Use one Project Status record per project. Each input record must include:

```yaml
project_name: ""
current_phase: ""
latest_done: ""
latest_pr: ""
latest_commit: ""
waiting_for: []
next_action: ""
blocked: false
do_not_do: []
handoff_prompt: ""
```

## Brief Template

### 今日總覽

- 日期：
- 產生者：
- 使用的 Project Status records：
- 今日整體判斷：
- 需要人工確認的最高優先事項：

### 可動工

List projects where `blocked` is `false` and `next_action` is specific enough
to start after normal human review.

| 專案 | 可動工原因 | 建議動作 | 需要確認 |
| --- | --- | --- | --- |
|  |  |  |  |

### 觀察中

List projects that are not blocked but should be watched because they have
review gates, stale facts, unverified PR state, or non-urgent waiting items.

| 專案 | 觀察原因 | 目前階段 | 何時重新檢查 |
| --- | --- | --- | --- |
|  |  |  |  |

### 等待外部資訊

Summarize `waiting_for` items that require human input, external review, or
facts outside the Project Status records.

| 專案 | 等待事項 | 等待來源 | 對下一步的影響 |
| --- | --- | --- | --- |
|  |  |  |  |

### 卡住 / blocked

List projects where `blocked` is `true`. If no project is blocked, write
`None known from Project Status records`.

| 專案 | 卡住原因 | 解除條件 | 不應執行事項 |
| --- | --- | --- | --- |
|  |  |  |  |

### 各專案狀態摘要

Use one subsection per project.

#### 專案名稱

- current_phase：
- latest_done：
- latest_pr：
- latest_commit：
- waiting_for：
- next_action：
- blocked：
- do_not_do：

### 今日建議優先順序

Rank only from the Project Status records. Do not invent new work.

1. Priority 1：
   - 專案：
   - 理由：
   - 建議下一步：
   - 必須遵守的 guardrail：
2. Priority 2：
   - 專案：
   - 理由：
   - 建議下一步：
   - 必須遵守的 guardrail：
3. Priority 3：
   - 專案：
   - 理由：
   - 建議下一步：
   - 必須遵守的 guardrail：

### Do Not Do guardrails

Combine the `do_not_do` lists from all Project Status records. Keep each item
attributable to its project.

| 專案 | Guardrail |
| --- | --- |
|  |  |

### Handoff prompt 區塊

Provide copy-ready prompts for continuing work. Use only the `handoff_prompt`
fields from Project Status records unless a human explicitly approves edits.

```text
Project:
Handoff prompt:
```

## Completion Check

Before treating a Daily Brief as complete:

- Confirm every active Project Status record was considered.
- Confirm every listed action traces back to `next_action`.
- Confirm every prohibition traces back to `do_not_do` or this template's source
  boundary.
- Confirm blocked projects are not listed as ready to execute.
- Confirm no CLI, automation, scheduling, notification, database, deployment,
  GitHub Actions, app-code, or external-service work was introduced.
