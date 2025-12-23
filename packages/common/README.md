# @k-health/common

Shared utility library and type definitions for the Nutrition Plan App monorepo. This package is designed to be used by both Node.js (backend/scripts) and Next.js (frontend) applications.

## Features

- **Hybrid Support**: Compatible with both ESM and CJS.
- **Type Definitions**: Shared database types and interfaces.
- **Utilities**: Common helper functions.

## Installation

This package is private and intended for use within the monorepo workspace.

Add it to another package or app:

```bash
pnpm add @k-health/common --filter <target-package>
```

## Development

### Build

Build the package using Vite (generates `dist` folder with ESM/CJS formats and type definitions):

```bash
pnpm build
```

### Watch Mode

Rebuild on file changes:

```bash
pnpm dev
```

### Lint & Format

```bash
pnpm lint
pnpm format
```
