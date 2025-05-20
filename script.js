const cityInput = document.querySelector(".search-bar-inp");
const searchBtn = document.querySelector(".search-btn");

const homeSection = document.querySelector(".home-area");
const searchSection = document.querySelector(".searched-found");
const notFoundSection = document.querySelector(".not-found");

const apiKey = "7dc7c6664374cc8b9faea3a4427a7d7e";

const currCity = document.querySelector(".curr-city");
const currDate = document.querySelector(".curr-date");
const currTemp = document.querySelector(".curr-temp");
const cloudStatusImg = document.querySelector(".cloud-status-img");
const cloudStatus = document.querySelector(".cloud-status");
const currHumidity = document.querySelector(".humidity-text-info");
const currWindSpeed = document.querySelector(".wind-texto-info");

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() != "") {
        updateWeatherInfo(cityInput.value);
        cityInput.value = "";
        cityInput.blur();
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter" && cityInput.value.trim() != "") {
        updateWeatherInfo(cityInput.value);
        cityInput.value = "";
        cityInput.blur();
    }
});

function getweatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg';
    if (id <= 321) return 'drizzle.svg';
    if (id <= 531) return 'rain.svg';
    if (id <= 622) return 'snow.svg';
    if (id <= 781) return 'atmosphere.svg';
    if (id <= 800) return 'clear.svg';
    else return 'clouds.svg';
}

function getCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return currentDate.toLocaleDateString('en-GB', options);
}

async function getFetchData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return response.json();
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData(city);
    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection);
        return;

    }

    const {
        name: place,
        main: { humidity, temp },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    currCity.textContent = place;
    currDate.textContent = getCurrentDate();
    currTemp.textContent = Math.round(temp) + "°C";
    cloudStatus.textContent = main;
    currHumidity.textContent = humidity + "%";
    currWindSpeed.textContent = speed + "M/s";
    cloudStatusImg.src = `assets/weather/${getweatherIcon(id)}`;

    showDisplaySection(searchSection);
    console.log(weatherData);
}

function showDisplaySection(section) {
    [homeSection, searchSection, notFoundSection].forEach(section => section.style.display = "none");

    section.style.display = "block";
}