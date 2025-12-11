import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default async function Favorites() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-background relative pb-26">
        <Header />
        <main className="container mx-auto px-4 py-6 md:py-10">
          <div className="mx-auto max-w-[980px] text-center"></div>
          <div className="mx-auto max-w-[980px]">Hello World</div>
        </main>
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
