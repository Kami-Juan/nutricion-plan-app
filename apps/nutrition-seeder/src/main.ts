import { extractETL, loadETL, transformETL } from "./etl";

const main = async () => {
  // Do some validations
  try {
    await extractETL.execute();
    await transformETL.execute();
    await loadETL.execute();
  } catch {
    process.exit(1);
  }
};

main();
