import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Salad } from 'lucide-react';

import { getNutritionPlanData } from '@/api';
import { MenuPlan } from '@/components/common/MenuPlan';
import { ThemeToggle } from '@/components/common/ThemeToggle/ThemeToggle';

export default async function Home() {
  const queryClient = new QueryClient();
  const data = await getNutritionPlanData();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen flex-col items-center gap-6 p-6">
        <header className="w-full flex justify-end mb-4">
          <ThemeToggle />
        </header>
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Salad className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Plan Nutricional
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tu plan personalizado para una alimentación saludable y balanceada
          </p>
        </div>
        <MenuPlan menus={data} />
      </main>
    </HydrationBoundary>
  );
}
