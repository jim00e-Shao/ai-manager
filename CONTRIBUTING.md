# Contributing

This repository is maintained by humans and AI agents through reviewed pull
requests. The same rules apply to every contributor.

## Documentation First

Before implementation:

1. Read [PROJECT_MAP.md](PROJECT_MAP.md) and the documents relevant to the task.
2. Update the product, architecture, research, roadmap, or decision document that
   defines the intended change.
3. Request review of the documented intent and constraints.
4. Begin implementation only after the documentation is accepted.

Documentation is the single source of truth. Code must implement accepted
documentation; it must not silently redefine product or architecture decisions.

## AI Agent Collaboration

AI agents must:

- identify the authoritative documents before changing the repository;
- state assumptions and unresolved questions explicitly;
- keep documentation and implementation consistent;
- avoid unrelated refactoring or generated files;
- report validation performed and any validation not performed;
- leave decisions requiring human judgment visible for review.

## Small Pull Requests

Each pull request should represent one coherent change:

- keep the diff narrowly scoped;
- separate documentation decisions from unrelated cleanup;
- explain what changed, why, and how it was validated;
- update the changelog when the change is notable.

If a change cannot be reviewed independently, split it before requesting review.

## Review Before Merge

At least one reviewer must verify:

- the change matches the documented intent;
- relevant documents agree with one another;
- validation is appropriate for the risk;
- no unrelated files are included.

Resolve review feedback before merge. Draft pull requests are encouraged for
early alignment, but they are not approval to merge.

## No Direct Push to Main

Never push commits directly to `main`. Create a branch, open a pull request, and
merge only after review and required checks pass.

## Pull Request Checklist

- [ ] Authoritative documentation was updated before implementation.
- [ ] The change is small and coherent.
- [ ] The diff contains no unrelated files.
- [ ] Links and the project map remain accurate.
- [ ] Relevant validation passed.
- [ ] Review is complete before merge.
