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
handoff_prompt: "Continue CareTide from the latest verified project status. First inspect the CareTide repo state, confirm the user's chosen beta follow-up, and keep the task scoped to that approved next action. Do not deploy, modify external services, or merge without approval."
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
handoff_prompt: "Continue Harmony Home by reading the admin management roadmap, confirming the user's selected next item, and preparing only the narrow approved follow-up. Do not implement auth, database, deployment, GitHub Actions, or external integration changes without explicit approval."
```

## AI 特助 / AI Manager

```yaml
project_name: "AI 特助 / AI Manager"
current_phase: "H3 tool MVP planning"
latest_done: "H2.5 Daily Brief Update Protocol merged"
latest_pr: "PR #19 docs: add daily brief update protocol"
latest_commit: "4321498 docs: add daily brief update protocol (#19)"
waiting_for:
  - "Human approval to begin H3 tool MVP planning"
next_action: "Plan the smallest tool MVP that can read Project Status records and produce a Daily Brief without adding scheduling, notifications, databases, deployments, GitHub Actions, or external-service integrations."
blocked: false
do_not_do:
  - "Do not implement a CLI before H3 scope is approved."
  - "Do not add scheduling or automatic notifications."
  - "Do not add database, deployment, GitHub Actions, or external-service integrations."
  - "Do not change CareTide or Harmony Home from this AI Manager status update."
handoff_prompt: "Continue AI Manager by planning H3 tool MVP. First define the smallest read-only path from Project Status records to Daily Brief output. Keep the first H3 task scoped to planning unless implementation is explicitly approved. Do not add scheduling, notifications, database work, deployment, GitHub Actions, external-service integrations, or changes to CareTide/Harmony Home."
```
