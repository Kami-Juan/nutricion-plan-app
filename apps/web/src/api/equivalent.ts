import axios from 'axios';
import * as cheerio from 'cheerio';

import { Ingredients } from '@/types';

type EquivalentItemsResponse = {
  equivalentes: string;
};

export const getEquivalentItems = async (c: number, gs: string) => {
  const { data } = await axios.post<EquivalentItemsResponse>(
    'https://dietas.minutrimind.net/lista-equivalentes',
    {
      c,
      gs,
      a: 'svysszvdyxvrus',
      pais: 'MX',
      id_nutri: 41608,
    }
  );

  const $ = cheerio.load(data.equivalentes);

  const listOfItems: Array<Ingredients> = [];

  $('.list-group-item').each((_, el) => {
    const name = $(el).find('.label-text').text();
    const portion = $(el)
      .find('.equis_alim')
      .text()
      .trim()
      .replace('-', '')
      .trim();

    listOfItems.push({ name, portion });
  });

  return listOfItems;
};
