# UI Library (@k-health/ui) 🧩

A shared React component library for the monorepo, built with Vite and Tailwind CSS 4. Exposes global styles and composable primitives.

- Getting Started
- Commands
- Usage
- Notes

## Getting Started

Prerequisites:
- Node.js 24.x
- pnpm 10.16+

Install dependencies at the monorepo root:

```bash
pnpm install
```

Develop in watch mode:

```bash
pnpm --filter @k-health/ui dev
```

## Commands

```bash
pnpm --filter @k-health/ui dev          # build in watch mode
pnpm --filter @k-health/ui build        # production build
pnpm --filter @k-health/ui lint         # lint with Biome
pnpm --filter @k-health/ui format       # format with Biome
pnpm --filter @k-health/ui run check-types  # TypeScript diagnostics
```

## Usage

Install the workspace and import components from `@k-health/ui`. Include the global styles if needed:

```tsx
// Example usage in a Next.js app
import "@k-health/ui/globals.css";
import { /* YourComponent */ } from "@k-health/ui";

export default function Page() {
  return (
    <main>
      {/* <YourComponent /> */}
    </main>
  );
}
```

## Notes
- Exports global styles at the subpath `@k-health/ui/globals.css`.
- Peer deps: `react`, `react-dom` (provided by the consuming app).
- Vite build outputs ESM/CJS/types.
