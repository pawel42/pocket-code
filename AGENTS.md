## Project Overview

**Pocket Code** is a native mobile application (iOS & Android) built with Expo and React Native. It allows users to remotely connect to an active `opencode` server session.

## Instruction Files

This project maintains shared instruction files that agents must read on a need-to-know basis. **Do not preload them all** — read the specific file when the task requires it.

| File                                            | When to read                                                                                                                                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.opencode/instructions/project-overview.md`    | Project description, tech stack, available commands                                                                                                                                        |
| `.opencode/instructions/code-best-practices.md` | Architecture & style: SRP, DRY, self-documenting code, typed props, barrel exports, arrow functions, post-declared exports, types over interfaces, type imports, path aliases, file naming |

## Agentic Workflow

This repository uses an automated multi-agent workflow orchestrated by the `@manager` agent. Subagents (`@planner`, `@implementer`, `@reviewer`, `@tester`) communicate status through a `STATUS: PASSED` / `STATUS: REJECTED` protocol; the orchestrator loops on rejection (up to 3 retries) and pauses for human guidance if unresolved.

When you request a new feature or fix, the workflow proceeds as follows:

1. **Plan**: `@manager` delegates to `@planner` (read-only) to analyze code, read instruction files, search Context7/Expo documentation, and produce an implementation spec.
2. **Checkpoint 1**: You review the plan and approve it. If changes are needed, `@manager` feeds your feedback back to `@planner`.
3. **Implement**: `@manager` delegates to `@implementer` to write the code, then runs `lint:fix` and `tsc --noEmit`.
4. **Review & Fix Loop**: `@manager` delegates to `@reviewer` to check conventions, bugs, and performance. If `blocker` issues are found (`STATUS: REJECTED`), `@implementer` fixes them and the review re-runs (up to 3 retries).
5. **Test & Fix Loop**: `@manager` delegates to `@tester` to write Jest tests and run via Expo MCP simulators. If tests fail (`STATUS: REJECTED`), `@implementer` fixes the bugs, then review + test re-run (up to 3 retries).
6. **Checkpoint 2**: You review the finished, tested code. If you're satisfied, use `@commit` to commit and `@create-pr` to open a pull request.
