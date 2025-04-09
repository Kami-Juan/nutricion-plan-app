'use client';

import { CalendarDays, ChefHat } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MenuPlanDayItem } from '@/types';

type SearchMenuDayProps = {
  onChange: (index: number) => void;
  menus: Array<MenuPlanDayItem>;
};

export const SearchMenuDay = ({ menus, onChange }: SearchMenuDayProps) => {
  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <ChefHat className="h-4 w-4" />
        Selecciona tu menú del día
      </label>
      <Select onValueChange={(value) => onChange(Number(value))}>
        <SelectTrigger className="w-full bg-white/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
          <SelectValue placeholder="Elige un menú personalizado" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectGroup>
            <SelectLabel className="flex items-center gap-2 text-primary">
              <CalendarDays className="h-4 w-4" />
              Menús Disponibles
            </SelectLabel>
            {menus.map((menu, index) => (
              <SelectItem
                value={`${index}`}
                key={index}
                className="hover:bg-primary/5 cursor-pointer group relative"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">Menú {index + 1}</span>
                  <Badge
                    variant="secondary"
                    className="group-hover:bg-primary/10 transition-colors"
                  >
                    {menu.periods.length} comidas
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
