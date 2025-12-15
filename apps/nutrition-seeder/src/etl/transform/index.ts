import fs from "node:fs";
import path from "node:path";

import * as cheerio from "cheerio";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";
import { BaseETL } from "@/core/base";
import type {
  DailyEquivalentData,
  DailyMenuData,
  Dish,
  MealPeriod,
  MealPeriodEquivalents,
  NutrientEquivalentRequest,
  NutrientPortionEntry,
  NutritionPlanData
} from "@/types";
import { getFiles } from "@/utils";

export class TransformETL extends BaseETL<string[], Array<NutritionPlanData>> {
  protected override getData(): string[] {
    return getFiles(path.resolve(__dirname, "../../data/input"));
  }

  private convertPeriodDate(date: string): string {
    const result = date
      .trim()
      .replace(/\((.*?)\)/, "$1")
      .replace(/\d{1,2}:\d{2} (AM|PM)/, (_, period) => {
        const timeParts = _.split(":");
        const hourPart = timeParts[0];
        const minutePart = timeParts[1];

        if (!hourPart || !minutePart) return _;

        let hour = Number.parseInt(hourPart, 10);

        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;

        const minutes = minutePart.split(" ")[0];
        if (!minutes) return _;

        return `${hour.toString().padStart(2, "0")}:${minutes}`;
      });

    return result.trim();
  }

  private getEquivalentTable(filename: string): Array<NutrientPortionEntry> {
    const fileData = fs.readFileSync(filename, "utf-8");
    const file = JSON.parse(fileData) as DailyMenuData;
    // biome-ignore lint/style/useNamingConvention: Cherrio convention
    const $ = cheerio.load(file.equivalentes);

    const equivalentTable: Array<NutrientPortionEntry> = [];

    $("table>tbody>tr").each((_, el) => {
      equivalentTable.push({
        type: $(el).find("td:first-child").text().trim(),
        portion: Number($(el).find("td:last-child").text().trim())
      });
    });

    return equivalentTable;
  }

  private getMenuData(filename: string): MealPeriod[] {
    const fileData = fs.readFileSync(filename, "utf-8");
    const file = JSON.parse(fileData) as DailyMenuData;
    // biome-ignore lint/style/useNamingConvention: Cherrio convention
    const $ = cheerio.load(file.ingestas);

    const periods: Array<MealPeriod> = [];

    $(".ver_dieta>.ingesta").each((_, el) => {
      const periodTitleRaw = $(el).find(".in1").text().trim();
      const periodTitle = this.convertPeriodDate(periodTitleRaw);

      const dishes: Array<Dish> = [];

      $(el)
        .find(".elemento")
        .each((_, el) => {
          const imageUrl = $(el).find("img").attr("src") || "";
          const titleRaw = $(el).find(".ingesta>strong").text().trim();
          const title = this.convertPeriodDate(titleRaw);

          const ingredients: Array<string> = [];

          $(el)
            .find(".alimento")
            .each((_, el) => {
              ingredients.push($(el).text().trim());
            });

          dishes.push({
            title,
            imageUrl,
            ingredients
          });
        });

      periods.push({
        period: periodTitle,
        dishes: dishes
      });
    });

    return periods;
  }

  private getEquivalentData(filename: string): MealPeriodEquivalents {
    const fileEquivalentData = fs.readFileSync(
      filename.replace("/input", "/extract").replace(".json", "-equivalentes.json"),
      "utf-8"
    );
    const file = JSON.parse(fileEquivalentData) as Array<DailyEquivalentData>;

    const items: MealPeriodEquivalents = {};

    for (const item of file) {
      // biome-ignore lint/style/useNamingConvention: Cherrio convention
      const $ = cheerio.load(item.response.equivalentes);

      const request = item.request;

      $(".list-group-item").each(() => {
        const equivalentData: NutrientEquivalentRequest = {
          request: {
            c: request.c,
            gs: request.gs
          },
          period: item.period
        };

        if (!items[item.period]) {
          items[item.period] = [];
        } else {
          items[item.period]?.push(equivalentData);
        }
      });
    }

    for (const key in items) {
      items[key as keyof MealPeriodEquivalents] = uniqBy(
        items[key as keyof MealPeriodEquivalents],
        (item) => `${item.request.c}-${item.request.gs}`
      );
    }

    return items;
  }

  protected override mappingData(filenames: string[]): Array<NutritionPlanData> {
    const payloads: Array<NutritionPlanData> = [];

    for (const filename of filenames) {
      const fileDate = path.basename(filename, ".json").replace("menu-", "");

      const periods = this.getMenuData(filename);
      const equivalents = this.getEquivalentData(filename);
      const equivalentTable = this.getEquivalentTable(filename);

      const payload: NutritionPlanData = {
        date: fileDate ?? "",
        periods,
        equivalents,
        equivalentTable
      };

      payloads.push(payload);
    }

    return payloads;
  }

  protected override run(mappedData: Array<NutritionPlanData>): void {
    const groupedData = groupBy(mappedData, (menu) => menu.date.split("-")[0]);
    const sortedData = sortBy(Object.keys(groupedData), (key) => -Number.parseInt(key, 10));
    const fileResult = Object.fromEntries(sortedData.map((key) => [key, groupedData[key]]));

    const transformPath = path.resolve(__dirname, "../../data/transform/data.json");

    fs.writeFileSync(transformPath, JSON.stringify(fileResult, null, 2), {
      encoding: "utf-8"
    });
  }
}
