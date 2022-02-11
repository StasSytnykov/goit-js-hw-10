var _ = require('lodash');
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchInput.addEventListener('input', _.debounce(findCountries, DEBOUNCE_DELAY));

function findCountries(event) {
  const countryName = event.target.value;
  console.log(countryName);
  fetchCountries(countryName).then(data => {
    renderCountries(data);
  });
}

const renderCountries = data => {
  console.log(data);
  const markupCountryList = data.map(createMarkupCountryList).join('');
  const markupCountryInfo = createMarkupCountryInfo(data);
  console.log(markupCountryList);

  countryList.innerHTML = markupCountryList;
  countryInfo.innerHTML = markupCountryInfo;
};

const createMarkupCountryList = ({ name, flags }) => {
  return `<li><p><img src=${flags.svg} width=50px> ${name}</p></li>`;
};

const createMarkupCountryInfo = ({ name, capital, population, flags, languages }) => {
  return `
    <h2><img src=${flags}> ${name}</h2>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${languages}</p>
  `;
};
