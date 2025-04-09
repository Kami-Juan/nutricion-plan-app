import axios from 'axios';

export const getEquivalentItems = async (c: number, gs: string) => {
  const { data } = await axios.post(
    'https://dietas.minutrimind.net/lista-equivalentes',
    {
      c: 5,
      gs: 'oambg',
      a: 'svysszvdyxvrus',
      pais: 'MX',
      id_nutri: 41608,
    },
    {
      // headers: {
      //   host: 'dietas.minutrimind.net',
      //   'content-type': 'application/json',
      //   accept: 'application/json, text/javascript, */*; q=0.01',
      //   'sec-fetch-site': 'same-site',
      //   'accept-language': 'es-MX,es-419;q=0.9,es;q=0.8',
      //   'accept-encoding': 'gzip, deflate, br',
      //   'sec-fetch-mode': 'cors',
      //   origin: 'https://www.minutrimind.net',
      //   'user-agent':
      //     'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
      //   referer: 'https://www.minutrimind.net/',
      //   'sec-fetch-dest': 'empty',
      // },
    }
  );

  console.log(data);

  return data;
};
