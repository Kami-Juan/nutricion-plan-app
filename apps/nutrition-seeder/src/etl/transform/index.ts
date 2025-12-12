import fs from 'fs';
import path from 'path';

import * as cheerio from 'cheerio';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';

import { getFiles } from '../../utils/utils';

import {
  DishData,
  EquivalentDay,
  MenuDay,
  Period,
  Payload,
  NutritionalEquivalents,
  EquivalentRequest,
  EquivalentTableItem,
} from './types';

const convertPeriodDate = (date: string): string => {
  const result = date
    .trim()
    .replace(/\((.*?)\)/, '$1')
    .replace(/\d{1,2}:\d{2} (AM|PM)/, (_, period) => {
      let hour = parseInt(_.split(':')[0]);

      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;

      return `${hour.toString().padStart(2, '0')}:${_.split(':')[1].split(' ')[0]}`;
    });

  return result.trim();
};

const getEquivalentTable = (filename: string): Array<EquivalentTableItem> => {
  const fileData = fs.readFileSync(filename, 'utf-8');
  const file = JSON.parse(fileData) as MenuDay;
  const $ = cheerio.load(file.equivalentes);

  const equivalentTable: Array<EquivalentTableItem> = [];

  $('table>tbody>tr').each((_, el) => {
    equivalentTable.push({
      type: $(el).find('td:first-child').text().trim(),
      portion: Number($(el).find('td:last-child').text().trim()),
    });
  });

  return equivalentTable;
};

const getMenuData = (filename: string): Period[] => {
  const fileData = fs.readFileSync(filename, 'utf-8');
  const file = JSON.parse(fileData) as MenuDay;
  const $ = cheerio.load(file.ingestas);

  const periods: Array<Period> = [];

  $('.ver_dieta>.ingesta').each((_, el) => {
    const periodTitleRaw = $(el).find('.in1').text().trim();
    const periodTitle = convertPeriodDate(periodTitleRaw);

    const dishes: Array<DishData> = [];

    $(el)
      .find('.elemento')
      .each((_, el) => {
        const imageUrl = $(el).find('img').attr('src') || '';
        const titleRaw = $(el).find('.ingesta>strong').text().trim();
        const title = convertPeriodDate(titleRaw);

        const ingredients: Array<string> = [];

        $(el)
          .find('.alimento')
          .each((_, el) => {
            ingredients.push($(el).text().trim());
          });

        dishes.push({
          title,
          imageUrl,
          ingredients,
        });
      });

    periods.push({
      period: periodTitle,
      dishes: dishes,
    });
  });

  return periods;
};

const getEquivalentData = (filename: string): NutritionalEquivalents => {
  const fileEquivalentData = fs.readFileSync(
    filename
      .replace('/extract/data/menu', '/extract/data/equivalents')
      .replace('.json', '-equivalentes.json'),
    'utf-8'
  );
  const file = JSON.parse(fileEquivalentData) as Array<EquivalentDay>;

  const items: NutritionalEquivalents = {};

  for (const item of file) {
    const $ = cheerio.load(item.response.equivalentes);

    const request = item.request;

    $('.list-group-item').each(() => {
      const equivalentData: EquivalentRequest = {
        request: {
          c: request.c,
          gs: request.gs,
        },
        period: item.period,
      };

      if (!items[item.period]) {
        items[item.period] = [];
      }

      items[item.period]!.push(equivalentData);
    });
  }

  for (const key in items) {
    items[key as keyof NutritionalEquivalents] = uniqBy(
      items[key as keyof NutritionalEquivalents],
      (item) => `${item.request.c}-${item.request.gs}`
    );
  }

  return items;
};

const init = async () => {
  const filenames = getFiles(path.resolve(__dirname, '../extract/data/menu'));

  const payloads: Array<Payload> = [];

  for (const filename of filenames) {
    const fileDate = filename.split('/').pop()?.replace('.json', '').replace('menu-', '');

    const periods = getMenuData(filename);
    const equivalents = getEquivalentData(filename);
    const equivalentTable = getEquivalentTable(filename);

    const payload: Payload = {
      date: fileDate ?? '',
      periods,
      equivalents,
      equivalentTable,
    };

    payloads.push(payload);
  }

  const groupedData = groupBy(payloads, (menu) => menu.date.split('-')[0]);
  const sortedData = sortBy(Object.keys(groupedData), (key) => -parseInt(key));
  const fileResult = Object.fromEntries(sortedData.map((key) => [key, groupedData[key]]));

  const transformPath = path.resolve(__dirname, '../transform/data/data.json');

  fs.writeFileSync(transformPath, JSON.stringify(fileResult, null, 2), {
    encoding: 'utf-8',
  });
};

init();
