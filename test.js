import axios from 'axios';

const getCountries = async () => {
  const countriesArr = await axios.get(
    'https://restcountries.eu/test/v2/all?access_key=8283dd666d54fdcd3c2ff030b2207c4f',
  );
  console.log(countriesArr);
};

getCountries();
