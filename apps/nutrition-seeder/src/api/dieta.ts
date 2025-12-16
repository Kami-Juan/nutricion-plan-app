import { api } from "@/configs/api";
import type { GetEquivalentRequest } from "@/types";

interface IDietaService {
  getEquivalentInfo(req: GetEquivalentRequest, period: string): Promise<{ data: any }>;
}

export class DietaService implements IDietaService {
  public async getEquivalentInfo(req: GetEquivalentRequest) {
    const { data } = await api.post("/lista-equivalentes", req);

    return data;
  }
}
