import { MenuPlanDayItem } from '@/types';
import fs from 'fs/promises';

export const getNutritionPlanData = async (): Promise<
  Array<MenuPlanDayItem>
> => {
  try {
    const filePath = `${process.cwd()}/src/api/data.json`;
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData) as Array<MenuPlanDayItem>;
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    throw error;
  }
};
