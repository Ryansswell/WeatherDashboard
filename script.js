var searchHistory = [];
var weatherApiRootUrl = "https://api.openweathermap.org";
var weatherApiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var history = document.querySelector("#history");
var todayContainer = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");

function showSearchHistory() {
    searchHistoryContainer.innerHTML = "";

    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var btn = document.createElement("button");
        btn.setAttribute("class", "btn-history list-group-item list-group-item-action");
        btn.setAttribute("type", "button");
        btn.setAttribute("aria-controls", "today forecast");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);
    }
}

function appendToHistory(search) {
    searchHistory.push(search);
    searchHistory.splice(0, searchHistory.length - 7);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    showSearchHistory();
}

function localStorageSearchHistory() {
    var storedHistory = localStorage.getItem("search-history");
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
    showSearchHistory();
}

function renderCurrentWeather(city, weather) {
    var date = dayjs().format("M/D/YYYY");
    var tempF = weather.temp;
    var windMph = weather.wind_speed;
    var humidity = weather.humidity;
    var uvi = weather.uvi;
    var iconUrl = "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
    var iconDescription = weather.weather[0].description || weather[0].main;
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var heading = document.createElement("h2");
    var weatherIcon = document.createElement("img");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    var uvEl = document.createElement("p");
    var uviBadge = document.createElement("span");

    card.setAttribute("class", "card");
    cardBody.setAttribute("class", "card-body");
    card.append(cardBody);

    heading.setAttribute("class", "h3 card-title");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");

    heading.textContent = city + "(" + date + ")";
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDescription);
    heading.append(weatherIcon);
    tempEl.textContent = "Temp: " + tempF + "°F";
    windEl.textContent = "Wind: " + windMph + " MPH";
    humidityEl.textContent = "Humidity: " + humidity + " %";
    cardBody.append(heading, tempEl, windEl, humidityEl);

    uvEl.textContent = "UV Index: ";
    uviBadge.classList.add("btn", "btn-sm");
    if (uvi < 3) {
        uviBadge.classList.add("btn-success");
    } else if (uvi < 7) {
        uviBadge.classList.add("btn-warning");
    } else {
        uviBadge.classList.add("btn-danger");
    }
    uviBadge.textContent = uvi;
    uvEl.append(uviBadge);
    cardBody.append(uvEl);

    todayContainer.innerHTML = "";
    todayContainer.append(card);
}

function showForecastCard(forecast) {
    var unixTs = forecast.dt;
    var iconUrl = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
    var iconDescription = forecast.weather[0].description;
    var tempF = forecast.temp.day;
    var humidity = forecast.humidity;
    var windMph = forecast.wind_speed;
    var col = document.createElement("div");
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var cardTitle = document.createElement("h5");
    var weatherIcon = document.createElement("img");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");

    col.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

    col.setAttribute("class", "col-md");
    card.setAttribute("class", "card bg-primary h-100 text-white");
    cardBody.setAttribute("class", "card-body p-2");
    cardTitle.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");

    cardTitle.textContent = dayjs.unix(unixTs).format("M/D/YYYY");
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDescription);
    tempEl.textContent = "Temp: " + tempF + " °F";
    windEl.textContent = "Wind: " + windMph + " MPH";
    humidityEl.textContent = "Humidity: " + humidity + " %";

    forecastContainer.append(col);
}

function showForecast(dailyForecast) {
    var startDt = dayjs().add(1, "day").startOf("day").unix();
    var endDt = dayjs().add(6, "day").startOf("day").unix();
    var headingCol = document.createElement("div");
    var heading = document.createElement("h4");

    headingCol.setAttribute("class", "col-12");
    heading.textContent = "5-Day Forecast:";
    headingCol.append(heading);

    forecastContainer.innerHTML = "";
    forecastContainer.append(headingCol);
    for (var i = 0; i < dailyForecast.length; i++) {
        if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
            showForecastCard(dailyForecast[i]);
        }
    }
}

function getWeather(location) {
    var lat = location.lat;
    var lon = location.lon;
    var city = location.name;
    var apiUrl = " https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&exclude=minutely,hourly&appid=" +
        weatherApiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            console.log("Request Error:", response.statusText);
        })
        .then((data) => {
            renderCurrentWeather(city, data.current);
            showForecast(data.daily);
        })
        .catch(function (error) {
            console.log("Unable to connect to Weather API", error);
        });
}

function getCordinates(search) {
    var apiUrl = weatherApiRootUrl + "/geo/1.0/direct?q=" + search + "&limit=5&appid=" + weatherApiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            console.log("Request Error:", response.statusText);
        })
        .then((data) => {
            if (data.length === 0) {
                alert("Please try something else.");
            } else {
                getWeather(data[0]);
            }
        })
        .catch(function (error) {
            console.log("Unable to connect to the Weather API", error);
        });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    var search = searchInput.value.trim();
    if (!search) {
        return;
    }
    getCordinates(search);
    appendToHistory(search);
    searchInput.value = "";
}

function handleSearchHistoryClick(event) {
    var btn = event.target;
    if (!btn.matches(".btn-history")) {
        return;
    }
    var search = btn.getAttribute("data-search");
    getCordinates(search);
}

localStorageSearchHistory();
searchForm.addEventListener("submit", handleSearchFormSubmit);
searchHistoryContainer.addEventListener("click", handleSearchHistoryClick);





