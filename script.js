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




