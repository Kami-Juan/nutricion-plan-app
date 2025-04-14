import { Check, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dish } from '@/types';

type MenuDishCardProps = {
  dish: Dish;
  onFavorite: () => void;
};

export const MenuDishCard = ({ dish, onFavorite }: MenuDishCardProps) => {
  return (
    <Card className="w-full mb-4 hover:shadow-lg transition-shadow">
      <CardHeader className="border-b bg-secondary/5">
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">{dish.title}</span>
          <Badge variant="secondary" className="ml-auto">
            {dish.ingredients.length} ingredientes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground mb-4">
          Ingredientes
        </p>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {dish.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/10 transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">{ingredient}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-secondary/5 py-3">
        <Button
          variant="outline"
          className="hover:bg-primary hover:text-white transition-colors"
        >
          Ver imagen
        </Button>
        <Button variant="outline" size="icon" onClick={() => onFavorite()}>
          <Star fill="yellow" strokeWidth={2} />
        </Button>
      </CardFooter>
    </Card>
  );
};
