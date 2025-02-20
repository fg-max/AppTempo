const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const APIKey = 'c3969f3b8093deebec5e602b2d1bf9c3'; // Substitua com sua chave de API do OpenWeatherMap

const weatherImages = {
    Clear: 'images/clear.png',
    Rain: 'images/rain.png',
    Snow: 'images/snow.png',
    Clouds: 'images/cloud.png',
    Haze: 'images/mist.png'
};

searchButton.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;
    if (city === '') return;

    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                showError();
                return;
            }
            updateWeatherInfo(json);
        });
}

function showError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fade-in');
}

function updateWeatherInfo(json) {
    error404.style.display = 'none';
    error404.classList.remove('fade-in');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    image.src = getWeatherImage(json.weather[0].main);
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fade-in');
    weatherDetails.classList.add('fade-in');
    container.style.height = '590px';
}

function getWeatherImage(weather) {
    return weatherImages[weather] || '';
}