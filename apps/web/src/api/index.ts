import fs from "node:fs/promises";

import type { MenuPlanDayItem } from "@/types";

export const getNutritionPlanData = async (): Promise<Record<string, Array<MenuPlanDayItem>>> => {
  try {
    const filePath = `${process.cwd()}/src/api/data.json`;
    const jsonData = await fs.readFile(filePath, "utf8");
    const menus = JSON.parse(jsonData) as Record<string, Array<MenuPlanDayItem>>;

    return menus;
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    throw error;
  }
};
