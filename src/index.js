import markupCountryListTemplate from './hbs-templates/markup-country-list.hbs';
import markupCountryInfoTemplate from './hbs-templates/markup-country-info.hbs';
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
  
  fetchCountries(countryName).then(renderCountries).catch(showErrors);
}

const showErrors = () => {
  Notify.failure('Oops, there is no country with that name');
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
};

const renderCountries = data => {
  if (data.length >= 2 && data.length <= 10) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = markupCountryListTemplate(data);
    return;
  }

  if (data.length < 2) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = markupCountryInfoTemplate(data);
    return;
  }

  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
};
