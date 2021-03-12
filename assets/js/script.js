var api_key = "1b5491b3e5b0b634e1e69f676a621a18";

function createBtn (){
  var city= document.createElement("button");
  city.textContent = city
}

function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    fetch(currentWeatherUrl)
      .then((data) => data.json())
      .then(function (weather) {
        console.log(weather);
            if (weather.cod === "404") {
                alert("City Not Found");
                return;
}
  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
    
  fetch(onecallURL)
      .then((data) => data.json())
      .then(function (oneCallData) { 
        console.log(oneCallData);
      });
  });
}
getWeather("Chicago");
getWeather("LongBeach")


