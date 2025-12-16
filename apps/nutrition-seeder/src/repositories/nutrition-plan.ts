import { supabase } from "@/configs/supabase";
import type {
  Dish,
  MealPeriod,
  NutrientEquivalentRequest,
  NutrientPortionEntry,
  NutritionPlanData
} from "@/types";

export type INutritionPlanRepository = {
  loadPlanData(planData: NutritionPlanData): Promise<void>;
};

export class NutritionPlanRepository implements INutritionPlanRepository {
  /**
   * Convierte la fecha del formato DD-MM-YYYY a YYYY-MM-DD
   */
  private convertDateFormat(date: string): string {
    const [month, day, year] = date.split("-");
    return `${year}-${month}-${day}`;
  }

  /**
   * Extrae la hora del nombre del período si está disponible
   */
  private extractPeriodTime(periodName: string): string | null {
    const timeMatch = periodName.match(/(\d{1,2}:\d{2})/);
    if (timeMatch) {
      const time = timeMatch[1];
      // Asegurar formato HH:MM:SS
      return time?.includes(":") ? `${time}:00` : null;
    }
    return null;
  }

  /**
   * Inserta o actualiza el plan nutricional y retorna su ID
   */
  private async insertNutritionPlan(planData: NutritionPlanData): Promise<string> {
    const formattedDate = this.convertDateFormat(planData.date);

    const { data, error } = await supabase
      .from("nutrition_plans")
      .upsert(
        {
          plan_date: formattedDate
        },
        { onConflict: "plan_date" }
      )
      .select("id")
      .single();

    if (error) {
      throw new Error(`Error inserting nutrition plan for ${formattedDate}: ${error.message}`);
    }

    return data.id;
  }

  /**
   * Inserta los períodos de comida y retorna un mapa de nombre -> id
   */
  private async insertMealPeriods(
    nutritionPlanId: string,
    periods: MealPeriod[]
  ): Promise<Map<string, string>> {
    const periodMap = new Map<string, string>();

    // Primero, eliminar períodos existentes para este plan
    await supabase.from("meal_periods").delete().eq("nutrition_plan_id", nutritionPlanId);

    for (let i = 0; i < periods.length; i++) {
      const period = periods[i];
      if (!period) continue;

      const periodTime = this.extractPeriodTime(period.period);

      const { data, error } = await supabase
        .from("meal_periods")
        .insert({
          nutrition_plan_id: nutritionPlanId,
          period_name: period.period,
          period_time: periodTime,
          period_order: i + 1
        })
        .select("id")
        .single();

      if (error) {
        throw new Error(`Error inserting meal period "${period.period}": ${error.message}`);
      }

      periodMap.set(period.period, data.id);
    }

    return periodMap;
  }

  /**
   * Inserta los platillos de un período
   */
  private async insertDishes(mealPeriodId: string, dishes: Dish[]): Promise<void> {
    for (let i = 0; i < dishes.length; i++) {
      const dish = dishes[i];
      if (!dish) continue;

      const { data: dishData, error: dishError } = await supabase
        .from("dishes")
        .insert({
          meal_period_id: mealPeriodId,
          title: dish.title,
          image_url: dish.imageUrl || null,
          dish_order: i + 1
        })
        .select("id")
        .single();

      if (dishError) {
        throw new Error(`Error inserting dish "${dish.title}": ${dishError.message}`);
      }

      // Insertar ingredientes del platillo
      if (dish.ingredients && dish.ingredients.length > 0) {
        await this.insertIngredients(dishData.id, dish.ingredients);
      }
    }
  }

  /**
   * Inserta los ingredientes de un platillo
   */
  private async insertIngredients(dishId: string, ingredients: string[]): Promise<void> {
    const ingredientsData = ingredients.map((name, index) => ({
      dish_id: dishId,
      name,
      ingredient_order: index + 1
    }));

    const { error } = await supabase.from("ingredients").insert(ingredientsData);

    if (error) {
      throw new Error(`Error inserting ingredients: ${error.message}`);
    }
  }

  /**
   * Inserta los equivalentes nutricionales por período
   */
  private async insertMealPeriodEquivalents(
    periodMap: Map<string, string>,
    equivalents: { [period: string]: NutrientEquivalentRequest[] }
  ): Promise<void> {
    for (const [periodName, equivalentList] of Object.entries(equivalents)) {
      const mealPeriodId = periodMap.get(periodName);
      if (!mealPeriodId || !equivalentList || equivalentList.length === 0) continue;

      const equivalentsData = equivalentList
        .filter((eq) => eq.request && eq.request.gs && eq.request.c !== undefined)
        .map((eq) => ({
          meal_period_id: mealPeriodId,
          group_code: eq.request.gs,
          quantity: eq.request.c
        }));

      if (equivalentsData.length === 0) continue;

      const { error } = await supabase.from("meal_period_equivalents").insert(equivalentsData);

      if (error) {
        throw new Error(`Error inserting equivalents for period "${periodName}": ${error.message}`);
      }
    }
  }

  /**
   * Inserta el resumen diario de nutrientes (equivalentTable)
   */
  private async insertDailyNutrientSummary(
    nutritionPlanId: string,
    portions: NutrientPortionEntry[]
  ): Promise<void> {
    const summaryData = portions.map((portion) => ({
      nutrition_plan_id: nutritionPlanId,
      nutrient_type: portion.type,
      total_portions: portion.portion
    }));

    const { error } = await supabase.from("daily_nutrient_summary").insert(summaryData);

    if (error) {
      throw new Error(`Error inserting daily nutrient summary: ${error.message}`);
    }
  }

  /**
   * Carga todos los datos de un plan nutricional completo
   */
  async loadPlanData(planData: NutritionPlanData): Promise<void> {
    console.log(`  📅 Processing: ${planData.date}`);

    try {
      // 1. Insertar plan de nutrición
      const nutritionPlanId = await this.insertNutritionPlan(planData);
      console.log(
        `    ✓ Nutrition plan created/updated (ID: ${nutritionPlanId.substring(0, 8)}...)`
      );

      // 2. Insertar períodos de comida
      const periodMap = await this.insertMealPeriods(nutritionPlanId, planData.periods);
      console.log(`    ✓ ${periodMap.size} meal periods inserted`);

      // 3. Insertar platillos e ingredientes
      let totalDishes = 0;
      let totalIngredients = 0;

      for (const period of planData.periods) {
        const mealPeriodId = periodMap.get(period.period);
        if (!mealPeriodId) continue;

        await this.insertDishes(mealPeriodId, period.dishes);
        totalDishes += period.dishes.length;
        totalIngredients += period.dishes.reduce((sum, dish) => sum + dish.ingredients.length, 0);
      }
      console.log(`    ✓ ${totalDishes} dishes with ${totalIngredients} ingredients inserted`);

      // 4. Insertar equivalentes nutricionales
      const equivalentsCount = Object.values(planData.equivalents).reduce(
        (sum, list) => sum + list.length,
        0
      );
      await this.insertMealPeriodEquivalents(periodMap, planData.equivalents);
      console.log(`    ✓ ${equivalentsCount} meal period equivalents inserted`);

      // 5. Insertar resumen diario de nutrientes
      await this.insertDailyNutrientSummary(nutritionPlanId, planData.equivalentTable);
      console.log(`    ✓ ${planData.equivalentTable.length} nutrient summaries inserted`);

      console.log(`  ✅ Successfully loaded: ${planData.date}\n`);
    } catch (error) {
      console.error(`  ❌ Error loading ${planData.date}:`, error);
      throw error;
    }
  }
}
