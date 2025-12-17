# Nutrition Seeder (@k-health/nutrition-seeder) 🧪

ETL utilities to extract and transform menu/equivalents data and load it into Supabase.

- Getting Started
- Environment
- Commands
- Notes

## Getting Started

Prerequisites:
- Node.js 24.x
- pnpm 10.16+

Install deps at the monorepo root:

```bash
pnpm install
```

Run the seeder (requires .env):

```bash
pnpm --filter @k-health/nutrition-seeder start
```

## Environment
Create `apps/nutrition-seeder/.env`:

```bash
SUPABASE_URL=...            # Supabase project URL
SUPABASE_SERVICE_KEY=...    # Service role key (keep private)
```

## Commands
```bash
pnpm --filter @k-health/nutrition-seeder start            # run ETL via tsx
pnpm --filter @k-health/nutrition-seeder lint             # lint with Biome
pnpm --filter @k-health/nutrition-seeder format           # format with Biome
pnpm --filter @k-health/nutrition-seeder run check-types  # TypeScript diagnostics
```

## Notes
- Supabase client: apps/nutrition-seeder/src/configs/supabase.ts
- Source API config: apps/nutrition-seeder/src/configs/api.ts
- Pipelines: apps/nutrition-seeder/src/etl
- Local Supabase (optional): apps/nutrition-seeder/supabase/config.toml
