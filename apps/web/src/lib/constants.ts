export const NUTRITIONAL_ABBREVIATIONS = {
  oambg: 'O.A muy bajo en grasa',
  cetu: 'Cereales y tubérculos',
  az: 'Azúcar',
  g: 'Grasa',
  leg: 'Leguminosas',
  fr: 'Fruta',
  led: 'Leche descremada',
  ve: 'Verdura',
  oabg: 'O.A bajos en grasa',
  oamg: 'O.A moderado en grasa',
  gp: 'Grasa con proteina',
  cetug: 'Cereales con grasa',
};

export type NutritionalEquivalentKey = keyof typeof NUTRITIONAL_ABBREVIATIONS;
