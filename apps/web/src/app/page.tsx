import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getNutritionPlanData } from "@/api";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MenuPlan } from "@/components/MenuPlan";
import { TitlePage } from "@/components/TitlePage";

export default async function Home() {
  const queryClient = new QueryClient();
  const data = await getNutritionPlanData();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-background relative pb-26">
        <Header />
        <main className="container mx-auto px-4 py-6 md:py-10">
          <div className="mx-auto max-w-[980px] text-center">
            <TitlePage />
          </div>
          <div className="mx-auto max-w-[980px]">
            <MenuPlan menus={data} />
          </div>
        </main>
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
