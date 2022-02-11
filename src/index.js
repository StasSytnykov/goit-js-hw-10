import { Notify } from 'notiflix/build/notiflix-notify-aio';
var _ = require('lodash');
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
searchInput.addEventListener('input', _.debounce(findCountries, DEBOUNCE_DELAY));

function findCountries(event) {
  if (event.target.value === ' ') {
    return;
  }
  const countryName = event.target.value.trim();
  console.log(countryName);
  fetchCountries(countryName).then(renderCountries).catch(showErrors);
}

const showErrors = () => {
  Notify.failure('Oops, there is no country with that name');
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
};

const renderCountries = data => {
  console.log(data);
  if (data.length >= 2 && data.length <= 10) {
    const markupCountryList = data.map(createMarkupCountryList).join('');
    countryInfo.innerHTML = '';
    countryList.innerHTML = markupCountryList;
    return;
  }
  if (data.length < 2) {
    const markupCountryInfo = data.map(createMarkupCountryInfo).join('');
    countryList.innerHTML = '';
    countryInfo.innerHTML = markupCountryInfo;
    return;
  }

  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
};

const createMarkupCountryList = ({ name, flags }) => {
  return `<li><p><img src=${flags.svg} width=30px> ${name.official}</p></li>`;
};

const createMarkupCountryInfo = ({ name, capital, population, flags, languages }) => {
  return `
    <h2><img src=${flags.svg} width=30px> ${name.official}</h2>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${languages}</p>
  `;
};
