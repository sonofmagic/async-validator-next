# Repository Guidelines

## Project Structure & Module Organization

- Monorepo managed by Turborepo and pnpm (Node >= 20). Workspace packages are under `packages/`.
- Core library lives in `packages/async-validator/src/`; public builds emit to `packages/async-validator/dist/`.
- Unit/integration tests sit in `packages/async-validator/__tests__/` and `packages/async-validator/tests/`.
- Config roots: `turbo.json`, `pnpm-workspace.yaml`, shared `vitest.config.ts`, `eslint.config.js`, `stylelint.config.js`.

## Build, Test, and Development Commands

- Install dependencies: `pnpm install` (preinstall enforces pnpm).
- Build all packages: `pnpm build` (delegates to `turbo run build`, which calls each package’s `build`, e.g., `unbuild` in async-validator).
- Dev watch: `pnpm dev` to run package dev tasks in parallel.
- Test suite: `pnpm test` for all projects via Vitest; `pnpm test:dev` for watch mode.
- Package-specific: `pnpm --filter async-validator test` or `pnpm -C packages/async-validator build`.
- Linting: `pnpm lint` (ESLint via turbo). Commit hook tasks are configured through husky/lint-staged.

## Coding Style & Naming Conventions

- TypeScript-first; prefer ESM imports. Keep files small and cohesive by validator concern.
- Follow ESLint rules from `@icebreakers/eslint-config`; format with default TS/JS indentation (2 spaces).
- Stylelint covers CSS-like assets (rare here but keep config in mind).
- Naming: use `camelCase` for functions/variables, `PascalCase` for types/classes, and `kebab-case` for file names when exporting modules.
- Avoid default exports; favor named exports for tree-shaking clarity.

## Testing Guidelines

- Framework: Vitest with coverage enabled by default (`vitest.config.ts`); target meaningful coverage on new logic.
- Test file naming: `*.test.ts` under `__tests__` or `tests`.
- Prefer black-box validator tests: assert rule/async behavior and error messages. Include edge cases (empty schema, async rejection).
- Run `pnpm test` before opening a PR; include failing repro tests with fixes.

## Commit & Pull Request Guidelines

- Commit messages follow Conventional Commits (enforced by `commitlint` via `@icebreakers/commitlint-config`). Examples: `feat: add range validator`, `fix: handle null values`, `test: add date edge cases`.
- Keep commits scoped and reversible; avoid bundling unrelated refactors with fixes.
- PRs should describe scope, link related issues, and note breaking changes or behavior shifts. Add screenshots for DX changes (CLI output) when helpful.
- Ensure CI-parity checks pass locally (`pnpm lint`, `pnpm test`, `pnpm build`) before requesting review.

## Security & Configuration Tips

- Do not commit secrets; configuration lives in versioned files (`netlify.toml`, `monorepo.config.ts`). Environment-specific values should come from your shell or CI secrets.
- Respect `pnpm`-only enforcement and Node version constraint to avoid lockfile drift and runtime mismatches.
