import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import type { DietaService } from "@/api/dieta";
import { BaseETL } from "@/core/base";
import type {
  EquivalentRequestPayload,
  GetEquivalentRequest,
  NutritionalEquivalentKey
} from "@/types";
import { sleep } from "@/utils";
import { logger } from "@/utils/logging";

type ExtractETLMappingResult = {
  [k: string]: Array<EquivalentRequestPayload>;
};

export class ExtractETL extends BaseETL<string[], ExtractETLMappingResult> {
  constructor(private dietaService: DietaService) {
    super();
  }

  protected override getData(): string[] {
    const folderPath = path.resolve(__dirname, `./../../data/input`);
    return fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".json") && !file.includes("equivalentes"));
  }

  protected getEquivalentRequest(filename: string) {
    const file = fs.readFileSync(
      path.resolve(__dirname, `./../../data/input/${filename}`),
      "utf-8"
    );

    const dataJson = JSON.parse(file);

    // biome-ignore lint/style/useNamingConvention: Cheerio convention
    const $ = cheerio.load(dataJson.equivalentes);

    const requests: Array<EquivalentRequestPayload> = [];

    $(".row.p-0.mx-0.my-3").each((_, el) => {
      const periodTitle = $(el).find(".in1>span").text().trim();

      $(el)
        .find(".grupo_list>.gr_indicador")
        .each((_, el) => {
          const gs = ($(el).parent().attr("gs") || "None") as NutritionalEquivalentKey;
          const c = Number($(el).text());

          logger.debug(`${periodTitle}: ${gs} - ${c}`);

          const equivalentRequest: GetEquivalentRequest = {
            c,
            gs,
            a: "svysszvdyxvrus",
            pais: "MX",
            id_nutri: 41608
          };

          requests.push({ equivalentRequest, periodTitle });
        });
    });

    return requests;
  }

  protected override mappingData(fileNames: string[]): ExtractETLMappingResult {
    return fileNames.reduce((prev, filename) => {
      prev[filename] = this.getEquivalentRequest(filename);
      return prev;
    }, {} as ExtractETLMappingResult);
  }

  protected override async run(mappedData: ExtractETLMappingResult): Promise<void> {
    for (const filename in mappedData) {
      const payloads = mappedData[filename];

      if (!payloads) continue;

      const responses = await Promise.all(
        payloads.map(async (p) => {
          const data = await this.dietaService.getEquivalentInfo(p.equivalentRequest);

          return {
            response: data,
            request: p.equivalentRequest,
            period: p.periodTitle
          };
        })
      );

      await sleep(3000);

      fs.writeFileSync(
        path.resolve(
          __dirname,
          `./../../data/extract/${filename.replace(".json", "-equivalentes.json")}`
        ),
        JSON.stringify(responses, null, 2),
        "utf8"
      );
    }
  }
}
