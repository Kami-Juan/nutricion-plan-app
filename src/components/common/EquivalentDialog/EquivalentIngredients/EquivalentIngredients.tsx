import { Utensils } from 'lucide-react';

import { Ingredients } from '@/types';

type EquivalentIngredientsProps = {
  ingredients: Array<Ingredients>;
};

export const EquivalentIngredients = ({
  ingredients,
}: EquivalentIngredientsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="group flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200 hover:border-primary/20"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Utensils className="h-5 w-5 text-primary" />
          </div>

          <div className="flex-1 flex items-center justify-between">
            <div>
              <h3 className="font-medium leading-none mb-1">
                {ingredient.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {ingredient.portion}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
