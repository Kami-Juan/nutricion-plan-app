# Web App (@k-health/k2) 🌐

A Next.js 15 application that powers the Nutrition Plan UI v2.

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
pnpm --filter @k-health/k2 dev
```

Open http://localhost:3000

## Commands

```bash
pnpm --filter @k-health/k2 dev       # start Next.js in dev mode
pnpm --filter @k-health/k2 build     # production build
pnpm --filter @k-health/k2 start     # start production server
pnpm --filter @k-health/k2 lint      # lint with Biome
pnpm --filter @k-health/k2 format    # format with Biome
pnpm --filter @k-health/k2 run check-types  # TypeScript diagnostics
```

## Notes
- Next config: apps/k2/next.config.ts
- Uses React 19 and Tailwind CSS 4.
