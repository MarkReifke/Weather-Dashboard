const api_key = "1b5491b3e5b0b634e1e69f676a621a18";
var cityName;
var searchHistory = JSON.parse(localStorage.getItem('history')) || [];
var currentTemp;
var currentIcon;
var currentHumidity;
var currentWind;
var currentUVI;
var forecastTemp = [];
var forecastHumidity = [];
var forecastIcon= [];

function getWeather(city) {
    cityName = city;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    fetch(currentWeatherUrl)
        .then((data) => data.json())
        .then(function (weather) {
            if (weather.cod === "404") {
                alert("City not found");
                return;
            }
            var lat = weather.coord.lat;
            var lon = weather.coord.lon;
            const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`;
            fetch(oneCallUrl)
                .then((data) => data.json())
                .then(function (oneCallData) {
                    

                    
                    currentTemp = oneCallData.current.temp
                    currentHumidity = oneCallData.current.humidity
                    currentWind = oneCallData.current.wind_speed
                    currentUVI = oneCallData.current.uvi
                    currentIcon = oneCallData.current.weather[0].icon
                   
                    

                    
                    forecastTemp = [];
                    forecastHumidity = [];
                    forecastIcon= [];
                    for (let i = 0; i < 5; i++) {
                        forecastTemp.push(oneCallData.daily[i].temp.day)
                        forecastHumidity.push(oneCallData.daily[i].humidity)
                        forecastIcon.push(oneCallData.daily[i].weather[0].icon)
                       

                    }
                    
                    if(!(searchHistory.includes(cityName))){
                        searchHistory.push(cityName)
                    }

                    displayForeCast();
                    displayCurrentInfo();
                    displayHistory();
                    localStorage.setItem('history', JSON.stringify(searchHistory));

                });
            });
            ;
            
}

function displayCurrentInfo() {
    var date = new Date();
    var weatherDisplay = document.getElementById("currentweather");
    weatherDisplay.innerHTML =
 `<div class= "card-body">
    <h2 class="card-title text-light">${cityName} <img class ="wIcons" src = "https://openweathermap.org/img/wn/${currentIcon}@2x.png"></img> ${date.toLocaleString('en-US', { month: "numeric", day: "numeric", year: "numeric" })}</h2>
    <div class="card-text text-light">Temperature: ${currentTemp}&#176</div>
    <div class= "card-text text-light">Humidity: ${currentHumidity}%        
    <div class="card-text text-light">Wind-Speed: ${currentWind}</div>
    <div class="card-text text-light">UVI: ${currentUVI}</div></div>`

}

function displayForeCast() {
    var date = new Date();
    var fiveDay = document.getElementById("fiveday");
    fiveDay.innerHTML = "";
    
    
    for (let i = 0; i < 5; i++) {
        date.setDate(date.getDate() + 1);
        fiveDay.innerHTML += `
        <div class="card fCard" >
        <h6 class="card-title">${date.toLocaleString('en-US', { month: "numeric", day: "numeric", year: "numeric" })}</h6>
        <img class ="wIcons" src= https://openweathermap.org/img/wn/${forecastIcon[i]}@2x.png ><img>
        <div class="card-text">Temperature: ${forecastTemp[i]}</div><div class="card-text">Humidity: ${forecastHumidity[i]}</div>
        </div>`
        
    }
}

function displayHistory() {
    var pastDisplay = document.getElementById("pastsearch");
    pastDisplay.innerHTML = "";
    ;
    
     for (let i = 0; i < searchHistory.length; i++) {
       pastDisplay.innerHTML += `<li class="searchlist">${searchHistory[i]}</li>`;
    }
}

function init() {
   
        displayHistory();
    

    document.getElementById("searchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        var searchCity = document.getElementById("userInput").value;
        getWeather(searchCity);
    })
    document.getElementById("pastsearch").addEventListener("click", function (e) {
        e.preventDefault();
        getWeather(e.target.textContent);
    })
}

init();
