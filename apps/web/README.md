# Web App (@k-health/web) 🌐

A Next.js 15 application that powers the Nutrition Plan UI. Transpiles the shared UI package and uses Tailwind CSS 4.

- Getting Started
- Commands
- Notes

## Getting Started

Prerequisites:
- Node.js 24.x
- pnpm 10.16+

Install dependencies at the monorepo root:

```bash
pnpm install
```

Run the app:

```bash
pnpm --filter @k-health/web dev
```

Open http://localhost:3000

## Commands

```bash
pnpm --filter @k-health/web dev       # start Next.js in dev mode
pnpm --filter @k-health/web build     # production build
pnpm --filter @k-health/web start     # start production server
pnpm --filter @k-health/web lint      # lint with Biome
pnpm --filter @k-health/web format    # format with Biome
pnpm --filter @k-health/web run check-types  # TypeScript diagnostics
```

## Notes
- Next config: apps/web/next.config.ts
- Transpiles @k-health/ui and allows remote images from cdn.minutrimind.net.
- Uses React 19 and Tailwind CSS 4.
