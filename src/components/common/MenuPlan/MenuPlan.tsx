'use client';

import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuPlanDayItem } from '@/types';

import { EquivalentItems } from '../EquivalentItems/EquivalentItems';
import { MenuPlanDay } from '../MenuPlanDay';
import { SearchMenuDay } from '../SearchMenuDay';

type MenuPlanProps = {
  menus: Array<MenuPlanDayItem>;
};

export const MenuPlan = ({ menus }: MenuPlanProps) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuPlanDayItem>(menus[0]);

  const getMenu = (index: number) => {
    setSelectedMenu(menus[index]);
  };

  return (
    <>
      <section className="w-full">
        <SearchMenuDay onChange={(index) => getMenu(index)} menus={menus} />
      </section>
      <section className="w-full">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="equivalent">Equivalents</TabsTrigger>
          </TabsList>
          <TabsContent value="menu">
            <MenuPlanDay data={selectedMenu} />
          </TabsContent>
          <TabsContent value="equivalent">
            <EquivalentItems data={selectedMenu.equivalents} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};
