## Agents Guide

This document provides short, copy-pasteable commands for non-interactive agents and scripts. Prefer these exact commands to avoid watch mode, prompts, or hanging processes.

### Environment

- Use pnpm as defined in `package.json` (`packageManager`) and Node.js as defined in `.npmrc`.
- Always install with a locked dependency graph:

```bash
pnpm install --frozen-lockfile
```

### Pre-commit equivalent (non-interactive)

Replicate the `.husky/pre-commit` hook locally or in CI. This is the canonical order:

```bash
pnpm run lint:fix && pnpm run format:fix && pnpm vitest --no-watch
```

Notes:

- Do not run `pnpm test` directly in agent/CI contexts; it may enter watch mode and hang.
- Prefer `pnpm vitest --no-watch` for a single, headless run.

### Linting and formatting

```bash
# Lint (read-only)
pnpm run lint

# Lint and auto-fix
pnpm run lint:fix

# Format (check only)
pnpm run format

# Format and write changes
pnpm run format:fix
```

### Tests (headless)

```bash
# Non-watch, single run (preferred for agents)
pnpm vitest --no-watch

# Alternatively pass args through the test script
pnpm test -- --no-watch
```

### App commands

```bash
# Start dev server (interactive; agents should avoid unless needed)
pnpm run dev

# Build and start (non-interactive)
pnpm run build && pnpm run start
```

### Commit messages

Follow Conventional Commits. Example types: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

### CI/automation tips

- Avoid long-running watchers (dev servers, test watch).
- Prefer explicit, non-interactive flags (e.g., `--no-watch`).
- Run the pre-commit equivalent before pushing to ensure formatting, linting, and tests pass.
