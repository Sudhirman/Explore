let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let itineraryForm = document.getElementById("itinerary-form");
let itineraryList = document.getElementById("itinerary-list");

let isEditing = false;
let currentEditingItem = null;

// Event listener for search button
searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  fetchCountryData(finalURL);
});

// Function to fetch country data
function fetchCountryData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => displayCountryInfo(data[0]))
    .catch(() => {
      result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
    });
}

// Function to display country information
function displayCountryInfo(countryData) {
  result.innerHTML = `
    <img src="${countryData.flags.png}" class="flag-img" alt="Flag of ${countryData.name.common}">
    <h2>${countryData.name.common}</h2>
    <div class="wrapper">
      <div class="data-wrapper"><h4>Capital:</h4><span>${countryData.capital ? countryData.capital[0] : 'N/A'}</span></div>
      <div class="data-wrapper"><h4>Continent:</h4><span>${countryData.continents[0]}</span></div>
      <div class="data-wrapper"><h4>Region:</h4><span>${countryData.region}</span></div>
      <div class="data-wrapper"><h4>Subregion:</h4><span>${countryData.subregion ? countryData.subregion : 'N/A'}</span></div>
      <div class="data-wrapper"><h4>Area:</h4><span>${countryData.area.toLocaleString()} km²</span></div>
      <div class="data-wrapper"><h4>Population:</h4><span>${countryData.population.toLocaleString()}</span></div>
      <div class="data-wrapper"><h4>Timezone:</h4><span>${countryData.timezones.join(", ")}</span></div>
      <div class="data-wrapper"><h4>Currency:</h4><span>${countryData.currencies ? `${countryData.currencies[Object.keys(countryData.currencies)[0]].name} (${Object.keys(countryData.currencies)[0]})` : 'N/A'}</span></div>
      <div class="data-wrapper"><h4>Common Languages:</h4><span>${countryData.languages ? Object.values(countryData.languages).join(", ") : 'N/A'}</span></div>
      <div class="data-wrapper"><h4>Maps:</h4><span><a href="${countryData.maps.googleMaps}" target="_blank">View on Google Maps</a></span></div>
      <div class="data-wrapper"><h4>Coat of Arms:</h4>${countryData.coatOfArms && countryData.coatOfArms.png ? `<img src="${countryData.coatOfArms.png}" class="coat-of-arms-img" alt="Coat of arms of ${countryData.name.common}">` : 'N/A'}</div>
    </div>`;
}

