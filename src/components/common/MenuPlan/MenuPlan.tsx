'use client';

import { MenuPlanDayItem } from '@/types';
import { SearchMenuDay } from '../SearchMenuDay';
import { MenuPlanDay } from './MenuPlanDay';
import { useState } from 'react';
import { EquivalentItems } from '../EquivalentItems/EquivalentItems';

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
        <MenuPlanDay data={selectedMenu} />
      </section>
      <section className="w-full">
        <EquivalentItems data={selectedMenu.equivalents} />
      </section>
    </>
  );
};
