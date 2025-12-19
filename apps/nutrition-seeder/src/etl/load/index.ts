import fs from "node:fs";
import path from "node:path";
import { BaseETL } from "@/core/base";
import type { NutritionPlanRepository } from "@/repositories/nutrition-plan";
import type { NutritionPlanData } from "@/types";

interface TransformETLData {
  [monthYear: string]: Array<NutritionPlanData>;
}

export class LoadETL extends BaseETL<TransformETLData, TransformETLData> {
  public constructor(private nutritionPlanRepo: NutritionPlanRepository) {
    super();
  }

  protected override getData(): TransformETLData {
    const transformPath = path.resolve(__dirname, "../../data/transform/data.json");

    if (!fs.existsSync(transformPath)) {
      throw new Error(`Transform data file not found at: ${transformPath}`);
    }

    const fileData = fs.readFileSync(transformPath, "utf-8");
    return JSON.parse(fileData) as TransformETLData;
  }

  protected override mappingData(data: TransformETLData): TransformETLData {
    return data;
  }

  protected override async run(mappedData: TransformETLData): Promise<void> {
    console.log(`\n${"=".repeat(70)}`);
    console.log("🚀 Starting Nutrition Plan Data Load to Supabase");
    console.log(`${"=".repeat(70)}\n`);

    let totalPlans = 0;
    let successfulPlans = 0;
    let failedPlans = 0;
    const failedDates: string[] = [];

    const monthYears = Object.keys(mappedData).sort(
      (a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10)
    );

    for (const monthYear of monthYears) {
      const plans = mappedData[monthYear];
      if (!plans) continue;

      console.log(`\n📦 Processing Month: ${monthYear}/2024`);
      console.log(`   Total plans: ${plans.length}`);
      console.log("-".repeat(70));

      for (const plan of plans) {
        totalPlans++;
        try {
          await this.nutritionPlanRepo.loadPlanData(plan);
          successfulPlans++;
        } catch {
          failedPlans++;
          failedDates.push(plan.date);
        }
      }
    }

    // Resumen final
    console.log(`\n${"=".repeat(70)}`);
    console.log("📊 MIGRATION SUMMARY");
    console.log("=".repeat(70));
    console.log(`Total plans processed:  ${totalPlans}`);
    console.log(
      `✅ Successful:          ${successfulPlans} (${((successfulPlans / totalPlans) * 100).toFixed(1)}%)`
    );
    console.log(
      `❌ Failed:              ${failedPlans} (${((failedPlans / totalPlans) * 100).toFixed(1)}%)`
    );

    if (failedDates.length > 0) {
      console.log(`\n❌ Failed dates: ${failedDates.join(", ")}`);
    }

    console.log(`${"=".repeat(70)}\n`);

    if (failedPlans > 0) {
      throw new Error(`Migration completed with ${failedPlans} failed plans`);
    }
  }
}
