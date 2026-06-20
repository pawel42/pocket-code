# Project Overview

**Pocket Code** is a native mobile application (iOS & Android only) built with Expo and React Native. It allows users to remotely connect to an active `opencode` server session.

## Key Features

- **Session Management:** Manage active/past remote `opencode` sessions, even across projects.
- **Interactive Workspace:** Prompt the remote AI engine, commit changes, and push directly to GitHub from a mobile device. Access project file trees, and live code diffs.

## Tech Stack

Agents must strictly write code compatible with the following locked architecture boundaries. **Do not attempt to write code for Web or utilize components outside these versions:**

- **Framework:** Expo `~56.0.8` (React Native `0.85.3`, React `19.2.3`)
- **Routing:** Expo Router `~56.2.8` (File-based navigation under `app/`)
- **Testing:** Jest: `~29.7.0` (Located under /**tests** in the project root)
- **Protocol:** Expo MCP `^0.2.4` (Model Context Protocol for native tool communication and Expo documentation)
- **Component Library:** Expo UI (Utilized for universal, high-performance native user interface components)

## Important Commands

- `npm run start` – Starts the local Expo development server. Append `-c` (or `--clear`) to clear the bundler cache.
- `npm run lint:fix` – Lints and fixes autofixable formatting/style issues, then surfaces remaining errors.
- `npm run test` – Runs the Jest test suite located under `/__tests__`.
- `npm run clean` – Deep cleans environment by removing local `.expo/` build caches and `node_modules/`.
