const API_KEY = '1161559a4abbf7f387d118a43ce394b6';
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

const weatherdata = document.querySelector('#weather-data');
const temperatureElement = document.querySelector('#temperature');
const forecastElement = document.querySelector('#forecast');
const windElement = document.querySelector('#wind');
const humidityElement = document.querySelector('#humidity');

weatherdata.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = event.target.elements.location.value;

  const requestUrl = `${API_ENDPOINT}?q=${location}&appid=${API_KEY}`;

  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract the temperature and forecast from the response data
      const temperature = kelvin2Fahrenheit(data.main.temp);
      const forecast = data.weather[0].description;
      const wind = data.wind.speed;
      const humidity = data.main.humidity;

      // Update the page with the retrieved weather data
      temperatureElement.innerHTML = `Temperature: ${temperature}&#176;F`;
      forecastElement.textContent = `Forecast: ${forecast}`;
      windElement.innerHTML = `Wind: ${wind} mph`;
      humidityElement.innerHTML = `Humidity: ${humidity}%`;
    })
    .catch((error) => {
      console.error(error);
    });
});

function kelvin2Fahrenheit(k) {
    return Math.floor((k - 273.15) * 1.8 + 32);
}

// Save the recent searches
function saveRecentSearches(searches) {
  localStorage.setItem('recentSearches', JSON.stringify(searches));
}

// Load the recent searches 
function loadRecentSearches() {
  return JSON.parse(localStorage.getItem('recentSearches') || '[]');
}

// Get a recent searches list
const recentSearchesList = document.getElementById('recent-searches');

// Add a new item to the searches list
function addRecentSearch(search) {
  const listItem = document.createElement('li');
  listItem.textContent = search;
  recentSearchesList.appendChild(listItem);
}

// Add the search query to recent searches list when submitted
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const searchInput = document.getElementById('location');
  const searchQuery = searchInput.value;
  addRecentSearch(searchQuery);
  saveRecentSearches(searchQuery);
  searchInput.value = '';
});

// Load the recent searches list from local storage when the page loads
window.addEventListener('load', () => {
  const recentSearches = loadRecentSearches();
  for (const search of recentSearches) {
    addRecentSearch(search);
  }
});
