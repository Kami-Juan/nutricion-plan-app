import path from 'path';
import fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GetEquivalentRequest, NutritionalEquivalentKey } from '../transform/types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getEquivalentInfo = async (req: GetEquivalentRequest, period: string) => {
  const { data } = await axios.post('https://dietas.minutrimind.net/lista-equivalentes', req, {
    headers: {
      host: 'dietas.minutrimind.net',
      'content-type': 'application/json',
      accept: 'application/json, text/javascript, */*; q=0.01',
      'sec-fetch-site': 'same-site',
      'accept-language': 'es-MX,es-419;q=0.9,es;q=0.8',
      'accept-encoding': 'gzip, deflate, br',
      'sec-fetch-mode': 'cors',
      origin: 'https://www.minutrimind.net',
      'user-agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
      referer: 'https://www.minutrimind.net/',
      'sec-fetch-dest': 'empty',
    },
  });

  return {
    data,
    req,
    period,
  };
};

const getEquivalent = async (filename: string) => {
  const file = fs.readFileSync(path.resolve(__dirname, `./data/menu/${filename}`), 'utf-8');

  console.log(`Processing file: ${filename}`);

  const dataJson = JSON.parse(file);

  const $ = cheerio.load(dataJson.equivalentes);

  const requests: Array<ReturnType<typeof getEquivalentInfo>> = [];

  $('.row.p-0.mx-0.my-3').each((i, el) => {
    const periodTitle = $(el).find('.in1>span').text().trim();

    $(el)
      .find('.grupo_list>.gr_indicador')
      .each((_, el) => {
        const gs = ($(el).parent().attr('gs') || 'None') as NutritionalEquivalentKey;
        const c = Number($(el).text());

        console.log(`${periodTitle}: ${gs} - ${c}`);

        const request: GetEquivalentRequest = {
          c,
          gs,
          a: 'svysszvdyxvrus',
          pais: 'MX',
          id_nutri: 41608,
        };

        requests.push(getEquivalentInfo(request, periodTitle));
      });
  });

  const responses = (await Promise.allSettled(requests)).map((res) => {
    if (res.status === 'fulfilled') {
      return {
        response: res.value.data,
        request: res.value.req,
        period: res.value.period,
      };
    } else {
      console.error(res.reason);
      return null;
    }
  });

  fs.writeFileSync(
    path.resolve(__dirname, `./data/${filename.replace('.json', '-equivalentes.json')}`),
    JSON.stringify(responses, null, 2),
    'utf8'
  );
};

const init = async () => {
  const folderPath = path.resolve(__dirname, `./data/menu`);

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith('.json') && !file.includes('equivalentes'));

  for (const file of files) {
    await sleep(3000);
    await getEquivalent(file);
    console.log(`Processed file finish: ${file}`);
  }
};

init();
