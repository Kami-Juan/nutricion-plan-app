import { NutritionalEquivalentKey } from '@/lib/constants';

export type MenuPlanDayItem = {
  date: string;
  periods: Period[];
  equivalents: Equivalents;
  equivalentTable: EquivalentTableItem[];
};

export type Period = {
  period: string;
  dishes: Dish[];
};

export type Dish = {
  title: string;
  imageUrl: string;
  ingredients: string[];
};

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

export type Equivalents = {
  [K in EquivalentPeriod]: EquivalentType[];
};

export type EquivalentType = {
  period: EquivalentPeriod;
  request: {
    c: number;
    gs: NutritionalEquivalentKey;
  };
};

export type EquivalentTableItem = {
  type: string;
  portion: number;
};

export type Ingredients = { name: string; portion: string };
