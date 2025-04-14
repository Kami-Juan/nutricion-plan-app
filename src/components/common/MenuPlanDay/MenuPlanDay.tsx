import { Beef } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { useFavorites } from '@/hooks/useFavorites';
import { Dish, EquivalentPeriod, MenuPlanDayItem } from '@/types';

import { MenuDishCard } from '../MenuDishCard';

type MenuPlanDayProps = {
  data: MenuPlanDayItem;
};

export const MenuPlanDay = ({ data }: MenuPlanDayProps) => {
  const { toggleFavorite } = useFavorites();

  const onFavorite = async (payload: Dish, period: EquivalentPeriod) => {
    try {
      const equivalents = data.equivalents[period];

      await toggleFavorite({
        id: data.date,
        dish: payload,
        equivalent: equivalents,
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="space-y-4 mt-2">
      {data.periods.map((period, index) => (
        <Card
          key={index}
          className="border shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value={`${index}`} className="border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Beef className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-medium">{period.period}</span>
                    <span className="text-sm text-muted-foreground">
                      {period.dishes.length} platillos disponibles
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-4">
                  {period.dishes.map((dish, index) => (
                    <MenuDishCard
                      dish={dish}
                      key={index}
                      onFavorite={() => onFavorite(dish, period.period)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};
