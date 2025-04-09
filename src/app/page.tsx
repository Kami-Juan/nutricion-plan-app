import { getNutritionPlanData } from '@/api';
import { MenuPlan } from '@/components/common/MenuPlan';
import { Salad } from 'lucide-react';

export default async function Home() {
  const data = await getNutritionPlanData();

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-6">
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
  );
}
