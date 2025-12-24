# K-health App 🥗✨

A modern monorepo to explore menus, equivalents, and nutrition plans — featuring a Next.js web app and ingestion/ETL utilities to populate data into Supabase. Built with care, strict typing, and speedy tooling. 💚

- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Installation](#installation)
	- [Git Hooks (Lefthook)](#git-hooks-lefthook)
	- [Recommended IDE Setup](#recommended-ide-setup)
	- [Environment Configuration](#environment-configuration)
	- [First Run](#first-run)
	- [Daily Development Workflows](#daily-development-workflows)
	- [Debugging & Development Tools](#debugging--development-tools)
	- [Command Reference](#command-reference)
	- [Testing & Quality](#testing--quality)
- [Architecture](#architecture)
	- [Applications](#applications)
	- [Frameworks](#frameworks)
	- [Packages](#packages)
- [Contributing & Development Process](#contributing--development-process)
	- [Git Workflow](#git-workflow)
- [Additional Documentation](#additional-documentation)

---

## Getting Started

This repo uses `pnpm`, `shadcn`, `Turborepo`, `TypeScript`, and `Biome` for a fast, delightful DX.

### Prerequisites
- Node.js: **v24.x** (see constraint in [package.json](package.json)). Use `nvm` or `volta` if possible.
- pnpm: **v10.16+** (see [package.json](package.json)).
- macOS, Linux, or Windows via WSL2.

Verify your binaries:

```bash
node -v
pnpm -v
```

### Installation
Install monorepo dependencies (workspaces and the catalog in [pnpm-workspace.yaml](pnpm-workspace.yaml) are respected):

```bash
pnpm install
```

### Git Hooks (Lefthook)
This repo uses **Lefthook** to run fast checks (lint/format/types) via **Git hooks** on commit/push.

After cloning the repo and running `pnpm install`, enable hooks locally:

```bash
# Option A (recommended): install hooks using the local dependency (if present)
pnpm lefthook install

# Option B: run via pnpm dlx (no global install required)
pnpm dlx lefthook install
```

To verify it’s installed:

```bash
ls -la .git/hooks
```

> Note: Git hooks are not versioned by Git by default, so each developer needs to run `lefthook install` once per clone.


### Recommended IDE Setup
- Visual Studio Code
	- Suggested extensions:
		- Biome (format/lint) → configuration in [biome.json](biome.json)
		- Tailwind CSS IntelliSense (for UI and web)
		- TypeScript tooling (advanced TS support)
	- Enable `editor.formatOnSave` to enjoy automatic Biome formatting.

### Environment Configuration
The K2 app and web app require Supabase environment variables for client-side functionality. The ingestion/ETL seeder requires additional credentials:

**K2 App** (see [apps/k2/.env](apps/k2/.env)):

```bash
NEXT_PUBLIC_SUPABASE_URL=...            # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=... # Public key for client-side auth
```

**Nutrition Seeder** (see [apps/nutrition-seeder/.env](apps/nutrition-seeder/.env)):

1) Create a `.env` file under `apps/nutrition-seeder` with:

```bash
SUPABASE_URL=...            # Your Supabase project URL
SUPABASE_SERVICE_KEY=...    # Service role key (do not expose publicly)
```

The seeder validates these variables in [apps/nutrition-seeder/src/configs/supabase.ts](apps/nutrition-seeder/src/configs/supabase.ts).

Optional: if you want a local Supabase (handy for seeder testing), install the CLI and use the configuration at [apps/nutrition-seeder/supabase/config.toml](apps/nutrition-seeder/supabase/config.toml):

```bash
# Requires Docker
pnpm dlx supabase start
pnpm dlx supabase status
```

### First Run
To bring everything up in development mode with Turborepo (see tasks in [turbo.json](turbo.json)):

```bash
pnpm dev
```

To focus solely on the web app (Next.js):

```bash
pnpm --filter @k-health/web dev
```

To focus on the k2 app:

```bash
pnpm --filter @k-health/k2 dev
```

Once the dev server is up, visit:

- Web: http://localhost:3000
- K2: http://localhost:3000 (may use a different port if running concurrently)

To run the seeder (ingestion/ETL into Supabase) once your `.env` is set:

```bash
pnpm --filter @k-health/nutrition-seeder start
```

### Daily Development Workflows
- Monorepo dev with Turbo: `pnpm dev` runs persistent processes (cache disabled in dev for clarity).
- Focus per package: `pnpm --filter <pkg> dev|build|lint` speeds iteration.
- UI library watch: `pnpm --filter @k-health/ui dev` for quick component rebuilds.
- Type checks via Turbo: `turbo run check-types` (task is defined in [turbo.json](turbo.json)).

### Debugging & Development Tools
- Biome: fast lint and format. Rules are tailored in [biome.json](biome.json).
- TypeScript: strict typing; validate with `check-types` wherever available.
- Turborepo: orchestrates tasks and caches builds across packages.
- Supabase CLI (optional): local DB/Auth testing, config in [apps/nutrition-seeder/supabase/config.toml](apps/nutrition-seeder/supabase/config.toml).

### Command Reference

Root commands (see scripts in [package.json](package.json)):

```bash
# Monorepo development (Next.js web and any package exposing dev)
pnpm dev

# Build entire monorepo with Turbo
pnpm build

# Segmented builds
pnpm run build:apps
pnpm run build:packages

# Lint and format with Biome
pnpm lint
pnpm format
```

Web app (see [apps/web/package.json](apps/web/package.json)):

```bash
pnpm --filter @k-health/web dev
pnpm --filter @k-health/web build
pnpm --filter @k-health/web start
pnpm --filter @k-health/web lint
pnpm --filter @k-health/web format
pnpm --filter @k-health/web run check-types
```

K2 app (see [apps/k2/package.json](apps/k2/package.json)):

```bash
pnpm --filter @k-health/k2 dev
pnpm --filter @k-health/k2 build
pnpm --filter @k-health/k2 start
pnpm --filter @k-health/k2 lint
pnpm --filter @k-health/k2 format
pnpm --filter @k-health/k2 run check-types
```

Nutrition Seeder (see [apps/nutrition-seeder/package.json](apps/nutrition-seeder/package.json)):

```bash
pnpm --filter @k-health/nutrition-seeder start   # requires .env
pnpm --filter @k-health/nutrition-seeder lint
pnpm --filter @k-health/nutrition-seeder format
pnpm --filter @k-health/nutrition-seeder run check-types
```

UI Package (see [packages/ui/package.json](packages/ui/package.json)):

```bash
pnpm --filter @k-health/ui build
pnpm --filter @k-health/ui dev          # build in watch mode
pnpm --filter @k-health/ui lint
pnpm --filter @k-health/ui format
pnpm --filter @k-health/ui run check-types
```

Common Package (see [packages/common/package.json](packages/common/package.json)):

```bash
pnpm --filter @k-health/common build
pnpm --filter @k-health/common dev           # build in watch mode
pnpm --filter @k-health/common lint
pnpm --filter @k-health/common format
pnpm --filter @k-health/common run check-types
```

### Testing & Quality
- Biome Lint: `pnpm lint` at root or `pnpm --filter <pkg> lint` per package.
- Formatting: `pnpm format` for consistent formatting.
- Types: run `turbo run check-types` or per package (`pnpm --filter <pkg> run check-types`).
- Tests: currently no test runner configured in the monorepo; the focus is on types + lint for now. 🧪

## Architecture

A quick tour of the monorepo’s pieces 🧭

### Applications
- **K2** (Next.js): the main version of the app. Features App Router, React 19, Tailwind CSS 4. The future-focused implementation with full feature support. Deployed to production at [https://k-health.vercel.app/](https://k-health.vercel.app/) and dev environment at [https://k-health-git-dev-kamiganz0.vercel.app/](https://k-health-git-dev-kamiganz0.vercel.app/). See [apps/k2/package.json](apps/k2/package.json).
- **Web** (Next.js): legacy version, no longer actively maintained. Image domains and transpiled UI package configured at [apps/web/next.config.ts](apps/web/next.config.ts). Local data at [apps/web/src/api/data.json](apps/web/src/api/data.json).
- **Nutrition Seeder**: ETL utilities to extract and transform menus/equivalents and load them into Supabase. Client setup in [apps/nutrition-seeder/src/configs/supabase.ts](apps/nutrition-seeder/src/configs/supabase.ts) and source API in [apps/nutrition-seeder/src/configs/api.ts](apps/nutrition-seeder/src/configs/api.ts). Pipelines in [apps/nutrition-seeder/src/etl](apps/nutrition-seeder/src/etl).

### Frameworks
- Next.js 15 (App Router) for the web app.
- Turborepo to orchestrate tasks and caching (see [turbo.json](turbo.json)).
- TypeScript 5 across all packages.
- Tailwind CSS 4 in UI and Web.
- Supabase (Auth, DB, Storage) for seeder persistence.

### Packages
- **Common** (`@k-health/common`): Hybrid (ESM/CJS) utility library with shared type definitions and helpers. Compatible with both Node.js (seeder, scripts) and browser (web/k2 apps). Built with Vite. See [packages/common/README.md](packages/common/README.md).
- **UI** (`@k-health/ui`): React component library with Vite build. Also exports global styles (see [packages/ui/src/styles/globals.css](packages/ui/src/styles/globals.css)).
- **TypeScript Configs** (`@k-health/typescript-configs`): shared tsconfig bases (see [packages/typescript-configs/configs](packages/typescript-configs/configs)).

## Contributing & Development Process

Contributions are welcome! 💫 Let’s keep things friendly, clear, and predictable.

### Git Workflow
- Keep `main` clean.
- Create feature/fix branches with a **ticket reference** following this pattern:
  - Features: `feat/KHEALTH-<ticket-number>-<short-description>`
  - Fixes: `fix/KHEALTH-<ticket-number>-<short-description>`
  - Chores: `chore/KHEALTH-<ticket-number>-<short-description>`

  **Example:** `feat/KHEALTH-15-vercel-deploy` or `fix/KHEALTH-42-nutrition-seeder-timeout`

- Semantic-style commits following [Commitizen](https://commitizen.github.io/cz-cli/) conventions:
  - `feat: <description>` for new features
  - `fix: <description>` for bug fixes
  - `chore: <description>` for maintenance/tooling
  - `docs: <description>` for documentation updates
  - `refactor: <description>` for code refactoring

  **Examples:**
  ```
  feat: add dark mode toggle to dashboard
  fix: resolve nutrition plan loading timeout
  chore: upgrade dependencies to latest versions
  docs: update API documentation for seeder
  ```

- Small PRs, with lint/format/types passing.
- Link the ticket number in PR descriptions and commits when applicable.

## Additional Documentation
- Monorepo structure and catalog: [pnpm-workspace.yaml](pnpm-workspace.yaml)
- Task and pipeline standards: [turbo.json](turbo.json)
- UI styles and utilities: [packages/ui/src](packages/ui/src)
- ETL and data repositories: [apps/nutrition-seeder/src](apps/nutrition-seeder/src)
