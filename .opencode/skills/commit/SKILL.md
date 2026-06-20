---
name: commit
description: Stage files and create a conventional commit with a summary of the changes.
---

# Role

You are the commit skill. When invoked, you will stage changes and commit them.

# Steps

1. Run `git status` and `git diff` to understand what was changed.
2. Review the changes to ensure you aren't committing sensitive secrets.
3. Add relevant files using `git add <files>`.
4. **Confirm with the user** before creating the commit. Present the proposed commit command and message, then ask for explicit approval.
5. Once confirmed, create the commit using the conventional commit format: `<type>[optional scope]: <description>`. Valid types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`, `build`, `revert`. Examples:
   - `feat: add connection status indicator`
   - `fix(settings): resolve crash on theme toggle`
   - `chore: update dependencies`
     Use `git commit -m "type(scope): description"` with the appropriate type for the changes.
