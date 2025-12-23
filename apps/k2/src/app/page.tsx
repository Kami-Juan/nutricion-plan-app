import { Suspense } from "react";
import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";
import { Title } from "@/components/landing-page/title";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_plans_grouped_by_month");

  if (error) {
    return <div>Error loading nutrition plans.</div>;
  }

  console.log(data);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-background relative pb-26">
        <Header />
        <main className="container mx-auto px-4 py-6 md:py-10">
          <div className="mx-auto max-w-[980px] text-center">
            <Title />
          </div>
          <div className="mx-auto max-w-[980px]">Menus</div>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
