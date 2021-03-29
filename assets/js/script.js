var api_key = "1b5491b3e5b0b634e1e69f676a621a18";
var reportEl = document.querySelector('.report');
var cardEl = document.querySelector('.card');
var tempEl = document.querySelector('.temperature')
var humidityEl = document.querySelector(".humidity")
var windEl = document.querySelector(".wind")
var uvEl = document.querySelector(".uv")
var cityEl = document.querySelector('.city')
var dayEl = document.querySelector('.day')
var savedEl = document.querySelector('.saved')
var forcastEl = document.querySelector('.forcast')

var today = moment().format('MMMM Do YYYY');

var savedCities = JSON.parse(localStorage.getItem("recent")) || [];

var city = '';
function retreiveWeather(city) {
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    fetch(currentURL)
       .then((data) => data.json())
       .then(function (weather) { 
      if (weather.cod === "404") {
      alert("Not found");
     };    
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;        
     fetch(onecallURL)
    .then((data) => data.json())
    .then(function (oneCallData) {
     console.log(oneCallData)                 
     var report = oneCallData.current
     $(reportEl).show();      
    cityEl.innerHTML = "  ";
      cityEl.append(city);   
     dayEl.textContent = today;
var temperature = `Temperature: ${report.temp} °F`;
    tempEl.textContent = temperature;
   var humidity = `Humidity: ${report.humidity} %`;
     humidityEl.textContent = humidity;
    var wind = `Wind Speed: ${report.wind_speed} MPH`;
    windEl.textContent = wind;
   var uvindex = `${report.uvi}`;
 uvEl.textContent = uvindex;
   if (report.uvi <= 2) {
     uvEl.classList.add('low');
  } else if (report.uvi > 2 && report.uvi < 6) {
     uvEl.addClass("mid")
   } else if (report.uvi > 5 && report.uvi < 8) {
     uvEl.addClass("high")
   } else if (report.uvi > 7 && report.uvi < 11) {
     uvEl.addClass("vhigh")
   } else {
     uvEl.addClass("extreme")
    };
  var forcastData = oneCallData.daily;                
    forcastData.shift();
   forcastData.pop();
    forcastData.pop();
     console.log(forcastData);
     console.log(forcastData[0].clouds);
     for (let i = 0; i < forcastData.length; i++) {
     var forcastCard = $(`
       <div class="card">
       <h1>Date<h1>
       <p>Temp: ${forcastData[i].temp.max}°F </p>
       <p>Humidity: ${forcastData[i].humidity}%</p>
       </div >
            `)
       forcastEl.append(forcastCard);
       }
      })
   })
}
function saveRecent(city) {
    if (savedCities.includes(city)) {
        return;
    }
    if (savedCities.length === 7) {
        savedCities.pop();
    }
    savedCities.unshift(city);
    localStorage.setItem("recent", JSON.stringify(savedCities));
    pullRecent(savedCities);
}
function pullRecent(arr) {
    savedEl.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
        var li = document.createElement("li");
        li.innerText = item;
        savedEl.append(li);
    }
}
pullRecent(savedCities)
$("#search").on('click', function (event) {
    event.preventDefault();
    var citySearch = $(this).siblings("input").val();
    console.log(citySearch);
    retreiveWeather(citySearch);
    saveRecent(citySearch);
});
