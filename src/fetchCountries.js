const BASE_URL = 'https://restcountries.com/v3.1/name/';

const fetchCountries = name => {
  return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 404) {
        return new Promise.reject(new Error('Not Found'));
      }
      return data;
    });
};

export { fetchCountries };
