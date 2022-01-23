import {ICountry} from './ICountry';
const API_KEY = '8283dd666d54fdcd3c2ff030b2207c4f';
import axios from 'axios';

/* TODO: axios를 사용하면 계속 오류가 발생한다.. ( Check ) */
export const getCountries = (): Promise<ICountry[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`http://api.countrylayer.com/v2/all?access_key=${API_KEY}`)
      .then((result: any) => {
        const countries: ICountry[] = result.data.map((data: any) => {
          let {region, subregion, name, capital, population} = data;
          if (!subregion) {
            subregion = 'not defined subregion';
          }
          if (!population) {
            population = 'not defined population';
          }
          return {region, subregion, name, capital, population} as ICountry;
        });
        resolve(countries);
      })
      .catch(reject);
  });

// test code
// getCountries().then(console.log);

// export const getCountries = async (): Promise<ICountry[]> => {
//   try {
//     const countriesArr: any = await axios.get(
//       `http://api.countrylayer.com/v2/all?access_key=${API_KEY}`,
//     );
//     return countriesArr.data.map((data: any) => {
//       let {region, subregion, name, capital, population} = data;
//       if (!subregion) {
//         subregion = 'not defined subregion';
//       }
//       if (!population) {
//         population = 'not defined population';
//       }
//       return {region, subregion, name, capital, population} as ICountry;
//     });
//   } catch (error: any) {
//     console.error(error);
//     throw error;
//   }
// };
