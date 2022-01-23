import * as D from '../data';

const ex = async () => {
  const countries = await D.getCountries();
  console.log(countries);
};
ex().catch(error => {
  throw error;
});
