# TypeScript Configs (@k-health/typescript-configs) 📦

Shared TypeScript configuration presets for the Nutrition Plan monorepo.

- Overview
- Usage
- Commands
- Exposed Presets

## Overview
This package centralizes tsconfig bases for apps and libraries (Node, browser, React, Next.js). Use them via `extends` to keep consistent compiler options.

## Usage

Add to your `tsconfig.json`:

```jsonc
{
  // Next.js app
  "extends": "@k-health/typescript-configs/nextjs",
  "compilerOptions": {
    "strict": true
  }
}
```

For a Node library:

```jsonc
{
  "extends": "@k-health/typescript-configs/node-library",
  "compilerOptions": {
    "strict": true
  }
}
```

For a React library:

```jsonc
{
  "extends": "@k-health/typescript-configs/react-library"
}
```

## Commands

```bash
pnpm --filter @k-health/typescript-configs lint
pnpm --filter @k-health/typescript-configs format
```

## Exposed Presets
- `@k-health/typescript-configs/base` → base.tsconfig.json
- `@k-health/typescript-configs/browser-library` → browser-library.tsconfig.json
- `@k-health/typescript-configs/nextjs` → nextjs.tsconfig.json
- `@k-health/typescript-configs/node-library` → node-library.tsconfig.json
- `@k-health/typescript-configs/react-library` → react-library.tsconfig.json
