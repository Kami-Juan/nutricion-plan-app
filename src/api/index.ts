import fs from 'fs/promises';

import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import { MenuPlanDayItem } from '@/types';

export const getNutritionPlanData = async (): Promise<
  Record<string, Array<MenuPlanDayItem>>
> => {
  try {
    const filePath = `${process.cwd()}/src/api/data.json`;
    const jsonData = await fs.readFile(filePath, 'utf8');
    const menus = JSON.parse(jsonData) as Array<MenuPlanDayItem>;

    const groupedData = groupBy(menus, (menu) => menu.date.split('-')[0]);

    const sortedKeys = sortBy(
      Object.keys(groupedData),
      (key) => -parseInt(key)
    );

    return Object.fromEntries(sortedKeys.map((key) => [key, groupedData[key]]));
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    throw error;
  }
};
