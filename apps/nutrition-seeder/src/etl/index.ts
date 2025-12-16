import { dietaService } from "@/api";
import { ExtractETL } from "@/etl/extract";
import { LoadETL } from "@/etl/load";
import { TransformETL } from "@/etl/transform";
import { nutritionPlanRepo } from "@/repositories";

export const extractETL = new ExtractETL(dietaService);
export const transformETL = new TransformETL();
export const loadETL = new LoadETL(nutritionPlanRepo);
