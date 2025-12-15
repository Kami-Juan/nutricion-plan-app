import { BaseETL } from "@/core/base";

export class LoadETL extends BaseETL<string[], any> {
  protected override getData(): string[] {
    throw new Error("Method not implemented.");
  }
  protected override mappingData(_: string[]) {
    throw new Error("Method not implemented.");
  }
  protected override run(_: any): void {
    throw new Error("Method not implemented.");
  }
}
