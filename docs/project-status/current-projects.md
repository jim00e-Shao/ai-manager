# Current Project Status

## Status

Initial Project Status MVP records for active projects. These records are
manual, documentation-only, and should be refreshed when a project changes
phase, PR state, or next action.

## Source Notes

- `latest_pr` and `latest_commit` values are based on local checkout evidence
  available on 2026-07-16.
- External GitHub state was not used as an execution authority for these
  records.
- These records do not authorize code changes, CLI work, deployment, database
  work, GitHub Actions work, or external-service operations.

## CareTide 看護服務平台

```yaml
project_name: "CareTide 看護服務平台"
current_phase: "Beta stabilization and product validation"
latest_done: "Prepared beta v28 release according to the latest local main commit."
latest_pr: "PR #475, from local commit subject; GitHub state not reverified in this record."
latest_commit: "8bf919a chore(release): prepare beta v28 (#475)"
waiting_for:
  - "Human confirmation of the next CareTide priority before opening new work."
  - "Review of existing local untracked demo and validation notes before treating them as project truth."
next_action: "Ask the user which CareTide beta follow-up should be advanced next, then create a narrow docs or code task from the confirmed priority."
blocked: false
do_not_do:
  - "Do not modify CareTide app code from this ai-manager status task."
  - "Do not publish, deploy, or change external services."
  - "Do not treat local untracked demo files as accepted product state."
  - "Do not merge or mark any PR ready without explicit human approval."
handoff_prompt: "下一步：維持 Beta 穩定化，依實測證據處理收案、通知與上架前缺口。限制：不要改動部署、資料庫或外部整合，除非另有明確授權。"
```

## Harmony Home 線上打卡

```yaml
project_name: "Harmony Home 線上打卡"
current_phase: "Admin management roadmap planning"
latest_done: "Planned the admin management roadmap according to the latest local main commit."
latest_pr: "PR #14, from local commit subject; GitHub state not reverified in this record."
latest_commit: "18b2061 docs: plan admin management roadmap (#14)"
waiting_for:
  - "Human decision on which admin management roadmap item should become the next implementation or documentation task."
next_action: "Review the admin management roadmap and ask the user to select the first concrete Harmony Home follow-up."
blocked: false
do_not_do:
  - "Do not implement admin features before a selected roadmap item is approved."
  - "Do not change authentication, deployment, database, or external integrations from this status record."
  - "Do not create GitHub Actions or automation work unless separately requested."
  - "Do not merge or mark any PR ready without explicit human approval."
handoff_prompt: "下一步：閱讀管理後台 roadmap，確認下一張小票。限制：不要實作 auth、database、deployment、GitHub Actions 或外部服務。"
```

## AI 特助 / AI Manager

```yaml
project_name: "AI 特助 / AI Manager"
current_phase: "H4 manual workflow vs automation planning"
latest_done: "H4.2 Windows Daily Brief batch shortcuts merged"
latest_pr: "PR #36 feat: add Windows Daily Brief batch shortcuts"
latest_commit: "a6f56ae feat: add Windows Daily Brief batch shortcuts (#36)"
waiting_for:
  - "Human decision on whether to keep Daily Brief generation manual or plan H4 automation boundaries"
next_action: "H4.3 preview output usability polish — make the \"今日簡報\" desktop button output easier to read; for example add a clear title, operating hints, or evaluate writing output to a text/Markdown file then opening it. Do not implement H4.3 in this update."
blocked: false
do_not_do:
  - "Do not add a snapshot button from this status update."
  - "Do not add scheduling from this status update."
  - "Do not add automatic notifications from this status update."
  - "Do not change database, deployment, GitHub Actions, or external services from this status update."
  - "Do not change CareTide or Harmony Home from this AI Manager status update."
handoff_prompt: "下一步：H4 維持手動 Daily Brief，先觀察幾個週期再決定是否自動化。限制：不要新增 automation、notification、database、deployment、GitHub Actions 或外部整合。"
```
