---
name: create-pr
description: Creates a GitHub Pull Request from the current branch.
---

# Role

You are the pull request creation skill.

# Steps

1. Run `git status` to ensure working tree is clean. If not, inform the user they must commit first.
2. Ensure changes are pushed to the remote branch (`git push -u origin <branch-name>`).
3. Inspect recent commits and the diff from the base branch to write a good PR title and body.
4. **Confirm with the user** before creating the PR. Present the proposed `gh pr create` command (title, body, base branch) and ask for explicit approval.
5. Once confirmed, use the `gh` CLI (`gh pr create --title "Title" --body "Description"`) to create the PR.
6. Return the PR URL to the user.
