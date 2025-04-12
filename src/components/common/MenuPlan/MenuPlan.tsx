'use client';

import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuPlanDayItem } from '@/types';

import { EquivalentItems } from '../EquivalentItems/EquivalentItems';
import { MenuPlanDay } from '../MenuPlanDay';
import { SearchMenuDay } from '../SearchMenuDay';

type MenuPlanProps = {
  menus: Record<string, Array<MenuPlanDayItem>>;
};

export const MenuPlan = ({ menus }: MenuPlanProps) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuPlanDayItem>(
    menus[Object.keys(menus)[0]][0]
  );

  const getMenu = (selectedDate: string) => {
    const menu = Object.values(menus)
      .flat()
      .find((menu) => menu.date === selectedDate);

    if (!menu) return;

    setSelectedMenu(menu);
  };

  return (
    <>
      <section className="w-full mb-4">
        <SearchMenuDay
          onChange={(selectedDate) => getMenu(selectedDate)}
          menus={menus}
        />
      </section>
      <section className="w-full">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="equivalent">Equivalentes</TabsTrigger>
          </TabsList>
          <TabsContent value="menu">
            <MenuPlanDay data={selectedMenu} />
          </TabsContent>
          <TabsContent value="equivalent">
            <EquivalentItems
              data={selectedMenu.equivalents}
              equivalentTable={selectedMenu.equivalentTable}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};
