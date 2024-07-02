const apiKey = 'YOUR_OPENWEATHER_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
let cities = [];

fetch('cities.json')
    .then(response => response.json())
    .then(data => {
        cities = data;
    })
    .catch(error => {
        console.error('Error fetching cities data:', error);
    });

document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const searchButton = document.getElementById('searchButton');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const autocompleteList = document.getElementById('autocompleteList');
    const latitudeElement = document.getElementById('latitudeDisplay');
    const errorMessageElement = document.getElementById('error-message');

    locationInput.addEventListener('input', () => {
        const input = locationInput.value.trim().toLowerCase();
        autocompleteList.innerHTML = '';
        if (input) {
            const suggestions = cities.filter(city => city.name.toLowerCase().startsWith(input));
            suggestions.forEach(city => {
                const suggestionElement = document.createElement('div');
                suggestionElement.classList.add('autocomplete-suggestion');
                suggestionElement.textContent = `${city.name}, ${city.country}`;
                suggestionElement.addEventListener('click', () => {
                    locationInput.value = city.name;
                    autocompleteList.innerHTML = '';
                    fetchWeather(city.name);
                });
                autocompleteList.appendChild(suggestionElement);
            });
        } else {
            locationElement.textContent = '';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            latitudeElement.textContent = '';
            errorMessageElement.textContent = '';
        }
    });

    searchButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        }
    });

    function fetchWeather(location) {
        const selectedCity = cities.find(city => city.name === location);
        if (!selectedCity) {
            errorMessageElement.textContent = 'City not found';
            return;
        }
        errorMessageElement.textContent = '';

        const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                locationElement.textContent = `Location: ${selectedCity.name}, ${selectedCity.country}`;
                latitudeElement.textContent = `Latitude: ${selectedCity.lat}`;
                temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
                descriptionElement.textContent = `Description: ${data.weather[0].description}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
});
