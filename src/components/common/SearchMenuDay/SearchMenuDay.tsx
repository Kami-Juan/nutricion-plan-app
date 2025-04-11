'use client';

import groupBy from 'lodash/groupBy';
import { CalendarDays, ChefHat } from 'lucide-react';
import { useMemo } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getSpainDate } from '@/lib/utils';
import { MenuPlanDayItem } from '@/types';

type SearchMenuDayProps = {
  onChange: (index: string) => void;
  menus: Array<MenuPlanDayItem>;
};

export const SearchMenuDay = ({ menus, onChange }: SearchMenuDayProps) => {
  const groupMenus = useMemo(
    () => groupBy(menus, (menu) => menu.date.split('-')[0]),
    [menus]
  );

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <ChefHat className="h-4 w-4" />
        Selecciona tu menú del día
      </label>
      <Select onValueChange={(value) => onChange(value)}>
        <SelectTrigger className="w-full bg-white/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
          <SelectValue placeholder="Elige un menú personalizado" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Object.keys(groupMenus).map((monthMenu) => (
            <SelectGroup key={monthMenu}>
              <SelectLabel className="flex items-center gap-2 text-primary">
                <CalendarDays className="h-4 w-4" />
                Menus del mes: {monthMenu}
              </SelectLabel>
              {groupMenus[monthMenu].map((menu) => (
                <SelectItem
                  value={menu.date}
                  key={menu.date}
                  className="hover:bg-primary/5 cursor-pointer group relative"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        Menú para el
                      </span>
                      <span className="text-primary">
                        {getSpainDate(menu.date)}
                      </span>
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
