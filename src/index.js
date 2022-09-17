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
    .then(checkCountries)
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
    return countries
      .map(({ flags: { svg }, name }) => {
        return countryName.innerHTML = `<li class="list-item">
            <p class="country">
            <img src="${svg}" alt="${name}" class="flag" />
            ${name}
            </p>
            </li>`;
      })
      .join('');
  }

  if (countries.length === 1) {
    const {
      flags: { svg },
      name,
      capital,
      population,
      languages,
    } = country;
      return countryStats.innerHTML = `<h3><img src="${svg}" alt="${name}" />${name}</h3>
      <ul>
      <li>
      <p>Capital: ${capital}</p>
      </li>
      <li>
      <p>Population: ${population}</p>
      </li>
      <li>
      <p>Language: ${languages}</p>
      </li>
      </ul>`;
  }
}
