var searchHistory = [];
var weatherApiRootUrl = "https://api.openweathermap.org";
var weatherApiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var history = document.querySelector("#history");
var todayContainer = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");



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




