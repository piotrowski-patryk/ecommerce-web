---
name: commit-message
description: Propose an English Conventional Commit message when the user asks for a commit name or message for this project.
---

# Commit message

Use this skill when the user asks for a commit name or message. Write the result in English, even if the request is in Polish.

## Determine what the commit contains

- Use the changes specified by the user. If they refer to the current work without naming files, inspect `git status` and the staged diff first. If nothing is staged, inspect the relevant unstaged diff and untracked files. Read enough of the changes to understand their purpose, not just their filenames.
- Describe the main outcome of the changes that belong in this commit. Do not include unrelated working-tree changes or claim behavior that the diff does not show.
- If the changes cannot be determined from the request or repository, ask what the commit contains instead of guessing.

## Compose the message

Use the Conventional Commits header `type(scope): description`. Omit `(scope)` when there is no clear, short area name. Choose the type by intent:

| Type | Use for |
| --- | --- |
| `feat` | New user-facing behavior or capability |
| `fix` | Correcting a defect |
| `docs` | Documentation-only changes |
| `refactor` | Code restructuring without intended behavior change |
| `test` | Tests-only changes |
| `perf` | Performance improvements |
| `build` | Build tooling or dependencies |
| `ci` | CI configuration |
| `chore` | Maintenance that fits none of the above |

- Keep the description short and specific, preferably under 72 characters for the whole header. Use an imperative verb, lowercase the first word, and omit the final period. Describe the outcome rather than listing changed files or writing a vague label such as `update code`.
- For a breaking change, add `!` before the colon, for example `feat(checkout)!: require a delivery address`. Use it only when the change actually breaks an existing contract. If the user requests a full commit message, add a `BREAKING CHANGE:` footer explaining the migration or impact.
- When multiple related changes form one commit, name their shared purpose. If unrelated changes appear mixed together, base the suggestion on the explicitly requested or staged set; ask for scope only when neither identifies the intended commit.

Examples: `feat(checkout): add parcel locker delivery`, `fix(cart): preserve quantity after refresh`, `docs: document shared form controls`.

Unless the user asks for alternatives, a body, or an explanation, reply with exactly one ready-to-copy header and no surrounding text or code fence. Suggesting a name does not authorize creating the commit.
