export type EquivalentRequestPayload = {
  equivalentRequest: GetEquivalentRequest;
  periodTitle: string;
};

export const NUTRITIONAL_ABBREVIATIONS = {
  oambg: "O.A muy bajo en grasa",
  cetu: "Cereales y tubérculos",
  az: "Azúcar",
  g: "Grasa",
  leg: "Leguminosas",
  fr: "Fruta",
  led: "Leche descremada",
  ve: "Verdura",
  oabg: "O.A bajos en grasa",
  oamg: "O.A moderado en grasa",
  gp: "Grasa con proteina",
  cetug: "Cereales con grasa"
};

export type NutritionalEquivalentKey = keyof typeof NUTRITIONAL_ABBREVIATIONS;

export type EquivalentPeriod =
  | "Pre entreno"
  | "Desayuno 10:00"
  | "Desayuno 10:30"
  | "Medio día 12:00"
  | "Media tarde 17:00"
  | "Comida 15:00"
  | "Comida 13:00"
  | "Cena 20:00"
  | "Cena 21:00";

export type NutrientPortionEntry = {
  type: string;
  portion: number;
};

export type GetEquivalentRequest = {
  c: number;
  gs: NutritionalEquivalentKey;
  a: string;
  pais: string;
  id_nutri: number;
};

export type DailyMenuData = {
  ingestas: string;
  equivalentes: string;
};

export type DailyEquivalentData = {
  response: {
    equivalentes: string;
  };
  request: GetEquivalentRequest;
  period: EquivalentPeriod;
};

export type EquivalentItem = {
  title: string;
  amount: string;
  portion: number;
  typeCode: string;
  typeDescription: string;
  periodLabel: EquivalentPeriod;
};

export type NutrientEquivalentRequest = {
  period: EquivalentPeriod;
  request: {
    c: number;
    gs: string;
  };
};

export type Dish = {
  title: string;
  ingredients: Array<string>;
  imageUrl: string;
};

export type MealPeriod = {
  period: string;
  dishes: Array<Dish>;
};

export type MealPeriodEquivalents = {
  [K in EquivalentPeriod]?: NutrientEquivalentRequest[];
};

export type NutritionPlanData = {
  date: string;
  periods: MealPeriod[];
  equivalents: MealPeriodEquivalents;
  equivalentTable: Array<NutrientPortionEntry>;
};
