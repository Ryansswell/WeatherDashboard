var temp = document.querySelector('temp');
var desc = document.querySelector('desc');
var name = document.querySelector('name');
var search = document.querySelector('#search');
var city = document.querySelector('city');



function renderweather(weather) {
    console.log(weather);
    var resultsContainer = document.querySelector("#weather-results");
    var city = document.createElement("h2");
    city.textContent = weather.name;
    resultsContainer.append(city);
    var temp = document.createElement("p");
    temp.textContent = "Temp: " + weather.main.temp + "°F";
    resultsContainer.append(temp);
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    resultsContainer.append(humidity);
    var wind = document.createElement("p");
    wind.textContent = "Wind: " + weather.wind.speed + "mph,";
    resultsContainer.append(wind);

    var weatherDetails = weather.weather[0]
        if (weatherDetails && weatherDetails.description) {
            var description = document.createElement("p");
                description.textContent = weatherDetails.description;
                resultsContainer.append(description);
        }
}


function fetchweather(query) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" +
    query + 
    "&units=imperial&appid=f7bc72410444a27b67e10ef6c5461978";

    fetch(url)
    .then(response => response.json())
    .then(data => renderweather(data));
}

fetchweather("San Diego");
// search.addEventListener('click', buttonClickHandler);
