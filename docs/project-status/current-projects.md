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
  - "等待使用者確認下一個 CareTide beta 跟進項目，再開新工作。"
  - "先把現有未追蹤的 demo 與驗證筆記檢視過，再當作專案事實。"
next_action: "請使用者選定下一個 CareTide beta 跟進項目，再從確認的優先級開一張範圍狹小的 docs 或 code 小票。"
blocked: false
do_not_do:
  - "不要從這個 ai-manager 狀態任務修改 CareTide app 程式碼。"
  - "不要發佈、部署或更動外部服務。"
  - "不要把本地未追蹤的 demo 檔當作已接受的產品狀態。"
  - "未經使用者明確授權，不要 merge 或把任何 PR 標為可 review。"
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
  - "等待使用者決定：管理後台 roadmap 中哪一項成為下一張實作或文件小票。"
next_action: "檢視管理後台 roadmap，請使用者選定第一個具體的 Harmony Home 跟進項目。"
blocked: false
do_not_do:
  - "在選定的 roadmap 項目核准前，不要實作管理功能。"
  - "不要從這份狀態紀錄更動 authentication、deployment、database 或外部整合。"
  - "除非另行要求，不要建立 GitHub Actions 或 automation 工作。"
  - "未經使用者明確授權，不要 merge 或把任何 PR 標為可 review。"
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
  - "等待使用者決定：Daily Brief 產生要維持手動，還是規劃 H4 自動化邊界。"
next_action: "下一步：H4 維持手動 Daily Brief，先用幾個週期觀察平板 + Hermes 工作流；暫不新增 automation、notification 或排程。"
blocked: false
do_not_do:
  - "這次狀態更新不要新增 snapshot 按鈕。"
  - "這次狀態更新不要新增排程。"
  - "這次狀態更新不要新增自動通知。"
  - "這次狀態更新不要更動 database、deployment、GitHub Actions 或外部服務。"
  - "這次狀態更新不要從 AI Manager 改動 CareTide 或 Harmony Home。"
handoff_prompt: "下一步：H4 維持手動 Daily Brief，先觀察幾個週期再決定是否自動化。限制：不要新增 automation、notification、database、deployment、GitHub Actions 或外部整合。"
```
