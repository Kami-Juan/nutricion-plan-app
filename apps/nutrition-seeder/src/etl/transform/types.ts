import { NUTRITIONAL_ABBREVIATIONS } from './constants';

export type NutritionalEquivalentKey = keyof typeof NUTRITIONAL_ABBREVIATIONS;

export type EquivalentPeriod =
  | 'Pre entreno'
  | 'Desayuno 10:00'
  | 'Desayuno 10:30'
  | 'Medio día 12:00'
  | 'Media tarde 17:00'
  | 'Comida 15:00'
  | 'Comida 13:00'
  | 'Cena 20:00'
  | 'Cena 21:00';

export type EquivalentTableItem = {
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

export type MenuDay = {
  ingestas: string;
  equivalentes: string;
};

export type EquivalentDay = {
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

export type EquivalentRequest = {
  period: EquivalentPeriod;
  request: {
    c: number;
    gs: string;
  };
};

export type DishData = {
  title: string;
  ingredients: Array<string>;
  imageUrl: string;
};

export type Period = {
  period: string;
  dishes: Array<DishData>;
};

export type NutritionalEquivalents = {
  [K in EquivalentPeriod]?: EquivalentRequest[];
};

export type Payload = {
  date: string;
  periods: Period[];
  equivalents: NutritionalEquivalents;
  equivalentTable: Array<EquivalentTableItem>;
};
