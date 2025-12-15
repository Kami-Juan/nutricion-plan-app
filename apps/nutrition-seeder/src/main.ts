import { extractETL, loadETL, transformETL } from "./etl";

const main = async () => {
  // Do some validations
  try {
    // await extractETL.execute();
    await transformETL.execute();
    // await loadETL.execute();
  } catch (error) {
    console.error("ETL process failed:", error);
    process.exit(1);
  }
};

main();
