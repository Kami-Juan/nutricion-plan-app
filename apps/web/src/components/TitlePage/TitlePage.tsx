import { Salad } from "lucide-react";

export const TitlePage = () => {
  return (
    <>
      <div className="hidden md:flex items-center justify-center gap-3 mb-8">
        <Salad className="h-12 w-12 text-primary" />
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Plan Nutricional
        </h1>
      </div>
      <h1 className="md:hidden text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
        Plan Nutricional
      </h1>
      <p className="text-muted-foreground max-w-[700px] mx-auto text-sm md:text-base mb-8">
        Tu plan personalizado para una alimentación saludable y balanceada. Descubre recetas
        nutritivas y equilibradas adaptadas a tus necesidades.
      </p>
    </>
  );
};
