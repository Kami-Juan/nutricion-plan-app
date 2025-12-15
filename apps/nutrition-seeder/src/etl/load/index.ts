import fs from "node:fs";
import path from "node:path";
import { supabase } from "@/configs/supabase";
import { BaseETL } from "@/core/base";
import type { NutritionPlanData } from "@/types";

interface TransformETLData {
  [monthYear: string]: Array<NutritionPlanData>;
}

export class LoadETL extends BaseETL<TransformETLData, TransformETLData> {
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
    const { data, error } = await supabase.from("").select();

    console.log("Existing nutrition plans in database:", data);

    if (error) {
      console.error("Error fetching nutrition plans:", error);
      throw error;
    }
  }
}
