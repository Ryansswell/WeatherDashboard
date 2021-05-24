var searchHistory = [];
var userFormEl = document.querySelector('#user-form');
vst userInput = document.querySelector("#search-input");
var today = document.querySelector("#today");
var forecast = document.querySelector("#forecast");
var historyContainer = document.querySelector("#history-container");

function renderHistory() {
    searchHistory.innerHTML = "";
    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var button = document.createElement("button");
        bnt.setAttribute("class", "btn-history list-group-item-action");
        btn.setAttribute("type", "button");
        btn.setAttribute("aria-controls", "today forecast");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistory.append(btn);

    }
}


initSearchHistory();
searchForm.addEventListener("submit", handleSearchFormSubmit);
searchHistoryContainer.addEventListener("click", handleSearchHistoryClick);




// window.addEventListener("load", function () {
//     var temp = document.querySelector('temp');
//     var desc = document.querySelector('desc');
//     var name = document.querySelector('name');
//     var search = document.querySelector('#search');
//     var city = document.getElementById('city');
//     console.log(city.value);

//     function renderweather(weather) {
//         console.log(weather);

//         var resultsContainer = document.querySelector("#weather-results");
//         var city = document.createElement("h2");
//         city.textContent = weather.name;
//         resultsContainer.append(city);
//         var temp = document.createElement("p");
//         temp.textContent = "Temp: " + weather.main.temp + "°F";
//         resultsContainer.append(temp);
//         var humidity = document.createElement("p");
//         humidity.textContent = "Humidity: " + weather.main.humidity + "%";
//         resultsContainer.append(humidity);
//         var wind = document.createElement("p");
//         wind.textContent = "Wind: " + weather.wind.speed + "mph,";
//         resultsContainer.append(wind);

//         weather.weather[0].name = weather.name;
//         weather.weather[0].temph = 88;
//         weather.weather[0].templ = 53;
//         var weatherDetails = weather.weather[0]
//         weather.weather[1] = weather.weather[0]
//         weather.weather[2] = weather.weather[0]
//         weather.weather[3] = weather.weather[0]
//         weather.weather[4] = weather.weather[0]
//         console.log(weather);
//         if (weatherDetails && weatherDetails.description) {
//             var description = document.createElement("p");
//             description.textContent = weatherDetails.description;
//             resultsContainer.append(description);
//         }
//         var fiveDayContainer = document.querySelector("#FiveDayForecast");
//         console.log(weather.weather);
//         for (x = 0; x < weather.weather.length; x++) {

//             var card = document.createElement("div");
//             card.classList.add("card");


//             var city = document.createElement("h2");
//             city.textContent = weather.weather[x].name;
//             card.append(city);
//             var temp = document.createElement("p");
//             temp.textContent = "HighTemp: " + weather.weather[x].temph + "°F";
//             card.append(temp);
//             var templ = document.createElement("p");
//             templ.textContent = "LowTemp: " + weather.weather[x].templ + "°F";
//             card.append(templ);
//             // var humidity = document.createElement("p");
//             // humidity.textContent = "Humidity: " + weather.main.humidity + "%";
//             // card.append(humidity);
//             // var wind = document.createElement("p");
//             // wind.textContent = "Wind: " + weather.wind.speed + "mph,";
//             // card.append(wind);
//             fiveDayContainer.append(card);
//         }
//     }


//     search.addEventListener('click',
//         function (event) {
//             event.preventDefault();
//             var query = city.value;
//             console.log(city.value);
//             var url = "http://api.openweathermap.org/data/2.5/weather?q=" +
//                 query +
//                 "&units=imperial&appid=d91f911bcf2c0f925fb6535547a5ddc9";

//             fetch(url)
//                 .then(response => response.json())
//                 .then(data => renderweather(data));
//         }
//     );

// })










