import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryName = document.querySelector('.country-list');
const countryStats = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const name = evt.target.value.trim();
  if (!name) {
    Notiflix.Notify.info('Enter the country name');
    return;
  }

  fetchCountries(name)
    .then(data => checkCountries(data))
    .catch(error => {
      Notiflix.Notify.warning('Oops, there is no country with that name');
    });
}

function checkCountries(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (countries.length > 1) {
      countryName.innerHTML = countriesMarkUp(countries);
      countryStats.innerHTML = "";
  }

  if (countries.length === 1) {
      countryStats.innerHTML = countryMarkUp(...countries);
      countryName.innerHTML = '';
  }
}


function countriesMarkUp(countries) {
    return countries
      .map(({ flags: { svg }, name: { official } }) => {
        return `<li class="list-item">
            <p class="country">
            <img src="${svg}" alt="${official}" class="flag" />
            ${official}
            </p>
            </li>`;
      })
      .join('');
}

function countryMarkUp(country) {
    const {
      flags: { svg },
      name: { official },
      capital,
      population,
      languages,
    } = country;
    const listOfLanguages = Object.values(languages)
return `<h3 class="country-name"><img src="${svg}" alt="${official}" class="country-flag"/>${official}</h3>
      <ul class="country-stats">
      <li>
      <p class="stats-title">Capital: <span class="stats-value">${capital}</span></p>
      </li>
      <li>
      <p class="stats-title">Population: <span class="stats-value">${population}</span></p>
      </li>
      <li>
      <p class="stats-title">Language: <span class="stats-value">${listOfLanguages.join(', ')}</span></p>
      </li>
      </ul>`;
}