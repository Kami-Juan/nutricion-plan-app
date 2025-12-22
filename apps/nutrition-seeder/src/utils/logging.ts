import { configureSync, getConsoleSink, getLogger } from "@logtape/logtape";

configureSync({
  sinks: {
    console: getConsoleSink()
  },
  loggers: [
    {
      category: "k-health/nutrition-seeder",
      lowestLevel: "info",
      sinks: ["console"]
    }
  ]
});

export const logger = getLogger(["k-health/nutrition-seeder"]);
