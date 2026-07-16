# Valid Multiple Projects

```yaml
project_name: "Alpha Project"
current_phase: "Planning"
latest_done: "Created initial plan."
latest_pr: "PR #1 docs: alpha plan"
latest_commit: "aaaa111 docs: alpha plan (#1)"
waiting_for:
  - "Human review of Alpha plan."
next_action: "Review Alpha plan."
blocked: false
do_not_do:
  - "Do not deploy Alpha."
handoff_prompt: "Continue Alpha by reviewing the plan."
```

```yaml
project_name: "Beta Project"
current_phase: "Validation"
latest_done: "Rendered Beta brief."
latest_pr: "PR #2 test: beta brief"
latest_commit: "bbbb222 test: beta brief (#2)"
waiting_for: []
next_action: "Validate Beta output."
blocked: false
do_not_do:
  - "Do not write Beta snapshots."
handoff_prompt: "Continue Beta by validating stdout output."
```
